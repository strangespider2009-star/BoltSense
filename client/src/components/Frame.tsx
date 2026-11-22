import { useState } from 'react'
import { NavLink,Link,Outlet,useLocation } from 'react-router-dom'
import { Activity, Box, Bell, CalendarClock, ChevronRight, Cpu, Github, LayoutDashboard, Menu, Radar, X, Wifi, WifiOff, BookOpenCheck } from 'lucide-react'
import { Brand } from './Brand'
import { Glow } from './Glow'
import { useBoltStore } from '../store/useBoltStore'
import { useTelemetry } from '../hooks/useTelemetry'
const navigation=[{to:'/',label:'Overview',icon:LayoutDashboard},{to:'/machines',label:'Machine Fleet',icon:Box},{to:'/monitoring',label:'Component Catalog',icon:BookOpenCheck},{to:'/dashboard',label:'Live Monitoring',icon:Activity},{to:'/maintenance',label:'Predictive Care',icon:CalendarClock},{to:'/alerts',label:'Alert Center',icon:Bell},{to:'/sensors',label:'Sensors & IoT',icon:Cpu}]
export function Frame(){
 useTelemetry();const [open,setOpen]=useState(false);const mode=useBoltStore(s=>s.mode);const setMode=useBoltStore(s=>s.setMode);const connected=useBoltStore(s=>s.connected);const location=useLocation()
 const active=navigation.find(n=>location.pathname===n.to||n.to==='/machines'&&location.pathname.startsWith('/machines/'))?.label||'Workspace'
 return <div className="shell"><Glow/><aside className={`sidebar ${open?'sidebar-open':''}`}>
  <Link to="/" onClick={()=>setOpen(false)} aria-label="BoltSense home"><Brand/></Link><div className="sidebar-section">PLATFORM</div>
  <nav className="main-nav" aria-label="Main navigation">{navigation.map(({to,label,icon:Icon})=><NavLink key={to} to={to} end={to==='/'} className={({isActive})=>`nav-item ${isActive?'active':''}`} onClick={()=>setOpen(false)}><Icon size={18}/><span>{label}</span>{label==='Alert Center'&&mode==='demo'&&<span className="nav-count">3</span>}</NavLink>)}</nav>
  <div className="sidebar-bottom"><div className="node-card"><div className="node-title"><Radar size={17}/> SYSTEM NETWORK</div><div className="node-grid"><span>Gateway</span><strong>{mode==='demo'?'Simulation':connected?'Connected':'Disconnected'}</strong><span>Data source</span><strong>{mode==='demo'?'Sample dataset':'MQTT / API'}</strong></div></div><div className="sidebar-footer"><span className="tiny-dot"/>BoltSense Platform <span>v0.1.0</span></div></div>
 </aside>{open&&<button className="mobile-backdrop" aria-label="Close menu" onClick={()=>setOpen(false)}/>}
 <div className="main-area"><header className="topbar"><div className="topbar-left"><button className="mobile-menu icon-only" aria-label="Open menu" onClick={()=>setOpen(!open)}>{open?<X size={21}/>:<Menu size={21}/>}</button><span className="breadcrumb">WORKSPACE</span><ChevronRight size={14} className="muted"/><span className="breadcrumb-current">{active}</span></div><div className="topbar-right"><span className="topbar-clock">INDUSTRY 4.0 / DIGITAL TWIN</span><span className={`connection-badge ${mode==='live'&&!connected?'offline':''}`}>{mode==='demo'?<Activity size={14}/>:connected?<Wifi size={14}/>:<WifiOff size={14}/>} {mode==='demo'?'SIMULATION ACTIVE':connected?'LIVE FEED':'LIVE DISCONNECTED'}</span><button className="avatar" title="Demo operator">OP</button></div></header>
 <main className="content"><Outlet/></main><footer className="app-footer"><span>© BoltSense · Industrial condition monitoring prototype</span><span>Demo values are simulated. Not a certified safety system.</span><a href="https://github.com/strangespider2009-star/BoltSense" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16}/></a></footer></div>
 <div className="mode-switch" role="group" aria-label="Data mode"><span className="mode-label">DATA SOURCE</span><div><button className={mode==='demo'?'chosen':''} onClick={()=>setMode('demo')}>Demo</button><button className={mode==='live'?'chosen':''} onClick={()=>setMode('live')}>Live</button></div></div>
 </div>
}
