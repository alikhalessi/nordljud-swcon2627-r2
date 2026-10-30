import { decodeGuestSnapshot } from "./guest-store";
import type { GuestPreferences, GuestSenseFlags, GuestSnapshot, GuestStoreOptions } from "./guest-store";
export interface GuestDatabase { load():Promise<GuestSnapshot>; patchPreferences(patch:Partial<GuestPreferences>):Promise<void>; patchFlags(senseId:string,patch:Partial<GuestSenseFlags>):Promise<void>; close():void; onVersionChange?:()=>void }
const EMPTY = ():GuestSnapshot => ({preferences:{level:"A2",selectedSenseId:null},flags:{}});
const STORE = "learning";
export function guestDatabaseName(sourceManifestId:string):string {
 if (!sourceManifestId || sourceManifestId.length > 240) throw new RangeError("A bounded source revision is required");
 return `nordljud-condition-b-core-v1:${encodeURIComponent(sourceManifestId)}`;
}
export function openGuestDatabase(sourceManifestId:string,options:GuestStoreOptions={}):Promise<GuestDatabase> {
 const factory = options.indexedDB === undefined ? globalThis.indexedDB : options.indexedDB;
 if (!factory) return Promise.reject(new Error("Browser storage unavailable"));
 return new Promise((resolve,reject)=>{
  let finished=false;
  const request=factory.open(guestDatabaseName(sourceManifestId),1);
  const timer=setTimeout(()=>fail(),options.timeoutMs??15000);
  const fail=()=>{if(!finished){finished=true;clearTimeout(timer);reject(new Error("Browser storage could not be opened safely"));}};
  request.onblocked=fail;
  request.onerror=fail;
  request.onupgradeneeded=event=>{
   if(event.oldVersion!==0){request.transaction?.abort();fail();return;}
   request.result.createObjectStore(STORE);
  };
  request.onsuccess=()=>{
   const db=request.result;
   if(finished){db.close();return;}
   if(db.objectStoreNames.length!==1||!db.objectStoreNames.contains(STORE)){db.close();fail();return;}
   finished=true;clearTimeout(timer);
   let closed=false;
   function transact(patch?: (snapshot:GuestSnapshot)=>GuestSnapshot):Promise<GuestSnapshot> {
    return new Promise((done,failed)=>{
     if(closed){failed(new Error("Browser storage connection changed"));return;}
     let snapshot=EMPTY();
     const tx=db.transaction(STORE,patch?"readwrite":"readonly");
     tx.oncomplete=()=>done(snapshot);
     tx.onabort=()=>failed(new Error("Browser storage transaction did not complete"));
     tx.onerror=()=>{}; // onabort owns the final outcome; no exception text reaches the UI.
     const store=tx.objectStore(STORE);
     const read=store.get("snapshot");
     read.onsuccess=()=>{
      const row=read.result;
      if(row!==undefined){
       if(!row||row.schemaVersion!==1||row.sourceManifestId!==sourceManifestId||Object.keys(row).sort().join(",")!=="schemaVersion,snapshot,sourceManifestId") {tx.abort();return;}
       const decoded=decodeGuestSnapshot(row.snapshot);
       if(!decoded){tx.abort();return;}
       snapshot=decoded;
      }
      if(patch){
       try{snapshot=patch(snapshot);if(!decodeGuestSnapshot(snapshot))throw new Error("Invalid Guest state");store.put({schemaVersion:1,sourceManifestId,snapshot},"snapshot");}
       catch{tx.abort();}
      }
     };
    });
   }
   const api:GuestDatabase={
    load:()=>transact(),
    patchPreferences:async patch=>{await transact(snapshot=>({...snapshot,preferences:{...snapshot.preferences,...patch}}));},
    patchFlags:async(id,patch)=>{await transact(snapshot=>({...snapshot,flags:{...snapshot.flags,[id]:{...(snapshot.flags[id]??{favorite:false,studied:false}),...patch}}}));},
    close:()=>{closed=true;db.close();}
   };
   db.onversionchange=()=>{api.close();api.onVersionChange?.();};
   resolve(api);
  };
 });
}
