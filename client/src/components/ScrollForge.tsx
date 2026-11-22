import { useEffect, useRef, useState, Suspense, type CSSProperties } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Grid, PerspectiveCamera } from '@react-three/drei'
import { Activity, ArrowDown, Flame, Gauge, Wrench } from 'lucide-react'
import { CncModel } from './twin/CncModel'

function ForgeMachine({running,power}:{running:boolean;power:number}){
 return <>
  <PerspectiveCamera makeDefault position={[8.3,5.5,11.8]} fov={39} near={.1} far={80}/>
  <ambientLight intensity={.86}/>
  <hemisphereLight args={['#ffc78a','#281510',1.5]}/>
  <directionalLight position={[5,8,6]} intensity={2.4} color="#f6e2cd" castShadow shadow-mapSize={[1024,1024]}/>
  <pointLight position={[-4,3,1]} intensity={running?15:6} distance={11} color="#ff682d"/>
  <pointLight position={[2,2,6]} intensity={10} distance={11} color="#fcb772"/>
  <CncModel running={running} power={power}/>
  <Grid position={[0,-1.65,0]} infiniteGrid cellColor="#4a2c1d" sectionColor="#9b5933" sectionSize={3} fadeDistance={18}/>
  <ContactShadows position={[0,-1.62,0]} opacity={.5} scale={13} blur={2.7}/>
 </>
}

/** The machine is idle at page load; scrolling into the production bay winds it up. */
export function ScrollForge(){
 const ref=useRef<HTMLElement>(null)
 const [progress,setProgress]=useState(0)
 const [visible,setVisible]=useState(false)
 const [reduceMotion,setReduceMotion]=useState(false)
 useEffect(()=>{
  const media=window.matchMedia('(prefers-reduced-motion: reduce)')
  const updateMotion=()=>setReduceMotion(media.matches)
  updateMotion();media.addEventListener?.('change',updateMotion)
  const update=()=>{
   if(!ref.current)return
   const bounds=ref.current.getBoundingClientRect()
   const viewport=Math.max(window.innerHeight,1)
   setVisible(bounds.bottom>0 && bounds.top<viewport)
   const value=Math.max(0,Math.min(1,(viewport*.86-bounds.top)/(viewport*.95)))
   setProgress(v=>Math.abs(v-value)>.005?value:v)
  }
  update();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update)
  return()=>{window.removeEventListener('scroll',update);window.removeEventListener('resize',update);media.removeEventListener?.('change',updateMotion)}
 },[])
 const running=progress>.18&&visible&&!reduceMotion
 const power=reduceMotion?0:Math.max(0,Math.min(1,(progress-.18)/.55))
 return <section ref={ref} className="forge-scroll" aria-label="Scroll-activated CNC production demonstration">
  <div className="forge-stick">
   <div className="forge-stage-heading"><span className="eyebrow"><Flame size={15}/> THE PRODUCTION BAY / INTERACTIVE PREVIEW</span><h2>Built for the <span>factory floor.</span></h2><p>Scroll through this section to power up the CNC milling machine and watch the spindle and worktable move. Demonstration motion only.</p></div>
   <div className={`forge-stage ${running?'forge-stage-running':''}`}>
    <div className="forge-embers" aria-hidden="true">{Array.from({length:21},(_,i)=><i key={i} style={{'--ember-i':i,'--ember-delay':`${(i%7)*-.42}s`,'--ember-left':`${7+(i*41)%86}%`} as CSSProperties}/>)}</div>
    <div className="forge-stage-lines" aria-hidden="true"/>
    <div className="forge-canvas"><Canvas dpr={[1,1.5]} shadows gl={{alpha:true,antialias:true,powerPreference:'high-performance'}}><Suspense fallback={null}><ForgeMachine running={running} power={power}/></Suspense></Canvas></div>
    <div className="forge-machine-status"><span className={`forge-status-led ${running?'lit':''}`}/><div><small>MACHINE STATUS · DEMONSTRATION</small><strong>{reduceMotion?'MOTION REDUCED':running?'CNC MILL / CYCLING':'CNC MILL / STANDBY'}</strong></div></div>
    <div className="forge-sim-metrics"><span><Gauge size={14}/> SPINDLE DRIVE <strong>{running?'ANIMATED':'IDLE'}</strong></span><span><Activity size={14}/> AXIS MOTION <strong>{running?'ACTIVE':'PARKED'}</strong></span><span><Wrench size={14}/> CUTTING <strong>VISUAL DEMO</strong></span></div>
    <div className="forge-progress"><div style={{width:`${Math.round(progress*100)}%`}}/><span>{Math.round(progress*100)}% / SCROLL TO START</span></div>
   </div>
   <div className="forge-scroll-hint"><ArrowDown size={14}/> {running?'PRODUCTION PREVIEW ACTIVE':'SCROLL TO ACTIVATE THE MACHINE'}</div>
  </div>
 </section>
}
