import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Cpu, Radar, Play } from 'lucide-react'
import type { Machine } from '../types'
import { industrialMedia, machineFootage } from '../data/industrialMedia'
import { Status } from './Status'

/** Real stock-film previews on intent, not computer-generated motion or telemetry. */
export function MachineCard({ machine, index = 0 }: { machine: Machine; index?: number }) {
 const preview = machineFootage[machine.image as keyof typeof machineFootage]
 const video = useRef<HTMLVideoElement>(null)
 const [engaged, setEngaged] = useState(false)
 const [requested, setRequested] = useState(false)
 const [playing, setPlaying] = useState(false)
 const [failed, setFailed] = useState(false)
 const [reduceMotion, setReduceMotion] = useState(false)

 useEffect(() => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  const sync = () => setReduceMotion(media.matches)
  sync()
  media.addEventListener('change', sync)
  return () => media.removeEventListener('change', sync)
 }, [])

 useEffect(() => {
  const el = video.current
  if (!el) return
  if (!engaged || reduceMotion || failed || !preview) {
   el.pause()
   setPlaying(false)
   return
  }
  const attempt = el.play()
  if (attempt) void attempt.then(() => setPlaying(true)).catch(() => setPlaying(false))
 }, [engaged, reduceMotion, failed, preview, requested])

 const activate = () => {
  if (!preview || reduceMotion) return
  setRequested(true)
  setEngaged(true)
 }
 const deactivate = () => setEngaged(false)
 const photo = industrialMedia[machine.image as keyof typeof industrialMedia] || industrialMedia.cnc
 return <Link
  to={`/machines/${machine.id}`}
  className={`machine-card machine-card-film ${playing ? 'machine-card-playing' : ''}`}
  style={{ animationDelay: `${index * 55}ms` }}
  onPointerEnter={event => { if (event.pointerType === 'mouse' || event.pointerType === 'pen') activate() }}
  onPointerLeave={deactivate}
  onFocus={activate}
  onBlur={deactivate}
 >
  <div className="machine-card-visual">
   <img className="machine-photo" src={photo} loading="lazy" alt={`Real-world reference photograph of ${machine.name}`}/>
   {preview && !failed && !reduceMotion && <video
    ref={video}
    className="machine-card-motion"
    src={requested ? preview.src : undefined}
    muted playsInline loop preload="none"
    aria-hidden="true" tabIndex={-1}
    onPlay={() => setPlaying(true)}
    onPause={() => setPlaying(false)}
    onError={() => { setFailed(true); setPlaying(false) }}
   />}
   <div className="machine-photo-shade"/>
   <span className="machine-photo-tag">{playing ? 'REAL FACTORY FOOTAGE · NOT LIVE' : preview && !failed ? 'HOVER TO WATCH ACTUAL MACHINERY' : 'PHYSICAL EQUIPMENT · REFERENCE PHOTO'}</span>
   <span className="machine-card-arrow"><ArrowUpRight size={20}/></span>
   {preview && !failed && !reduceMotion && <span className="machine-film-indicator"><Play size={12} fill="currentColor"/> {playing ? 'PLAYING' : 'WATCH PROCESS'}</span>}
  </div>
  <div className="machine-card-body">
   <div className="machine-card-meta"><span className="eyebrow">{machine.id.toUpperCase()}</span><Status value={machine.status}/></div>
   <h3>{machine.name}</h3>
   <p>{machine.description}</p>
   <div className="machine-card-foot"><span><Cpu size={14}/> {machine.connected}/{machine.total} sensors</span><span><Radar size={14}/> {machine.healthScore}% health</span></div>
  </div>
 </Link>
}
