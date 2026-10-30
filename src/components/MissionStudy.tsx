"use client";
import { useEffect,useState } from "react";
import type { Mission } from "../domain/contracts";
import { requestSwedishSpeech } from "../speech/swedish";
import type { SpeechResult } from "../speech/swedish";
export interface MissionStudyProps {mission:Mission;englishVisible:boolean;onToggleEnglish:()=>void}
export function MissionStudy({mission,englishVisible,onToggleEnglish}:MissionStudyProps) {
 const [speech,setSpeech]=useState<SpeechResult|null>(null);
 useEffect(()=>{
  const synthesis=typeof window!=="undefined"?window.speechSynthesis:undefined;
  const changed=()=>setSpeech(previous=>previous?.status==="unavailable"?{status:"stopped",message:"Browser voices changed. Try listening again; reading remains available."}:previous);
  synthesis?.addEventListener("voiceschanged",changed);
  return()=>{synthesis?.removeEventListener("voiceschanged",changed);synthesis?.cancel();};
 },[]);
 return <section className="mission-study" aria-label="Mission study">
  <p className="eyebrow">{mission.level} · REPRESENTATIVE MISSION</p><h2>{mission.title}</h2><p className="mission-goal">{mission.learnerGoal}</p>
  <button type="button" className="secondary" aria-expanded={englishVisible} onClick={onToggleEnglish}>{englishVisible?"Hide English":"Show English"}</button>
  <div className="examples">{mission.formKeys.map(key=>{
   const form=mission.sense.forms[key], available=mission.sense.availability[key];
   return <article className="example" key={key}><p className="eyebrow">{key}</p><h3 lang="sv">{available.word?form.word:"Form unavailable"}</h3>
    <p className="swedish-example" lang="sv">{available.sv?form.sv:"Swedish example unavailable"}</p>
    {englishVisible&&<p className="translation">{available.en?form.en:"English assistance unavailable"}</p>}
    <button type="button" className="text-button" disabled={!available.sv} aria-label={`Listen to ${key} example`} onClick={()=>setSpeech(requestSwedishSpeech(form.sv,setSpeech))}>Listen in Swedish</button>
   </article>;
  })}</div>
  {speech&&<div className="speech-status" role="status" aria-live="polite">{speech.message}{(speech.status==="speaking"||speech.status==="requested")&&<button type="button" className="text-button" onClick={()=>{window.speechSynthesis?.cancel();setSpeech({status:"stopped",message:"Speech stopped. Continue reading."});}}>Stop speech</button>}</div>}
  <p className="source-note">Teaching text comes from the supplied {mission.level} source, page {mission.sense.page}. Missing fields are never filled in.</p>
 </section>;
}
