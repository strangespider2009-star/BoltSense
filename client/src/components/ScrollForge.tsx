
import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Grid, PerspectiveCamera } from '@react-three/drei'
import { Flame, ArrowDown, Activity, Gauge } from 'lucide-react'
import { CncModel } from './twin/CncModel'

function FactoryScene({running,power}:{running:boolean;power:number}) {
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

/** Illustrative motion only; respects the operating system's reduced-motion preference. */
export function ScrollForge(){
 const section=useRef<HTMLElement>(null)
 const [progress,setProgress]=useState(0)
 const [visible,setVisible]=useState(false)
 const [reduceMotion,setReduceMotion]=useState(false)
 useEffect(()=>{
  const media=window.matchMedia('(prefers-reduced-motion: reduce)')
  const onMotion=()=>setReduceMotion(media.matches)
  onMotion();media.addEventListener?.('change',onMotion)
  const onScroll=()=>{
   if(!section.current)return
   const bounds=section.current.getBoundingClientRect()
   const vh=Math.max(1,window.innerHeight)
   setVisible(bounds.bottom>0 && bounds.top<vh)
   const value=Math.min(1,Math.max(0,(vh*.86-bounds.top)/(vh*.95)))
   setProgress(old=>Math.abs(old-value)>.005?value:old)
  }
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll)
  return ()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);media.removeEventListener?.('change',onMotion)}
 },[])
 const running=progress>.18 && visible && !reduceMotion
 const power=reduceMotion?0:Math.min(1,Math.max(0,(progress-.18)/.55))
 return <section className="forge-scroll" ref={section} aria-label="Scroll-activated CNC machine production preview">
  <div className="forge-stick">
   <div className="forge-stage-heading"><span className="eyebrow"><Flame size={15}/> PRODUCTION BAY · INTERACTIVE MACHINE</span><h2>Built for the <span>factory floor.</span></h2><p>Scroll to power up the CNC milling machine. The spindle and table move as an illustrative 3D demonstration.</p></div>
   <div className={'forge-stage '+(running?'forge-stage-running':'')}>
    <div className="forge-embers" aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i} style={{left:(8+(i*37)%84)+'%',animationDelay:(i%7)*-.4+'s'}}/>)}</div>
    <div className="forge-canvas"><Canvas dpr={[1,1.5]} shadows gl={{alpha:true,antialias:true,powerPreference:'high-performance'}}><Suspense fallback={null}><FactoryScene running={running} power={power}/></Suspense></Canvas></div>
    <div className="forge-machine-status"><span className={'forge-status-led '+(running?'lit':'')}/><div><small>STATUS · VISUAL DEMONSTRATION</small><strong>{reduceMotion?'MOTION REDUCED':running?'CNC MILL / RUNNING':'CNC MILL / STANDBY'}</strong></div></div>
    <div className="forge-sim-metrics"><span><Gauge size={14}/> SPINDLE <strong>{running?'ROTATING':'IDLE'}</strong></span><span><Activity size={14}/> AXES <strong>{running?'MOVING':'STANDBY'}</strong></span></div>
    <div className="forge-progress"><div style={{width:Math.round(progress*100)+'%'}}/><span>{Math.round(progress*100)}% · SCROLL TO START</span></div>
   </div>
   <div className="forge-scroll-hint"><ArrowDown size={14}/> {running?'FACTORY PRODUCTION PREVIEW ACTIVE':'SCROLL TO ACTIVATE THE MACHINE'}</div>
  </div>
 </section>
}
