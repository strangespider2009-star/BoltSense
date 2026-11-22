import { clsx, type ClassValue } from 'clsx'
export const cn=(...values:ClassValue[])=>clsx(values)
export const fmtDate=(date:string|null)=>date?new Date(date).toLocaleString():'N/A'
