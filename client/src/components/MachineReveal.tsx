import { useEffect, useRef, useState } from 'react'
import { industrialMedia } from '../data/industrialMedia'

/** A real photograph is exposed only through a soft pointer-controlled inspection window. */
export function MachineReveal() {
 const surface = useRef<HTMLDivElement>(null)
 const [inspecting, setInspecting] = useState(false)
 const [reducedMotion, setReducedMotion] = useState(false)

 useEffect(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  const update = () => setReducedMotion(preference.matches)
  update()
  preference.addEventListener('change', update)
  return () => preference.removeEventListener('change', update)
 }, [])

 const placeSpotlight = (clientX: number, clientY: number) => {
  const el = surface.current
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = Math.max(0, Math.min(100, (clientX - rect.left) / rect.width * 100))
  const y = Math.max(0, Math.min(100, (clientY - rect.top) / rect.height * 100))
  el.style.setProperty('--reveal-x', `${x}%`)
  el.style.setProperty('--reveal-y', `${y}%`)
 }

 return <div
  ref={surface}
  className={`hero-art hero-machine-reveal ${inspecting ? 'is-inspecting' : ''} ${reducedMotion ? 'reveal-reduced-motion' : ''}`}
  tabIndex={0}
  aria-label="Move the pointer over this industrial CNC machine photograph to reveal its details, or focus using your keyboard"
  onPointerEnter={event => {
   if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
    placeSpotlight(event.clientX, event.clientY)
    setInspecting(true)
   }
  }}
  onPointerMove={event => {
   if (event.pointerType === 'mouse' || event.pointerType === 'pen') placeSpotlight(event.clientX, event.clientY)
  }}
  onPointerLeave={() => setInspecting(false)}
  onFocus={() => {
   surface.current?.style.setProperty('--reveal-x', '51%')
   surface.current?.style.setProperty('--reveal-y', '48%')
   setInspecting(true)
  }}
  onBlur={() => setInspecting(false)}
 >
  <img className="reveal-machine-shadow" src={industrialMedia.cnc} alt="Real industrial CNC machinery shown in a darkened inspection view" fetchPriority="high" />
  <div className="reveal-machine-window" aria-hidden="true">
   <img src={industrialMedia.cnc} alt="" />
  </div>
  <div className="reveal-industrial-grid" aria-hidden="true" />
  <div className="reveal-topline">
   <span className="reveal-live-dot" />
   <span>PRECISION MACHINERY</span>
   <span className="reveal-topline-right">VISUAL INSPECTION / 01</span>
  </div>
  <div className="reveal-footer">
   <span className="reveal-crosshair" aria-hidden="true">+</span>
   <div>
    <strong>Every detail matters.</strong>
    <span>{reducedMotion ? 'Precision machinery · reference photograph' : inspecting ? 'DETAIL REVEALED · MOVE TO EXPLORE' : 'MOVE THE CURSOR TO REVEAL THE MACHINE'}</span>
   </div>
  </div>
 </div>
}
