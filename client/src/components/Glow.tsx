import { useEffect, useRef } from 'react'
/** A soft warm focus and a wider, delayed faded trail that never blocks the UI. */
export function Glow(){
 const core = useRef<HTMLDivElement>(null)
 const trail = useRef<HTMLDivElement>(null)
 useEffect(() => {
  const front=core.current, back=trail.current
  if(!front || !back || window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
     window.matchMedia('(pointer: coarse)').matches) return
  let x=-600, y=-600, backX=-600, backY=-600, tx=-600, ty=-600, frame=0
  let idle:ReturnType<typeof setTimeout>|undefined
  const hide=()=>{front.style.opacity='0';back.style.opacity='0'}
  const move=(event:PointerEvent)=>{
   if(event.pointerType!=='mouse' && event.pointerType!=='pen')return
   tx=event.clientX;ty=event.clientY
   front.style.opacity='.88';back.style.opacity='.66'
   if(idle)clearTimeout(idle)
   idle=setTimeout(hide,1100)
  }
  const tick=()=>{
   x+=(tx-x)*.2;y+=(ty-y)*.2
   backX+=(tx-backX)*.085;backY+=(ty-backY)*.085
   front.style.transform=`translate3d(${x-270}px,${y-270}px,0)`
   back.style.transform=`translate3d(${backX-340}px,${backY-340}px,0)`
   frame=requestAnimationFrame(tick)
  }
  const visibility=()=>{if(document.hidden)hide()}
  window.addEventListener('pointermove',move,{passive:true})
  window.addEventListener('blur',hide)
  document.addEventListener('mouseleave',hide)
  document.addEventListener('visibilitychange',visibility)
  frame=requestAnimationFrame(tick)
  return ()=>{
   cancelAnimationFrame(frame)
   if(idle)clearTimeout(idle)
   window.removeEventListener('pointermove',move)
   window.removeEventListener('blur',hide)
   document.removeEventListener('mouseleave',hide)
   document.removeEventListener('visibilitychange',visibility)
  }
 },[])
 return <><div ref={trail} className="cursor-glow-trail" aria-hidden="true"/><div ref={core} className="cursor-glow cursor-glow-core" aria-hidden="true"/></>
}
