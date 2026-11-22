import { machines,components,sensors,alerts,maintenance,sampleHistory } from '../data/demo'
import type { Mode } from '../types'
const API=import.meta.env.VITE_API_URL||'http://localhost:4000'
export async function getData<T>(endpoint:string, mode:Mode):Promise<T> {
 if(mode==='demo'){
  const path=endpoint.split('?')[0]
  const value=path==='/api/machines'?machines:path==='/api/sensors'?sensors:path==='/api/alerts'?alerts:path==='/api/maintenance'?maintenance:
   path.match(/^\/api\/machines\/[^/]+\/components$/)?components.filter(c=>c.machineId===path.split('/')[3]):
   path.match(/^\/api\/machines\/[^/]+$/)?machines.find(m=>m.id===path.split('/')[3]):
   path.match(/^\/api\/components\/[^/]+\/history$/)?sampleHistory(path.split('/')[3]):
   path.match(/^\/api\/components\/[^/]+\/risk$/)?components.find(c=>c.id===path.split('/')[3]):
   path.match(/^\/api\/components\/[^/]+$/)?components.find(c=>c.id===path.split('/')[3]):null
  return value as T
 }
 const controller=new AbortController(); const timeout=setTimeout(()=>controller.abort(),6500)
 try { const response=await fetch(`${API}${endpoint}`,{signal:controller.signal});if(!response.ok)throw new Error(`API returned ${response.status}`);return await response.json() as T }
 finally{clearTimeout(timeout)}
}
export const SOCKET_URL=import.meta.env.VITE_SOCKET_URL||API
