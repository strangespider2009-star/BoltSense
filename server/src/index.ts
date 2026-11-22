import 'dotenv/config'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { app } from './app.js'
import { database } from './lib/db.js'
import { connectMqtt } from './lib/mqtt.js'
const port=Number(process.env.PORT)||4000
const server=createServer(app)
const io=new Server(server,{cors:{origin:(process.env.CORS_ORIGIN||'http://localhost:5173').split(',')}})
io.on('connection',socket=>{socket.emit('mode',{source:process.env.DATA_MODE==='live'?'live':'demo'})})
const db=database()
if(db){connectMqtt(io,db)}else{console.info('BoltSense API in demo mode; MQTT ingestion and persistent database disabled')}
server.listen(port,()=>console.info(`BoltSense API available at http://localhost:${port}`))
