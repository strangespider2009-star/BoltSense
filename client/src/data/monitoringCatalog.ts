import type { Component } from '../types'
/** These are monitoring *opportunities*, not a statement that physical sensors are installed. */
type Entry = [id:string, name:string, assembly:string, proposedSensors:string[], parameters:string[]]
const temp=['Bearing temperature (°C)','Vibration RMS (mm/s)']
const drive=['Motor current (A)','Winding temperature (°C)']
const motion=['Position feedback (mm)','Axis motor current (A)']
const oil=['Oil temperature (°C)','Oil condition / contamination']
export const monitorPlan:Record<string,Entry[]>={
 'cnc-001':[
  ['spindle-bearing-01','Spindle Bearing','Spindle housing',['Vibration accelerometer','Temperature probe'],temp],
  ['spindle-motor-01','Spindle Motor','Top spindle head',['Current sensor','Temperature probe','Speed encoder'],[...drive,'Spindle RPM']],
  ['x-axis-guide-01','X-Axis Linear Guide','Machine work table',['Load / strain sensor','Temperature probe'],['Axis force (N)','Guide temperature (°C)']],
  ['coolant-pump-01','Coolant Pump','Base coolant circuit',['Temperature probe','Flow sensor'],['Pump temperature (°C)','Coolant flow (L/min)']],
  ['tool-holder-01','Tool Holder','Spindle nose',['Tool-break detector','Vibration pickup'],['Tool state','Tool wear / vibration']],
  ['z-axis-screw-01','Z-Axis Ball Screw','Vertical slide',['Vibration accelerometer','Position encoder'],['Ball-screw vibration (mm/s)','Backlash (mm)']],
  ['power-coupling-01','Drive Coupling','Spindle drive',['Vibration pickup','Temperature probe'],temp],
  ['cnc-bed-01','Machine Bed & Casting','Machine foundation',['Vibration accelerometer','Strain sensor'],['Frame vibration','Structural strain']],
  ['cnc-enclosure-01','Safety Enclosure','Front & rear enclosure',['Door position switch','Temperature sensor'],['Door position','Enclosure temperature']],
  ['cnc-y-axis-guide-01','Y-Axis Linear Guides','Table saddle',['Position encoder','Accelerometer'],motion],
  ['cnc-x-servo-01','X-Axis Servo Motor','Table drive',['Motor current sensor','Encoder'],drive],
  ['cnc-tool-changer-01','Automatic Tool Changer','Tool magazine',['Position switch','Motor current sensor'],['Tool index position','Changer motor current']],
  ['cnc-vise-01','Workholding Vise','Machining table',['Force / clamp sensor'],['Clamping force (N)']],
  ['cnc-coolant-line-01','Coolant Delivery Nozzle','Spindle head',['Flow meter','Pressure sensor'],['Coolant flow (L/min)','Line pressure (bar)']],
  ['cnc-coolant-filter-01','Coolant Filter','Coolant return',['Differential pressure sensor','Turbidity sensor'],['Filter differential pressure','Coolant contamination']],
  ['cnc-way-lube-01','Way Lubrication Unit','Base service bay',['Oil level sensor','Oil condition sensor'],['Lubricant level','Oil condition']],
  ['cnc-control-panel-01','CNC Control Panel','Operator pendant',['Controller diagnostics'],['CNC alarm codes','Controller temperature']],
  ['cnc-electrical-cabinet-01','Electrical Cabinet','Side electrical housing',['Current transformer','Temperature sensor'],['Cabinet temperature','Supply current']],
  ['cnc-door-interlock-01','Door Interlock','Front sliding door',['Door position switch'],['Interlock state']],
  ['cnc-axis-encoder-01','Z-Axis Encoder','Column motor end',['Rotary encoder'],['Axis position / tracking error']],
 ],
 'lathe-002':[
  ['lathe-chuck-01','Main Chuck','Headstock nose',['Vibration accelerometer','Jaw force monitoring'],['Chuck vibration','Clamping force if instrumented']],
  ['lathe-bed-01','Precision Bed & Ways','Lathe base',['Accelerometer','Temperature probe'],temp],
  ['lathe-headstock-01','Headstock','Spindle casing',['Temperature sensor','Acoustic sensor'],temp],
  ['lathe-spindle-bearing-01','Spindle Bearings','Headstock spindle',['Vibration accelerometer','Temperature probe'],temp],
  ['lathe-turret-01','Tool Turret','Cross-slide tooling',['Position encoder','Motor current sensor'],['Turret index','Servo current']],
  ['lathe-cross-slide-01','Cross Slide','Cutting carriage',['Encoder','Vibration accelerometer'],motion],
  ['lathe-leadscrew-01','Lead Screw','Carriage feed',['Encoder','Vibration accelerometer'],['Lead-screw vibration','Position accuracy']],
  ['lathe-tailstock-01','Tailstock','Right-hand support',['Axial load sensor','Position encoder'],['Tailstock thrust (N)','Tailstock position']],
  ['lathe-feed-servo-01','Feed Servo Motor','Right-hand carriage drive',['Current clamp','Temperature probe'],drive],
  ['lathe-coolant-pump-01','Coolant Pump','Lower machine',['Flow sensor','Temperature probe'],['Coolant flow','Temperature']],
  ['lathe-lubrication-01','Automatic Lubricator','Bed lubrication',['Level sensor','Pressure sensor'],['Oil level','Lube pressure']],
  ['lathe-enclosure-01','Enclosure & Interlock','Machine enclosure',['Door switch'],['Door / guard state']],
 ],
 'conv-003':[
  ['conv-idler-01','Idler Roller','Receiving end',['Temperature probe','Vibration accelerometer'],temp],
  ['conv-frame-01','Conveyor Frame','Structural rails',['Strain gauge','Vibration pickup'],['Frame strain','Structure vibration']],
  ['conv-belt-01','Conveyor Belt','Carry surface',['Belt tracking sensor','Speed pickup'],['Belt speed (m/s)','Tracking deviation']],
  ['conv-drive-roller-01','Head Drive Roller','Discharge end',['Encoder','Vibration accelerometer'],['Roller RPM','Bearing vibration']],
  ['conv-drive-motor-01','Drive Motor','Motor support',['Current sensor','Temperature probe'],drive],
  ['conv-gearbox-01','Reduction Gearbox','Motor drive',['Oil condition probe','Accelerometer'],['Gear mesh vibration','Gearbox oil condition']],
  ['conv-tensioner-01','Belt Tensioner','Tail carriage',['Load cell','Position sensor'],['Belt tension (N)','Take-up position']],
  ['conv-belt-sensor-01','Belt Tracking Sensor','Conveyor edge',['Optical / proximity sensor'],['Edge alignment']],
  ['conv-safety-guard-01','Protective Guard','Belt perimeter',['Guard position switch'],['Guard status']],
  ['conv-bearing-01','Drive-End Bearing','Head roller journal',['Temperature probe','Vibration accelerometer'],temp],
  ['conv-support-1-01','Support Roller A','Inner section A',['Accelerometer'],['Roller vibration']],
  ['conv-support-2-01','Support Roller B','Inner section B',['Accelerometer'],['Roller vibration']],
  ['conv-support-3-01','Support Roller C','Inner section C',['Accelerometer'],['Roller vibration']],
  ['conv-support-4-01','Support Roller D','Inner section D',['Accelerometer'],['Roller vibration']],
 ],
 'press-004':[
  ['press-cylinder-01','Hydraulic Cylinder','Top ram',['Pressure transducer','Load cell','Temperature probe'],['Cylinder load (N)','Pressure (bar)','Temperature (°C)']],
  ['press-frame-01','H-Frame','Vertical supports',['Strain gauge','Accelerometer'],['Structural strain','Frame vibration']],
  ['press-piston-rod-01','Ram / Piston Rod','Central hydraulic ram',['Position transducer'],['Ram travel (mm)']],
  ['press-platen-01','Moving Platen','Upper tool platen',['Load cell','Displacement sensor'],['Press force (N)','Platen alignment']],
  ['press-die-01','Die & Tooling','Lower working table',['Tool force sensor','Acoustic pickup'],['Tooling force','Acoustic anomalies']],
  ['press-pump-01','Hydraulic Pump','Power pack',['Current sensor','Vibration sensor'],[...drive,'Pump vibration']],
  ['press-hydraulic-reservoir-01','Oil Reservoir','Hydraulic power pack',['Oil level','Oil condition probe'],['Oil level','Oil contamination']],
  ['press-valve-manifold-01','Valve Manifold','Upper hydraulic circuit',['Pressure sensor','Valve feedback'],['Valve position','Line pressure']],
  ['press-pressure-sensor-01','Pressure Gauge & Sensor','Hydraulic manifold',['Pressure transducer'],['Hydraulic pressure (bar)']],
  ['press-hoses-01','Hydraulic Hose Lines','Fluid circuit',['Pressure sensor','Leak sensor'],['Line pressure','Leak alarm']],
  ['press-guides-01','Guide Pillars','Moving platen guides',['Temperature probe','Position probe'],['Guide temperature','Platen tracking']],
  ['press-control-01','Press Controller','Operator panel',['Controller diagnostics'],['Fault codes','Cycle counts']],
 ],
 'robot-005':[
  ['robot-joint-03','Elbow Joint','Third axis',['Temperature probe','Motor current sensor'],['Joint temperature','Current load']],
  ['robot-base-01','Robot Base','Floor anchor',['Strain / force pickup','Accelerometer'],['Base vibration','Mounting strain']],
  ['robot-joint-01','Axis 1 Bearing','Base rotation',['Encoder','Temperature probe'],['Rotational position','Bearing temperature']],
  ['robot-shoulder-01','Shoulder Joint','Second axis',['Encoder','Current sensor'],['Joint 2 torque estimate','Position']],
  ['robot-upper-arm-01','Upper Arm','Between joints 2 and 3',['Strain gauge'],['Link strain']],
  ['robot-forearm-01','Forearm','Between elbow and wrist',['Strain gauge'],['Link strain']],
  ['robot-wrist-01','Wrist Assembly','Axes 4–6',['Encoder','Temperature probe'],['Wrist position','Joint temperature']],
  ['robot-gripper-01','End Effector','Tool end',['Force / torque sensor','Proximity sensor'],['Grip force (N)','Tool state']],
  ['robot-joint-encoder-01','Joint Encoder','Elbow feedback',['Absolute encoder'],['Joint tracking error']],
  ['robot-harmonic-drive-01','Gear Reducer','Shoulder gearbox',['Vibration probe','Temperature sensor'],temp],
  ['robot-cable-harness-01','Cable Harness','External arm path',['Continuity monitor'],['Cable health']],
  ['robot-force-sensor-01','Tool Force Sensor','Wrist–tool junction',['Six-axis F/T sensor'],['Forces (N)','Torque (Nm)']],
  ['robot-controller-01','Motion Controller','Floor cabinet',['Controller diagnostics','Temperature probe'],['Servo alarms','Controller temperature']],
 ],
 'pump-006':[
  ['pump-bearing-01','Pump Bearing','Drive end',['Accelerometer','Temperature probe'],temp],
  ['pump-baseplate-01','Pump Baseplate','Mounting skid',['Vibration accelerometer'],['Base vibration']],
  ['pump-motor-01','Drive Motor','Left motor',['Motor current sensor','Temperature probe'],drive],
  ['pump-coupling-01','Shaft Coupling','Motor–pump center',['Vibration accelerometer'],['Misalignment vibration']],
  ['pump-volute-01','Pump Volute','Centrifugal casing',['Pressure transducer','Temperature probe'],['Casing pressure','Process temperature']],
  ['pump-impeller-01','Impeller','Wet rotating assembly',['Vibration / acoustic sensor'],['Cavitation indicators']],
  ['pump-mechanical-seal-01','Mechanical Seal','Shaft entry',['Leak detector','Temperature sensor'],['Seal leakage','Seal temperature']],
  ['pump-discharge-01','Discharge Flange','Outlet piping',['Pressure sensor','Flowmeter'],['Discharge pressure','Flow (L/min)']],
  ['pump-suction-01','Suction Flange','Inlet piping',['Pressure transducer'],['Suction pressure']],
  ['pump-pressure-sensor-01','Outlet Pressure Gauge','Discharge',['Pressure transducer'],['Outlet pressure (bar)']],
  ['pump-lubrication-01','Bearing Lubrication','Drive-end housing',['Oil condition sensor','Temperature probe'],oil],
  ['pump-alignment-01','Alignment Foot','Motor baseplate',['Vibration sensors'],['Misalignment / soft-foot indicators']],
 ],
 'comp-007':[
  ['comp-motor-01','Compressor Motor','Drive bay',['Current probe','Temperature probe'],drive],
  ['comp-tank-01','Air Receiver','Pressure vessel',['Certified pressure transducer','Temperature probe'],['Tank pressure (bar)','Tank temperature']],
  ['comp-air-end-01','Compressor Air End','Compression chamber',['Vibration probe','Temperature probe'],temp],
  ['comp-bearings-01','Air-End Bearings','Rotor bearings',['Accelerometer','Temperature probe'],temp],
  ['comp-oil-separator-01','Oil Separator','Separation circuit',['Differential pressure probe','Oil quality probe'],['Filter pressure drop','Oil condition']],
  ['comp-aftercooler-01','Aftercooler','Discharge circuit',['Temperature sensor','Flow sensor'],['Outlet temperature','Cooling performance']],
  ['comp-pressure-sensor-01','Receiver Pressure Sensor','Air receiver',['Pressure transducer'],['Receiver pressure (bar)']],
  ['comp-unloader-valve-01','Unloader Valve','Air outlet',['Valve position sensor'],['Valve status']],
  ['comp-air-filter-01','Inlet Air Filter','Intake',['Differential pressure probe'],['Intake restriction']],
  ['comp-belt-drive-01','Drive Belt','Air-end transmission',['Speed / belt-tension sensor'],['Belt slip','Tension']],
  ['comp-drain-valve-01','Condensate Drain','Receiver low point',['Level sensor'],['Condensate level']],
  ['comp-electrical-panel-01','Electrical Panel','Controller module',['Current sensor','Thermal probe'],['Current draw','Cabinet temperature']],
 ],
 'motor-008':[
  ['motor-shaft-01','Motor Shaft','Drive end',['Vibration accelerometer','Rotary encoder'],['Shaft vibration','Shaft RPM']],
  ['motor-base-01','Mounting Feet','Base foundation',['Vibration sensor','Strain gauge'],['Foot vibration','Mounting strain']],
  ['motor-stator-01','Motor Stator','Main housing',['Winding temperature probe','Current sensor'],drive],
  ['motor-bearing-drive-01','Drive-End Bearing','Output shaft',['Temperature probe','Accelerometer'],temp],
  ['motor-terminal-box-01','Terminal Box','Top enclosure',['Thermal probe','Voltage monitor'],['Terminal temperature','Phase voltage']],
  ['motor-cooling-fan-01','Cooling Fan','Non-drive end',['Speed sensor','Airflow sensor'],['Fan RPM','Airflow']],
  ['motor-rotor-01','Motor Rotor','Inner rotating stack',['Current signature analysis'],['Rotor fault signature']],
  ['motor-winding-01','Motor Winding','Stator winding',['RTD','Current monitor'],drive],
  ['motor-temperature-sensor-01','Thermal Pickup','Upper winding',['RTD / thermistor'],['Motor temperature (°C)']],
  ['motor-coupling-01','Output Coupling','Drive transmission',['Accelerometer'],['Coupling vibration']],
  ['motor-vibration-point-01','Vibration Pickup','Housing sensor pad',['Accelerometer'],['Vibration RMS (mm/s)']],
  ['motor-bearings-fan-01','Non-Drive Bearing','Cooling-fan end',['Temperature sensor','Accelerometer'],temp],
 ]
}
export function enrichMonitoringCatalog(existing:Component[]):Component[]{
 const byId=new Set(existing.map(c=>c.id));const planned:Component[]=[]
 for (const [machineId,items] of Object.entries(monitorPlan)){
  for(const [id,name,location,suggestedSensors,plannedMetrics] of items){
   if(byId.has(id))continue
   planned.push({id,machineId,name,location,type:'Inspection / sensor target',status:'unknown',sensorIds:[],riskScore:0,
    basis:'No sensor installed or calibrated; risk not evaluated',readings:{},recommendedAction:'Configure and calibrate appropriate sensors before enabling condition assessment.',
    isCatalogOnly:true,suggestedSensors,plannedMetrics})
  }
 }
 return planned
}
export function monitoringDetails(component:Component){
 const entry=monitorPlan[component.machineId]?.find(item=>item[0]===component.id)
 return {suggestedSensors:component.suggestedSensors||entry?.[3]||[],plannedMetrics:component.plannedMetrics||entry?.[4]||[]}
}
