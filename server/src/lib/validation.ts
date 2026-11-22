import { z } from 'zod'
export const idSchema=z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,79}$/)
export const metricSchema=z.object({
 temperatureC:z.number().finite().min(-100).max(1000).optional(),
 vibrationRmsMmS:z.number().finite().min(0).max(10000).optional(),
 loadN:z.number().finite().min(-1e9).max(1e9).optional(),
 motorCurrentA:z.number().finite().min(0).max(1e7).optional(),
 rpm:z.number().finite().min(0).max(1e7).optional(),
 lubricationIndex:z.number().finite().min(0).max(100).optional()
}).strict().refine(v=>Object.values(v).some(x=>x!==undefined),{message:'At least one metric is required'})
export const telemetrySchema=z.object({
 schemaVersion:z.literal(1),machineId:idSchema,componentId:idSchema,sensorId:idSchema,
 timestamp:z.string().datetime({offset:true}),metrics:metricSchema
}).strict().superRefine((v,ctx)=>{
 const t=Date.parse(v.timestamp)
 if(!Number.isFinite(t)||t>Date.now()+60_000)ctx.addIssue({code:'custom',message:'Future or invalid timestamp',path:['timestamp']})
})
export type Telemetry=z.infer<typeof telemetrySchema>
export function parseTopic(topic:string){const parts=topic.split('/');if(parts.length!==4||parts[0]!=='boltsense'||!['telemetry','status'].includes(parts[3])||!idSchema.safeParse(parts[1]).success||!idSchema.safeParse(parts[2]).success)return null;return {machineId:parts[1],componentId:parts[2],kind:parts[3] as 'telemetry'|'status'}}
export function verifyMapping(topic:string,record:Telemetry,registered:{id:string,machineId:string,componentId:string}|null){const route=parseTopic(topic);return !!route&&route.kind==='telemetry'&&route.machineId===record.machineId&&route.componentId===record.componentId&&!!registered&&registered.id===record.sensorId&&registered.machineId===record.machineId&&registered.componentId===record.componentId}
