import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const sql=readFileSync(new URL("../database/proposed-migrations/V008_R02_SECURE_CLOUD_SCHEMA_NOT_APPLIED.sql",import.meta.url),"utf8");
const tables=["nordljud_daily_completions","nordljud_review_items","nordljud_review_sessions"];

test("R02 migration safety: fail closed if any proposed table already exists",()=>{
  assert.equal((sql.match(/^create table public\.nordljud_/gm)||[]).length,3);
  assert.doesNotMatch(sql,/create table if not exists/i);
  assert.match(sql,/begin;/i);
  assert.match(sql,/commit;/i);
});

test("R02 migration safety: revoke ALL original grants including TRUNCATE before granting only authenticated CRUD",()=>{
  for(const table of tables){
    assert.match(sql,new RegExp("revoke all on (?:table )?public\\."+table+" from (?:public, )?anon, authenticated;","i"));
    assert.match(sql,new RegExp("grant select,insert,update,delete on (?:table )?public\\."+table+" to authenticated;","i"));
  }
  assert.doesNotMatch(sql,/grant all |grant truncate|grant trigger|grant maintain/i);
});

test("R02 migration safety: reviewed quiz results have validated item shapes and scores",()=>{
  assert.match(sql,/jsonb_array_length\(question_results\)\s*=\s*total/);
  assert.match(sql,/jsonb_path_query_array\(question_results/);
  assert.match(sql,/@\.questionId\.type\(\)\s*==\s*"string"/);
  assert.match(sql,/@\.correct\.type\(\)\s*==\s*"boolean"/);
  assert.match(sql,/\)\s*=\s*score/);
  assert.match(sql,/octet_length\(question_results::text\)\s*<=\s*16384/);
});

test("R02 migration safety: exactly twelve owner-bound policies and no DDL against existing user tables",()=>{
  assert.equal((sql.match(/^create policy "/gm)||[]).length,12);
  assert.doesNotMatch(sql,/\b(?:alter|drop|truncate|delete from|update)\s+(?:table\s+)?public\.(?:nordljud_favorites|nordljud_studied|nordljud_practice_history)\b/i);
  assert.doesNotMatch(sql,/security definer|grant all to|create extension/i);
});
