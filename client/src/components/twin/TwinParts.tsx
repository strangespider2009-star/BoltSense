import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { Html } from '@react-three/drei'
import type { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { useBoltStore } from '../../store/useBoltStore'
import type { Component, Health } from '../../types'

type V3 = [number, number, number]
export type ModelPartProps = { id?: string; position?: V3; rotation?: V3; children: ReactNode; labelOffset?: number }
export const twinContext = createContext<{ components: Map<string, Component>; focus: (point: V3) => void }>({components: new Map(), focus: () => undefined})
const healthColor: Record<Health,string> = { healthy: '#2be1c6', warning: '#ffb54c', critical: '#ff6676', unknown: '#889bac' }
const materialBaseColors = new WeakMap<THREE.MeshStandardMaterial, THREE.Color>()

/** Groups preserve independent, stable component IDs even if the assembly has many individual meshes. */
export function Part({id, position=[0,0,0],rotation,children,labelOffset=.65}:ModelPartProps){
 const {components,focus}=useContext(twinContext)
 const component=id?components.get(id):undefined
 const selected=useBoltStore(s=>s.selectedComponentId===id && !!id)
 const selectedId=useBoltStore(s=>s.selectedComponentId)
 const select=useBoltStore(s=>s.selectComponent)
 const labels=useBoltStore(s=>s.labels)
 const showSensors=useBoltStore(s=>s.sensorMarkers)
 const thermal=useBoltStore(s=>s.thermal)
 const risk=useBoltStore(s=>s.risk)
 const mode=useBoltStore(s=>s.mode)
 const readings=useBoltStore(s=>s.readings)
 const [hover,setHover]=useState(false)
 const group=useRef<THREE.Group>(null)
 useEffect(()=>{
  if(selected && group.current){const p=group.current.getWorldPosition(new THREE.Vector3());focus([p.x,p.y,p.z])}
 },[selected,selectedId,focus])
 const instrumented=!!component?.sensorIds.length
 const temp=mode==='demo'?component?.readings.temperatureC:(id?readings[id]?.metrics.temperatureC:undefined)
 const overlayColor = !instrumented ? healthColor.unknown : risk ? mode==='demo'?healthColor[component?.status||'unknown']:healthColor.unknown : thermal ? temp===undefined?healthColor.unknown:temp>65?'#fc7657':temp>50?'#fac05b':'#3ce4cd' : '#59f1e6'
 // Only color surfaces when a visualization overlay is enabled; preserve original PBR materials otherwise.
 useEffect(()=>{
  if (!group.current) return
  const overlay = new THREE.Color(overlayColor)
  group.current.traverse(child=>{
   if (!(child instanceof THREE.Mesh)) return
   const mat=child.material
   if (!(mat instanceof THREE.MeshStandardMaterial)) return
   let base=materialBaseColors.get(mat)
   if (!base){base=mat.color.clone();materialBaseColors.set(mat,base)}
   mat.color.copy(base).lerp(overlay,(risk||thermal)? .48 : (selected||hover)? .14 : 0)
   mat.emissive.set((selected||hover)?overlay:'#000000')
   mat.emissiveIntensity=selected?.21:hover?.11:0
  })
 },[risk,thermal,overlayColor,selected,hover])
 function click(e:ThreeEvent<MouseEvent>){if(!component)return;e.stopPropagation();select(component.id)}
 return <group ref={group} position={position} rotation={rotation} onPointerOver={e=>{if(!component)return;e.stopPropagation();setHover(true);document.body.style.cursor='pointer'}} onPointerOut={e=>{if(!component)return;e.stopPropagation();setHover(false);document.body.style.cursor=''}} onClick={click}>
  {children}
  {component&&showSensors&&instrumented&&<mesh position={[0,labelOffset*.45,.2]}><sphereGeometry args={[.09,12,8]}/><meshBasicMaterial color="#2be1d1"/></mesh>}
  {component&&(selected||hover)&&<pointLight position={[0,.22,0]} color={overlayColor} intensity={selected?4:1.6} distance={2.3} decay={2}/>}
  {component&&(selected||hover)&&<mesh rotation={[-Math.PI/2,0,0]} position={[0,-.1,0]}><ringGeometry args={[.48,.51,48]}/><meshBasicMaterial color={overlayColor} transparent opacity={selected?.9:.65} depthWrite={false} side={THREE.DoubleSide}/></mesh>}
  {component && ((labels && !component.isCatalogOnly)||selected||hover) && <Html center position={[0,labelOffset,0]} distanceFactor={10} zIndexRange={[60,0]}><button type="button" className={`twin-label ${selected?'selected':''}`} onClick={e=>{e.stopPropagation();select(component.id)}}><span className="twin-label-dot" style={{background:overlayColor}}/>{component.name}{component.isCatalogOnly&&<small>PLANNED</small>}</button></Html>}
 </group>
}

type Solid = {position?:V3; rotation?:V3; color?:string; metalness?:number; roughness?:number; opacity?:number; emissive?:string; castShadow?:boolean}
export function Box({size,position,rotation,color='#748b9d',metalness=.68,roughness=.42,opacity=1,emissive,castShadow=true}:Solid&{size:V3}){
 return <mesh position={position} rotation={rotation} castShadow={castShadow} receiveShadow><boxGeometry args={size}/><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} transparent={opacity<1} opacity={opacity} emissive={emissive||'#000'} side={opacity<1?THREE.DoubleSide:THREE.FrontSide} depthWrite={opacity>=1}/></mesh>
}
export function Cylinder({radius=.5,radiusTop, radiusBottom,height=1,segments=32,position,rotation,color='#748b9d',metalness=.7,roughness=.39,opacity=1}:Solid&{radius?:number;radiusTop?:number;radiusBottom?:number;height?:number;segments?:number}){
 return <mesh position={position} rotation={rotation} castShadow receiveShadow><cylinderGeometry args={[radiusTop??radius,radiusBottom??radius,height,segments]}/><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} transparent={opacity<1} opacity={opacity}/></mesh>
}
export function Torus({major=.5,tube=.1,position,rotation,color='#748b9d',metalness=.8,roughness=.29}:Solid&{major?:number;tube?:number}){
 return <mesh position={position} rotation={rotation} castShadow><torusGeometry args={[major,tube,10,40]}/><meshStandardMaterial color={color} metalness={metalness} roughness={roughness}/></mesh>
}
export function Sphere({radius=.5,position,color='#748b9d',metalness=.7,roughness=.35}:Solid&{radius?:number}){
 return <mesh position={position} castShadow><sphereGeometry args={[radius,24,16]}/><meshStandardMaterial color={color} metalness={metalness} roughness={roughness}/></mesh>
}
export function Bolt({position=[0,0,0],rotation}: {position?:V3;rotation?:V3}) {
 return <group position={position} rotation={rotation}><Cylinder radius={.068} height={.04} segments={6} color="#aab9bc"/><Box size={[.065,.044,.016]} position={[0,.025,0]} color="#3b5360"/></group>
}
export function Pipe({from,to,radius=.038,color='#667d8b'}:{from:V3;to:V3;radius?:number;color?:string}){
 const a=new THREE.Vector3(...from),b=new THREE.Vector3(...to);const center=a.clone().add(b).multiplyScalar(.5);const q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),b.clone().sub(a).normalize())
 return <mesh position={center} quaternion={q} castShadow><cylinderGeometry args={[radius,radius,a.distanceTo(b),10]}/><meshStandardMaterial color={color} metalness={.82} roughness={.3}/></mesh>
}
export function CoolingFins({axis='x',length=1,count=10,radius=.47,color='#526978'}:{axis?:'x'|'z';length?:number;count?:number;radius?:number;color?:string}){
 return <group>{Array.from({length:count},(_,i)=>{const p=(i/(count-1)-.5)*length;return <Cylinder key={i} radius={radius} height={.024} position={axis==='x'?[p,0,0]:[0,0,p]} rotation={axis==='x'?[0,0,Math.PI/2]:[Math.PI/2,0,0]} color={color}/>})}</group>
}
export function LightStack({position=[0,0,0]}:{position?:V3}){
 return <group position={position}><Cylinder radius={.045} height={.5} color="#a4b5b8" position={[0,.27,0]}/><Cylinder radius={.13} height={.15} color="#ec676b" position={[0,.58,0]}/><Cylinder radius={.13} height={.15} color="#f5c65d" position={[0,.75,0]}/><Cylinder radius={.13} height={.15} color="#45c4aa" position={[0,.92,0]}/></group>
}
export type MachineGeometryProps = {machineId:string}
