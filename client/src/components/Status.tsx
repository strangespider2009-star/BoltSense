import type { Health } from '../types'
export function Status({value}:{value:Health|'online'|'offline'|'stale'}){return <span className={`status status-${value}`}><span className="status-dot"/>{value}</span>}
