import { create } from 'zustand'
import type { Alert, Mode, TelemetryEvent } from '../types'
interface BoltStore {
 mode:Mode; setMode:(mode:Mode)=>void
 selectedComponentId:string|null; selectComponent:(id:string|null)=>void
 thermal:boolean; risk:boolean; labels:boolean; sensorMarkers:boolean
 toggle:(key:'thermal'|'risk'|'labels'|'sensorMarkers')=>void
 readings:Record<string,TelemetryEvent>; ingest:(data:TelemetryEvent)=>void
 alertOverrides:Record<string,Partial<Alert>>; acknowledge:(id:string)=>void; resolve:(id:string)=>void
 connected:boolean; setConnected:(connected:boolean)=>void
}
export const useBoltStore=create<BoltStore>((set)=>({
 mode:'demo',setMode:mode=>set({mode,readings:{},connected:false}),selectedComponentId:'spindle-bearing-01',selectComponent:id=>set({selectedComponentId:id}),
 thermal:false,risk:false,labels:true,sensorMarkers:true,
 toggle:key=>set(s=>({[key]:!s[key]})), readings:{},ingest:data=>set(s=>({readings:{...s.readings,[data.componentId]:data}})),
 alertOverrides:{},acknowledge:id=>set(s=>({alertOverrides:{...s.alertOverrides,[id]:{...s.alertOverrides[id],acknowledged:true}}})),
 resolve:id=>set(s=>({alertOverrides:{...s.alertOverrides,[id]:{...s.alertOverrides[id],resolved:true}}})), connected:false,setConnected:connected=>set({connected})
}))
