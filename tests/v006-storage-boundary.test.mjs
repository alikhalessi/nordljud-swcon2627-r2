import test from "node:test";import assert from "node:assert/strict";import {readFileSync} from "node:fs";
const sql=readFileSync(new URL("../evidence/V-006_DATABASE_SCHEMA.sql",import.meta.url),"utf8");
const state=readFileSync(new URL("../app/learning-state.tsx",import.meta.url),"utf8");
const app=readFileSync(new URL("../app/learning-app.tsx",import.meta.url),"utf8");
const practice=readFileSync(new URL("../app/practice-panel.tsx",import.meta.url),"utf8");
const explorer=readFileSync(new URL("../app/vocabulary-explorer.tsx",import.meta.url),"utf8");
test("V-006: three distinct private RLS tables deny anonymous table access",()=>{
 for(const table of ["nordljud_favorites","nordljud_studied","nordljud_practice_history"]){
  assert.match(sql,new RegExp("create table public\\."+table+"\\s*\\("));
  assert.match(sql,new RegExp("alter table public\\."+table+" enable row level security"));
 }
 assert.match(sql,/revoke all on[\s\S]*from public, anon, authenticated/);
 assert.match(sql,/grant select, insert, delete[\s\S]*to authenticated/);
 assert.equal((sql.match(/using \(\(select auth.uid\(\)\) = user_id\)/g)||[]).length,6);
 assert.equal((sql.match(/with check \(\(select auth.uid\(\)\) = user_id\)/g)||[]).length,3);
 assert.doesNotMatch(sql,/to anon using/);
});
test("V-006: verb meaning and level are separate keys to prevent homograph collision",()=>{
 assert.match(sql,/primary key \(user_id, verb, meaning\)/);
 assert.match(sql,/primary key \(user_id, level, verb, meaning\)/);
 assert.match(sql,/constraint nordljud_score_within_total check \(score <= total\)/);
});
test("V-006: cloud state resets on auth switch and guest never writes records",()=>{
 assert.match(state,/setFavorites\(\[\]\);setStudied\(\[\]\);setHistory\(\[\]\)/);
 assert.match(state,/if\(!uid.current\)return false/);
 assert.match(state,/toggleFavorite/);assert.match(state,/toggleStudied/);
 assert.match(state,/clearHistory/);assert.match(state,/deleteHistory/);
 assert.match(state,/\+\+epoch.current/);
 assert.match(app,/<LearningProvider>/);
 assert.match(app,/<LearningDashboard/);
 assert.match(explorer,/☆ Add to Favorites/);assert.match(explorer,/Mark as studied/);
 assert.match(practice,/recordPractice/);assert.match(practice,/logged.current=true/);
});
