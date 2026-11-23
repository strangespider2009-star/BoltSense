/**
 * Royalty-free photographic references from Pexels (https://www.pexels.com/license/).
 * Photos illustrate machine classes; they are not exact models of the demo assets.
 * No Getty Images user reference has been included or altered.
 * All external image URLs are overrideable if the app is later self-hosted.
 */
export const industrialMedia = {
  cnc: 'https://images.pexels.com/photos/9242913/pexels-photo-9242913.jpeg?auto=compress&cs=tinysrgb&w=1280',
  lathe: 'https://images.pexels.com/photos/28929510/pexels-photo-28929510.jpeg?auto=compress&cs=tinysrgb&w=1280',
  conveyor: 'https://images.pexels.com/photos/12703176/pexels-photo-12703176.jpeg?auto=compress&cs=tinysrgb&w=1280',
  press: 'https://images.pexels.com/photos/5962644/pexels-photo-5962644.jpeg?auto=compress&cs=tinysrgb&w=1280',
  robot: 'https://images.pexels.com/photos/34207359/pexels-photo-34207359.jpeg?auto=compress&cs=tinysrgb&w=1280',
  pump: 'https://images.pexels.com/photos/12482974/pexels-photo-12482974.jpeg?auto=compress&cs=tinysrgb&w=1280',
  compressor: 'https://images.pexels.com/photos/9754814/pexels-photo-9754814.jpeg?auto=compress&cs=tinysrgb&w=1280',
  motor: 'https://images.pexels.com/photos/5953729/pexels-photo-5953729.jpeg?auto=compress&cs=tinysrgb&w=1280',
} as const

export const factorySparksImage = 'https://images.pexels.com/photos/36003964/pexels-photo-36003964.jpeg?auto=compress&cs=tinysrgb&w=1600'
export const factoryCncPoster = 'https://images.pexels.com/videos/4941355/pexels-photo-4941355.jpeg?auto=compress&cs=tinysrgb&w=1600'
/** Video by Tima Miroshnichenko, on Pexels: https://www.pexels.com/video/4941355/ */
export const factoryCncVideo = 'https://videos.pexels.com/video-files/4941355/4941355-hd_1920_1080_25fps.mp4'

// Real, documented stock footage previews. Clips illustrate machine classes or
// associated industrial processes; they do NOT show the monitored demo asset.
// URLs are Pexels originals; browser falls back to the corresponding machine photo
// if playback is unavailable. No footage is loaded until card hover/focus.
export type MachineFootage = { src: string; sourceUrl: string; context: string }
export const machineFootage: Partial<Record<keyof typeof industrialMedia, MachineFootage>> = {
 cnc: {
  src: factoryCncVideo,
  sourceUrl: 'https://www.pexels.com/video/metal-business-work-production-4941355/',
  context: 'CNC metalworking process',
 },
 lathe: {
  src: 'https://videos.pexels.com/video-files/5846709/5846709-hd_1920_1080_25fps.mp4',
  sourceUrl: 'https://www.pexels.com/video/metal-working-machinery-5846709/',
  context: 'Working metal lathe',
 },
 conveyor: {
  src: 'https://videos.pexels.com/video-files/4473250/4473250-hd_1920_1080_30fps.mp4',
  sourceUrl: 'https://www.pexels.com/video/factory-conveyor-belt-4473250/',
  context: 'Moving conveyor belt',
 },
 press: {
  src: 'https://videos.pexels.com/video-files/31751361/13528154_3840_2160_25fps.mp4',
  sourceUrl: 'https://www.pexels.com/video/industrial-metal-bending-process-close-up-31751361/',
  context: 'Industrial metal forming machine',
 },
 robot: {
  src: 'https://videos.pexels.com/video-files/6450803/6450803-hd_1920_1080_25fps.mp4',
  sourceUrl: 'https://www.pexels.com/video/automated-car-factory-6450803/',
  context: 'Automotive manufacturing robotic arms',
 },
 pump: {
  src: 'https://videos.pexels.com/video-files/30243446/12966146_4096_2160_25fps.mp4',
  sourceUrl: 'https://www.pexels.com/video/industrial-machinery-and-piping-inside-factory-30243446/',
  context: 'Industrial process plant and piping, not a specific pump',
 },
 motor: {
  src: 'https://videos.pexels.com/video-files/36272555/15382014_1920_1080_11fps.mp4',
  sourceUrl: 'https://www.pexels.com/video/electric-motor-assembly-in-workshop-setting-36272555/',
  context: 'Electric motor assembly workshop, not a running motor',
 },
 compressor: {
  src: 'https://videos.pexels.com/video-files/8469677/8469677-uhd_2160_3840_25fps.mp4',
  sourceUrl: 'https://www.pexels.com/video/a-man-using-an-air-compressor-8469677/',
  context: 'Air compressor being used in a workshop; not a production-line compressor',
 },
}
