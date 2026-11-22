# Foundry UI and full component visibility

The BoltSense prototype is visual-only and shows **simulated telemetry**. 3D equipment is procedural reference geometry; do not use it to derive maintenance or process-safety limits.

## Digital twin

- All 107 monitoring targets from `client/src/data/monitoringCatalog.ts` map to named `<Part id="...">` groups in the corresponding machine models.
- **All pins** enables numbered, clickable 3D markers for every part, including items without a hardware sensor mapping. On small screens the pins show numbers, and the selected pin expands to display its name. The component hierarchy is keyboard-accessible.
- **See internals** makes covers/casings translucent and removes their pointer occlusion, exposing bearings and other parts that would otherwise be hidden.
- Mapped sensor targets and proposed targets remain distinct. Planned measurements are never presented as live sensor readings.
- Run `npm run check:models` to verify catalog-to-3D IDs.

## Scroll-activated CNC preview

The landing page's production bay starts with its CNC mill stationary. Scrolling into the section activates an illustrative moving X axis, spindle rotation and vertical head motion; it stops when the section leaves the viewport. This is an animation, not a manufacturing or physics simulation. Reduced-motion OS preferences disable the movement.

## Theme

An industrial charcoal/black palette, metal tones, warm status accents, glowing furnace-orange highlights, and decorative flame/ember animations. Decorative effects do not modify health measurements or component risk status.
