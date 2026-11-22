import { Part, Box, Cylinder, Torus, Sphere, Pipe, CoolingFins, Bolt } from './TwinParts'
const white='#c6d6dc', blue='#277c96', steel='#8ca4ad', midnight='#243a4b', dark='#172d3c', orange='#d6a34b', alloy='#b0bfc4'

export function LatheModel(){
 return <group position={[0,-.65,0]}>
  <Part id="lathe-bed-01" labelOffset={.5}>
   <Box size={[5.85,.55,2.35]} color={midnight} position={[0,-.64,0]}/>
   <Box size={[5.8,.23,2.4]} color="#647c89" position={[0,-.21,0]}/>
   {[-.75,.75].map(z=><Box key={z} size={[5.3,.15,.23]} position={[0,-.01,z]} color={alloy}/>)}
   {[-2.2,2.2].map(x=><Box key={x} size={[.65,.7,2]} position={[x,-1.1,0]} color="#334a59"/>)}
  </Part>
  <Part id="lathe-headstock-01" position={[-1.86,.75,0]} labelOffset={1.1}>
   <Box size={[1.35,1.7,1.8]} color={blue}/><Box size={[1.4,.19,1.83]} position={[0,.88,0]} color={white}/>
   <Box size={[.15,1.6,1.5]} position={[-.68,0,0]} color="#195570"/>
  </Part>
  <Part id="lathe-chuck-01" position={[-1.01,.77,0]} labelOffset={.85}>
   <Cylinder radius={.65} height={.35} rotation={[0,0,Math.PI/2]} color={steel}/>
   <Cylinder radius={.48} height={.12} rotation={[0,0,Math.PI/2]} position={[.22,0,0]} color="#354d5e"/>
   {Array.from({length:3},(_,i)=>{const a=i*Math.PI*2/3;return <Box key={i} size={[.15,.2,.22]} position={[.3,Math.sin(a)*.35,Math.cos(a)*.35]} rotation={[a,0,0]} color={alloy}/>})}
   <Cylinder radius={.17} height={1.4} rotation={[0,0,Math.PI/2]} position={[.91,0,0]} color="#cbd8dc"/>
  </Part>
  <Part id="lathe-spindle-bearing-01" position={[-2.16,.74,0]} labelOffset={.8}>
   <Cylinder radius={.51} height={.31} rotation={[0,0,Math.PI/2]} color="#718f9d"/>
   <Torus major={.42} tube={.09} rotation={[0,Math.PI/2,0]} position={[.2,0,0]} color={white}/>
  </Part>
  <Part id="lathe-turret-01" position={[.55,.36,-.38]} labelOffset={1.0}>
   <Box size={[1.04,.46,1]} color="#4c7281"/>
   <Cylinder radius={.55} height={.28} position={[0,.34,0]} color={alloy}/>
   {Array.from({length:8},(_,i)=>{const a=i*Math.PI/4;return <group key={i} position={[Math.cos(a)*.39,.52,Math.sin(a)*.39]} rotation={[0,-a,0]}><Box size={[.19,.12,.45]} color="#b5c5ca" position={[0,0,.16]}/></group>})}
  </Part>
  <Part id="lathe-cross-slide-01" position={[.58,-.04,-.35]} labelOffset={.55}>
   <Box size={[1.7,.2,1.15]} color="#678391"/>{[-.3,.3].map(z=><Box key={z} size={[1.5,.07,.1]} position={[0,.15,z]} color={alloy}/>)}
  </Part>
  <Part id="lathe-leadscrew-01" position={[.2,-.18,1.06]} labelOffset={.42}>
   <Cylinder radius={.09} height={4.7} rotation={[0,0,Math.PI/2]} color="#b8cdd2"/>
   {Array.from({length:19},(_,i)=><Torus key={i} major={.095} tube={.014} rotation={[0,Math.PI/2,0]} position={[-2.1+i*.235,0,0]} color="#4d7587"/>)}
  </Part>
  <Part id="lathe-tailstock-01" position={[2.02,.38,0]} labelOffset={.95}>
   <Box size={[.85,.88,.95]} color="#63818e"/>
   <Cylinder radius={.24} height={.92} rotation={[0,0,Math.PI/2]} color={alloy} position={[-.6,.22,0]}/>
   <Cylinder radiusTop={0} radiusBottom={.2} height={.38} rotation={[0,0,-Math.PI/2]} position={[-1.2,.22,0]} color="#c5d4d8"/>
  </Part>
  <Part id="lathe-feed-servo-01" position={[2.65,-.16,.74]} labelOffset={.4}>
   <Cylinder radius={.3} height={.6} rotation={[0,0,Math.PI/2]} color="#416778"/><CoolingFins axis="x" length={.52} count={8} radius={.33}/>
  </Part>
  <Part id="lathe-coolant-pump-01" position={[-2.45,-.96,.75]} labelOffset={.5}>
   <Cylinder radius={.29} height={.6} rotation={[0,0,Math.PI/2]} color={blue}/><Pipe from={[0,.2,0]} to={[.36,.62,-.4]} color="#5fbbc5"/>
  </Part>
  <Part id="lathe-lubrication-01" position={[1.9,-.65,1]} labelOffset={.5}>
   <Box size={[.55,.6,.33]} color="#5a7180"/><Cylinder radius={.08} height={.16} position={[0,.4,0]} color={orange}/>
  </Part>
  <Part id="lathe-enclosure-01" labelOffset={2.7}>
   <Box size={[6,.18,2.8]} position={[0,2.36,-.1]} color={white}/>
   <Box size={[.16,2.9,2.55]} position={[-2.9,.95,-.08]} color={white}/>
   <Box size={[.16,2.9,2.55]} position={[2.9,.95,-.08]} color={white}/>
   <Box size={[6,2.5,.16]} position={[0,1.03,-1.38]} color="#8ba6b5"/>
   <Box size={[2.2,2.2,.09]} position={[-1.62,1.05,1.2]} color="#4a7e8d" opacity={.16}/>
   <Box size={[.1,2.2,.13]} position={[-.48,1.05,1.28]} color={alloy}/>
   <LightStack position={[2.5,2.43,-.85]}/>
  </Part>
 </group>
}
export function ConveyorModel(){
 return <group position={[0,-.5,0]}>
  <Part id="conv-frame-01" labelOffset={.3}>
   {[-1,1].map(z=><Box key={z} size={[5.75,.28,.17]} position={[0,.38,z]} color={blue}/>)}
   {[-2.35,0,2.35].map(x=>[-.8,.8].map(z=><Box key={`${x}-${z}`} size={[.2,1.48,.18]} position={[x,-.43,z]} color="#5f7480"/>))}
   {[-.97,.97].map(z=><Box key={z} size={[5.7,.15,.16]} position={[0,-.87,z]} color={midnight}/>)}
  </Part>
  <Part id="conv-belt-01" position={[0,.69,0]} labelOffset={.3}>
   <Box size={[5.5,.12,1.84]} color="#263c45" roughness={.88} metalness={.06}/>
   {Array.from({length:21},(_,i)=><Box key={i} size={[.028,.025,1.83]} color="#354c55" position={[-2.57+i*.256,.079,0]} metalness={.1} roughness={.96}/>)}
   {[-.99,.99].map(z=><Box key={z} size={[5.5,.12,.05]} color="#5a8a9c" position={[0,.08,z]}/>)}
  </Part>
  <Part id="conv-drive-roller-01" position={[2.67,.41,0]} labelOffset={.66}>
   <Cylinder radius={.36} height={1.85} rotation={[Math.PI/2,0,0]} color="#7799a3"/>
   <Torus major={.34} tube={.045} position={[0,0,1]} color={alloy}/>
   <Torus major={.34} tube={.045} position={[0,0,-1]} color={alloy}/>
  </Part>
  <Part id="conv-idler-01" position={[-2.6,.41,0]} labelOffset={.64}>
   <Cylinder radius={.34} height={1.85} rotation={[Math.PI/2,0,0]} color="#8ba6b1"/>
  </Part>
  {[-1.7,-.65,.4,1.47].map((x,i)=><Part key={x} id={`conv-support-${i+1}-01`} position={[x,.38,0]} labelOffset={.42}>
   <Cylinder radius={.16} height={1.79} rotation={[Math.PI/2,0,0]} color="#688592"/>
  </Part>)}
  <Part id="conv-drive-motor-01" position={[2.2,-.45,1.38]} labelOffset={.65}>
   <Cylinder radius={.42} height={.87} rotation={[Math.PI/2,0,0]} color={blue}/>
   <CoolingFins axis="z" radius={.46} length={.73} count={12} color="#2e6676"/>
  </Part>
  <Part id="conv-gearbox-01" position={[2.64,-.27,1]} labelOffset={.5}>
   <Box size={[.69,.7,.75]} color="#87969b"/>
   <Cylinder radius={.21} height={.2} rotation={[0,0,Math.PI/2]} position={[-.37,0,0]} color={alloy}/>
  </Part>
  <Part id="conv-tensioner-01" position={[-2.1,-.2,.9]} labelOffset={.55}>
   <Box size={[.85,.24,.2]} color={alloy}/><Cylinder radius={.09} height={.7} rotation={[0,0,Math.PI/2]} color={midnight}/>
  </Part>
  <Part id="conv-belt-sensor-01" position={[.2,.79,1]} labelOffset={.49}>
   <Box size={[.18,.22,.16]} color="#cfaa45"/><Box size={[.11,.08,.16]} position={[0,.15,0]} color="#374654"/>
  </Part>
  <Part id="conv-safety-guard-01" labelOffset={1.2}>
   {[-1.06,1.06].map(z=><Box key={z} size={[5.8,.35,.06]} position={[0,.96,z]} color="#7196a3" opacity={.7}/>)}
  </Part>
  <Part id="conv-bearing-01" position={[2.68,.41,1.08]} labelOffset={.42}><Box size={[.43,.5,.36]} color="#506f7e"/><Cylinder radius={.12} height={.48} rotation={[Math.PI/2,0,0]} color={alloy}/></Part>
 </group>
}
export function PressModel(){
 return <group position={[0,-.4,0]}>
  <Part id="press-frame-01" labelOffset={3.1}>
   <Box size={[4.9,.58,2.55]} position={[0,-1.02,0]} color="#334c60"/>
   <Box size={[5.2,.48,2.75]} position={[0,3.3,0]} color={blue}/>
   {[-2.12,2.12].map(x=>[-1,1].map(z=><Box key={`${x}:${z}`} size={[.42,3.95,.42]} position={[x,1.15,z]} color="#506d7f"/>))}
   {[-2.12,2.12].map(x=><Box key={x} size={[.2,3.95,.12]} position={[x,1.15,1.27]} color={white}/>)}
  </Part>
  <Part id="press-cylinder-01" position={[0,2.85,0]} labelOffset={.85}>
   <Cylinder radius={.65} height={1.22} color="#91a5ad"/>
   <Cylinder radius={.49} height={.42} position={[0,.68,0]} color={blue}/>
   {Array.from({length:8},(_,i)=><Bolt key={i} position={[Math.cos(i*Math.PI/4)*.53,-.53,Math.sin(i*Math.PI/4)*.53]}/>)}
  </Part>
  <Part id="press-piston-rod-01" position={[0,1.55,0]} labelOffset={.45}>
   <Cylinder radius={.23} height={1.62} color="#c7d2d5"/>
  </Part>
  <Part id="press-platen-01" position={[0,.64,0]} labelOffset={.42}>
   <Box size={[3.35,.35,1.7]} color="#879ea8"/>
   <Box size={[2.75,.15,1.5]} position={[0,-.24,0]} color="#b8c6c9"/>
   {[-1.35,1.35].map(x=><Box key={x} size={[.14,.32,1.8]} position={[x,0,0]} color="#465d6b"/>)}
  </Part>
  <Part id="press-die-01" position={[0,-.57,0]} labelOffset={.39}>
   <Box size={[2.55,.27,1.62]} color="#4d6572"/>
   <Box size={[1.6,.2,1.12]} position={[0,.23,0]} color="#a9babc"/>
  </Part>
  <Part id="press-pump-01" position={[1.95,-.62,1.32]} labelOffset={.7}>
   <Cylinder radius={.42} height={.8} rotation={[Math.PI/2,0,0]} color={blue}/>
   <CoolingFins axis="z" radius={.48} length={.6} count={9}/>
  </Part>
  <Part id="press-hydraulic-reservoir-01" position={[-1.83,-.7,1.32]} labelOffset={.75}>
   <Box size={[1,.89,.85]} color="#496a7a"/>
   <Cylinder radius={.13} height={.18} position={[.31,.51,0]} color={orange}/>
  </Part>
  <Part id="press-valve-manifold-01" position={[1.6,1.2,-.99]} labelOffset={.55}>
   <Box size={[.86,.65,.42]} color={alloy}/>
   {[-.3,0,.3].map(x=><Cylinder key={x} radius={.09} height={.35} color="#46677a" position={[x,.45,0]}/>)}
  </Part>
  <Part id="press-pressure-sensor-01" position={[1.8,2.1,-.94]} labelOffset={.43}>
   <Cylinder radius={.25} height={.1} rotation={[Math.PI/2,0,0]} color={alloy}/>
   <Cylinder radius={.17} height={.025} rotation={[Math.PI/2,0,0]} position={[0,0,.07]} color="#d9e2dd"/>
   <Box size={[.15,.018,.03]} rotation={[0,0,.5]} position={[.025,.03,.091]} color={midnight}/>
  </Part>
  <Part id="press-hoses-01" labelOffset={1}>
   <Pipe from={[.56,3.05,-.2]} to={[1.6,2.8,-.9]} radius={.07} color="#192e3c"/>
   <Pipe from={[1.6,2.8,-.9]} to={[1.75,1.52,-1]} radius={.07} color="#223944"/>
   <Pipe from={[1.83,.03,1]} to={[1.85,1.18,-.95]} radius={.055} color="#416d7e"/>
  </Part>
  <Part id="press-guides-01" labelOffset={1.4}>
   {[-1.3,1.3].map(x=><Cylinder key={x} radius={.13} height={2.48} position={[x,1.2,.22]} color="#a9c1c5"/>)}
  </Part>
  <Part id="press-control-01" position={[2.35,.5,1.21]} labelOffset={.82}>
   <Box size={[.58,1.32,.24]} color="#354b5b"/>
   <Box size={[.39,.42,.045]} position={[0,.33,.15]} color="#1b8c9f"/>
   {[-.14,.14].map(x=><Cylinder key={x} radius={.06} height={.04} rotation={[Math.PI/2,0,0]} position={[x,-.27,.16]} color={x<0?'#dca44b':'#d95757'}/>)}
  </Part>
 </group>
}

export function RobotModel(){
 return <group position={[0,-.6,0]}>
  <Part id="robot-base-01" labelOffset={.53}>
   <Box size={[2.45,.44,2.4]} position={[0,-.78,0]} color="#374e5e"/>
   <Cylinder radius={.83} height={.36} position={[0,-.43,0]} color="#647e8b"/>
   {Array.from({length:8},(_,i)=><Bolt key={i} position={[Math.cos(i*Math.PI/4)*.7,-.25,Math.sin(i*Math.PI/4)*.7]}/>)}
  </Part>
  <Part id="robot-joint-01" position={[0,-.05,0]} labelOffset={.5}>
   <Cylinder radius={.68} height={.54} color={blue}/><Torus major={.56} tube={.055} rotation={[Math.PI/2,0,0]} position={[0,.27,0]} color={alloy}/>
  </Part>
  <Part id="robot-shoulder-01" position={[.25,.62,0]} rotation={[0,0,-.32]} labelOffset={.6}>
   <Cylinder radius={.43} height={.9} color="#d6e0e1"/>
   <Sphere radius={.44} position={[0,.48,0]} color={white}/>
  </Part>
  <Part id="robot-upper-arm-01" position={[.54,1.46,0]} rotation={[0,0,-.35]} labelOffset={.8}>
   <Cylinder radiusTop={.27} radiusBottom={.41} height={1.56} color="#d7e3e6"/>
   <Box size={[.22,1.43,.25]} color={blue} position={[.28,0,0]}/>
  </Part>
  <Part id="robot-joint-03" position={[.93,2.21,0]} labelOffset={.54}>
   <Cylinder radius={.47} height={.71} rotation={[Math.PI/2,0,0]} color="#526e80"/>
   <Cylinder radius={.3} height={.76} rotation={[Math.PI/2,0,0]} color={alloy}/>
   <Torus major={.32} tube={.075} position={[0,0,.4]} color={blue}/>
  </Part>
  <Part id="robot-forearm-01" position={[1.62,2.39,0]} rotation={[0,0,-1.28]} labelOffset={.65}>
   <Cylinder radiusTop={.21} radiusBottom={.33} height={1.45} color="#dce6e8"/>
   <Box size={[.19,1.18,.18]} position={[.22,0,0]} color="#277a9b"/>
  </Part>
  <Part id="robot-wrist-01" position={[2.45,2.63,0]} labelOffset={.47}>
   <Cylinder radius={.3} height={.53} rotation={[0,0,Math.PI/2]} color="#7e95a2"/>
   <Torus major={.26} tube={.053} rotation={[0,Math.PI/2,0]} position={[.29,0,0]} color={blue}/>
  </Part>
  <Part id="robot-gripper-01" position={[2.98,2.63,0]} labelOffset={.45}>
   <Box size={[.54,.34,.46]} color="#3e5b69"/>
   {[-.24,.24].map(z=><Box key={z} size={[.7,.13,.1]} position={[.5,-.08,z]} color="#a7bdc3"/>)}
   {[-.24,.24].map(z=><Box key={z} size={[.15,.3,.12]} position={[.85,-.22,z]} color="#d5e0e4"/>)}
  </Part>
  <Part id="robot-joint-encoder-01" position={[.93,2.2,-.45]} labelOffset={.45}>
   <Cylinder radius={.24} height={.1} rotation={[Math.PI/2,0,0]} color="#c9d6d6"/>
  </Part>
  <Part id="robot-harmonic-drive-01" position={[.07,.7,-.48]} labelOffset={.4}>
   <Cylinder radius={.35} height={.14} rotation={[Math.PI/2,0,0]} color="#8da7b5"/>
  </Part>
  <Part id="robot-cable-harness-01" labelOffset={2.2}>
   <Pipe from={[-.4,.3,-.42]} to={[-.04,1.35,-.32]} radius={.07} color="#1b2e3b"/>
   <Pipe from={[-.04,1.35,-.32]} to={[.65,2.06,-.5]} radius={.07} color="#1b2e3b"/>
   <Pipe from={[.65,2.06,-.5]} to={[1.85,2.68,-.37]} radius={.06} color="#1b2e3b"/>
  </Part>
  <Part id="robot-force-sensor-01" position={[2.77,2.62,0]} labelOffset={.35}>
   <Cylinder radius={.2} height={.14} rotation={[0,0,Math.PI/2]} color={orange}/>
  </Part>
  <Part id="robot-controller-01" position={[-1.72,-.43,-.45]} labelOffset={.87}>
   <Box size={[.91,1.2,.92]} color="#435d6b"/>
   <Box size={[.6,.4,.035]} position={[0,.25,.48]} color="#1d7990"/>
   {Array.from({length:5},(_,i)=><Box key={i} size={[.46,.04,.04]} position={[0,-.18-i*.12,.49]} color="#a7b9be"/>)}
  </Part>
  <Box size={[5.2,.12,3.4]} position={[.45,-1.13,0]} color="#294051"/>
 </group>
}

export function PumpModel(){
 return <group position={[0,-.75,0]}>
  <Part id="pump-baseplate-01" labelOffset={.45}>
   <Box size={[5.4,.29,2.36]} position={[0,-.72,0]} color={midnight}/>
   {[-2,2].map(x=>[-.78,.78].map(z=><Bolt key={`${x}-${z}`} position={[x,-.56,z]}/>))}
  </Part>
  <Part id="pump-motor-01" position={[-1.58,.13,0]} labelOffset={.95}>
   <Cylinder radius={.68} height={1.65} rotation={[0,0,Math.PI/2]} color={blue}/>
   <CoolingFins axis="x" length={1.43} radius={.73} count={16} color="#296278"/>
   <Cylinder radius={.75} height={.2} rotation={[0,0,Math.PI/2]} position={[-.88,0,0]} color="#315567"/>
   <Box size={[1.34,.36,.22]} position={[0,-.75,.47]} color="#647e88"/>
  </Part>
  <Part id="pump-coupling-01" position={[-.26,.13,0]} labelOffset={.55}>
   <Cylinder radius={.27} height={.76} rotation={[0,0,Math.PI/2]} color="#b5c7cc"/>
   <Torus major={.33} tube={.07} rotation={[0,Math.PI/2,0]} color="#428999"/>
   {[-.25,.25].map(x=><Torus key={x} major={.26} tube={.04} position={[x,0,0]} rotation={[0,Math.PI/2,0]} color={steel}/>)}
  </Part>
  <Part id="pump-bearing-01" position={[.3,.13,0]} labelOffset={.7}>
   <Cylinder radius={.47} height={.63} rotation={[0,0,Math.PI/2]} color="#7797a7"/>
   <Torus major={.37} tube={.08} rotation={[0,Math.PI/2,0]} position={[.34,0,0]} color={alloy}/>
  </Part>
  <Part id="pump-volute-01" position={[1.32,.22,0]} labelOffset={1.1}>
   <Cylinder radius={.91} height={.84} rotation={[Math.PI/2,0,0]} color={blue}/>
   <Torus major={.78} tube={.17} color="#2f7d98"/>
   <Cylinder radius={.57} height={.19} rotation={[Math.PI/2,0,0]} position={[0,0,.46]} color="#7ba7b4"/>
   <Cylinder radius={.42} height={.09} rotation={[Math.PI/2,0,0]} position={[0,0,.57]} color="#1c4d62"/>
   {Array.from({length:8},(_,i)=><Bolt key={i} position={[Math.cos(i*Math.PI/4)*.73,Math.sin(i*Math.PI/4)*.73,.52]} rotation={[Math.PI/2,0,0]}/>)}
  </Part>
  <Part id="pump-impeller-01" position={[1.32,.22,.59]} labelOffset={.5}>
   <Cylinder radius={.24} height={.11} rotation={[Math.PI/2,0,0]} color={alloy}/>
   {Array.from({length:6},(_,i)=><Box key={i} size={[.08,.42,.09]} position={[Math.sin(i*Math.PI/3)*.16,Math.cos(i*Math.PI/3)*.16,.07]} rotation={[0,0,i*Math.PI/3]} color={steel}/>)}
  </Part>
  <Part id="pump-mechanical-seal-01" position={[.69,.2,0]} labelOffset={.43}>
   <Torus major={.31} tube={.1} rotation={[0,Math.PI/2,0]} color="#d8e1e0"/>
  </Part>
  <Part id="pump-discharge-01" position={[1.35,1.51,0]} labelOffset={.55}>
   <Cylinder radius={.32} height={1.03} color="#2c829a"/>
   <Cylinder radius={.5} height={.15} position={[0,.58,0]} color="#b0bdc3"/>
  </Part>
  <Part id="pump-suction-01" position={[2.47,.23,0]} labelOffset={.53}>
   <Cylinder radius={.39} height={1.15} rotation={[0,0,Math.PI/2]} color="#397f95"/>
   <Cylinder radius={.51} height={.12} position={[.62,0,0]} rotation={[0,0,Math.PI/2]} color={alloy}/>
  </Part>
  <Part id="pump-pressure-sensor-01" position={[1.35,2.2,0]} labelOffset={.51}>
   <Cylinder radius={.21} height={.12} rotation={[Math.PI/2,0,0]} color="#cdd8d9"/>
   <Cylinder radius={.14} height={.04} position={[0,0,.07]} rotation={[Math.PI/2,0,0]} color="#eff2ec"/>
  </Part>
  <Part id="pump-lubrication-01" position={[-.21,-.48,.82]} labelOffset={.5}>
   <Box size={[.37,.43,.35]} color="#607b85"/><Cylinder radius={.08} height={.15} position={[0,.28,0]} color={orange}/>
  </Part>
  <Part id="pump-alignment-01" position={[-.25,-.61,0]} labelOffset={.4}>
   <Box size={[.79,.08,.35]} color={alloy}/>
  </Part>
 </group>
}
export function CompressorModel(){
 return <group position={[0,-.65,0]}>
  <Part id="comp-tank-01" position={[0,-.32,0]} labelOffset={.98}>
   <Cylinder radius={.76} height={4.86} rotation={[0,0,Math.PI/2]} color="#31728c"/>
   {[-2.28,2.28].map(x=><Sphere key={x} radius={.72} position={[x,0,0]} color="#31728c"/>)}
   {[-1.58,1.58].map(x=><Box key={x} size={[.4,.38,1.16]} position={[x,-.82,0]} color="#445e70"/>)}
  </Part>
  <Part id="comp-motor-01" position={[-1.35,1,0]} labelOffset={.81}>
   <Cylinder radius={.48} height={1.15} rotation={[0,0,Math.PI/2]} color={blue}/>
   <CoolingFins axis="x" length={.98} count={13} radius={.52} color="#315d72"/>
   <Box size={[1,.2,.72]} position={[0,-.58,0]} color="#718a98"/>
  </Part>
  <Part id="comp-air-end-01" position={[.3,1.12,0]} labelOffset={.9}>
   <Box size={[1.32,1.18,1.07]} color="#8c9fa9"/>
   {[0,.3,.6].map(y=><Box key={y} size={[1.33,.06,1.08]} position={[0,y-.26,0]} color={alloy}/>)}
   <Cylinder radius={.3} height={.26} position={[.2,.65,0]} color="#566e7a"/>
  </Part>
  <Part id="comp-bearings-01" position={[-.42,1.18,0]} labelOffset={.5}>
   <Cylinder radius={.29} height={.29} rotation={[0,0,Math.PI/2]} color={alloy}/>
   <Torus major={.24} tube={.05} rotation={[0,Math.PI/2,0]} color="#5e98aa"/>
  </Part>
  <Part id="comp-oil-separator-01" position={[1.52,1.18,.05]} labelOffset={.65}>
   <Cylinder radius={.34} height={1.14} color="#718d99"/>
   <Cylinder radius={.4} height={.12} position={[0,.57,0]} color={alloy}/>
   <Cylinder radius={.21} height={.2} position={[0,-.65,0]} color="#2d748d"/>
  </Part>
  <Part id="comp-aftercooler-01" position={[2.11,1.35,0]} labelOffset={.78}>
   <Box size={[.34,1.12,1.32]} color="#708b97"/>
   {Array.from({length:8},(_,i)=><Box key={i} size={[.35,.05,1.36]} position={[0,-.46+i*.13,0]} color="#b3c7cd"/>)}
  </Part>
  <Part id="comp-pressure-sensor-01" position={[.9,.63,.63]} labelOffset={.48}>
   <Cylinder radius={.24} height={.12} rotation={[Math.PI/2,0,0]} color={alloy}/><Cylinder radius={.16} height={.04} rotation={[Math.PI/2,0,0]} position={[0,0,.08]} color="#eaf0ef"/>
  </Part>
  <Part id="comp-unloader-valve-01" position={[.91,1.9,.1]} labelOffset={.45}>
   <Box size={[.48,.42,.45]} color="#476a7c"/><Cylinder radius={.12} height={.24} position={[0,.3,0]} color={orange}/>
  </Part>
  <Part id="comp-air-filter-01" position={[-2.4,.84,-.15]} labelOffset={.62}>
   <Cylinder radius={.31} height={.76} color="#596f7a"/>
   <Cylinder radius={.42} height={.13} position={[0,.4,0]} color="#bccbd1"/>
  </Part>
  <Part id="comp-belt-drive-01" position={[-.55,1.09,.6]} labelOffset={.62}>
   <Torus major={.31} tube={.07} color="#253d4b"/><Torus major={.28} tube={.05} position={[-.63,0,0]} color="#587183"/>
   <Box size={[.93,.08,.08]} position={[-.32,.23,0]} color="#304751"/>
  </Part>
  <Part id="comp-drain-valve-01" position={[1.82,-1.24,0]} labelOffset={.51}>
   <Cylinder radius={.12} height={.36} color="#a3b9c3"/><Torus major={.17} tube={.025} position={[0,-.23,0]} color={orange}/>
  </Part>
  <Part id="comp-electrical-panel-01" position={[-1.8,.53,1.01]} labelOffset={.64}>
   <Box size={[.7,.72,.25]} color="#374f60"/><Box size={[.5,.25,.02]} position={[0,.11,.14]} color="#1d87a0"/>
  </Part>
  <Box size={[5.65,.13,2.46]} color="#243a4c" position={[0,-1.45,0]}/>
 </group>
}
export function MotorModel(){
 return <group position={[0,-.7,0]}>
  <Part id="motor-base-01" labelOffset={.45}>
   <Box size={[5.5,.3,2.55]} color="#354e5e" position={[0,-.86,0]}/>
   {[-1.52,1.52].map(x=>[-.71,.71].map(z=><Bolt key={`${x}-${z}`} position={[x,-.66,z]}/>))}
  </Part>
  <Part id="motor-stator-01" position={[-.48,.1,0]} labelOffset={1}>
   <Cylinder radius={1.03} height={2.46} rotation={[0,0,Math.PI/2]} color={blue}/>
   <CoolingFins axis="x" length={2.26} count={23} radius={1.09} color="#2b6881"/>
   {[-1.2,1.2].map(x=><Cylinder key={x} radius={1.07} height={.16} rotation={[0,0,Math.PI/2]} position={[x,0,0]} color="#7395a3"/>)}
   <Box size={[2.32,.29,.73]} position={[0,-.98,0]} color="#4f7888"/>
  </Part>
  <Part id="motor-bearing-drive-01" position={[.89,.08,0]} labelOffset={.72}>
   <Cylinder radius={.51} height={.31} rotation={[0,0,Math.PI/2]} color="#9cabb3"/>
   <Torus major={.4} tube={.08} rotation={[0,Math.PI/2,0]} position={[.17,0,0]} color={alloy}/>
  </Part>
  <Part id="motor-shaft-01" position={[1.55,.08,0]} labelOffset={.62}>
   <Cylinder radius={.2} height={1.68} rotation={[0,0,Math.PI/2]} color="#d2e0de"/>
   <Box size={[1.38,.065,.1]} position={[.06,.18,0]} color="#879da6"/>
  </Part>
  <Part id="motor-terminal-box-01" position={[-.42,1.28,0]} labelOffset={.75}>
   <Box size={[1.12,.71,.86]} color="#648291"/>
   <Box size={[1.17,.13,.94]} position={[0,.38,0]} color="#c7d3d7"/>
   {[-.35,.35].map(x=><Cylinder key={x} radius={.12} height={.27} position={[x,.49,0]} color="#809fa9"/>)}
  </Part>
  <Part id="motor-cooling-fan-01" position={[-1.88,.09,0]} labelOffset={.75}>
   <Cylinder radius={.91} height={.38} rotation={[0,0,Math.PI/2]} color="#4a6d7d"/>
   <Torus major={.85} tube={.07} rotation={[0,Math.PI/2,0]} position={[-.18,0,0]} color={alloy}/>
   {Array.from({length:7},(_,i)=>{const a=i*Math.PI*2/7;return <Box key={i} size={[.05,.62,.15]} position={[-.23,Math.sin(a)*.4,Math.cos(a)*.4]} rotation={[a,0,0]} color="#acc2ca"/>})}
  </Part>
  <Part id="motor-rotor-01" position={[.4,.08,0]} labelOffset={.65}>
   <Cylinder radius={.43} height={.44} rotation={[0,0,Math.PI/2]} color="#a1b7c0"/>
  </Part>
  <Part id="motor-winding-01" position={[-.5,.02,.86]} labelOffset={.6}>
   {Array.from({length:7},(_,i)=><Torus key={i} major={.16} tube={.055} position={[-.83+i*.27,0,0]} rotation={[0,Math.PI/2,0]} color="#c78e53"/>)}
  </Part>
  <Part id="motor-temperature-sensor-01" position={[.8,.86,.28]} labelOffset={.4}>
   <Cylinder radius={.12} height={.31} color={alloy}/><Box size={[.2,.14,.2]} position={[0,.22,0]} color={orange}/>
  </Part>
  <Part id="motor-coupling-01" position={[2.48,.08,0]} labelOffset={.5}>
   <Cylinder radius={.35} height={.78} rotation={[0,0,Math.PI/2]} color="#6f8a95"/>
   <Torus major={.29} tube={.045} rotation={[0,Math.PI/2,0]} position={[.4,0,0]} color="#e0a74b"/>
  </Part>
  <Part id="motor-vibration-point-01" position={[-.68,-.5,.88]} labelOffset={.39}>
   <Box size={[.2,.12,.2]} color="#e2b650"/><Cylinder radius={.06} height={.16} position={[0,.1,0]} color="#293f51"/>
  </Part>
  <Part id="motor-bearings-fan-01" position={[-1.42,.08,0]} labelOffset={.55}>
   <Cylinder radius={.52} height={.14} rotation={[0,0,Math.PI/2]} color="#819da9"/>
  </Part>
 </group>
}

export const machineGeometry={
 'lathe-002':LatheModel,'conv-003':ConveyorModel,'press-004':PressModel,'robot-005':RobotModel,
 'pump-006':PumpModel,'comp-007':CompressorModel,'motor-008':MotorModel
}
