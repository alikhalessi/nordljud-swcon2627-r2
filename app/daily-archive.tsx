"use client";
import { useEffect, useMemo, useState } from "react";
import type { Level } from "./learning-app";
import { localDateKey, selectDailyVerbs, type DailyVerbEntry } from "../lib/daily-lessons";
import { useReviewStore } from "./review-state";
import { addLocalDays, DAILY_ARCHIVE_START, DAILY_SELECTION_VERSION } from "../lib/review-core.mjs";

export default function DailyArchive({level,onOpenVerb}:{level:Level;onOpenVerb:(s:{verb:string;meaning:string},level:Level)=>void}) {
  const review=useReviewStore();
  const [today,setToday]=useState("");
  const [day,setDay]=useState("");
  const [rows,setRows]=useState<DailyVerbEntry[]>([]);
  const [loadedLevel,setLoadedLevel]=useState<Level|null>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [retry,setRetry]=useState(0);
  const [notice,setNotice]=useState("");
  useEffect(()=>{
    const check=()=>{const now=localDateKey(new Date());setToday(now);
      setDay(old=>old&&old<now&&old>=DAILY_ARCHIVE_START?old:addLocalDays(now,-1));};
    check();const interval=window.setInterval(check,60000);
    window.addEventListener("focus",check);
    return()=>{window.clearInterval(interval);window.removeEventListener("focus",check);};
  },[]);
  useEffect(()=>{
    const controller=new AbortController();
    setRows([]);setLoadedLevel(null);setLoading(true);setError("");
    void (async()=>{
      try{
        const response=await fetch(`/api/verbs?level=${level}`,{signal:controller.signal});
        if(!response.ok)throw new Error("Vocabulary source is unavailable");
        const data=await response.json();
        if(data.level!==level || !Array.isArray(data.entries)||data.entries.length!==data.count)
          throw new Error("Unexpected archive source");
        if(!controller.signal.aborted){setRows(data.entries);setLoadedLevel(level);}
      }catch{
        if(!controller.signal.aborted)setError("Could not load the source for this archived lesson.");
      }finally{if(!controller.signal.aborted)setLoading(false);}
    })();
    return()=>controller.abort();
  },[level,retry]);
  const validDay=Boolean(day&&today&&day>=DAILY_ARCHIVE_START&&day<today);
  const picks=useMemo(()=>validDay&&loadedLevel===level?selectDailyVerbs(rows,level,day):[],
    [validDay,loadedLevel,rows,level,day]);
  const completed=review.state.completions.some(x=>x.level===level&&x.lessonOn===day);
  const canSave=review.ready&&!review.busy&&(review.mode==="guest"||review.cloudAvailable);
  async function toggleComplete(){
    if(!canSave||!validDay)return;
    const ok=await review.toggleCompletion(level,day);
    setNotice(ok?(completed?"Completion undone.":"Marked completed by your own report; this is not proof of mastery."):
      "Could not permanently save that completion; check storage status.");
  }
  return <section className="daily-archive" aria-labelledby="archive-heading">
    <span className="eyebrow">YOUR LEARNING · REVISIT A DAY</span>
    <h2 id="archive-heading">Daily Archive</h2>
    <p>View the same published three-verb selection for an earlier day. An archived set does not mean you studied it.</p>
    <p className="detail-footnote">Published starting 29 October 2026 · selection algorithm {DAILY_SELECTION_VERSION}.</p>
    <div className="archive-nav">
      <button type="button" disabled={!day||day<=DAILY_ARCHIVE_START}
        onClick={()=>setDay(x=>addLocalDays(x,-1))}>Previous day</button>
      <label htmlFor="archive-date">Lesson date
        <input type="date" id="archive-date" min={DAILY_ARCHIVE_START}
          max={today?addLocalDays(today,-1):undefined} value={validDay?day:""}
          onChange={e=>setDay(e.target.value)}/>
      </label>
      <button type="button" disabled={!validDay||addLocalDays(day,1)>=today}
        onClick={()=>setDay(x=>addLocalDays(x,1))}>Next day</button>
    </div>
    {!today&&<p role="status">Checking your local calendar date…</p>}
    {today<=DAILY_ARCHIVE_START&&<p className="vocabulary-notice">No earlier published daily sets yet. Come back on another day.</p>}
    {loading&&<p role="status">Loading the {level} source…</p>}
    {error&&<div role="alert" className="vocabulary-notice">{error} <button type="button" onClick={()=>setRetry(x=>x+1)}>Retry archive</button></div>}
    {!loading&&!error&&validDay&&<div className="daily-cards">
      {picks.map(({entry,example},index)=>{
        const sense={level,verb:entry.verb,meaning:entry.meaning};
        const saved=review.hasReminder(sense);
        return <article className="daily-card" key={entry.id}>
          <span className="eyebrow">DAY {day} · WORD {index+1}/3</span>
          <h3 lang="sv">{entry.verb}</h3><p className="daily-meaning">{entry.meaning}</p>
          <p className="daily-example" lang="sv">{example.sv}</p><p className="daily-translation">{example.en}</p>
          <div className="daily-actions">
            <button type="button" onClick={()=>onOpenVerb({verb:entry.verb,meaning:entry.meaning},level)}>Explore this verb</button>
            <button type="button" disabled={!canSave||saved} onClick={()=>void review.addReminder(sense)}>
              {saved?"✓ In My Review":"Remind Me Later"}
            </button>
          </div>
        </article>;
      })}
    </div>}
    {!loading&&!error&&validDay&&<div className="archive-completion">
      <p>{completed?"You marked this lesson completed (self-reported).":"Not marked completed; browsing is never counted automatically."}</p>
      <button type="button" disabled={!canSave} onClick={()=>void toggleComplete()}>
        {completed?"Undo lesson completion":"Mark lesson as completed"}
      </button>
      <p role="status">{notice}</p>
    </div>}
    {review.error&&<p role="alert" className="vocabulary-notice">{review.error}</p>}
  </section>;
}
