import { Part, Box, Cylinder, Torus, Pipe, CoolingFins, Bolt, LightStack } from './TwinParts'
const shell='#b4b9bd', steel='#78868e', navy='#30353c', blue='#48565e', dark='#292e33', bright='#d2d6d9'
/** Static clickable reference geometry: motion is shown using real video footage. */
export function CncModel(){
 return <group position={[0,-.1,0]}>
  <Part id="cnc-bed-01" labelOffset={-.15}>
   <Box size={[5.8,.37,3.35]} position={[0,-1.26,0]} color={navy}/><Box size={[5.65,.22,3.2]} position={[0,-1.02,0]} color="#536b7b"/>
   <Box size={[4.9,.22,2.1]} position={[0,-.83,-.55]} color="#52636f"/>
   {[-2.6,2.6].map(x=><Box key={x} size={[.18,.5,3.12]} position={[x,-.88,0]} color={blue}/>)}
   {[-2,0,2].map(x=><Bolt key={x} position={[x,-.91,1.3]}/>)}
  </Part>
  <Part id="cnc-enclosure-01" labelOffset={2.7}>
   <Box size={[5.84,.3,3.45]} position={[0,3.16,0]} color={shell}/>
   <Box size={[5.85,.19,.24]} position={[0,2.65,1.58]} color="#c6d4da"/>
   <Box size={[.28,3.95,3.45]} position={[-2.78,1.05,0]} color={shell}/>
   <Box size={[.28,3.95,3.45]} position={[2.78,1.05,0]} color={shell}/>
   <Box size={[5.65,3.8,.18]} position={[0,1.08,-1.66]} color="#a7bac6"/>
   <Box size={[5.65,.35,.18]} position={[0,-.72,1.64]} color={shell}/>
   <Box size={[5.65,.33,.2]} position={[0,2.88,1.64]} color={shell}/>
   <Box size={[.16,3.3,.19]} position={[0,1.1,1.63]} color={blue}/>
   <Box size={[1.95,3.18,.075]} position={[-1.64,1.06,1.75]} color="#438399" opacity={.18}/>
   <Box size={[2.03,.12,.12]} position={[-1.64,2.63,1.82]} color="#b7ccd0"/>
   <Box size={[2.03,.12,.12]} position={[-1.64,-.49,1.82]} color="#b7ccd0"/>
   <Box size={[.12,3.16,.12]} position={[-2.64,1.06,1.82]} color="#b7ccd0"/>
   <Box size={[.12,3.16,.12]} position={[-.64,1.06,1.82]} color="#b7ccd0"/>
   <Box size={[.065,.68,.11]} position={[-.57,.94,1.89]} color="#cfdbdc"/>
   <Box size={[1.2,.3,.28]} position={[-1.85,2.6,1.81]} color={blue}/>
  </Part>
  <Part id="z-axis-screw-01" position={[-1.68,1.2,-1.05]} labelOffset={1.15}>
   <Box size={[.4,3.45,.52]} color="#536975"/><Cylinder radius={.095} height={3.15} color="#d4e0df"/>
   {Array.from({length:15},(_,i)=><Torus key={i} major={.09} tube={.012} rotation={[Math.PI/2,0,0]} position={[0,-1.45+i*.2,.01]} color="#7896a1"/>)}
   <Box size={[.48,.24,.6]} position={[0,-1.08,.02]} color={steel}/>
  </Part>
  <group>
  <Part id="spindle-motor-01" position={[0,2.17,-.9]} labelOffset={.99}>
   <Box size={[1.35,1.58,1.19]} color="#647e8c"/>
   <Box size={[1.4,.22,1.23]} position={[0,.73,0]} color="#b8c6c8"/>
   <Cylinder radius={.39} height={.93} position={[0,.4,0]} color={navy}/>
   <CoolingFins count={9} axis="z" length={.95} radius={.53} color="#4c6977"/>
   {[-.52,.52].map(x=><Box key={x} size={[.1,1.52,.15]} position={[x,0,.55]} color="#b0bec4"/>)}
  </Part>
  <Part id="spindle-bearing-01" position={[0,1.1,-.9]} labelOffset={.55}>
   <Cylinder radiusTop={.46} radiusBottom={.32} height={.65} color="#9baeb8"/>
   <Torus major={.34} tube={.075} rotation={[Math.PI/2,0,0]} position={[0,-.3,0]} color="#4a8da5"/>
   <Cylinder radius={.19} height={.3} position={[0,-.37,0]} color={bright}/>
  </Part>
  <group>
  <Part id="tool-holder-01" position={[0,.54,-.9]} labelOffset={.6}>
   <Cylinder radiusTop={.23} radiusBottom={.16} height={.42} color="#e4ebed"/>
   <Cylinder radiusTop={.15} radiusBottom={.09} height={.18} position={[0,-.3,0]} color="#96bbc6"/>
   <Cylinder radius={.052} height={.34} position={[0,-.54,0]} color="#c1d8e0"/>
  </Part>
  </group>
  </group>
  <group>
  <Part id="x-axis-guide-01" position={[0,-.45,.15]} labelOffset={.59}>
   <Box size={[3.55,.37,1.72]} color="#9aaeb9"/>
   <Box size={[3.6,.12,1.72]} position={[0,.23,0]} color="#b5c4c7"/>
   {[-.64,-.31,.02,.35,.68].map(z=><Box key={z} size={[3.55,.06,.105]} position={[0,.32,z]} color="#344f5e"/>)}
   {[-1.48,1.48].map(x=><Box key={x} size={[.07,.35,1.8]} position={[x,0,0]} color="#d0dad8"/>)}
  </Part>
  <Part id="cnc-vise-01" position={[0,.03,.12]} labelOffset={.45}>
   <Box size={[1.35,.19,1]} color="#3a5362"/>
   {[-.42,.42].map(x=><Box key={x} size={[.22,.43,.78]} position={[x,.25,0]} color="#a5b8bb"/>)}
   <Cylinder radius={.065} height={.48} rotation={[0,0,Math.PI/2]} position={[.7,.1,0]} color="#d4dedc"/>
  </Part>
  </group>
  <Part id="cnc-y-axis-guide-01" position={[0,-.65,-.5]} labelOffset={.15}>
   {[-1.05,1.05].map(x=><Box key={x} size={[.2,.16,1.8]} position={[x,0,0]} color="#5f8f9e"/>)}
  </Part>
  <Part id="cnc-tool-changer-01" position={[1.53,2.02,-.85]} labelOffset={.96}>
   <Cylinder radius={.85} height={.27} rotation={[Math.PI/2,0,0]} color="#546b79"/>
   <Cylinder radius={.63} height={.3} rotation={[Math.PI/2,0,0]} color="#1c3544"/>
   {Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return <group key={i} position={[Math.cos(a)*.72,Math.sin(a)*.72,.23]}><Cylinder radius={.115} height={.28} rotation={[Math.PI/2,0,0]} color="#a9c0c7"/><Cylinder radius={.055} height={.1} rotation={[Math.PI/2,0,0]} position={[0,0,.16]} color="#263949"/></group>})}
  </Part>
  <Part id="power-coupling-01" position={[.7,2.34,-1.35]} labelOffset={.5}>
   <Cylinder radius={.33} height={.65} rotation={[0,0,Math.PI/2]} color="#849aa7"/>
   <Torus major={.29} tube={.065} rotation={[0,Math.PI/2,0]} position={[.3,0,0]} color="#2e7e90"/>
  </Part>
  <Part id="cnc-x-servo-01" position={[1.95,-.42,.42]} labelOffset={.44}>
   <Cylinder radius={.28} height={.6} rotation={[0,0,Math.PI/2]} color="#50778a"/>
   <Cylinder radius={.19} height={.12} rotation={[0,0,Math.PI/2]} position={[.36,0,0]} color="#c5d7d9"/>
  </Part>
  <Part id="cnc-coolant-line-01" position={[-.63,.85,-.5]} labelOffset={.65}>
   <Pipe from={[-.3,.85,-.55]} to={[.05,-.3,-.4]} radius={.065} color="#1880ba"/>
   <Pipe from={[.05,-.3,-.4]} to={[.32,-.55,-.15]} radius={.06} color="#168cc5"/>
   <Cylinder radiusTop={.025} radiusBottom={.085} height={.14} rotation={[.3,0,-.6]} position={[.36,-.63,-.05]} color="#ecb23f"/>
  </Part>
  <Part id="coolant-pump-01" position={[1.98,-.91,1.15]} labelOffset={.54}>
   <Box size={[1.02,.22,.85]} position={[0,-.18,0]} color={dark}/>
   <Cylinder radius={.3} height={.62} rotation={[0,0,Math.PI/2]} color="#308c9c"/>
   <Torus major={.24} tube={.06} rotation={[0,Math.PI/2,0]} position={[.32,0,0]} color="#99b5ba"/>
   <Pipe from={[.22,.21,-.15]} to={[.4,.64,-.7]} radius={.065} color="#48a2b0"/>
  </Part>
  <Part id="cnc-coolant-filter-01" position={[-2.14,-.8,1.05]} labelOffset={.5}>
   <Cylinder radius={.28} height={.7} color="#315c70"/><Cylinder radius={.32} height={.14} position={[0,.37,0]} color="#acbbbd"/>
  </Part>
  <Part id="cnc-way-lube-01" position={[-1.85,-.72,-1.12]} labelOffset={.55}>
   <Box size={[.54,.62,.34]} color="#64818c"/><Cylinder radius={.1} height={.19} position={[0,.4,0]} color="#d8ad4a"/>
  </Part>
  <Part id="cnc-control-panel-01" position={[3.06,1.47,.94]} rotation={[0,-.27,0]} labelOffset={1.1}>
   <Box size={[.68,2,.26]} color="#324856"/>
   <Box size={[.51,.82,.032]} position={[0,.38,.15]} color="#1a3545" emissive="#153449"/>
   {Array.from({length:12},(_,i)=><Cylinder key={i} radius={.038} height={.019} rotation={[Math.PI/2,0,0]} position={[-.18+(i%3)*.18,-.2-Math.floor(i/3)*.18,.151]} color={i===10?'#e8a94f':'#bbd5d9'}/>)}
   <Cylinder radius={.12} height={.05} rotation={[Math.PI/2,0,0]} position={[.15,-.68,.16]} color="#d9574e"/>
   <Box size={[.08,2.75,.08]} position={[.25,-1.9,-.12]} color="#83969e"/>
   <LightStack position={[0,1.05,0]}/>
  </Part>
  <Part id="cnc-electrical-cabinet-01" position={[-2.98,1.08,-.25]} labelOffset={1.2}>
   <Box size={[.27,2.58,1.7]} color="#647988"/>
   <Box size={[.05,1.9,1.3]} position={[-.16,.1,0]} color="#2a4457"/>
   {Array.from({length:7},(_,i)=><Box key={i} size={[.065,.045,1.1]} position={[-.2,-.6+i*.2,0]} color="#a2b4b8"/>)}
  </Part>
  <Part id="cnc-door-interlock-01" position={[-.65,1.85,1.8]} labelOffset={.33}>
   <Box size={[.18,.34,.15]} color="#d8b755"/><Box size={[.11,.09,.18]} position={[0,.21,0]} color="#3d626e"/>
  </Part>
  <Part id="cnc-axis-encoder-01" position={[-1.7,2.5,-1.05]} labelOffset={.45}>
   <Cylinder radius={.23} height={.25} rotation={[0,0,Math.PI/2]} color="#a5b9c0"/>
  </Part>
  {[-2.35,2.35].map(x=>[.4,1.1,1.9,2.6].map(y=><Bolt key={`${x}-${y}`} position={[x,y,1.63]} rotation={[Math.PI/2,0,0]}/>))}
  <Box size={[5.9,.06,3.8]} color="#20313e" position={[0,-1.48,0]} />
 </group>
}
