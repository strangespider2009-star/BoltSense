import { useEffect,useRef } from 'react'
export function Glow(){
 const ref=useRef<HTMLDivElement>(null)
 useEffect(()=>{const node=ref.current;if(!node||matchMedia('(prefers-reduced-motion: reduce)').matches||matchMedia('(pointer: coarse)').matches)return
  let x=-400,y=-400,tx=x,ty=y,frame=0,active=false
  const move=(e:PointerEvent)=>{tx=e.clientX;ty=e.clientY;active=true;node.style.opacity='.58'}
  const leave=()=>{active=false;node.style.opacity='0'}
  const tick=()=>{x+=(tx-x)*.15;y+=(ty-y)*.15;node.style.transform=`translate3d(${x-260}px,${y-260}px,0)`;frame=requestAnimationFrame(tick)}
  window.addEventListener('pointermove',move);document.addEventListener('mouseleave',leave);frame=requestAnimationFrame(tick)
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('pointermove',move);document.removeEventListener('mouseleave',leave);if(!active)node.style.opacity='0'}
 },[])
 return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}
