import { describe,expect,it } from 'vitest'
import { computeRisk } from '../lib/risk.js'
const limits={temperatureC:{warning:55,critical:75},vibrationRmsMmS:{warning:3,critical:7}}
describe('transparent rule-based risk',()=>{
 it('does not invent a score when metrics are missing',()=>{const result=computeRisk({},limits);expect(result.score).toBeNull();expect(result.severity).toBe('unknown')})
 it('scores a warning with an explanation',()=>{const r=computeRisk({temperatureC:60},limits);expect(r.severity).toBe('warning');expect(r.explanation).toContain('60')})
 it('detects a critical threshold',()=>{const r=computeRisk({temperatureC:80,vibrationRmsMmS:2},limits);expect(r.severity).toBe('critical');expect(r.score).toBe(90)})
 it('reports missing inputs',()=>{const r=computeRisk({temperatureC:40},limits);expect(r.missingInputs).toContain('vibrationRmsMmS')})
})
