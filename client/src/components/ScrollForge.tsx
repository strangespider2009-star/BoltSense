import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Film, Pause, Play, ShieldCheck, Wrench } from 'lucide-react'
import { factoryCncPoster, factoryCncVideo } from '../data/industrialMedia'

/** Filmed industrial machinery replaces the stylized Three.js scroll animation. */
export function ScrollForge(){
 const section = useRef<HTMLElement>(null)
 const video = useRef<HTMLVideoElement>(null)
 const [visible, setVisible] = useState(false)
 const [enabled, setEnabled] = useState(true)
 const [playing, setPlaying] = useState(false)
 const [failed, setFailed] = useState(false)
 const [reduceMotion, setReduceMotion] = useState(false)

 useEffect(() => {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)')
  const sync = () => setReduceMotion(query.matches)
  sync()
  query.addEventListener('change', sync)
  return () => query.removeEventListener('change', sync)
 }, [])
 useEffect(() => {
  if (!section.current || !('IntersectionObserver' in window)) return
  const observer = new IntersectionObserver(([entry]) => {
   setVisible(entry.isIntersecting && entry.intersectionRatio >= .26)
  }, { threshold: [0, .26, .5, 1] })
  observer.observe(section.current)
  return () => observer.disconnect()
 }, [])
 useEffect(() => {
  const el = video.current
  if (!el) return
  if (!visible || reduceMotion || !enabled || failed) {
   el.pause()
   setPlaying(false)
   return
  }
  const play = el.play()
  if (play) void play.then(() => setPlaying(true)).catch(() => setPlaying(false))
 }, [visible, reduceMotion, enabled, failed])

 return <section className="factory-film" ref={section} aria-label="Real CNC machining footage activated by scrolling">
  <div className="factory-film-head">
   <div><span className="eyebrow"><Film size={14}/> FACTORY FLOOR / REAL WORKING MACHINERY</span><h2>Watch precision at work.</h2><p>Scroll into the production floor to watch authentic machining footage with industrial equipment in motion. The visuals are documentary footage, not a CGI simulation.</p></div>
   <div className="factory-film-note"><ShieldCheck size={16}/><span>FILMED MACHINERY<br/><strong>NOT LIVE TELEMETRY</strong></span></div>
  </div>
  <div className="factory-film-stage">
   <div className="factory-film-background" style={{backgroundImage:`url('${factoryCncPoster}')`}}/>
   {!failed && <video
    ref={video}
    className="factory-film-video"
    src={visible ? factoryCncVideo : undefined}
    poster={factoryCncPoster}
    muted loop playsInline preload="none"
    aria-label="Real CNC milling machine working in a metalworking factory"
    onPlay={() => setPlaying(true)}
    onPause={() => setPlaying(false)}
    onError={() => {setFailed(true);setPlaying(false)}}
   />}
   <div className="factory-film-wash"/>
   <div className="factory-film-content">
    <div className="factory-film-index"><span className="factory-film-live"/> SOURCE / LICENSED FACTORY FOOTAGE <span>01 — CNC MACHINING</span></div>
    <div className="factory-film-copy"><span>THE WORK BEHIND THE DATA</span><h3>Real machines.<br/>Real production.</h3><p>Digital inspection starts with a clear view of the physical process.</p></div>
    <div className="factory-film-foot">
     <span className="film-status"><Wrench size={14}/> {failed?'STILL IMAGE · FOOTAGE UNAVAILABLE':reduceMotion?'MOTION DISABLED':!visible?'SCROLL INTO VIEW':playing?'FILM PLAYING':enabled?'READY TO PLAY':'FILM PAUSED'}</span>
     <button className="film-control" type="button" onClick={() => setEnabled(v => !v)} aria-label={enabled ? 'Pause factory footage' : 'Play factory footage'} disabled={failed || reduceMotion}>
      {enabled?<Pause size={15}/>:<Play size={15}/>} {enabled?'Pause footage':'Play footage'}
     </button>
    </div>
   </div>
  </div>
  <div className="factory-film-caption"><span><ArrowDown size={14}/> VIDEO PLAYS AS YOU SCROLL INTO VIEW</span><a href="https://www.pexels.com/video/metal-business-work-production-4941355/" target="_blank" rel="noreferrer">Footage: Tima Miroshnichenko / Pexels</a></div>
 </section>
}
