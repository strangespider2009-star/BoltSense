import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Film, Pause, Play, ShieldCheck, Wrench } from 'lucide-react'
import { factoryCncPoster, factoryCncVideo } from '../data/industrialMedia'

/** Filmed industrial machinery replaces the stylized Three.js scroll animation. */
export function ScrollForge(){
 const section = useRef<HTMLElement>(null)
 const video = useRef<HTMLVideoElement>(null)
 const [visible, setVisible] = useState(false)
 const [hovered, setHovered] = useState(false)
 const [finePointer, setFinePointer] = useState(false)
 const [preference, setPreference] = useState<'auto' | 'play' | 'pause'>('auto')
 const [playing, setPlaying] = useState(false)
 const [failed, setFailed] = useState(false)
 const [reduceMotion, setReduceMotion] = useState(false)

 useEffect(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const pointer = window.matchMedia('(hover: hover) and (pointer: fine)')
  const sync = () => {setReduceMotion(motion.matches);setFinePointer(pointer.matches)}
  sync()
  motion.addEventListener('change', sync)
  pointer.addEventListener('change', sync)
  return () => {motion.removeEventListener('change', sync);pointer.removeEventListener('change', sync)}
 }, [])
 useEffect(() => {
  if (!section.current) return
  if (!('IntersectionObserver' in window)) {setVisible(true);return}
  const observer = new IntersectionObserver(([entry]) => {
   setVisible(entry.isIntersecting && entry.intersectionRatio >= .26)
  }, { threshold: [0, .26, .5, 1] })
  observer.observe(section.current)
  return () => observer.disconnect()
 }, [])
 const shouldPlay = visible && !failed && !reduceMotion &&
  (preference === 'play' || (preference === 'auto' && (!finePointer || hovered)))
 useEffect(() => {
  const el = video.current
  if (!el) return
  if (!shouldPlay) {el.pause();setPlaying(false);return}
  const result = el.play()
  if (result) void result.then(() => setPlaying(true)).catch(() => setPlaying(false))
 }, [shouldPlay])
 const togglePlayback = () => setPreference(shouldPlay ? 'pause' : 'play')

 return <section className="factory-film" ref={section} aria-label="Real CNC machine footage activated by cursor hover or touch scrolling">
  <div className="factory-film-head">
   <div><span className="eyebrow"><Film size={14}/> FACTORY FLOOR / REAL WORKING MACHINERY</span><h2>Watch precision at work.</h2><p>Hover over the machine footage to see real CNC machinery in motion. On touch devices the video plays as you scroll into view. This is authentic footage, not CGI.</p></div>
   <div className="factory-film-note"><ShieldCheck size={16}/><span>FILMED MACHINERY<br/><strong>NOT LIVE TELEMETRY</strong></span></div>
  </div>
  <div className={`factory-film-stage ${playing?'factory-film-stage-active':''}`}
   onPointerEnter={event => {if(event.pointerType==='mouse'||event.pointerType==='pen')setHovered(true)}}
   onPointerLeave={() => setHovered(false)}
   onFocus={() => setHovered(true)}
   onBlur={() => setHovered(false)}>
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
     <span className="film-status"><Wrench size={14}/> {failed?'STILL IMAGE · FOOTAGE UNAVAILABLE':reduceMotion?'MOTION REDUCED':playing?'MACHINE WORKING':!visible?'SCROLL INTO VIEW':preference==='pause'?'PAUSED':finePointer?'HOVER TO START':'READY TO PLAY'}</span>
     <button className="film-control" type="button" onClick={togglePlayback} aria-label={shouldPlay ? 'Pause factory footage' : 'Play factory footage'} disabled={failed || reduceMotion}>
      {shouldPlay?<Pause size={15}/>:<Play size={15}/>} {shouldPlay?'Pause footage':'Play footage'}
     </button>
    </div>
   </div>
  </div>
  <div className="factory-film-caption"><span><ArrowDown size={14}/> HOVER TO START · SCROLL ON TOUCH</span><a href="https://www.pexels.com/video/metal-business-work-production-4941355/" target="_blank" rel="noreferrer">Footage: Tima Miroshnichenko / Pexels</a></div>
 </section>
}
