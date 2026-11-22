import { PrismaClient } from '@prisma/client'
let client:PrismaClient|undefined
export function database(){if(!process.env.DATABASE_URL||process.env.DATA_MODE!=='live')return null;if(!client)client=new PrismaClient();return client}
