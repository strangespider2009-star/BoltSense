import type { Alert, Component, Machine, Maintenance, Sensor } from '../types'
import { enrichMonitoringCatalog } from './monitoringCatalog'
export const machines: Machine[] = [
  {id:'cnc-001',name:'CNC Milling Machine',type:'VMX-450',description:'High-precision vertical machining center',status:'warning',category:'Machining',image:'cnc',connected:6,total:7,healthScore:84,modelAvailable:true},
  {id:'lathe-002',name:'CNC Lathe',type:'TL-220',description:'Computer-controlled turning and finishing',status:'healthy',category:'Machining',image:'lathe',connected:4,total:4,healthScore:96},
  {id:'conv-003',name:'Conveyor Belt',type:'CB-900',description:'Continuous industrial material handling',status:'healthy',category:'Handling',image:'conveyor',connected:3,total:3,healthScore:94},
  {id:'press-004',name:'Hydraulic Press',type:'HP-120',description:'Heavy-duty hydraulic forming system',status:'critical',category:'Forming',image:'press',connected:4,total:5,healthScore:59},
  {id:'robot-005',name:'Robotic Arm',type:'RX-600',description:'Six-axis automated production assembly',status:'healthy',category:'Robotics',image:'robot',connected:5,total:5,healthScore:98},
  {id:'pump-006',name:'Industrial Pump',type:'PMP-310',description:'Continuous-flow process circulation',status:'warning',category:'Utilities',image:'pump',connected:3,total:4,healthScore:81},
  {id:'comp-007',name:'Air Compressor',type:'AC-500',description:'High-capacity compressed air supply',status:'healthy',category:'Utilities',image:'compressor',connected:4,total:4,healthScore:93},
  {id:'motor-008',name:'Electric Motor',type:'EM-750',description:'Three-phase industrial drive motor',status:'healthy',category:'Drives',image:'motor',connected:2,total:2,healthScore:97},
]
export const components: Component[] = [
 {id:'spindle-bearing-01',machineId:'cnc-001',name:'Spindle Bearing',type:'Rolling-element bearing',location:'Upper spindle assembly',status:'warning',sensorIds:['temp-01','vibration-01'],riskScore:63,basis:'Illustrative demo rule: elevated vibration vs configured example thresholds',readings:{temperatureC:56.4,vibrationRmsMmS:4.2,rpm:2400},recommendedAction:'Inspect bearing lubrication, alignment and vibration trend.',nextInspection:'2026-11-27'},
 {id:'spindle-motor-01',machineId:'cnc-001',name:'Spindle Motor',type:'AC spindle motor',location:'Top drive housing',status:'healthy',sensorIds:['current-01'],riskScore:17,basis:'Demo current within illustrative baseline',readings:{temperatureC:44.8,motorCurrentA:8.3,rpm:2400},recommendedAction:'Continue regular trend monitoring.',nextInspection:'2026-12-10'},
 {id:'x-axis-guide-01',machineId:'cnc-001',name:'X-Axis Linear Guide',type:'Linear motion assembly',location:'Machine work table',status:'healthy',sensorIds:['load-01'],riskScore:12,basis:'Demo load below illustrative limit',readings:{loadN:350,temperatureC:36.2},recommendedAction:'Verify lubrication at planned service.',nextInspection:'2026-12-15'},
 {id:'coolant-pump-01',machineId:'cnc-001',name:'Coolant Pump',type:'Centrifugal coolant pump',location:'Machine base',status:'healthy',sensorIds:['temp-02'],riskScore:22,basis:'Demo thermal metric below illustrative limit',readings:{temperatureC:39.1},recommendedAction:'Check coolant filter during routine service.',nextInspection:'2026-12-12'},
 {id:'tool-holder-01',machineId:'cnc-001',name:'Tool Holder',type:'Tooling spindle interface',location:'Spindle nose',status:'unknown',sensorIds:[],riskScore:0,basis:'No sensor installed; risk not assessable',readings:{},recommendedAction:'Manual visual inspection required.'},
 {id:'z-axis-screw-01',machineId:'cnc-001',name:'Z-Axis Ball Screw',type:'Precision feed drive',location:'Vertical column',status:'healthy',sensorIds:['vibration-02'],riskScore:15,basis:'Demo vibration below illustrative limit',readings:{vibrationRmsMmS:1.1},recommendedAction:'Monitor motion smoothness.',nextInspection:'2026-12-19'},
 {id:'power-coupling-01',machineId:'cnc-001',name:'Drive Coupling',type:'Mechanical coupling',location:'Behind spindle motor',status:'healthy',sensorIds:['temp-03'],riskScore:24,basis:'Demo thermal metric below illustrative limit',readings:{temperatureC:41.3},recommendedAction:'Check coupling fasteners at service.',nextInspection:'2026-12-20'},
 {id:'lathe-chuck-01',machineId:'lathe-002',name:'Main Chuck',type:'Workholding',location:'Headstock',status:'healthy',sensorIds:['lathe-acc-01'],riskScore:9,basis:'Demo baseline within limits',readings:{vibrationRmsMmS:1.0},recommendedAction:'Routine inspection.'},
 {id:'conv-idler-01',machineId:'conv-003',name:'Idler Roller',type:'Bearing support',location:'Conveyor head',status:'healthy',sensorIds:['conv-temp-01'],riskScore:8,basis:'Demo baseline within limits',readings:{temperatureC:34.2},recommendedAction:'Routine inspection.'},
 {id:'press-cylinder-01',machineId:'press-004',name:'Hydraulic Cylinder',type:'Hydraulics',location:'Upper press',status:'critical',sensorIds:['press-load-01'],riskScore:89,basis:'Illustrative demo load above critical threshold',readings:{loadN:8900,temperatureC:76},recommendedAction:'Stop using equipment under site procedures and have qualified staff inspect.'},
 {id:'robot-joint-03',machineId:'robot-005',name:'Elbow Joint',type:'Rotary joint',location:'Joint 3',status:'healthy',sensorIds:['robot-temp-01'],riskScore:10,basis:'Demo baseline within limits',readings:{temperatureC:39.8},recommendedAction:'Routine inspection.'},
 {id:'pump-bearing-01',machineId:'pump-006',name:'Pump Bearing',type:'Bearing support',location:'Drive end',status:'warning',sensorIds:['pump-vib-01'],riskScore:66,basis:'Illustrative demo vibration above warning threshold',readings:{vibrationRmsMmS:4.7,temperatureC:62},recommendedAction:'Inspect seal, bearing and lubrication.'},
 {id:'comp-motor-01',machineId:'comp-007',name:'Compressor Motor',type:'Electric motor',location:'Motor bay',status:'healthy',sensorIds:['comp-current-01'],riskScore:11,basis:'Demo baseline within limits',readings:{motorCurrentA:11.8},recommendedAction:'Routine inspection.'},
 {id:'motor-shaft-01',machineId:'motor-008',name:'Motor Shaft',type:'Drive shaft',location:'Shaft end',status:'healthy',sensorIds:['motor-vib-01'],riskScore:14,basis:'Demo baseline within limits',readings:{vibrationRmsMmS:1.2},recommendedAction:'Routine inspection.'},
]
components.push(...enrichMonitoringCatalog(components))
const date = (mins:number) => new Date(Date.now() - mins*60000).toISOString()
export const sensors:Sensor[] = [
 ...[['temp-01','cnc-001','spindle-bearing-01','Temperature','°C'],['vibration-01','cnc-001','spindle-bearing-01','Vibration','mm/s'],['current-01','cnc-001','spindle-motor-01','Electrical','A'],['load-01','cnc-001','x-axis-guide-01','Load','N'],['temp-02','cnc-001','coolant-pump-01','Temperature','°C'],['vibration-02','cnc-001','z-axis-screw-01','Vibration','mm/s'],['temp-03','cnc-001','power-coupling-01','Temperature','°C']].map(([id,machineId,componentId,kind,unit],i)=>({id,machineId,componentId,kind,unit,status:(i===6?'offline':'online') as Sensor['status'],lastSeen:i===6?date(55):date(i),hardwareId:`PI-CNC-A/${id}`,calibratedAt:'2026-10-15T10:30:00Z',sampleRateHz:1})),
 ...components.filter(c=>c.machineId!=='cnc-001' && c.sensorIds.length>0).map(c=>({id:c.sensorIds[0]||`virtual-${c.id}`,machineId:c.machineId,componentId:c.id,kind:'Condition',unit:'varies',status:'online' as const,lastSeen:date(1),hardwareId:`PI-${c.machineId}`,calibratedAt:'2026-10-11T12:00:00Z',sampleRateHz:1}))
]
export const alerts:Alert[] = [
 {id:'ALT-1032',machineId:'press-004',componentId:'press-cylinder-01',severity:'critical',message:'Hydraulic cylinder load above configured demo limit',measured:'8,900 N',threshold:'8,500 N',timestamp:date(4),acknowledged:false,resolved:false},
 {id:'ALT-1031',machineId:'cnc-001',componentId:'spindle-bearing-01',severity:'warning',message:'Spindle bearing vibration elevated',measured:'4.2 mm/s RMS',threshold:'3.5 mm/s RMS',timestamp:date(12),acknowledged:false,resolved:false},
 {id:'ALT-1028',machineId:'pump-006',componentId:'pump-bearing-01',severity:'warning',message:'Pump bearing vibration elevated',measured:'4.7 mm/s RMS',threshold:'3.5 mm/s RMS',timestamp:date(41),acknowledged:true,resolved:false,assignedTo:'Technician'},
]
export const maintenance:Maintenance[] = [
 {id:'WO-2041',machineId:'cnc-001',componentId:'spindle-bearing-01',title:'Inspect spindle bearings',scheduledAt:'2026-11-27',status:'scheduled',technician:'Unassigned',notes:'Review vibration trend and confirm lubrication.'},
 {id:'WO-2040',machineId:'pump-006',componentId:'pump-bearing-01',title:'Bearing lubrication inspection',scheduledAt:'2026-11-25',status:'in_progress',technician:'Maintenance team',notes:'Demo record; verify site procedures.'},
 {id:'WO-2037',machineId:'lathe-002',componentId:'lathe-chuck-01',title:'Routine chuck inspection',scheduledAt:'2026-11-19',status:'completed',technician:'Maintenance team',notes:'Completed in sample data.'},
]
export function sampleHistory(componentId:string, points=40) {
 const c=components.find(x=>x.id===componentId)
 const t=c?.readings.temperatureC;const v=c?.readings.vibrationRmsMmS; const l=c?.readings.loadN
 return Array.from({length:points},(_,i)=>({time:new Date(Date.now()-(points-1-i)*60000).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),temperatureC:t===undefined?null:+(t+Math.sin(i/3)*2+Math.cos(i/7)*1.4).toFixed(1),vibrationRmsMmS:v===undefined?null:+Math.max(0,v+Math.sin(i/4)*.4).toFixed(2),loadN:l===undefined?null:Math.round(l+Math.sin(i/5)*23)}))
}
