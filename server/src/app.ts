import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { z } from 'zod'
import { database } from './lib/db.js'
import { login,requireRole } from './lib/auth.js'
import { catalog,catalogComponents,registeredSensors,demoAlerts,demoMaintenance,exampleThresholds } from './lib/catalog.js'
import { computeRisk, type Limits } from './lib/risk.js'
import { idSchema } from './lib/validation.js'
const postMaintenance=z.object({machineId:idSchema,componentId:idSchema,title:z.string().min(2).max(200),scheduledAt:z.string().datetime({offset:true}),technician:z.string().max(100).optional(),notes:z.string().max(2000).optional()}).strict()
const postAck=z.object({notes:z.string().max(2000).optional(),assignee:z.string().max(100).optional()}).strict()
export const app=express()
app.disable('x-powered-by');
// Permit only the specific external photography and film CDN domains.
app.use(helmet({contentSecurityPolicy:{directives:{imgSrc:["'self'",'data:','https://images.pexels.com'],mediaSrc:["'self'",'https://videos.pexels.com']}}}));
app.use(cors({origin:(process.env.CORS_ORIGIN||'http://localhost:5173').split(',')}));app.use(express.json({limit:'32kb'}));app.use('/api',rateLimit({windowMs:60_000,limit:240,standardHeaders:'draft-7',legacyHeaders:false}));
const isDemo=()=>process.env.DATA_MODE!=='live'
const unavailable=(res:express.Response)=>res.status(503).json({error:'Live database is not configured; set DATA_MODE=live and DATABASE_URL, then run migrations.',source:'live'})
app.get('/api/health',(_req,res)=>res.json({status:'ok',mode:isDemo()?'demo':'live',timestamp:new Date().toISOString()}))
app.post('/api/auth/login',login)
app.get('/api/machines',async(_req,res)=>{try{if(isDemo())return res.json(catalog.map(m=>({...m,source:'SIMULATED DEMO'})));const db=database();if(!db)return unavailable(res);res.json(await db.machine.findMany({orderBy:{id:'asc'}}))}catch{res.status(500).json({error:'Failed to load machines'})}})
app.get('/api/machines/:id',async(req,res)=>{try{if(!idSchema.safeParse(req.params.id).success)return res.status(400).json({error:'Invalid machine ID'});if(isDemo()){const m=catalog.find(m=>m.id===req.params.id);return m?res.json({...m,source:'SIMULATED DEMO'}):res.status(404).json({error:'Machine not found'})}const db=database();if(!db)return unavailable(res);const m=await db.machine.findUnique({where:{id:req.params.id}});return m?res.json(m):res.status(404).json({error:'Machine not found'})}catch{res.status(500).json({error:'Could not load machine'})}})
app.get('/api/machines/:id/components',async(req,res)=>{try{if(!idSchema.safeParse(req.params.id).success)return res.status(400).json({error:'Invalid machine ID'});if(isDemo())return res.json(catalogComponents.filter(c=>c.machineId===req.params.id).map(c=>({...c,source:'SIMULATED DEMO'})));const db=database();if(!db)return unavailable(res);res.json(await db.component.findMany({where:{machineId:req.params.id}}))}catch{res.status(500).json({error:'Could not load components'})}})
app.get('/api/components/:id',async(req,res)=>{try{if(!idSchema.safeParse(req.params.id).success)return res.status(400).json({error:'Invalid component ID'});if(isDemo()){const c=catalogComponents.find(c=>c.id===req.params.id);return c?res.json({...c,source:'SIMULATED DEMO'}):res.status(404).json({error:'Component not found'})}const db=database();if(!db)return unavailable(res);const c=await db.component.findUnique({where:{id:req.params.id},include:{sensors:true}});return c?res.json(c):res.status(404).json({error:'Component not found'})}catch{res.status(500).json({error:'Could not load component'})}})
app.get('/api/components/:id/history',async(req,res)=>{try{if(!idSchema.safeParse(req.params.id).success)return res.status(400).json({error:'Invalid component ID'});const take=Math.min(500,Math.max(1,Number(req.query.limit)||100));if(isDemo()){const found=catalogComponents.find(c=>c.id===req.params.id);if(!found)return res.status(404).json({error:'Component not found'});return res.json(Array.from({length:40},(_,i)=>({timestamp:new Date(Date.now()-(39-i)*60_000).toISOString(),metrics:{temperatureC:+(48+Math.sin(i/5)*3).toFixed(1)},source:'SIMULATED DEMO'})))}const db=database();if(!db)return unavailable(res);res.json(await db.sensorReading.findMany({where:{componentId:req.params.id},orderBy:{timestamp:'desc'},take}))}catch{res.status(500).json({error:'Could not load component history'})}})
app.get('/api/components/:id/risk',async(req,res)=>{try{if(!idSchema.safeParse(req.params.id).success)return res.status(400).json({error:'Invalid component ID'});if(isDemo()){if(!catalogComponents.some(c=>c.id===req.params.id))return res.status(404).json({error:'Component not found'});const result=computeRisk({temperatureC:56.4,vibrationRmsMmS:4.2},exampleThresholds);return res.json({...result,source:'SIMULATED DEMO',basis:'Example thresholds, not calibrated for physical machines'})}const db=database();if(!db)return unavailable(res);const row=await db.riskAssessment.findFirst({where:{componentId:req.params.id},orderBy:{assessedAt:'desc'}});return row?res.json(row):res.json({...computeRisk({},{}),source:'live'})}catch{res.status(500).json({error:'Could not calculate risk'})}})
app.get('/api/sensors',async(_req,res)=>{try{if(isDemo())return res.json(registeredSensors.map(s=>({...s,source:'SIMULATED REGISTRY'})));const db=database();if(!db)return unavailable(res);res.json(await db.sensor.findMany({orderBy:{id:'asc'}}))}catch{res.status(500).json({error:'Could not list sensors'})}})
app.get('/api/alerts',async(_req,res)=>{try{if(isDemo())return res.json(demoAlerts.map(a=>({...a,source:'SIMULATED DEMO'})));const db=database();if(!db)return unavailable(res);res.json(await db.alert.findMany({orderBy:{timestamp:'desc'},take:250}))}catch{res.status(500).json({error:'Could not load alerts'})}})
app.post('/api/alerts/:id/acknowledge',requireRole(['admin','technician']),async(req,res)=>{try{const parsed=postAck.safeParse(req.body);if(!parsed.success)return res.status(400).json({error:parsed.error.flatten()});if(!idSchema.safeParse(req.params.id).success)return res.status(400).json({error:'Invalid alert ID'});if(isDemo())return res.status(409).json({error:'Demo alerts can only be acknowledged in the demo UI'});const db=database();if(!db)return unavailable(res);const row=await db.alert.findUnique({where:{id:req.params.id}});if(!row)return res.status(404).json({error:'Alert not found'});res.json(await db.alert.update({where:{id:req.params.id},data:{acknowledged:true,assignee:parsed.data.assignee,notes:parsed.data.notes}}))}catch{res.status(500).json({error:'Could not acknowledge alert'})}})
app.get('/api/maintenance',async(_req,res)=>{try{if(isDemo())return res.json(demoMaintenance.map(m=>({...m,source:'SIMULATED DEMO'})));const db=database();if(!db)return unavailable(res);res.json(await db.maintenanceRecord.findMany({orderBy:{scheduledAt:'asc'}}))}catch{res.status(500).json({error:'Could not load maintenance'})}})
app.post('/api/maintenance',requireRole(['admin','technician']),async(req,res)=>{try{const parsed=postMaintenance.safeParse(req.body);if(!parsed.success)return res.status(400).json({error:parsed.error.flatten()});if(isDemo())return res.status(409).json({error:'Demo writes are disabled'});const db=database();if(!db)return unavailable(res);const target=await db.component.findUnique({where:{id:parsed.data.componentId}});if(!target||target.machineId!==parsed.data.machineId)return res.status(400).json({error:'Invalid machine/component mapping'});const record=await db.maintenanceRecord.create({data:{...parsed.data,scheduledAt:new Date(parsed.data.scheduledAt),status:'scheduled'}});res.status(201).json(record)}catch{res.status(500).json({error:'Could not create work order'})}})
// Serve the built Vite SPA from the same Render service as the API.
if (process.env.NODE_ENV === 'production') {
  const clientDist = fileURLToPath(new URL('../../client/dist/', import.meta.url))
  app.use(express.static(clientDist))
  app.get('*', (req, res) => {
    if (req.path === '/api' || req.path.startsWith('/api/')) {
      return res.status(404).json({ error: 'Route not found' })
    }
    return res.sendFile(path.join(clientDist, 'index.html'), (err) => {
      if (err && !res.headersSent) res.status(404).json({ error: 'Frontend build not found' })
    })
  })
} else {
  app.use((_req, res) => res.status(404).json({ error: 'Route not found' }))
}
