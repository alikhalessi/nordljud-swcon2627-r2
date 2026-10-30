"use client";
import { useState } from "react";
import type { CheckDefinition,PracticeState,MissionChecks,CheckKind } from "../domain/contracts";
import { answerCheck,beginAttempt,revealCheck } from "../domain/practice-state";
function PracticeCard({check,state,onChange}:{check:CheckDefinition;state?:PracticeState;onChange:(next:PracticeState)=>void}) {
 const [initial]=useState(()=>beginAttempt());
 const [selected,setSelected]=useState<string|null>(null);
 const current=state??initial;
 const title=check.kind==="comprehension"?"Comprehension":"Verb form";
 const answer=check.choices.find(choice=>choice.id===check.correctChoiceId)?.label;
 const labels={correct:"Correct. 1 correctness credit.",incorrect:"Incorrect. No correctness credit.",revealed:"Revealed. No correctness credit.",unavailable:"Check unavailable. No correctness credit."};
 return <fieldset className="practice-card" aria-label={title}><legend>{title}</legend><p>{check.prompt}</p><p lang="sv" className="practice-source">{check.sourceText}</p>
  {check.available?<><div className="choices">{check.choices.map(choice=><label key={choice.id}><input type="radio" name={`${check.id}-${current.attemptId}`} checked={selected===choice.id} onChange={()=>setSelected(choice.id)} value={choice.id}/><span lang={check.kind==="verbForm"?"sv":"en"}>{choice.label}</span></label>)}</div>
   <div className="actions"><button type="button" disabled={!selected} onClick={()=>{if(selected)onChange(answerCheck(check,current,selected));}}>Check answer</button><button type="button" className="secondary" onClick={()=>onChange(revealCheck(check,current))}>Reveal answer</button><button type="button" className="text-button" onClick={()=>{setSelected(null);onChange(beginAttempt(current));}}>New attempt</button></div>
  </>:<p>{check.unavailableReason??"A usable source field is unavailable. Continue the other learning activities."}</p>}
  <p className={`practice-result outcome-${current.outcome??"ready"}`} role="status" aria-live="polite">{!check.available?labels.unavailable:current.outcome?labels[current.outcome]:current.latestOutcome?`New attempt. Previous outcome: ${current.latestOutcome}.`:"Choose an answer. Viewing or revealing is not correctness credit."}</p>
  {current.revealed&&check.available&&<p className="answer-reveal">Source answer: <span lang={check.kind==="verbForm"?"sv":"en"}>{answer}</span></p>}
 </fieldset>;
}

export function PracticeChecks({checks,states,onChange}:{checks:MissionChecks;states:Record<string,PracticeState>;onChange:(id:string,state:PracticeState)=>void}){
 return <>{(["comprehension","verbForm"] as CheckKind[]).map(kind=>{const check=checks[kind];return <PracticeCard key={check.id} check={check} state={states[check.id]} onChange={next=>onChange(check.id,next)}/>;})}</>;
}
