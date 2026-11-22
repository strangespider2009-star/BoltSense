import type { Request,Response,NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
const payloadSchema=z.object({email:z.string().email(),password:z.string().min(1)})
export function login(req:Request,res:Response){
 const parsed=payloadSchema.safeParse(req.body);if(!parsed.success)return res.status(400).json({error:'Invalid credentials format'})
 const {ADMIN_EMAIL,ADMIN_PASSWORD_HASH,JWT_SECRET}=process.env
 if(!ADMIN_EMAIL||!ADMIN_PASSWORD_HASH||!JWT_SECRET||JWT_SECRET.length<32)return res.status(503).json({error:'Authentication not configured'})
 if(parsed.data.email!==ADMIN_EMAIL||!bcrypt.compareSync(parsed.data.password,ADMIN_PASSWORD_HASH))return res.status(401).json({error:'Invalid credentials'})
 return res.json({token:jwt.sign({sub:ADMIN_EMAIL,role:'admin'},JWT_SECRET,{expiresIn:'4h'}),expiresIn:14400})
}
export function requireRole(roles:string[]){return (req:Request,res:Response,next:NextFunction)=>{
 const secret=process.env.JWT_SECRET
 const token=req.headers.authorization?.replace(/^Bearer /i,'')
 if(!secret||!token)return res.status(401).json({error:'Authentication required'})
 try {const decoded=jwt.verify(token,secret);if(typeof decoded==='string'||!roles.includes(String(decoded.role)))return res.status(403).json({error:'Insufficient permissions'});return next()}
 catch{return res.status(401).json({error:'Invalid or expired token'})}
 }}
