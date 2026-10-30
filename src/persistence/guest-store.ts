import { LEVELS } from "../domain/contracts";
import type { Level } from "../domain/contracts";
import { runAutomaticOperation } from "../domain/operation-state";
import { openGuestDatabase } from "./guest-db";
import type { GuestDatabase } from "./guest-db";
export interface GuestPreferences {level:Level;selectedSenseId:string|null}
export interface GuestSenseFlags {favorite:boolean;studied:boolean}
export interface GuestSnapshot {preferences:GuestPreferences;flags:Record<string,GuestSenseFlags>}
export type GuestSaveStatus="ready"|"saved"|"session-only"|"unknown"|"conflict";
export interface GuestStorageStatus {mode:"persistent"|"session-only";reason:string|null;status:GuestSaveStatus}
export interface GuestWriteResult {status:Exclude<GuestSaveStatus,"ready">;snapshot:GuestSnapshot;reason?:string}
export interface GuestStoreOptions {indexedDB?:IDBFactory|null;timeoutMs?:number}
export interface GuestStore {
 load():Promise<GuestSnapshot>;refresh():Promise<GuestSnapshot>;getSnapshot():GuestSnapshot;getStorageStatus():GuestStorageStatus;
 patchPreferences(patch:Partial<GuestPreferences>):Promise<GuestWriteResult>;patchSenseFlags(id:string,patch:Partial<GuestSenseFlags>):Promise<GuestWriteResult>;patchFlags(id:string,patch:Partial<GuestSenseFlags>):Promise<GuestWriteResult>;
 subscribe(listener:()=>void):()=>void;close():void;
}
function object(value:unknown):value is Record<string,unknown>{return !!value&&typeof value==="object"&&!Array.isArray(value);}
function keys(value:Record<string,unknown>,expected:string[]):boolean{return Object.keys(value).sort().join(",")===expected.sort().join(",");}
export function validSenseId(value:unknown):value is string {if(typeof value!=="string"||!/^(A2|B1|B2|C1):\d{4}$/.test(value))return false;return Number(value.slice(3))<456;}
export function validateGuestPreferences(value:unknown):value is GuestPreferences{return object(value)&&keys(value,["level","selectedSenseId"])&&LEVELS.includes(value.level as Level)&&(value.selectedSenseId===null||(validSenseId(value.selectedSenseId)&&value.selectedSenseId.startsWith(`${value.level}:`)));}
export function validateGuestFlags(value:unknown):value is GuestSenseFlags{return object(value)&&keys(value,["favorite","studied"])&&typeof value.favorite==="boolean"&&typeof value.studied==="boolean";}
export function decodeGuestSnapshot(value:unknown):GuestSnapshot|null {
 if(!object(value)||!keys(value,["preferences","flags"])||!validateGuestPreferences(value.preferences)||!object(value.flags))return null;
 if(!Object.entries(value.flags).every(([id,flags])=>validSenseId(id)&&validateGuestFlags(flags)))return null;
 return structuredClone(value) as unknown as GuestSnapshot;
}
const EMPTY=():GuestSnapshot=>({preferences:{level:"A2",selectedSenseId:null},flags:{}});
const MEMORY_MESSAGE="Browser storage is unavailable. Choices are kept for this session only; existing browser data has not been reset.";
const UNKNOWN_MESSAGE="Save status unknown. Check saved state before retrying; an unacknowledged write may still have completed.";
export async function openGuestStore(sourceManifestId:string,options:GuestStoreOptions={}):Promise<GuestStore> {
 let snapshot=EMPTY();
 let database:GuestDatabase|null=null;
 let status:GuestStorageStatus={mode:"session-only",status:"session-only",reason:MEMORY_MESSAGE};
 let closed=false;
 let pending:((value:GuestSnapshot)=>boolean)|null=null;
 const listeners=new Set<()=>void>();
 const notify=()=>{for(const listener of listeners)listener();};
 const getSnapshot=()=>structuredClone(snapshot);
 try{
  database=await openGuestDatabase(sourceManifestId,options);
  const loaded=await runAutomaticOperation(()=>database!.load(),{kind:"read",timeoutMs:options.timeoutMs});
  if(loaded.status!=="ready")throw new Error("Guest read unavailable");
  snapshot=loaded.value;status={mode:"persistent",status:"ready",reason:null};
  database.onVersionChange=()=>{database=null;status={mode:"session-only",status:"session-only",reason:MEMORY_MESSAGE};notify();};
 }catch{database?.close();database=null;}
 async function refresh(){
  if(!database||closed)return getSnapshot();
  const db=database;
  const result=await runAutomaticOperation(()=>db.load(),{kind:"read",timeoutMs:options.timeoutMs,isCurrent:()=>!closed&&database===db});
  if(closed||database!==db)return getSnapshot();
  if(result.status==="ready"){
   snapshot=result.value;
   if(pending){status={mode:"persistent",status:pending(snapshot)?"saved":"conflict",reason:pending(snapshot)?null:"Saved state differs from the pending choice. Review it before making another explicit change."};pending=null;}
   else status={mode:"persistent",status:"ready",reason:null};
   notify();
  }else{status={...status,status:"unknown",reason:UNKNOWN_MESSAGE};notify();}
  return getSnapshot();
 }
 const onFocus=()=>{void refresh();};
 if(typeof window!=="undefined")window.addEventListener("focus",onFocus);
 const result=(reason?:string):GuestWriteResult=>({status:status.status==="ready"?"saved":status.status,snapshot:getSnapshot(),...(reason?{reason}:{})});
 async function patch(apply:(value:GuestSnapshot)=>GuestSnapshot,write:(db:GuestDatabase)=>Promise<void>,matches:(value:GuestSnapshot)=>boolean):Promise<GuestWriteResult>{
  if(closed)throw new Error("Guest context is closed");
  const desired=apply(snapshot);
  if(!decodeGuestSnapshot(desired))throw new RangeError("Invalid Guest preferences or flags");
  if(!database){snapshot=desired;status={mode:"session-only",status:"session-only",reason:MEMORY_MESSAGE};notify();return result(MEMORY_MESSAGE);}
  if(status.status==="unknown"){return result(UNKNOWN_MESSAGE);}
  const db=database;
  const saved=await runAutomaticOperation(async()=>{await write(db);return db.load();},{kind:"write",timeoutMs:options.timeoutMs,isCurrent:()=>!closed&&database===db});
  if(saved.status==="stale"){
   if(closed)return {status:"unknown",snapshot:getSnapshot(),reason:"Guest context changed. Review choices in the active workspace."};
   snapshot=desired;status={mode:"session-only",status:"session-only",reason:MEMORY_MESSAGE};notify();return result(MEMORY_MESSAGE);
  }
  if(saved.status==="saved"){snapshot=saved.value;status={mode:"persistent",status:"saved",reason:null};pending=null;}
  else{snapshot=desired;pending=matches;status={mode:"persistent",status:"unknown",reason:UNKNOWN_MESSAGE};}
  notify();return result(status.reason??undefined);
 }
 async function patchPreferences(change:Partial<GuestPreferences>){
  if(!object(change)||Object.keys(change).some(k=>k!=="level"&&k!=="selectedSenseId"))throw new RangeError("Invalid preference fields");
  return patch(s=>({...s,preferences:{...s.preferences,...change}}),db=>db.patchPreferences(change),s=>Object.entries(change).every(([k,v])=>s.preferences[k as keyof GuestPreferences]===v));
 }
 async function patchSenseFlags(id:string,change:Partial<GuestSenseFlags>){
  if(!validSenseId(id)||!object(change)||Object.entries(change).some(([k,v])=>(k!=="favorite"&&k!=="studied")||typeof v!=="boolean"))throw new RangeError("Invalid flag fields");
  return patch(s=>({...s,flags:{...s.flags,[id]:{...(s.flags[id]??{favorite:false,studied:false}),...change}}}),db=>db.patchFlags(id,change),s=>Object.entries(change).every(([k,v])=>s.flags[id]?.[k as keyof GuestSenseFlags]===v));
 }
 return {load:async()=>getSnapshot(),refresh,getSnapshot,getStorageStatus:()=>({...status}),patchPreferences,patchSenseFlags,patchFlags:patchSenseFlags,subscribe:listener=>{listeners.add(listener);return()=>{listeners.delete(listener);};},close:()=>{closed=true;database?.close();listeners.clear();if(typeof window!=="undefined")window.removeEventListener("focus",onFocus);}};
}
