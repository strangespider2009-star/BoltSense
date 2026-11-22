import { Canvas, ThreeEvent, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Grid, Html, ContactShadows, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import type { Component, Health } from '../types'
import { useBoltStore } from '../store/useBoltStore'
const COLOR:Record<Health,string>={healthy:'#32dec2',warning:'#f3b65f',critical:'#f66f73',unknown:'#8095a5'}
function Part({id,position,scale,color='#657b90',kind='box',name,componentMap}:{id?:string,position:[number,number,number],scale:[number,number,number],color?:string,kind?:'box'|'cylinder'|'sphere',name?:string,componentMap:Map<string,Component>}){
 const [hover,setHover]=useState(false);const selected=useBoltStore(s=>s.selectedComponentId);const select=useBoltStore(s=>s.selectComponent)
 const thermal=useBoltStore(s=>s.thermal),risk=useBoltStore(s=>s.risk),labels=useBoltStore(s=>s.labels),mode=useBoltStore(s=>s.mode),liveReadings=useBoltStore(s=>s.readings)
 const component=id?componentMap.get(id):undefined;const selectedHere=selected===id&&!!id
 const temp=mode==='demo'?component?.readings.temperatureC:id?liveReadings[id]?.metrics.temperatureC:undefined
 const materialColor=component&&risk?(mode==='demo'?COLOR[component.status]:COLOR.unknown):component&&thermal?temp===undefined?'#70889b':temp>65?'#fa765c':temp>50?'#e9a54f':'#35c0ba':color
 const meshRef=useRef<THREE.Mesh>(null)
 useFrame(({clock})=>{if(meshRef.current&&selectedHere)meshRef.current.material instanceof THREE.MeshStandardMaterial&&(meshRef.current.material.emissiveIntensity=.35+Math.sin(clock.elapsedTime*3)*.1)})
 function onClick(e:ThreeEvent<MouseEvent>){if(!id)return;e.stopPropagation();select(id)}
 return <group position={position}><mesh ref={meshRef} castShadow receiveShadow onPointerOver={e=>{if(id){e.stopPropagation();setHover(true);document.body.style.cursor='pointer'}}} onPointerOut={()=>{setHover(false);document.body.style.cursor=''}} onClick={onClick} scale={scale}>
 {kind==='cylinder'?<cylinderGeometry args={[.5,.5,1,24]}/>:kind==='sphere'?<sphereGeometry args={[.5,24,16]}/>:<boxGeometry/>}
 <meshStandardMaterial color={materialColor} metalness={.72} roughness={.32} emissive={selectedHere?'#1c8585':hover?'#14767b':'#000000'} emissiveIntensity={selectedHere ? 0.55 : hover ? 0.22 : 0}/>
 </mesh>{id&&hover&&<Html center distanceFactor={9} position={[0,scale[1]/2+.38,0]}><div className="twin-tooltip">{name||component?.name||id}<small>Click to inspect</small></div></Html>}
 {id&&labels&&component&&<Html center distanceFactor={11} position={[0,scale[1]/2+.22,0]}><div className={`twin-label ${selectedHere?'selected':''}`} onClick={()=>select(id)}>{component.name}</div></Html>}</group>
}
function CNC({componentMap}:{componentMap:Map<string,Component>}){
 return <group position={[0,-.7,0]}>
  <Part componentMap={componentMap} position={[0,.2,0]} scale={[5.8,.6,3.4]} color="#25394d"/>
  <Part componentMap={componentMap} position={[-2.5,2.05,-.8]} scale={[.65,3.4,1.8]} color="#526579"/>
  <Part componentMap={componentMap} position={[0,3.5,-1.4]} scale={[5.7,.6,1.1]} color="#3b5264"/>
  <Part componentMap={componentMap} position={[2.5,2.05,-.8]} scale={[.65,3.4,1.8]} color="#526579"/>
  <Part componentMap={componentMap} position={[0,1.02,-.65]} scale={[4.6,.20,2.15]} color="#203f51"/>
  <Part componentMap={componentMap} position={[0,1.13,-.5]} scale={[2.3,.24,1.9]} color="#9cabaf" id="x-axis-guide-01" name="X-Axis Linear Guide"/>
  {[-.78,-.4,0,.4,.78].map(x=><Part key={x} componentMap={componentMap} position={[x,1.27,-.5]} scale={[.09,.08,1.8]} color="#536f77"/>)}
  <Part componentMap={componentMap} position={[0,2.6,-.95]} scale={[1.2,1.4,1.25]} color="#708a98" id="spindle-motor-01"/>
  <Part componentMap={componentMap} position={[0,1.75,-.95]} scale={[.78,.55,.78]} kind="cylinder" color="#4c9fa8" id="spindle-bearing-01"/>
  <Part componentMap={componentMap} position={[0,1.3,-.95]} scale={[.28,.5,.28]} kind="cylinder" color="#cad3d4" id="tool-holder-01"/>
  <Part componentMap={componentMap} position={[-2.05,2.4,-.5]} scale={[.34,2.3,.45]} color="#a4bdc9" id="z-axis-screw-01"/>
  <Part componentMap={componentMap} position={[1.15,2.55,-1.42]} scale={[.6,.65,.6]} kind="cylinder" color="#768995" id="power-coupling-01"/>
  <Part componentMap={componentMap} position={[1.65,.7,1.15]} scale={[.95,.65,.8]} color="#398fa1" id="coolant-pump-01"/>
  <Part componentMap={componentMap} position={[2.1,2.45,.2]} scale={[.1,1.3,.85]} color="#2a4254"/>
  <Part componentMap={componentMap} position={[2.18,2.7,.24]} scale={[.13,.55,.6]} color="#a4d9d6"/>
  {[[-2.25,.55,1.3],[2.25,.55,1.3]].map(([x,y,z],i)=><Part key={i} componentMap={componentMap} position={[x,y,z]} scale={[.62,.5,.65]} color="#273344"/>)}
 </group>
}
function GenericMachine({componentMap}:{componentMap:Map<string,Component>}){
 const first=[...componentMap.keys()][0]
 return <group position={[0,-.3,0]}><Part componentMap={componentMap} scale={[4,.65,2.7]} position={[0,0,0]} color="#31495b"/><Part componentMap={componentMap} scale={[2.5,1.8,1.75]} position={[0,1.25,-.2]} color="#556d80" id={first}/><Part componentMap={componentMap} scale={[.8,.8,1.2]} kind="cylinder" position={[1.4,1.15,.7]} color="#1baaba"/><Part componentMap={componentMap} scale={[.8,.8,1.2]} kind="cylinder" position={[-1.4,1.15,.7]} color="#849aa8"/></group>
}
function Controls({resetSignal}:{resetSignal:number}){
 const controls=useRef<any>(null)
 useEffect(()=>{controls.current?.reset()},[resetSignal])
 return <OrbitControls ref={controls} makeDefault enableDamping dampingFactor={.07} minDistance={4.5} maxDistance={17} maxPolarAngle={Math.PI/2.08} />
}
function Scene({isCnc,componentMap,resetSignal}:{isCnc:boolean,componentMap:Map<string,Component>,resetSignal:number}){
 const gl=useThree(s=>s.gl);useEffect(()=>{gl.setClearColor('#0b1520',1)},[gl])
 return <><PerspectiveCamera makeDefault position={[7,5.6,8.5]} fov={43}/><ambientLight intensity={1.2}/><directionalLight position={[3,9,6]} intensity={2.4} castShadow shadow-mapSize={[1024,1024]}/><pointLight position={[-6,5,-3]} intensity={75} color="#45d0d9"/><pointLight position={[5,3,5]} intensity={30} color="#4c6ca1"/>
 <group position={[0,-.02,0]}>{isCnc?<CNC componentMap={componentMap}/>:<GenericMachine componentMap={componentMap}/>}</group><Grid position={[0,-1.55,0]} infiniteGrid cellSize={.6} sectionSize={3} sectionColor="#315765" cellColor="#1c3545" fadeDistance={17} fadeStrength={1.5}/><ContactShadows position={[0,-1.52,0]} opacity={.5} scale={13} blur={2.5} far={3}/><Controls resetSignal={resetSignal}/></>
}
export function DigitalTwin({machineId,components,resetSignal}:{machineId:string,components:Component[],resetSignal:number}){
 const componentMap=useMemo(()=>new Map(components.map(c=>[c.id,c])),[components])
 return <div className="twin-viewport"><Canvas shadows dpr={[1,1.8]} gl={{antialias:true,powerPreference:'high-performance'}}><Suspense fallback={null}><Scene isCnc={machineId==='cnc-001'} componentMap={componentMap} resetSignal={resetSignal}/></Suspense></Canvas><div className="twin-watermark">PROCEDURAL DEMONSTRATION MODEL <span>· NOT ENGINEERING CAD</span></div><div className="twin-orientation">DRAG TO ORBIT · SCROLL TO ZOOM</div></div>
}
