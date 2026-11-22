# BoltSense — real factory visuals

## What changed

The website landing page now uses real industrial photography and real machine-operation film footage in place of the old procedural CNC animation, illustrated factory icon, rising ember particles, and decorative flames. Machine fleet cards show representative real-world equipment photos, not generated drawings. In the workspace, 3D parts are still interactive reference geometry used to inspect sensor mappings; the adjacent photograph makes that distinction clear.

## Footage and image licensing

All **new media assets** in this version are sourced from [Pexels](https://www.pexels.com/license/). Pexels permits use of photos and video in websites without required attribution; we credit the creators and provide the source links for traceability. The website references Pexels CDN URLs directly rather than bundling copyrighted or watermarked user reference images. Media is only illustrative and must never imply a specific machine brand, maker, performance, or actual BoltSense installation.

- Hero: metalworking sparks — [Michael Orshan, Pexels photo 36003964](https://www.pexels.com/photo/industrial-worker-grinding-metal-with-sparks-36003964/)
- Real machining video: [Tima Miroshnichenko, Pexels video 4941355](https://www.pexels.com/video/metal-business-work-production-4941355/)
- CNC reference photo: [Mikhail Nilov, Pexels photo 9242913](https://www.pexels.com/photo/close-up-photo-of-an-industrial-machine-9242913/)
- Lathe: [Pexels 28929510](https://www.pexels.com/photo/industrial-cnc-lathe-in-a-busy-machine-shop-28929510/)
- Conveyor: [Pexels 12703176](https://www.pexels.com/photo/close-up-of-conveyer-belt-12703176/)
- Hydraulic press: [Pexels 5962644](https://www.pexels.com/photo/hydraulic-press-in-workplace-5962644/)
- Robot arm: [Pexels 34207359](https://www.pexels.com/photo/industrial-robot-arm-in-a-manufacturing-facility-34207359/)
- Pump: [Pexels 12482974](https://www.pexels.com/photo/water-pump-in-a-workshop-12482974/)
- Compressor: [Pexels 9754814](https://www.pexels.com/photo/an-air-compressor-9754814/)
- Motor/factory equipment: [Pexels 5953729](https://www.pexels.com/photo/an-industrial-machine-in-a-factory-5953729/)

**The first image provided by the requester included a Getty watermark. It was used only as an aesthetic reference. We did not copy, crop, erase, or redistribute it.** The second image was used only as a reference for the CNC enclosure design, and no manufacturer logo is reproduced.

## Behavior

The CNC video starts **muted, inline, and looped** when the production section enters the viewport, and it pauses when scrolled out of view. The visitor can pause/resume it. When `prefers-reduced-motion` is active, the video does not autoplay and a photographic poster is shown instead. If the external video fails to load, the poster remains in place. No synthesized sparks are overlaid on the footage.

The page displays a **real footage / not live sensor data** label. All dashboard telemetry remains simulated unless actual hardware is registered and live mode is connected.

## Media hosting note

The hero images and video are loaded from the third-party Pexels CDN. Production sites should download authorized versions for self-hosting and caching when possible, and budget for network bandwidth. If the external CDN is blocked or down, video falls back to the Pexels poster. Replace constants in `client/src/data/industrialMedia.ts` to serve self-hosted media (e.g. `/media/cnc-machining.mp4`) without changing the component logic.

The clickable Three.js digital twins remain **procedural reference meshes**, not exact physical-model scans; actual GLB/CAD assets can be installed later after checking license and component ID mappings.
