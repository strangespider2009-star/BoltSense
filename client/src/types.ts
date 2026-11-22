export type Health = 'healthy' | 'warning' | 'critical' | 'unknown'
export type Mode = 'demo' | 'live'
export type MetricKey = 'temperatureC'|'vibrationRmsMmS'|'loadN'|'motorCurrentA'|'rpm'|'lubricationIndex'
export interface Machine { id:string; name:string; type:string; description:string; status:Health; category:string; image:string; connected:number; total:number; healthScore:number; modelAvailable?:boolean }
export interface Component { id:string; machineId:string; name:string; type:string; location:string; status:Health; sensorIds:string[]; recommendedAction:string; riskScore:number; basis:string; readings:Partial<Record<MetricKey,number>>; calibration?:string; nextInspection?:string }
export interface Sensor { id:string; machineId:string; componentId:string; kind:string; unit:string; status:'online'|'stale'|'offline'; lastSeen:string|null; hardwareId:string; calibratedAt:string|null; sampleRateHz:number }
export interface Alert { id:string; machineId:string; componentId:string; severity:'warning'|'critical'; message:string; measured:string; threshold:string; timestamp:string; acknowledged:boolean; resolved:boolean; assignedTo?:string }
export interface Maintenance { id:string; machineId:string; componentId:string; title:string; scheduledAt:string; status:'scheduled'|'in_progress'|'completed'; technician:string; notes:string }
export interface TelemetryEvent { machineId:string; componentId:string; sensorId:string; timestamp:string; metrics:Partial<Record<MetricKey,number>>; simulated?:boolean }
