import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { SOCKET_URL } from '../lib/api'
import { useBoltStore } from '../store/useBoltStore'
import type { TelemetryEvent } from '../types'
export function useTelemetry(){
 const mode=useBoltStore(s=>s.mode)
 const ingest=useBoltStore(s=>s.ingest)
 const setConnected=useBoltStore(s=>s.setConnected)
 useEffect(()=>{
  if(mode!=='live')return
  const socket=io(SOCKET_URL,{transports:['websocket'],reconnectionAttempts:5,timeout:5000})
  socket.on('connect',()=>setConnected(true));socket.on('disconnect',()=>setConnected(false))
  socket.on('telemetry',(reading:TelemetryEvent)=>{if(!reading.simulated)ingest(reading)})
  return ()=>{socket.disconnect();setConnected(false)}
 },[mode,ingest,setConnected])
}
