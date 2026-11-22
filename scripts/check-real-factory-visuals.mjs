import { readFileSync } from 'node:fs'
import { strict as assert } from 'node:assert'
const content = (name) => readFileSync(new URL(`../${name}`, import.meta.url), 'utf8')
const home = content('client/src/pages/Home.tsx')
const film = content('client/src/components/ScrollForge.tsx')
const cards = content('client/src/components/MachineCard.tsx')
const media = content('client/src/data/industrialMedia.ts')
const scene = content('client/src/components/twin/CncModel.tsx')
const styles = content('client/src/style.css')
assert(home.includes('hero-sparks-photo'), 'Hero must use real factory photography')
assert(cards.includes('machine-photo'), 'Machine cards must use real equipment photos')
assert(film.includes('IntersectionObserver') && film.includes('<video'), 'Real video should play in viewport')
assert(film.includes('prefers-reduced-motion'), 'Film must honor reduced motion')
assert(film.includes('onError'), 'Footage must provide a graceful fallback')
assert(!scene.includes('useFrame') && !scene.includes('MachiningMotion'), 'CNC reference model must not animate')
assert(!home.includes('furnace-flames') && !home.includes('hero-rings'), 'No illustrated flames or hero animation')
assert(!styles.includes('.furnace-flames') && !styles.includes('.forge-embers'), 'Flame or ember CSS remains')
assert(!media.includes('gettyimages') && !media.includes('istockphoto'), 'Do not include a watermarked reference')
for (const key of ['cnc', 'lathe', 'conveyor', 'press', 'robot', 'pump', 'compressor', 'motor']) {
 assert(new RegExp(`\\b${key}:`).test(media), `No reference photograph for ${key}`)
}
console.log('Real factory visuals: 8 photo references, licensed video, no artificial flames or machine animation.')
