"use client";
import { createContext,useContext,useEffect,useState } from "react";
import type { ReactNode } from "react";
import { openGuestStore } from "../persistence/guest-store";
import type { GuestPreferences,GuestSenseFlags,GuestSnapshot,GuestStorageStatus,GuestStore } from "../persistence/guest-store";
import { SOURCE_MANIFEST_ID } from "../data/source-manifest";

// An account port must be created for a freshly verified owner. Guest records are
// never an input to that port: there is no import/merge transition here.
export type LearningIdentity={kind:"guest"}|{kind:"account";verifiedOwner:string};
export interface AccountContextPort {identity:Extract<LearningIdentity,{kind:"account"}>;clearPrivateView:()=>void}
interface GuestContext {ready:boolean;snapshot:GuestSnapshot;storage:GuestStorageStatus;pending:boolean;preferences:(patch:Partial<GuestPreferences>)=>Promise<void>;flags:(id:string,patch:Partial<GuestSenseFlags>)=>Promise<void>;refresh:()=>Promise<void>}
const Context=createContext<GuestContext|null>(null);
const EMPTY:GuestSnapshot={preferences:{level:"A2",selectedSenseId:null},flags:{}};
export function LearningProvider({children}:{children:ReactNode}) {
 const [store,setStore]=useState<GuestStore|null>(null);
 const [snapshot,setSnapshot]=useState(EMPTY);
 const [storage,setStorage]=useState<GuestStorageStatus>({mode:"session-only",status:"ready",reason:null});
 const [pending,setPending]=useState(false);
 useEffect(()=>{
  let disposed=false;let active:GuestStore|undefined;let unsubscribe:(()=>void)|undefined;
  void openGuestStore(SOURCE_MANIFEST_ID).then(value=>{
   if(disposed){value.close();return;}active=value;
   const update=()=>{setSnapshot(value.getSnapshot());setStorage(value.getStorageStatus());};
   unsubscribe=value.subscribe(update);update();setStore(value);
  });
  return()=>{disposed=true;unsubscribe?.();active?.close();};
 },[]);
 async function perform(action:(value:GuestStore)=>Promise<unknown>){if(!store)return;setPending(true);try{await action(store);}finally{setPending(false);}}
 const value:GuestContext={ready:store!==null,snapshot,storage,pending,preferences:patch=>perform(s=>s.patchPreferences(patch)),flags:(id,patch)=>perform(s=>s.patchSenseFlags(id,patch)),refresh:()=>perform(s=>s.refresh())};
 return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useGuestLearning(){const context=useContext(Context);if(!context)throw new Error("A learning context is required");return context;}
