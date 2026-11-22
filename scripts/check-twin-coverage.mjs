import { readFileSync } from 'node:fs'
const root = new URL('../', import.meta.url)
const read = rel => readFileSync(new URL(rel,root),'utf8')
const catalog = read('client/src/data/monitoringCatalog.ts')
const cnc = read('client/src/components/twin/CncModel.tsx')
const others = read('client/src/components/twin/OtherModels.tsx')
const ids = Array.from(catalog.matchAll(/^\s*\['([^']+)','[^']+','[^']+',\[/gm),m=>m[1])
const fixed = Array.from((cnc+'\n'+others).matchAll(/<Part\s+id="([^"]+)"/g),m=>m[1])
const visible = new Set(fixed)
// Conveyor supports are generated with four indexed <Part> groups.
if(others.includes('conv-support-${i+1}-01')) for(let n=1;n<=4;n++) visible.add('conv-support-'+n+'-01')
const missing=ids.filter(id=>!visible.has(id))
const extra=[...visible].filter(id=>!ids.includes(id))
const duplicated=ids.filter((id,i)=>ids.indexOf(id)!==i)
console.log('3D coverage: '+(ids.length-missing.length)+'/'+ids.length+' machine components')
if(ids.length!==107||missing.length||extra.length||duplicated.length){console.error({missing,extra,duplicated,catalogCount:ids.length});process.exit(1)}
