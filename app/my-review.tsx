"use client";
import { useEffect, useMemo, useState } from "react";
import type { Level } from "./learning-app";
import { localDateKey } from "../lib/daily-lessons";
import { useReviewStore } from "./review-state";
import {
  assembleReviewQuestions, canOfferReview, senseKey,
  type ReviewSense, type ReviewQuestion, type ReviewResult, type ReviewSession
} from "../lib/review-core.mjs";

type Entry={id:string;verb:string;meaning:string;forms:Record<string,{word?:string;sv?:string;en?:string}>};
type Quiz={windowDays:7|14;questions:ReviewQuestion[];step:number;score:number;results:ReviewResult[];
 selected:string|null;solved:boolean;revealed:boolean};
export default function MyReview({
  onOpenVerb,enabled
}:{onOpenVerb:(s:{verb:string;meaning:string},l:Level)=>void;enabled:boolean}) {
  const review=useReviewStore();
  const [today,setToday]=useState("");
  const [pools,setPools]=useState<Partial<Record<Level,Entry[]>>>({});
  const [sourceError,setSourceError]=useState("");
  const [fetching,setFetching]=useState(false);
  const [quiz,setQuiz]=useState<Quiz|null>(null);
  const [saveStatus,setSaveStatus]=useState("");

  useEffect(()=>{
    if(!enabled)return;
    const update=()=>setToday(localDateKey(new Date()));
    update();const interval=window.setInterval(update,60_000);
    window.addEventListener("focus",update);
    return()=>{window.clearInterval(interval);window.removeEventListener("focus",update);};
  },[enabled]);

  useEffect(()=>{
    if(!enabled||review.state.reminders.length===0)return;
    const required=[...new Set(review.state.reminders.map(x=>x.level))];
    const missing=required.filter(level=>!pools[level]);
    if(!missing.length)return;
    const controller=new AbortController();
    setFetching(true);setSourceError("");
    void (async()=>{
      try{
        const loaded=await Promise.all(missing.map(async level=>{
          const response=await fetch(`/api/verbs?level=${level}`,{signal:controller.signal});
          if(!response.ok)throw new Error("Vocabulary source unavailable");
          const data=await response.json();
          if(data.level!==level || !Array.isArray(data.entries)||data.count!==data.entries.length)
            throw new Error("Unexpected vocabulary source");
          return [level,data.entries] as const;
        }));
        if(!controller.signal.aborted)setPools(previous=>({...previous,...Object.fromEntries(loaded)}));
      }catch{if(!controller.signal.aborted)setSourceError("Could not load the approved vocabulary for review; try switching sections and back.");}
      finally{if(!controller.signal.aborted)setFetching(false);}
    })();
    return()=>controller.abort();
  },[enabled,review.state.reminders,pools]);

  const due=useMemo(()=>review.state.reminders.filter(x=>today&&x.dueOn<=today)
    .sort((a,b)=>a.dueOn.localeCompare(b.dueOn)),[review.state.reminders,today]);
  const upcoming=useMemo(()=>review.state.reminders.filter(x=>today&&x.dueOn>today)
    .sort((a,b)=>a.dueOn.localeCompare(b.dueOn)),[review.state.reminders,today]);
  const eligible7=useMemo(()=>review.state.reminders.filter(x=>today&&canOfferReview(x,7,today)).length,
    [review.state.reminders,today]);
  const eligible14=useMemo(()=>review.state.reminders.filter(x=>today&&canOfferReview(x,14,today)).length,
    [review.state.reminders,today]);
  const canSave=review.ready&&!review.busy&&(review.mode==="guest"||review.cloudAvailable);
  function beginReview(windowDays:7|14){
    const questions=assembleReviewQuestions(review.state.reminders,pools,today,windowDays,review.state.sessions);
    setSaveStatus("");
    if(questions.length<5){
      setSaveStatus(`Not enough reliable source questions for the ${windowDays}-day review: ${questions.length} available, at least 5 needed. Add more exact verb meanings to Remind Me Later.`);
      return;
    }
    setQuiz({windowDays,questions,step:0,score:0,results:[],selected:null,solved:false,revealed:false});
  }
  function pickAnswer(answer:string) {
    setQuiz(q=>{
      if(!q||q.solved||q.revealed)return q;
      const correct=answer===q.questions[q.step]?.answer;
      return {...q,selected:answer,solved:correct,score:q.score+(correct?1:0)};
    });
  }
  function advance() {
    setQuiz(q=>{
      if(!q||q.selected===null)return q;
      const current=q.questions[q.step];
      const result:ReviewResult={level:current.level,verb:current.verb,meaning:current.meaning,
        questionId:current.id,correct:q.solved};
      return {...q,step:q.step+1,results:[...q.results,result],selected:null,solved:false,revealed:false};
    });
  }
  async function saveQuiz(){
    if(!quiz||quiz.step<quiz.questions.length)return;
    const session:ReviewSession={id:crypto.randomUUID(),windowDays:quiz.windowDays,
      reviewedOn:today,score:quiz.score,total:quiz.questions.length,results:quiz.results};
    const success=await review.recordSession(session);
    setSaveStatus(success?"Saved your actual review result. This does not declare mastery.":"Review completed, but its result was not saved; check storage status.");
    if(success)setQuiz(null);
  }
  function queueItem(item:ReviewSense&{dueOn:string;lastReviewedOn:string|null;firstRequestedOn:string},isDue:boolean){
    return <li className="review-item" key={senseKey(item)}>
      <div><strong>{item.level} · <span lang="sv">{item.verb}</span></strong> — {item.meaning}
        <p>Due {item.dueOn} {isDue?"· Ready to review":"· Coming up"} · Requested {item.firstRequestedOn}</p></div>
      <div className="review-item-actions">
        <button type="button" onClick={()=>onOpenVerb(item,item.level)}>Study again</button>
        <button type="button" disabled={!canSave} onClick={()=>void review.markReviewed(item)}>Mark reviewed</button>
        {[2,7,14].map(days=><button key={days} type="button" disabled={!canSave}
          onClick={()=>void review.snooze(item,days as 2|7|14)}>Snooze {days}d</button>)}
        <button type="button" disabled={!canSave} onClick={()=>void review.removeReminder(item)}>Remove</button>
      </div>
    </li>;
  }
  const current=quiz&&quiz.step<quiz.questions.length?quiz.questions[quiz.step]:null;
  return <section className="my-review" aria-labelledby="my-review-title">
    <span className="eyebrow">YOUR LEARNING · SELF-DIRECTED RECALL</span>
    <h2 id="my-review-title">My Review</h2>
    <p>Remind Me Later is separate from Favorites and Studied. Due dates are simple planning choices, not scientifically optimized mastery predictions.</p>
    {review.mode==="guest"&&<div className="vocabulary-notice">Guest Mode: requests and scores stay on this browser only, may be lost, and can be viewed by someone using this browser.
      <button type="button" onClick={()=>{if(window.confirm("Clear all guest completions, reminders and review sessions on this browser?"))review.clearGuest();}}>
        Clear guest learning data
      </button>
    </div>}
    {review.error&&<p className="vocabulary-notice" role="alert">{review.error}</p>}
    <div className="review-summary"><span><strong>{due.length}</strong> due</span><span><strong>{upcoming.length}</strong> upcoming</span>
      <span><strong>{review.state.sessions.length}</strong> saved review sessions</span></div>
    {review.state.reminders.length===0?<p className="empty-results">No review requests yet. Choose Remind Me Later on any exact verb sense.</p>:
      <><h3>Due now</h3><ul className="review-items">{due.length?due.map(x=>queueItem(x,true)):<li>Nothing due yet.</li>}</ul>
        <h3>Coming up</h3><ul className="review-items">{upcoming.length?upcoming.map(x=>queueItem(x,false)):<li>No upcoming items.</li>}</ul></>}
    <div className="review-exams">
      <h3>Optional retrieval checks</h3>
      <p>Available seven or fourteen local days after you first request a verb review. Each check needs at least five authentic, valid questions. Nothing starts automatically.</p>
      <div className="review-exam-actions">
        <button type="button" disabled={!eligible7||fetching||!!sourceError||!!quiz} onClick={()=>beginReview(7)}>Start 7-day review · {eligible7} eligible senses</button>
        <button type="button" disabled={!eligible14||fetching||!!sourceError||!!quiz} onClick={()=>beginReview(14)}>Start 14-day review · {eligible14} eligible senses</button>
      </div>
      {fetching&&<p role="status">Loading source-based practice questions…</p>}
      {sourceError&&<p role="alert">{sourceError}</p>}
      {quiz&&<div className="review-quiz" aria-live="polite">
        {current?<><p>Question {quiz.step+1} / {quiz.questions.length} · {quiz.score} correct</p>
          <h4>{current.title} · {current.level} <span lang="sv">{current.verb}</span></h4>
          <p>{current.prompt}</p>{current.context&&<p lang="sv">{current.context}</p>}
          <div className="practice-answers">
            {current.choices.map(choice=><button key={choice} type="button"
              disabled={quiz.solved||quiz.revealed}
              aria-pressed={quiz.selected===choice} onClick={()=>pickAnswer(choice)}>{choice}</button>)}
          </div>
          {quiz.selected!==null&&<p role="status">{quiz.solved?"Correct.":quiz.revealed?
            `Correct answer: ${current.answer}. Revealing earns no credit.`:"Not quite; try again or reveal the answer."}</p>}
          {quiz.selected!==null&&quiz.solved&&<p>{current.explanation}</p>}
          <div className="review-exam-actions">
            {quiz.selected!==null&&!quiz.solved&&!quiz.revealed&&<button type="button" onClick={()=>setQuiz(q=>q?{...q,selected:null}:null)}>Try again</button>}
            {quiz.selected!==null&&!quiz.solved&&!quiz.revealed&&<button type="button" onClick={()=>setQuiz(q=>q?{...q,revealed:true}:null)}>Show correct answer</button>}
            {quiz.selected!==null&&<button type="button" onClick={advance}>{quiz.step+1===quiz.questions.length?"See result":"Next question"}</button>}
          </div>
        </>:<><h4>Review completed: {quiz.score} / {quiz.questions.length}</h4>
          <p>This result does not automatically mark any verb mastered or remove it from your queue.</p>
          <button type="button" disabled={!canSave} onClick={()=>void saveQuiz()}>Save actual review result</button>
          <button type="button" onClick={()=>setQuiz(null)}>Close without saving</button>
        </>}
      </div>}
      <p role="status">{saveStatus}</p>
    </div>
  </section>;
}
