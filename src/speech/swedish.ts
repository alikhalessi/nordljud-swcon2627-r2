import { fieldAvailable } from "../domain/availability";
export interface SpeechUtteranceLike {text:string;lang:string;voice?:unknown;onstart:(()=>void)|null;onend:(()=>void)|null;onerror:(()=>void)|null}
export interface SpeechEnvironment {getVoices:()=>{lang:string}[];createUtterance:(text:string)=>SpeechUtteranceLike;speak:(utterance:SpeechUtteranceLike)=>void;cancel:()=>void}
export interface SpeechResult {status:"requested"|"speaking"|"ended"|"unavailable"|"error"|"stopped";message:string}
function browserEnvironment():SpeechEnvironment|null {
 if(typeof window==="undefined"||!window.speechSynthesis||!window.SpeechSynthesisUtterance)return null;
 return {getVoices:()=>window.speechSynthesis.getVoices(),createUtterance:text=>new window.SpeechSynthesisUtterance(text) as unknown as SpeechUtteranceLike,speak:utterance=>window.speechSynthesis.speak(utterance as unknown as SpeechSynthesisUtterance),cancel:()=>window.speechSynthesis.cancel()};
}
export function requestSwedishSpeech(text:string,onChange?:(result:SpeechResult)=>void,environment?:SpeechEnvironment|null):SpeechResult {
 const env=environment===undefined?browserEnvironment():environment;
 const unavailable:SpeechResult={status:"unavailable",message:"Swedish speech is unavailable. Continue reading and practising; you can try listening again after browser voices load."};
 if(!env||!fieldAvailable(text))return unavailable;
 try{
  const voice=env.getVoices().find(v=>/^sv(?:-|$)/i.test(v.lang));
  if(!voice)return unavailable;
  env.cancel();
  const utterance=env.createUtterance(text);utterance.lang="sv-SE";utterance.voice=voice;
  utterance.onstart=()=>onChange?.({status:"speaking",message:"Browser speech playback started."});
  utterance.onend=()=>onChange?.({status:"ended",message:"Browser speech playback ended. Reading and practice remain available."});
  utterance.onerror=()=>onChange?.({status:"error",message:"Swedish speech could not play. Continue reading or try listening again."});
  env.speak(utterance);
  return {status:"requested",message:"Swedish speech requested from this browser. Audio output has not been verified."};
 }catch{return {status:"error",message:"Swedish speech could not start. Continue reading or try listening again."};}
}
