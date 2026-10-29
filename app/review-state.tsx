"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { getBrowserAuth } from "../lib/supabase-browser";
import { localDateKey } from "../lib/daily-lessons";
import { useLearningStore } from "./learning-state";
import {
  GUEST_REVIEW_KEY, EMPTY_GUEST_SNAPSHOT, loadGuestSnapshot, toggleDailyCompletion,
  addReminder as newReminder, removeReminder as dropReminder, snoozeReminder as delayReminder,
  markReviewed as setReviewed, appendReviewSession, senseKey,
  type ReviewSnapshot, type ReviewSense, type ReviewSession, type ReviewLevel
} from "../lib/review-core.mjs";

function requireOneChangedRow(result:{data:unknown[]|null;error:unknown}){
  if(result.error)throw result.error;
  if(!Array.isArray(result.data)||result.data.length!==1)
    throw new Error("No unique owner-scoped record was changed; cloud state not confirmed.");
}

type Store = {
  state: ReviewSnapshot;
  mode: "loading" | "guest" | "cloud";
  ready: boolean;
  busy: boolean;
  cloudAvailable: boolean;
  error: string;
  hasReminder: (sense:ReviewSense) => boolean;
  toggleCompletion: (level:ReviewLevel,day:string)=>Promise<boolean>;
  addReminder: (sense:ReviewSense)=>Promise<boolean>;
  removeReminder: (sense:ReviewSense)=>Promise<boolean>;
  snooze: (sense:ReviewSense,days:2|7|14)=>Promise<boolean>;
  markReviewed: (sense:ReviewSense)=>Promise<boolean>;
  recordSession: (session:ReviewSession)=>Promise<boolean>;
  clearGuest: ()=>void;
};
const Context=createContext<Store|null>(null);
export function useReviewStore():Store {
  const s=useContext(Context);if(!s)throw new Error("ReviewProvider missing");return s;
}

export function ReviewProvider({children}:{children:ReactNode}) {
  const auth=useLearningStore();
  const [state,setState]=useState<ReviewSnapshot>(()=>({...EMPTY_GUEST_SNAPSHOT}));
  const [ready,setReady]=useState(false);
  const [cloudAvailable,setCloudAvailable]=useState(false);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  const generation=useRef(0);
  const userIdRef=useRef<string|null>(null);
  const mode:Store["mode"]=auth.loading?"loading":auth.user?"cloud":"guest";

  async function loadCloud(id:string,version:number):Promise<boolean> {
    const db=getBrowserAuth();
    if(!db){if(version===generation.current){setCloudAvailable(false);setError("BLOCKED: Supabase client is unavailable.");setReady(true);}return false;}
    try{
      const [c,r,s]=await Promise.all([
        db.from("nordljud_daily_completions").select("level,lesson_on,algorithm_version").eq("user_id",id).order("lesson_on",{ascending:false}).limit(500),
        db.from("nordljud_review_items").select("level,verb,meaning,first_requested_on,due_on,last_reviewed_on,reviewed_count").eq("user_id",id).order("due_on").limit(500),
        db.from("nordljud_review_sessions").select("id,window_days,reviewed_on,score,total,question_results").eq("user_id",id).order("created_at",{ascending:false}).limit(100)
      ]);
      if(c.error||r.error||s.error)throw (c.error||r.error||s.error);
      if(generation.current!==version||userIdRef.current!==id)return false;
      const next:ReviewSnapshot={
        version:1,
        completions:(c.data||[]).map(x=>({level:x.level,lessonOn:x.lesson_on,algorithmVersion:x.algorithm_version})),
        reminders:(r.data||[]).map(x=>({level:x.level,verb:x.verb,meaning:x.meaning,firstRequestedOn:x.first_requested_on,
          dueOn:x.due_on,lastReviewedOn:x.last_reviewed_on,reviewedCount:x.reviewed_count})),
        sessions:(s.data||[]).map(x=>({id:x.id,windowDays:x.window_days,reviewedOn:x.reviewed_on,
          score:x.score,total:x.total,results:x.question_results}))
      } as ReviewSnapshot;
      setState(next);setCloudAvailable(true);setError("");
      return true;
    }catch{
      if(generation.current===version&&userIdRef.current===id){
        setCloudAvailable(false);
        setError("BLOCKED: Secure cloud review tables or permissions are not deployed or independently verified. No review data has been saved.");
      }
      return false;
    }finally{if(generation.current===version)setReady(true);}
  }

  // Account transitions immediately clear previous state, even during in-flight requests.
  useEffect(()=>{
    const version=++generation.current;
    const id=auth.user?.id??null;
    userIdRef.current=id;
    setState({...EMPTY_GUEST_SNAPSHOT});setError("");setReady(false);
    setCloudAvailable(false);setBusy(false);
    if(auth.loading)return;
    if(id){void loadCloud(id,version);return;}
    try{
      const raw=window.localStorage.getItem(GUEST_REVIEW_KEY);
      setState(loadGuestSnapshot(raw));
    }catch{
      setError("Guest data storage is unavailable. Changes will be kept only until you leave this page.");
    }
    setReady(true);
  // A signed-in user is never given the guest browser's records automatically.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[auth.user?.id,auth.loading]);

  function commitGuest(next:ReviewSnapshot):boolean {
    setState(next);
    try{
      window.localStorage.setItem(GUEST_REVIEW_KEY,JSON.stringify(next));
      setError("");return true;
    }catch{
      setError("Guest data storage is unavailable. Your change works for this page only; it is not permanently saved.");
      return false;
    }
  }
  async function write(local:(s:ReviewSnapshot)=>ReviewSnapshot,cloud:(id:string)=>Promise<void>):Promise<boolean> {
    if(!ready||busy||mode==="loading")return false;
    if(mode==="guest")return commitGuest(local(state));
    const id=auth.user?.id;
    if(!id||!cloudAvailable){setError("BLOCKED: Cloud review storage is not ready; no new record was saved.");return false;}
    const version=generation.current;
    setBusy(true);setError("");
    try{
      await cloud(id);
      if(version!==generation.current||userIdRef.current!==id)return false;
      const verified=await loadCloud(id,version);
      return verified && version===generation.current&&userIdRef.current===id;
    }catch{
      if(version===generation.current)setError("BLOCKED: Could not save your review data. Please check cloud migration status.");
      return false;
    }finally{if(version===generation.current)setBusy(false);}
  }
  const db=()=>{const client=getBrowserAuth();if(!client)throw new Error("Missing Supabase client");return client;};
  async function toggleCompletion(level:ReviewLevel,day:string):Promise<boolean> {
    const exists=state.completions.some(c=>c.level===level&&c.lessonOn===day);
    return write(
      s=>toggleDailyCompletion(s,level,day),
      async id=>{
        if(exists){const r=await db().from("nordljud_daily_completions").delete()
          .eq("user_id",id).eq("level",level).eq("lesson_on",day).select("user_id");requireOneChangedRow(r);}
        else {const r=await db().from("nordljud_daily_completions").insert({
          user_id:id,level,lesson_on:day,algorithm_version:"f04-2026-10-29-v1"
        });if(r.error)throw r.error;}
      }
    );
  }
  async function addReminder(sense:ReviewSense):Promise<boolean> {
    if(state.reminders.some(r=>senseKey(r)===senseKey(sense)))return true;
    const today=localDateKey(new Date());
    const next=newReminder(state,sense,today).reminders.find(r=>senseKey(r)===senseKey(sense));
    if(!next)return false;
    return write(s=>newReminder(s,sense,today),async id=>{
      const r=await db().from("nordljud_review_items").insert({
        user_id:id,level:next.level,verb:next.verb,meaning:next.meaning,
        first_requested_on:next.firstRequestedOn,due_on:next.dueOn,
        reviewed_count:0
      });if(r.error)throw r.error;
    });
  }
  async function removeReminder(sense:ReviewSense):Promise<boolean> {
    return write(s=>dropReminder(s,sense),async id=>{
      const r=await db().from("nordljud_review_items").delete().eq("user_id",id)
        .eq("level",sense.level).eq("verb",sense.verb).eq("meaning",sense.meaning).select("user_id");
      requireOneChangedRow(r);
    });
  }
  async function snooze(sense:ReviewSense,days:2|7|14):Promise<boolean> {
    const day=localDateKey(new Date());
    return write(s=>delayReminder(s,sense,day,days),async id=>{
      const r=await db().from("nordljud_review_items").update({
        due_on:(new Date(Date.parse(day+"T00:00:00Z")+days*86400000)).toISOString().slice(0,10)
      }).eq("user_id",id).eq("level",sense.level).eq("verb",sense.verb).eq("meaning",sense.meaning).select("user_id");
      requireOneChangedRow(r);
    });
  }
  async function markReviewed(sense:ReviewSense):Promise<boolean> {
    const day=localDateKey(new Date());
    const next=setReviewed(state,sense,day).reminders.find(r=>senseKey(r)===senseKey(sense));
    if(!next)return false;
    return write(s=>setReviewed(s,sense,day),async id=>{
      const r=await db().from("nordljud_review_items").update({
        last_reviewed_on:next.lastReviewedOn,reviewed_count:next.reviewedCount,due_on:next.dueOn
      }).eq("user_id",id).eq("level",sense.level).eq("verb",sense.verb).eq("meaning",sense.meaning).select("user_id");
      requireOneChangedRow(r);
    });
  }
  async function recordSession(session:ReviewSession):Promise<boolean> {
    return write(s=>appendReviewSession(s,session),async id=>{
      const r=await db().from("nordljud_review_sessions").insert({
        id:session.id,user_id:id,window_days:session.windowDays,reviewed_on:session.reviewedOn,
        score:session.score,total:session.total,question_results:session.results
      });if(r.error)throw r.error;
    });
  }
  function clearGuest(){
    if(mode!=="guest")return;
    try{window.localStorage.removeItem(GUEST_REVIEW_KEY);setError("");}
    catch{setError("Guest storage could not be cleared. You may need to clear site data in your browser.");}
    setState({...EMPTY_GUEST_SNAPSHOT});
  }
  const store:Store={state,mode,ready,busy,cloudAvailable,error,hasReminder:s=>state.reminders.some(x=>senseKey(x)===senseKey(s)),
    toggleCompletion,addReminder,removeReminder,snooze,markReviewed,recordSession,clearGuest};
  return <Context.Provider value={store}>{children}</Context.Provider>;
}
