export type MetricName='temperatureC'|'vibrationRmsMmS'|'loadN'|'motorCurrentA'|'rpm'|'lubricationIndex'
export type Threshold={warning:number;critical:number;direction?:'above'|'below'}
export type Limits=Partial<Record<MetricName,Threshold>>
export interface RiskResult {score:number|null;severity:'healthy'|'warning'|'critical'|'unknown';explanation:string;missingInputs:string[];modelVersion:string;confidence:null}
export function computeRisk(readings:Partial<Record<MetricName,number>>,limits:Limits):RiskResult {
 const available=(Object.keys(limits) as MetricName[]).filter(k=>readings[k]!==undefined)
 const missingInputs=(Object.keys(limits) as MetricName[]).filter(k=>readings[k]===undefined)
 if(!available.length)return {score:null,severity:'unknown',explanation:'No configured threshold has a corresponding sensor measurement; cannot assess risk.',missingInputs,modelVersion:'rules-v0.1',confidence:null}
 let severity:RiskResult['severity']='healthy';let score=10;const evidence:string[]=[]
 for(const metric of available){const value=readings[metric]!;const t=limits[metric]!;if(!Number.isFinite(value)||!Number.isFinite(t.warning)||!Number.isFinite(t.critical)||t.warning===t.critical)continue
  const above=t.direction!=='below';const critical=above?value>=t.critical:value<=t.critical;const warning=above?value>=t.warning:value<=t.warning
  if(critical){severity='critical';score=Math.max(score,90);evidence.push(`${metric}: ${value} crossed critical limit ${t.critical}`)}
  else if(warning){if(severity!=='critical')severity='warning';score=Math.max(score,60);evidence.push(`${metric}: ${value} crossed warning limit ${t.warning}`)}
  else evidence.push(`${metric}: ${value} within configured limits`)
 }
 return {score,severity,explanation:evidence.join('; ')||'Threshold configuration is invalid; review limits.',missingInputs,modelVersion:'rules-v0.1',confidence:null}
}
