import { Link } from 'react-router-dom'
import { ArrowUpRight, Cpu, Radar } from 'lucide-react'
import type { Machine } from '../types'
import { industrialMedia } from '../data/industrialMedia'
import { Status } from './Status'
export function MachineCard({machine,index=0}:{machine:Machine,index?:number}){return <Link to={`/machines/${machine.id}`} className="machine-card" style={{animationDelay:`${index*55}ms`}}><div className="machine-card-visual"><img className="machine-photo" src={industrialMedia[machine.image as keyof typeof industrialMedia] || industrialMedia.cnc} loading="lazy" alt={`Real-world reference photograph for ${machine.name}`} />
  <div className="machine-photo-shade"/><span className="machine-photo-tag">PHYSICAL EQUIPMENT / REFERENCE PHOTO</span><span className="machine-card-arrow"><ArrowUpRight size={20}/></span></div><div className="machine-card-body"><div className="machine-card-meta"><span className="eyebrow">{machine.id.toUpperCase()}</span><Status value={machine.status}/></div><h3>{machine.name}</h3><p>{machine.description}</p><div className="machine-card-foot"><span><Cpu size={14}/> {machine.connected}/{machine.total} sensors</span><span><Radar size={14}/> {machine.healthScore}% health</span></div></div></Link>}
