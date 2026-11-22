import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { catalog,catalogComponents,registeredSensors } from '../src/lib/catalog.js'
const db=new PrismaClient()
async function main(){
 for(const machine of catalog)await db.machine.upsert({where:{id:machine.id},update:{name:machine.name,type:machine.type,category:machine.category,description:machine.description},create:{...machine,status:'unknown'}})
 for(const component of catalogComponents)await db.component.upsert({where:{id:component.id},update:{name:component.name},create:{...component,status:'unknown'}})
 for(const sensor of registeredSensors)await db.sensor.upsert({where:{id:sensor.id},update:{componentId:sensor.componentId,machineId:sensor.machineId},create:{id:sensor.id,machineId:sensor.machineId,componentId:sensor.componentId,kind:sensor.kind,unit:sensor.unit,hardwareId:sensor.hardwareId,sampleRateHz:sensor.sampleRateHz,status:'offline'}})
 console.info('Seeded machine/component/sensor registry. No measured sensor readings were fabricated.')
}
main().finally(()=>db.$disconnect())
