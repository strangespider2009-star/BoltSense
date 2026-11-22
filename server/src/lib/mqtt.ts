import mqtt from 'mqtt'
import type { Server } from 'socket.io'
import type { PrismaClient } from '@prisma/client'
import { parseTopic,telemetrySchema,verifyMapping } from './validation.js'
import { computeRisk, type Limits, type MetricName } from './risk.js'
const MAX_AGE_MS=24*3600*1000
const STALE_MS=Number(process.env.SENSOR_STALE_MS)||15000
export function connectMqtt(io:Server,db:PrismaClient){
 const broker=process.env.MQTT_URL||'mqtt://localhost:1883'
 if(!broker.startsWith('mqtts://')&&!broker.startsWith('mqtt://'))throw new Error('Unsupported MQTT URL')
 const client=mqtt.connect(broker,{username:process.env.MQTT_USERNAME||undefined,password:process.env.MQTT_PASSWORD||undefined,clientId:`boltsense-api-${process.pid}`,reconnectPeriod:3000})
 client.on('connect',()=>{console.info('MQTT connected');client.subscribe('boltsense/+/+/telemetry',{qos:1})})
 client.on('error',err=>console.error('MQTT error:',err.message))
 client.on('message',async(topic,buffer)=>{
  try{
   if(buffer.length>4096)return
   const route=parseTopic(topic);if(!route||route.kind!=='telemetry')return
   const parsed=telemetrySchema.safeParse(JSON.parse(buffer.toString('utf8')))
   if(!parsed.success){console.warn('Rejected invalid MQTT payload');return}
   const record=parsed.data
   if(Date.now()-Date.parse(record.timestamp)>MAX_AGE_MS)return
   const sensor=await db.sensor.findUnique({where:{id:record.sensorId}})
   if(!verifyMapping(topic,record,sensor))return
   // Replay and duplicate prevention: same sensor/timestamp is ignored.
   const recent=await db.sensorReading.findFirst({where:{sensorId:sensor!.id,timestamp:new Date(record.timestamp)}})
   if(recent)return
   await db.$transaction([
    db.sensorReading.create({data:{machineId:record.machineId,componentId:record.componentId,sensorId:record.sensorId,timestamp:new Date(record.timestamp),metrics:record.metrics,dataQuality:'valid'}}),
    db.sensor.update({where:{id:record.sensorId},data:{lastSeen:new Date(),status:'online'}})
   ])
   io.emit('telemetry',record)
   // Risk scores require explicit per-sensor thresholds, configured and calibrated by the operator.
   const limits=(sensor!.thresholds||{}) as Limits
   const risk=computeRisk(record.metrics,limits)
   if(risk.score!==null){
    await db.riskAssessment.create({data:{componentId:record.componentId,score:risk.score,severity:risk.severity,explanation:risk.explanation,missingInputs:risk.missingInputs,modelVersion:risk.modelVersion}})
    const metricNames=Object.keys(limits) as MetricName[]
    for(const metric of metricNames){
     const level=limits[metric];const value=record.metrics[metric];if(!level||value===undefined)continue
     const above=level.direction!=='below'
     const critical=above?value>=level.critical:value<=level.critical
     const warning=above?value>=level.warning:value<=level.warning
     const existing=await db.alert.findFirst({where:{sensorId:record.sensorId,metric,resolved:false}})
     if(warning){
      if(!existing){await db.alert.create({data:{machineId:record.machineId,componentId:record.componentId,sensorId:record.sensorId,metric,severity:critical?'critical':'warning',message:`${metric} outside configured ${critical?'critical':'warning'} limit`,measured:value,threshold:critical?level.critical:level.warning}});io.emit('alerts:updated',{componentId:record.componentId})}
      else if(critical&&existing.severity!=='critical'){await db.alert.update({where:{id:existing.id},data:{severity:'critical',measured:value,threshold:level.critical}});io.emit('alerts:updated',{componentId:record.componentId})}
     }else if(existing){
      // Hysteresis: auto-resolve only when 10% back inside the warning boundary.
      const margin=Math.abs(level.critical-level.warning)*.1
      const clear=above?value<level.warning-margin:value>level.warning+margin
      if(clear){await db.alert.update({where:{id:existing.id},data:{resolved:true,notes:'Auto-resolved after hysteresis clearance'}});io.emit('alerts:updated',{componentId:record.componentId})}
     }
    }
   }
  }catch(err){console.warn('MQTT message failed validation or processing:',err instanceof Error?err.message:'unknown')}
 })
 const interval=setInterval(async()=>{try{const staleBefore=new Date(Date.now()-STALE_MS);const stale=await db.sensor.findMany({where:{status:'online',lastSeen:{lt:staleBefore}},select:{id:true,componentId:true,machineId:true}});if(stale.length){await db.sensor.updateMany({where:{id:{in:stale.map(s=>s.id)}},data:{status:'stale'}});io.emit('sensors:stale',stale)}}catch(err){console.warn('Stale sensor scan failed:',err instanceof Error?err.message:'unknown')}},5000)
 return ()=>{clearInterval(interval);client.end(true)}
}
