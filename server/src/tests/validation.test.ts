import { describe,expect,it } from 'vitest'
import { telemetrySchema,verifyMapping,parseTopic } from '../lib/validation.js'
const payload={schemaVersion:1 as const,machineId:'cnc-001',componentId:'spindle-bearing-01',sensorId:'vibration-01',timestamp:new Date().toISOString(),metrics:{vibrationRmsMmS:2.1}}
describe('sensor telemetry validation',()=>{
 it('accepts a valid schema',()=>expect(telemetrySchema.safeParse(payload).success).toBe(true))
 it('rejects readings with unapproved metric keys',()=>expect(telemetrySchema.safeParse({...payload,metrics:{randomReading:12}}).success).toBe(false))
 it('rejects future timestamps',()=>expect(telemetrySchema.safeParse({...payload,timestamp:new Date(Date.now()+600000).toISOString()}).success).toBe(false))
 it('rejects mismatched component IDs in MQTT topic',()=>expect(verifyMapping('boltsense/cnc-001/wrong-component/telemetry',payload,{id:'vibration-01',machineId:'cnc-001',componentId:'spindle-bearing-01'})).toBe(false))
 it('accepts valid registered mapping',()=>expect(verifyMapping('boltsense/cnc-001/spindle-bearing-01/telemetry',payload,{id:'vibration-01',machineId:'cnc-001',componentId:'spindle-bearing-01'})).toBe(true))
 it('rejects malformed topics',()=>expect(parseTopic('random/abc')).toBeNull())
})
