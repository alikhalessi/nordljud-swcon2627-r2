"use client";
import {useState} from "react";
import {useLearningStore,type Sense} from "./learning-state";
import type {Level} from "./learning-app";
export default function LearningDashboard({level,onSelect}:{level:Level;onSelect:(s:Sense,l:Level)=>void}){
 const st=useLearningStore();const [tab,setTab]=useState<"favorites"|"history">("favorites");
 const levels:Level[]=["A2","B1","B2","C1"];
 return <section className="learning-dashboard" aria-labelledby="saved-heading">
  <div className="section-top"><div><span className="eyebrow">YOUR LEARNING</span><h2 id="saved-heading">Saved learning & favorites</h2></div></div>
  {!st.user?<p className="vocabulary-notice">Guest Mode: you can study and practice freely, but your progress is not saved permanently. Sign in to sync your results.</p>:<>
   <p className="vocabulary-notice">{st.loading?"Loading your cloud progress…":"Saved to your private Supabase account. Refresh or sign in on another device to see it."}</p>
   {st.error&&<p className="vocabulary-notice" role="alert">{st.error} <button type="button" onClick={()=>void st.refresh()}>Retry sync</button></p>}
   <div className="progress-counters">{levels.map(l=><div key={l}><strong>{l}</strong><span>{st.studied.filter(x=>x.level===l).length} / 456 studied</span></div>)}</div>
   <div className="study-mode-tabs" role="group" aria-label="Saved learning views">
    <button type="button" className={tab==="favorites"?"active":""} aria-pressed={tab==="favorites"} onClick={()=>setTab("favorites")}>Favorites ({st.favorites.length})</button>
    <button type="button" className={tab==="history"?"active":""} aria-pressed={tab==="history"} onClick={()=>setTab("history")}>Practice history ({st.history.length})</button>
   </div>
   {tab==="favorites"?<div className="saved-list">{st.favorites.length===0?<p>No favorites saved yet. Select a verb and click ☆ Add to Favorites.</p>:st.favorites.map(s=><div className="saved-row" key={s.verb+"|"+s.meaning}><span><strong lang="sv">{s.verb}</strong> · {s.meaning}</span><div><button type="button" disabled={st.busy} onClick={()=>onSelect(s,level)}>Study</button><button type="button" disabled={st.busy} onClick={()=>void st.toggleFavorite(s)}>Remove</button></div></div>)}</div>:
   <div className="saved-list">{st.history.length===0?<p>No saved practice sessions yet.</p>:<><button type="button" disabled={st.busy} onClick={()=>{if(window.confirm("Delete all your saved practice history?"))void st.clearHistory();}}>Delete all practice history</button>{st.history.map(h=><div key={h.id} className="saved-row"><span><strong>{h.level} · {h.verb}</strong> ({h.meaning}) · {h.score}/{h.total} · {new Date(h.completed_at).toLocaleString()}</span><button type="button" disabled={st.busy} onClick={()=>void st.deleteHistory(h.id)}>Delete</button></div>)}</>}</div>}
  </>}
 </section>;
}
