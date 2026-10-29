// V-008: pure, deterministic and explicitly learner-controlled review data.
import { makePracticeQuestions } from "./practice-engine.mjs";
export const GUEST_REVIEW_VERSION = 1;
export const GUEST_REVIEW_KEY = "nordljud-r2-guest-review-v1";
export const DAILY_ARCHIVE_START = "2026-10-29";
export const DAILY_SELECTION_VERSION = "f04-2026-10-29-v1";
export const EMPTY_GUEST_SNAPSHOT = Object.freeze({version:1,completions:[],reminders:[],sessions:[]});
export const LEVELS = ["A2","B1","B2","C1"];

export function isValidDay(day) {
  if(typeof day!=="string" || !/^\d{4}-\d{2}-\d{2}$/.test(day))return false;
  const [y,m,d]=day.split("-").map(Number);
  const date=new Date(Date.UTC(y,m-1,d));
  return date.getUTCFullYear()===y && date.getUTCMonth()===m-1 && date.getUTCDate()===d;
}
export function addLocalDays(day, delta) {
  if(!isValidDay(day) || !Number.isInteger(delta))throw new Error("Invalid local day");
  const [y,m,d]=day.split("-").map(Number);
  return new Date(Date.UTC(y,m-1,d+delta)).toISOString().slice(0,10);
}
export function dayDistance(start,end) {
  if(!isValidDay(start)||!isValidDay(end))throw new Error("Invalid local day");
  return (Date.parse(end+"T00:00:00Z")-Date.parse(start+"T00:00:00Z"))/86400000;
}
export function isSense(s) {
  return !!s && LEVELS.includes(s.level) && typeof s.verb==="string" && s.verb.trim().length>0 &&
    s.verb.length<=150 && typeof s.meaning==="string" && s.meaning.trim().length>0 && s.meaning.length<=300;
}
export function senseKey(s) {return JSON.stringify([s.level,s.verb,s.meaning]);}
function validReminder(item) {
  return isSense(item) && isValidDay(item.firstRequestedOn) && isValidDay(item.dueOn) &&
    (item.lastReviewedOn===null || isValidDay(item.lastReviewedOn)) &&
    Number.isInteger(item.reviewedCount) && item.reviewedCount>=0 && item.reviewedCount<=10000;
}
function validCompletion(item) {
  return !!item && LEVELS.includes(item.level) && isValidDay(item.lessonOn) &&
    item.lessonOn>=DAILY_ARCHIVE_START && item.algorithmVersion===DAILY_SELECTION_VERSION;
}
function validReviewResult(r) {
  return isSense(r) && typeof r.questionId==="string" && r.questionId.length<=32 &&
    typeof r.correct==="boolean";
}
function validSession(item) {
  return !!item && typeof item.id==="string" && item.id.length>0 && item.id.length<=100 &&
    [7,14].includes(item.windowDays) && isValidDay(item.reviewedOn) &&
    Number.isInteger(item.score) && Number.isInteger(item.total) && item.total>=0 && item.total<=10 &&
    item.score>=0 && item.score<=item.total && Array.isArray(item.results) &&
    item.results.length===item.total && item.results.every(validReviewResult) &&
    item.results.filter(r=>r.correct).length===item.score;
}
const MAX_ITEMS={completions:500,reminders:500,sessions:100};
export function loadGuestSnapshot(raw) {
  try{
    if(typeof raw!=="string" || raw.length>200000)return {...EMPTY_GUEST_SNAPSHOT};
    const obj=JSON.parse(raw);
    if(!obj||obj.version!==GUEST_REVIEW_VERSION ||
      !Array.isArray(obj.completions)||!Array.isArray(obj.reminders)||!Array.isArray(obj.sessions))return {...EMPTY_GUEST_SNAPSHOT};
    for(const key of ["completions","reminders","sessions"]) if(obj[key].length>MAX_ITEMS[key])return {...EMPTY_GUEST_SNAPSHOT};
    if(!obj.completions.every(validCompletion)||!obj.reminders.every(validReminder)||!obj.sessions.every(validSession))return {...EMPTY_GUEST_SNAPSHOT};
    if(new Set(obj.completions.map(c=>c.level+"|"+c.lessonOn)).size!==obj.completions.length)return {...EMPTY_GUEST_SNAPSHOT};
    if(new Set(obj.reminders.map(senseKey)).size!==obj.reminders.length)return {...EMPTY_GUEST_SNAPSHOT};
    return {version:1,completions:obj.completions,reminders:obj.reminders,sessions:obj.sessions};
  }catch{return {...EMPTY_GUEST_SNAPSHOT};}
}
export function toggleDailyCompletion(snapshot,level,lessonOn) {
  if(!LEVELS.includes(level)||!isValidDay(lessonOn)||lessonOn<DAILY_ARCHIVE_START)return snapshot;
  const existing=snapshot.completions.some(x=>x.level===level&&x.lessonOn===lessonOn);
  const completions=existing?snapshot.completions.filter(x=>!(x.level===level&&x.lessonOn===lessonOn)):
    [...snapshot.completions,{level,lessonOn,algorithmVersion:DAILY_SELECTION_VERSION}];
  return {...snapshot,completions:completions.slice(-MAX_ITEMS.completions)};
}
export function addReminder(snapshot,sense,today) {
  if(!isSense(sense)||!isValidDay(today))return snapshot;
  if(snapshot.reminders.some(x=>senseKey(x)===senseKey(sense)))return snapshot;
  const item={level:sense.level,verb:sense.verb,meaning:sense.meaning,
    firstRequestedOn:today,dueOn:addLocalDays(today,2),lastReviewedOn:null,reviewedCount:0};
  return {...snapshot,reminders:[...snapshot.reminders,item].slice(-MAX_ITEMS.reminders)};
}
export function removeReminder(snapshot,sense) {
  return {...snapshot,reminders:snapshot.reminders.filter(x=>senseKey(x)!==senseKey(sense))};
}
export function snoozeReminder(snapshot,sense,today,days) {
  if(![2,7,14].includes(days)||!isValidDay(today))return snapshot;
  return {...snapshot,reminders:snapshot.reminders.map(x=>senseKey(x)===senseKey(sense)?
    {...x,dueOn:addLocalDays(today,days)}:x)};
}
export function markReviewed(snapshot,sense,today) {
  if(!isValidDay(today))return snapshot;
  return {...snapshot,reminders:snapshot.reminders.map(x=>senseKey(x)===senseKey(sense)?
    {...x,lastReviewedOn:today,reviewedCount:x.reviewedCount+1,dueOn:addLocalDays(today,7)}:x)};
}
export function canOfferReview(item,windowDays,today){
  return validReminder(item) && [7,14].includes(windowDays) && isValidDay(today) &&
    dayDistance(item.firstRequestedOn,today)>=windowDays;
}
export function appendReviewSession(snapshot,session){
  if(!validSession(session))return snapshot;
  return {...snapshot,sessions:[...snapshot.sessions,session].slice(-MAX_ITEMS.sessions)};
}
export function assembleReviewQuestions(reminders,pools,today,windowDays,sessions=[]) {
  if(![7,14].includes(windowDays) || !isValidDay(today))return [];
  const eligible=reminders.filter(x=>canOfferReview(x,windowDays,today));
  // Only use observed failed review answers as an additional priority signal.
  const failed=new Set();
  for(const session of sessions)for(const q of session.results||[])if(q.correct===false)failed.add(senseKey(q));
  eligible.sort((a,b)=>{
    const fa=failed.has(senseKey(a))?0:1,fb=failed.has(senseKey(b))?0:1;
    return fa-fb || a.dueOn.localeCompare(b.dueOn) || senseKey(a).localeCompare(senseKey(b));
  });
  const assembled=[];
  for(const item of eligible){
    const rows=pools[item.level];
    if(!Array.isArray(rows))continue;
    const entry=rows.find(x=>x.verb===item.verb&&x.meaning===item.meaning);
    if(!entry)continue;
    const used=makePracticeQuestions(entry,rows);
    // One question per requested sense first: coverage before repetition.
    const q=used.find(x=>x.kind==="meaning") || used[0];
    if(!q)continue;
    assembled.push({...q,level:item.level,verb:item.verb,meaning:item.meaning,
      reviewId:JSON.stringify([item.level,item.verb,item.meaning,q.id])});
    if(assembled.length===10)break;
  }
  return assembled;
}
