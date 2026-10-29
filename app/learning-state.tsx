"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { getBrowserAuth } from "../lib/supabase-browser";
import type { Level } from "./learning-app";
export type Sense = {verb:string;meaning:string};
export type SavedPractice = Sense & {id:string;level:Level;score:number;total:number;completed_at:string};
type Studied = Sense & {level:Level};
type SavedState = {
 user:User|null; loading:boolean;busy:boolean;error:string;favorites:Sense[];studied:Studied[];history:SavedPractice[];
 toggleFavorite:(sense:Sense)=>Promise<void>;toggleStudied:(sense:Sense,level:Level)=>Promise<void>;
 recordPractice:(sense:Sense,level:Level,score:number,total:number)=>Promise<boolean>;
 deleteHistory:(id:string)=>Promise<void>;clearHistory:()=>Promise<void>;refresh:()=>Promise<void>
};
const Store=createContext<SavedState|null>(null);
export function useLearningStore(){const state=useContext(Store);if(!state)throw new Error("LearningProvider missing");return state;}
export function LearningProvider({children}:{children:ReactNode}){
 const [user,setUser]=useState<User|null>(null),[loading,setLoading]=useState(true),[busy,setBusy]=useState(false),[error,setError]=useState("");
 const [favorites,setFavorites]=useState<Sense[]>([]),[studied,setStudied]=useState<Studied[]>([]),[history,setHistory]=useState<SavedPractice[]>([]);
 const epoch=useRef(0);const uid=useRef<string|null>(null);
 const load=useCallback(async(id:string,version:number)=>{
  const db=getBrowserAuth();if(!db)return;
  try{
   const [f,s,h]=await Promise.all([
    db.from("nordljud_favorites").select("verb,meaning").eq("user_id",id).order("verb"),
    db.from("nordljud_studied").select("verb,meaning,level").eq("user_id",id),
    db.from("nordljud_practice_history").select("id,verb,meaning,level,score,total,completed_at").eq("user_id",id).order("completed_at",{ascending:false}).limit(100)
   ]);
   const failure=f.error||s.error||h.error;if(failure)throw failure;
   if(version!==epoch.current||uid.current!==id)return;
   setFavorites((f.data||[]) as Sense[]);setStudied((s.data||[]) as Studied[]);setHistory((h.data||[]) as SavedPractice[]);
   setError("");
  }catch(e){if(version===epoch.current)setError("Cloud data could not be loaded. "+(e instanceof Error?e.message:"Please retry."));}
  finally{if(version===epoch.current)setLoading(false);}
 },[]);
 useEffect(()=>{
  const db=getBrowserAuth();
  if(!db){setLoading(false);return;}
  let active=true;
  const change=(next:User|null)=>{
   if(!active)return;
   const nextId=next?.id||null;
   if(nextId===uid.current){setUser(next);return;}
   uid.current=nextId;const version=++epoch.current;setUser(next);
   setFavorites([]);setStudied([]);setHistory([]);setError("");setLoading(Boolean(nextId));
   if(nextId)void load(nextId,version);
  };
  const {data:{subscription}}=db.auth.onAuthStateChange((_event,session)=>change(session?.user||null));
  void db.auth.getUser().then(({data})=>change(data.user)).catch(()=>{if(active)setLoading(false);});
  return()=>{active=false;subscription.unsubscribe();++epoch.current;};
 },[load]);
 const refresh=useCallback(async()=>{if(uid.current){setLoading(true);await load(uid.current,epoch.current);}},[load]);
 const act=useCallback(async(work:(id:string)=>Promise<void>)=>{
  const id=uid.current;if(!id)return;
  setBusy(true);setError("");
  try{await work(id);if(uid.current===id)await load(id,epoch.current);}
  catch(e){if(uid.current===id)setError(e instanceof Error?e.message:"Cloud saving failed.");}
  finally{setBusy(false);}
 },[load]);
 const toggleFavorite=async(s:Sense)=>act(async id=>{
  const db=getBrowserAuth();if(!db)return;const exists=favorites.some(f=>f.verb===s.verb&&f.meaning===s.meaning);
  const q=exists?db.from("nordljud_favorites").delete().eq("user_id",id).eq("verb",s.verb).eq("meaning",s.meaning):
   db.from("nordljud_favorites").insert({user_id:id,...s});
  const {error:e}=await q;if(e)throw e;
 });
 const toggleStudied=async(s:Sense,level:Level)=>act(async id=>{
  const db=getBrowserAuth();if(!db)return;const exists=studied.some(f=>f.level===level&&f.verb===s.verb&&f.meaning===s.meaning);
  const q=exists?db.from("nordljud_studied").delete().eq("user_id",id).eq("level",level).eq("verb",s.verb).eq("meaning",s.meaning):
   db.from("nordljud_studied").insert({user_id:id,level,...s});
  const {error:e}=await q;if(e)throw e;
 });
 const recordPractice=async(s:Sense,level:Level,score:number,total:number)=>{
  if(!uid.current)return false;let saved=false;
  await act(async id=>{const db=getBrowserAuth();if(!db)return;const {error:e}=await db.from("nordljud_practice_history").insert({user_id:id,level,...s,score,total});if(e)throw e;saved=true;});return saved;
 };
 const deleteHistory=async(rowId:string)=>act(async id=>{
  const db=getBrowserAuth();if(!db)return;const {error:e}=await db.from("nordljud_practice_history").delete().eq("user_id",id).eq("id",rowId);if(e)throw e;
 });
 const clearHistory=async()=>act(async id=>{const db=getBrowserAuth();if(!db)return;const {error:e}=await db.from("nordljud_practice_history").delete().eq("user_id",id);if(e)throw e;});
 return <Store.Provider value={{user,loading,busy,error,favorites,studied,history,toggleFavorite,toggleStudied,recordPractice,deleteHistory,clearHistory,refresh}}>{children}</Store.Provider>;
}
