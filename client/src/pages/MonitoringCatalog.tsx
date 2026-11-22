import { useMemo, useState } from 'react'
import { ArrowUpRight, BookOpenCheck, Cpu, Search, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { components, machines } from '../data/demo'
import { monitoringDetails, monitorPlan } from '../data/monitoringCatalog'
export function MonitoringCatalog(){
 const [machine,setMachine]=useState('all')
 const [search,setSearch]=useState('')
 const filtered=useMemo(()=>components.filter(c=>(machine==='all'||c.machineId===machine)&&`${c.name} ${c.id} ${c.location} ${monitoringDetails(c).plannedMetrics.join(' ')}`.toLowerCase().includes(search.toLowerCase())),[machine,search])
 const mapped=components.filter(c=>c.sensorIds.length>0).length
 return <div className="page">
  <div className="section-heading page-heading"><div><span className="eyebrow">BOLTSENSE / INDUSTRIAL SENSOR COVERAGE</span><h1>Component Monitoring Catalog</h1><p>What we can inspect on each of the eight industrial machines, which quantities matter, and which sensors would be needed.</p></div><div className="heading-icon"><BookOpenCheck size={25}/></div></div>
  <div className="catalog-summary">
   <div><span>MACHINES</span><strong>{machines.length}</strong><small>Dedicated 3D twins</small></div>
   <div><span>INSPECTION TARGETS</span><strong>{components.length}</strong><small>Identified assembly IDs</small></div>
   <div><span>DEMO SENSOR MAPPINGS</span><strong>{mapped}</strong><small>Simulated registry only</small></div>
   <div><span>PLANNED / NOT INSTALLED</span><strong>{components.length-mapped}</strong><small>No live readings claimed</small></div>
  </div>
  <div className="catalog-disclaimer"><Cpu size={18}/><div><strong>Engineering reference, not an installation report.</strong><p>Listed sensor options are proposed. Only machine-specific calibrated hardware can provide reliable measurements. This dashboard defaults to simulated data; no proposed sensor is presented as physically installed.</p></div></div>
  <div className="catalog-controls panel"><label>Machine <select value={machine} onChange={e=>setMachine(e.target.value)}><option value="all">All eight machines</option>{machines.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}</select></label><label className="catalog-search"><Search size={18}/><input placeholder="Search bearing, vibration, current…" value={search} onChange={e=>setSearch(e.target.value)}/></label><span>{filtered.length} results</span></div>
  <div className="catalog-tables">
  {machines.filter(m=>machine==='all'||m.id===machine).map(m=>{
   const rows=filtered.filter(c=>c.machineId===m.id)
   if(!rows.length)return null
   return <section className="panel catalog-machine" key={m.id}>
    <div className="panel-heading"><div><span className="eyebrow">{m.id.toUpperCase()} · {monitorPlan[m.id]?.length||0} MAPPED ASSEMBLIES</span><h3>{m.name}</h3></div><Link to={`/machines/${m.id}`} className="text-link">EXPLORE 3D TWIN <ArrowUpRight size={14}/></Link></div>
    <div className="table-scroll"><table className="catalog-table"><thead><tr><th>Component</th><th>Condition measurements to consider</th><th>Sensor options</th><th>Data coverage</th></tr></thead><tbody>
    {rows.map(c=>{const spec=monitoringDetails(c);return <tr key={c.id}>
     <td><strong>{c.name}</strong><small>{c.id}</small><small>{c.location}</small></td>
     <td>{spec.plannedMetrics.length?spec.plannedMetrics.map(v=><span className="catalog-pill" key={v}>{v}</span>):'Manual inspection'}</td>
     <td><div className="catalog-sensor"><Wrench size={13}/>{spec.suggestedSensors.join(' · ')||'Engineering review required'}</div></td>
     <td><span className={`catalog-state ${c.sensorIds.length?'mapped':'planned'}`}>{c.sensorIds.length?'Demo mapped':'Planned'}</span>{c.sensorIds.length>0&&<small>{c.sensorIds.join(', ')}</small>}</td>
    </tr>})}
    </tbody></table></div>
   </section>
  })}
  </div>
 </div>
}
