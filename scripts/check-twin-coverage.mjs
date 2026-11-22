import { readFileSync } from 'node:fs'
import { join } from 'node:path'
const root = new URL('../', import.meta.url)
const read = rel => readFileSync(new URL(rel,root),'utf8')
const catalog = read('client/src/data/monitoringCatalog.ts')
const cnc = read('client/src/components/twin/CncModel.tsx')
const others = read('client/src/components/twin/OtherModels.tsx')
const ids = [...catalog.matchAll(/^\s*\['([^']+)','[^']+','[^']+',\[/gm)].map(m=>m[1])
const staticParts = [...(cnc+'\n'+others).matchAll(/<Part\s+id="([^"]+)"/g)].map(m=>m[1])
const visible = new Set(staticParts)
// These four idler supports are modeled with one data-driven <Part> per position.
if(others.includes('id={`conv-support-${i+1}-01`}')){
 for(let i=1;i<=4;i++)visible.add(`conv-support-${i}-01`)
}
const missing = ids.filter(id=>!visible.has(id))
const duplicates = ids.filter((id,i)=>ids.indexOf(id)!==i)
const unlisted = [...visible].filter(id=>!ids.includes(id))
const message = `3D locator coverage: ${ids.length-missing.length}/${ids.length} monitoring targets. ${missing.length} missing, ${duplicates.length} duplicated, ${unlisted.length} unlisted.`
console.log(message)
if(missing.length||duplicates.length||unlisted.length){
 console.error({missing,duplicates,unlisted})
 process.exit(1)
}
if(ids.length!==107){console.error(`Expected 107 catalog targets; got ${ids.length}`);process.exit(1)}
