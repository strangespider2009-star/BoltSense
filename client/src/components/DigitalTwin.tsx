import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Grid, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { CncModel } from './twin/CncModel'
import { machineGeometry } from './twin/OtherModels'
import { twinContext } from './twin/TwinParts'
import type { Component } from '../types'

type Vector3 = [number,number,number]
function CameraControls({resetSignal,focusTarget}:{resetSignal:number,focusTarget:Vector3}){
 const orbit=useRef<any>(null)
 const camera=useThree(s=>s.camera)
 const focus=useMemo(()=>new THREE.Vector3(...focusTarget),[focusTarget])
 useFrame(()=>{if(orbit.current){orbit.current.target.lerp(focus,.085);orbit.current.update()}})
 useEffect(()=>{if(orbit.current){camera.position.set(8.8,6.1,10.4);orbit.current.target.set(0,.65,0);orbit.current.update()}},[resetSignal,camera])
 return <OrbitControls ref={orbit} makeDefault enableDamping dampingFactor={.075} minDistance={3.25} maxDistance={19} minPolarAngle={.18} maxPolarAngle={Math.PI/2.03} enablePan/>
}
function Scene({machineId,components,resetSignal}:{machineId:string,components:Map<string,Component>,resetSignal:number}){
 const gl=useThree(s=>s.gl)
 const [focusTarget,setFocusTarget]=useState<Vector3>([0,.65,0])
 const focus=useCallback((target:Vector3)=>setFocusTarget(target),[])
 useEffect(()=>{gl.setClearColor('#0b1520',1)},[gl])
 useEffect(()=>setFocusTarget([0,.65,0]),[resetSignal,machineId])
 const Model=machineGeometry[machineId as keyof typeof machineGeometry]
 return <>
  <PerspectiveCamera makeDefault position={[8.8,6.1,10.4]} fov={42} near={.05} far={120}/>
  <ambientLight intensity={1.35}/>
  <hemisphereLight args={['#c9f3ff','#243449',1.4]}/>
  <directionalLight position={[6,10,7]} intensity={2.6} castShadow shadow-mapSize={[1024,1024]} shadow-bias={-.0002}/>
  <directionalLight position={[-5,4,-5]} color="#5b9cb8" intensity={1.7}/>
  <pointLight position={[2,4,5]} intensity={21} distance={13} color="#45d1dc"/>
  <twinContext.Provider value={{components,focus}}>
    {machineId==='cnc-001'?<CncModel/>:Model?<Model/>:null}
  </twinContext.Provider>
  <Grid position={[0,-1.72,0]} infiniteGrid cellSize={.58} sectionSize={2.9} cellColor="#294657" sectionColor="#457e8a" fadeDistance={24} fadeStrength={2.2}/>
  <ContactShadows position={[0,-1.7,0]} opacity={.55} scale={13} blur={2.9} far={4}/>
  <CameraControls resetSignal={resetSignal} focusTarget={focusTarget}/>
 </>
}
export function DigitalTwin({machineId,components,resetSignal}:{machineId:string,components:Component[],resetSignal:number}){
 const componentMap=useMemo(()=>new Map(components.map(c=>[c.id,c])),[components])
 return <div className="twin-viewport" role="region" aria-label="Interactive 3D machine visualization">
  <Canvas shadows dpr={[1,1.6]} gl={{antialias:true,alpha:false,powerPreference:'high-performance'}}>
   <Suspense fallback={null}><Scene machineId={machineId} components={componentMap} resetSignal={resetSignal}/></Suspense>
  </Canvas>
  <div className="twin-watermark">DETAILED INDUSTRIAL REFERENCE MODEL <span>· PROCEDURAL / NOT ENGINEERING CAD</span></div>
  <div className="twin-orientation">DRAG TO ORBIT · SCROLL TO ZOOM · SELECT ASSEMBLIES</div>
 </div>
}
