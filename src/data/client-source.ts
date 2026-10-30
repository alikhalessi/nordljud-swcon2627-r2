import type { Level,LexiconCollection,Mission,MissionChecks } from "../domain/contracts";
import { SOURCE_MANIFEST_ID } from "./source-manifest";
import { runAutomaticOperation } from "../domain/operation-state";
export interface MissionPayload {mission:Mission;checks:MissionChecks}
const lexicons=new Map<Level,LexiconCollection>();
const missions=new Map<Level,MissionPayload>();
const inFlight=new Map<string,Promise<unknown>>();
async function read<T>(key:string,url:string,validate:(value:T)=>boolean):Promise<T>{
 const previous=inFlight.get(key);if(previous)return previous as Promise<T>;
 const request=runAutomaticOperation(async signal=>{
  const response=await fetch(url,{signal,credentials:"omit",cache:"no-store",headers:{Accept:"application/json"}});
  if(!response.ok)throw new Error("Public source unavailable");
  const value=await response.json() as T;
  if(!validate(value))throw new Error("Source response identity unavailable");
  return value;
 },{kind:"read"}).then(result=>{if(result.status!=="ready")throw new Error("Source read unavailable");return result.value;}).finally(()=>inFlight.delete(key));
 inFlight.set(key,request);return request;
}
export async function getClientLexicon(level:Level):Promise<LexiconCollection>{
 const cached=lexicons.get(level);if(cached)return cached;
 const collection=await read<LexiconCollection>(`lexicon:${level}`,`/api/lexicon?level=${level}`,value=>value?.level===level&&value.sourceManifestId===SOURCE_MANIFEST_ID&&Array.isArray(value.records)&&value.records.length===456);
 lexicons.set(level,collection);return collection;
}
export async function getClientMission(level:Level):Promise<MissionPayload>{
 const cached=missions.get(level);if(cached)return cached;
 const payload=await read<MissionPayload>(`mission:${level}`,`/api/missions?level=${level}`,value=>value?.mission?.level===level&&value.mission.sourceManifestId===SOURCE_MANIFEST_ID&&!!value.checks?.comprehension&&!!value.checks?.verbForm);
 missions.set(level,payload);return payload;
}
