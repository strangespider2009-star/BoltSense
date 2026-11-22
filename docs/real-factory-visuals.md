# Real factory imagery — sources and behavior
BoltSense uses non-watermarked, licensed Pexels visuals instead of animated flames and decorative 3D animation on the landing page.
The original Getty-watermarked user reference image was not copied, edited, or distributed. The user's CNC photo is also a visual reference only, not an asset shipped in the repository.

## Sources (Pexels License: https://www.pexels.com/license/)
- Hero factory sparks: Michael Orshan, photo 36003964: https://www.pexels.com/photo/industrial-worker-grinding-metal-with-sparks-36003964/
- Real machining footage: Tima Miroshnichenko, video 4941355: https://www.pexels.com/video/metal-business-work-production-4941355/
- CNC photo: Mikhail Nilov, photo 9242913: https://www.pexels.com/photo/close-up-photo-of-an-industrial-machine-9242913/
- Lathe 28929510; Conveyor 12703176; Hydraulic press 5962644; Robotic arm 34207359; Pump 12482974; Compressor 9754814; General industrial motor/factory equipment 5953729. See client/src/data/industrialMedia.ts for all CDN URLs.

## Scroll behavior
The muted, inline film starts when its section enters view and pauses outside view. A pause/play button is provided. If reduced-motion is preferred, still photography is shown. If the video cannot load, it falls back to a still Pexels poster. No synthetic sparks or flames are superimposed.

External CDN availability can affect appearance. For robust production deployments, self-host authorized copies of the assets and replace URLs in client/src/data/industrialMedia.ts.

The 107 monitoring targets and selectable procedural 3D parts remain unchanged. Photographs are *reference imagery*, not actual BoltSense-connected hardware. Demo telemetry is simulated.
