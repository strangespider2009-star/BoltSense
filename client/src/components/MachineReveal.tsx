import { industrialMedia } from '../data/industrialMedia'

/**
 * One full-hero photographic reveal layer. Its image is completely transparent
 * until the parent hero is hovered/focused; only the local cursor mask exposes
 * details. This has no independent hover state to remain stuck after exit.
 */
export function MachineReveal() {
 return <div className="hero-full-reveal" aria-hidden="true">
  <img className="hero-full-reveal-image" src={industrialMedia.cnc} alt="" fetchPriority="high" />
  <div className="hero-full-reveal-vignette"/>
  <div className="hero-full-reveal-topline"><span className="hero-full-reveal-dot"/> PRECISION MACHINERY <span>VISUAL INSPECTION / 01</span></div>
  <div className="hero-full-reveal-bottom">
   <span className="hero-full-reveal-crosshair">+</span>
   <div><strong>Every detail matters.</strong><small>MOVE THE CURSOR ANYWHERE IN THIS PANEL TO REVEAL THE MACHINE</small></div>
  </div>
 </div>
}
