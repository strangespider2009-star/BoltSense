import { beforeEach,describe,expect,it } from 'vitest'
import request from 'supertest'
import { app } from '../app.js'
beforeEach(()=>{process.env.DATA_MODE='demo'})
describe('API endpoints',()=>{
 it('returns seeded machines clearly marked as simulated',async()=>{const r=await request(app).get('/api/machines');expect(r.status).toBe(200);expect(r.body.length).toBe(8);expect(r.body[0].source).toContain('DEMO')})
 it('returns machine component list',async()=>{const r=await request(app).get('/api/machines/cnc-001/components');expect(r.status).toBe(200);expect(r.body.some((c:{id:string})=>c.id==='spindle-bearing-01')).toBe(true)})
 it('requires auth for maintenance writes',async()=>{const r=await request(app).post('/api/maintenance').send({});expect(r.status).toBe(401)})
 it('returns 404 for unknown components',async()=>{const r=await request(app).get('/api/components/absent');expect(r.status).toBe(404)})
})
