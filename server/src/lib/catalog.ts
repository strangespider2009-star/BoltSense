// Explicit example data, never a source of physical sensor measurements.
export const catalog=[
 {id:'cnc-001',name:'CNC Milling Machine',type:'VMX-450',category:'Machining',description:'Vertical machining center'},
 {id:'lathe-002',name:'CNC Lathe',type:'TL-220',category:'Machining',description:'Precision turning center'},
 {id:'conv-003',name:'Conveyor Belt',type:'CB-900',category:'Handling',description:'Material handling system'},
 {id:'press-004',name:'Hydraulic Press',type:'HP-120',category:'Forming',description:'Industrial hydraulic press'},
 {id:'robot-005',name:'Robotic Arm',type:'RX-600',category:'Robotics',description:'Six-axis industrial robot'},
 {id:'pump-006',name:'Industrial Pump',type:'PMP-310',category:'Utilities',description:'Process circulation pump'},
 {id:'comp-007',name:'Air Compressor',type:'AC-500',category:'Utilities',description:'Industrial air supply'},
 {id:'motor-008',name:'Electric Motor',type:'EM-750',category:'Drives',description:'Industrial electric motor'}
]
export const catalogComponents=[
 {id:'spindle-bearing-01',machineId:'cnc-001',name:'Spindle Bearing',type:'Bearing',location:'Upper spindle assembly'},
 {id:'spindle-motor-01',machineId:'cnc-001',name:'Spindle Motor',type:'Motor',location:'Top drive'},
 {id:'x-axis-guide-01',machineId:'cnc-001',name:'X-Axis Linear Guide',type:'Linear guide',location:'Work table'},
 {id:'coolant-pump-01',machineId:'cnc-001',name:'Coolant Pump',type:'Pump',location:'Machine base'},
 {id:'tool-holder-01',machineId:'cnc-001',name:'Tool Holder',type:'Tool interface',location:'Spindle nose'},
 {id:'z-axis-screw-01',machineId:'cnc-001',name:'Z-Axis Ball Screw',type:'Ball screw',location:'Vertical column'},
 {id:'power-coupling-01',machineId:'cnc-001',name:'Drive Coupling',type:'Coupling',location:'Motor drive'},
 {id:'lathe-chuck-01',machineId:'lathe-002',name:'Main Chuck',type:'Workholding',location:'Headstock'},
 {id:'conv-idler-01',machineId:'conv-003',name:'Idler Roller',type:'Bearing',location:'Conveyor head'},
 {id:'press-cylinder-01',machineId:'press-004',name:'Hydraulic Cylinder',type:'Hydraulics',location:'Upper press'},
 {id:'robot-joint-03',machineId:'robot-005',name:'Elbow Joint',type:'Joint',location:'Joint 3'},
 {id:'pump-bearing-01',machineId:'pump-006',name:'Pump Bearing',type:'Bearing',location:'Drive end'},
 {id:'comp-motor-01',machineId:'comp-007',name:'Compressor Motor',type:'Motor',location:'Motor bay'},
 {id:'motor-shaft-01',machineId:'motor-008',name:'Motor Shaft',type:'Shaft',location:'Shaft end'}
]
export const registeredSensors=[
 ['temp-01','spindle-bearing-01','Temperature','°C'],['vibration-01','spindle-bearing-01','Vibration','mm/s'],
 ['current-01','spindle-motor-01','Electrical','A'],['load-01','x-axis-guide-01','Load','N'],
 ['temp-02','coolant-pump-01','Temperature','°C'],['vibration-02','z-axis-screw-01','Vibration','mm/s'],
 ['temp-03','power-coupling-01','Temperature','°C']
].map(([id,componentId,kind,unit])=>({id,machineId:'cnc-001',componentId,hardwareId:`PI-CNC-A/${id}`,kind,unit,sampleRateHz:1,status:'offline',lastSeen:null,calibratedAt:null}))
export const demoAlerts=[
 {id:'demo-alert-1',machineId:'cnc-001',componentId:'spindle-bearing-01',severity:'warning',message:'SIMULATION: spindle bearing vibration above example warning threshold',measured:4.2,threshold:3.5,timestamp:new Date('2026-11-22T05:00:00Z'),acknowledged:false,resolved:false},
 {id:'demo-alert-2',machineId:'press-004',componentId:'press-cylinder-01',severity:'critical',message:'SIMULATION: hydraulic cylinder load above example critical threshold',measured:8900,threshold:8500,timestamp:new Date('2026-11-22T05:05:00Z'),acknowledged:false,resolved:false}
]
export const demoMaintenance=[{id:'demo-wo-1',machineId:'cnc-001',componentId:'spindle-bearing-01',title:'DEMO: bearing inspection',scheduledAt:new Date('2026-11-27T09:00:00Z'),status:'scheduled',technician:'Unassigned',notes:'Sample work order'}]
export const exampleThresholds={vibrationRmsMmS:{warning:3.5,critical:7},temperatureC:{warning:65,critical:80}}
