"use client";
import { useEffect,useRef,useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import type {AuthConfiguration} from "../auth/policy";
const AccountControls=dynamic(()=>import("./AccountControls").then(module=>module.AccountControls),{loading:()=> <p role="status">Loading account availability…</p>});
import { LEVELS } from "../domain/contracts";
import type { Level,LexiconCollection,PracticeState } from "../domain/contracts";
import { resolveCounterpart } from "../domain/sense-selection";
import { runAutomaticOperation } from "../domain/operation-state";
import { getClientLexicon,getClientMission } from "../data/client-source";
import type { MissionPayload } from "../data/client-source";
import { LearningProvider,useGuestLearning } from "./LearningProvider";
import { MissionStudy } from "./MissionStudy";
import {PracticeChecks} from "./PracticeChecks";
import {MissionCompletion} from "./MissionCompletion";
import { OperationStatus } from "./OperationStatus";
import {Lexicon} from "./Lexicon";

function Workspace({accountConfiguration}:{accountConfiguration:AuthConfiguration|null}){
 const guest=useGuestLearning();
 const level=guest.snapshot.preferences.level;
 const [view,setView]=useState<"Explore"|"Mission"|"Account">("Explore");
 const [collection,setCollection]=useState<LexiconCollection|null>(null);
 const [mission,setMission]=useState<MissionPayload|null>(null);
 const [sourceError,setSourceError]=useState<{level:Level;message:string}|null>(null);
 const [missionError,setMissionError]=useState<{level:Level;message:string}|null>(null);
 const [retry,setRetry]=useState(0);
 const [query,setQuery]=useState("");
 const [notice,setNotice]=useState("");
 const [changing,setChanging]=useState<Level|null>(null);
 const [english,setEnglish]=useState(false);
 const [completed,setCompleted]=useState<Record<string,boolean>>({});
 const [practice,setPractice]=useState<Record<string,PracticeState>>({});
 const cancelRead=useRef<(()=>void)|null>(null);
 useEffect(()=>{
  if(!guest.ready)return;
  let active=true;const controller=new AbortController();
  cancelRead.current=()=>controller.abort();
  void runAutomaticOperation(()=>getClientLexicon(level),{kind:"read",signal:controller.signal}).then(result=>{
   if(!active)return;
   if(result.status==="ready"){setCollection(result.value);setSourceError(null);}
   else setSourceError({level,message:"reason" in result&&result.reason==="cancelled"?"Loading cancelled. Try again when ready.":"This level's teaching content is unavailable. Try again; other supported learning remains available."});
  });
  return()=>{active=false;controller.abort();};
 },[guest.ready,level,retry]);
 useEffect(()=>{
  if(!guest.ready||view!=="Mission")return;
  let active=true;
  void getClientMission(level).then(value=>{if(active){setMission(value);setMissionError(null);}},()=>{if(active)setMissionError({level,message:"This mission could not load. Try again or continue exploring the lexicon."});});
  return()=>{active=false;};
 },[guest.ready,level,view,retry]);
 const activeCollection=collection?.level===level?collection:null;
 const activeMission=mission?.mission.level===level?mission:null;
 const selected=activeCollection?.records.find(record=>record.id===guest.snapshot.preferences.selectedSenseId)??null;
 async function changeLevel(target:Level){
  if(!guest.ready||target===level||changing)return;
  setChanging(target);setEnglish(false);setNotice("");
  try{
   const next=await getClientLexicon(target);
   const counterpart=selected?resolveCounterpart(selected,next.records):null;
   await guest.preferences({level:target,selectedSenseId:counterpart?.sense?.id??null});
   if(counterpart&&!counterpart.sense)setNotice(`No unique matching meaning is available at ${target}. Choose a sense explicitly; your previous flags remain unchanged.`);
  }catch{setNotice(`Could not load ${target}. Your current level and choices remain available. Try that level again.`);}
  finally{setChanging(null);}
 }
 const chooseView=(next:typeof view)=>{setView(next);setNotice("");};
 return <><a className="skip-link" href="#learning">Skip to learning</a>
  <header className="site-header"><Link className="wordmark" href="/" aria-label="Nordljud home"><span className="brand-mark" aria-hidden="true">n</span><span>nordljud<span className="brand-dot">.</span></span></Link><span className="header-note">SWEDISH, ONE MEANING AT A TIME</span><span className="guest-badge">Guest workspace</span></header>
  <div className="app-shell"><section className="intro"><p className="eyebrow">YOUR SWEDISH LEARNING SPACE</p><h1>Small steps.<br/><span>Real Swedish.</span></h1><p>Explore authentic examples, study a short mission, and practise at your own pace.</p></section>
   <div className="workspace-bar"><nav aria-label="Learning views">{(["Explore","Mission","Account"] as const).map(item=><button type="button" className={view===item?"nav-active":"nav-button"} aria-pressed={view===item} key={item} onClick={()=>chooseView(item)}>{item}</button>)}</nav><div className="levels" role="group" aria-label="Learning level">{LEVELS.map(item=><button type="button" className={level===item?"level-active":"level-button"} key={item} aria-pressed={level===item} aria-disabled={!guest.ready||!!changing} onClick={()=>void changeLevel(item)}>{item}</button>)}</div></div>
   <div className="workspace-status"><span className="status-dot" aria-hidden="true"/><span data-testid="storage-status" role="status" aria-live="polite">{!guest.ready?"Loading browser choices…":guest.pending?"Saving browser choices…":guest.storage.status==="saved"?"Saved in this browser.":guest.storage.status==="unknown"?"Save status unknown.":guest.storage.status==="conflict"?"Saved choices differ. Review before retrying.":guest.storage.mode==="session-only"?"Choices are kept for this session only.":"Browser choices ready. Mission completion and practice reset on refresh."}</span>{(guest.storage.status==="unknown"||guest.storage.status==="conflict")&&<button type="button" className="text-button" onClick={()=>void guest.refresh()}>Check saved state</button>}</div>
   {guest.storage.mode==="session-only"&&guest.ready&&<p className="storage-qualification">{guest.storage.reason}</p>}{changing&&<p role="status">Loading {changing}…</p>}{notice&&<p className="notice" role="status">{notice}</p>}
   <main id="learning" tabIndex={-1}>
    {view==="Explore"&&<Lexicon level={level} ready={guest.ready} activeCollection={activeCollection} selected={selected} query={query} error={sourceError?.level===level?sourceError.message:null} onQuery={setQuery} onSelect={id=>{setNotice("");void guest.preferences({level,selectedSenseId:id});}} onRetry={()=>{setSourceError(null);setRetry(value=>value+1);}} onCancel={()=>cancelRead.current?.()}/>}
    {view==="Mission"&&<>{missionError?.level===level?<OperationStatus status="error" message={missionError.message} onRetry={()=>{setMissionError(null);setRetry(value=>value+1);}}/>:!activeMission?<p role="status">Loading the {level} mission…</p>:<div className="mission-layout"><div className="panel"><MissionStudy key={activeMission.mission.id} mission={activeMission.mission} englishVisible={english} onToggleEnglish={()=>setEnglish(value=>!value)}/><MissionCompletion completed={!!completed[activeMission.mission.id]} onComplete={()=>setCompleted(previous=>({...previous,[activeMission.mission.id]:true}))}/></div><section className="practice-section" aria-label="Mission practice"><p className="eyebrow">TRY IT YOURSELF</p><h2>Put it into practice</h2><p className="muted">Use the supplied example. Wrong and revealed answers never earn correctness credit.</p><PracticeChecks checks={activeMission.checks} states={practice} onChange={(id,next)=>setPractice(previous=>({...previous,[id]:next}))}/></section></div>}</>}
    {view==="Account"&&<section className="panel account-panel"><p className="eyebrow">ACCOUNT AVAILABILITY</p><h2>Keep learning as a Guest</h2><AccountControls configuration={accountConfiguration}/><p>Your browser choices stay separate from account data. Cloud progress and live ownership verification are unavailable in this build.</p><button type="button" onClick={()=>chooseView("Explore")}>Continue Guest learning</button></section>}
   </main><footer><span>nordljud.</span><p>Source-backed study. Your pace, your choices.</p><p className="small">Local CORE build · Browser-scoped Guest learning</p></footer>
  </div></>;
}
export function LearningApp({accountConfiguration=null}:{accountConfiguration?:AuthConfiguration|null}){return <LearningProvider><Workspace accountConfiguration={accountConfiguration}/></LearningProvider>;}
