import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

// Compile the actual runtime modules, then execute them with the browser's native IDB.
// This tests storage behavior independently of the learning UI, without a mock DB.
function bundleGuestRuntime() {
 const entries = ["domain/contracts", "domain/operation-state", "persistence/guest-db", "persistence/guest-store"];
 const modules = Object.fromEntries(entries.map(key => [key, ts.transpileModule(readFileSync(path.join(process.cwd(), "src", `${key}.ts`), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText]));
 return `(() => { const sources = ${JSON.stringify(modules)}; const cache = {}; function load(id) { if(cache[id]) return cache[id].exports; const module = {exports:{}}; cache[id] = module; const require = spec => { const parts = id.split('/'); parts.pop(); for(const p of spec.split('/')) { if(p==='..') parts.pop(); else if(p!=='.') parts.push(p); } return load(parts.join('/')); }; new Function('require','module','exports',sources[id])(require,module,module.exports); return module.exports; } window.__guestRuntime = load('persistence/guest-store'); })();`;
}
test("native IndexedDB acknowledges persistence, merges concurrent field patches and isolates manifests", async ({ page }) => {
 await page.goto("/");
 await page.addScriptTag({ content: bundleGuestRuntime() });
 const result = await page.evaluate(async () => {
  const api = (window as unknown as { __guestRuntime: typeof import("../../src/persistence/guest-store") }).__guestRuntime;
  const source = "native-integration-main";
  const first = await api.openGuestStore(source);
  const second = await api.openGuestStore(source);
  const results = await Promise.all([first.patchSenseFlags("A2:0024", {favorite:true}), second.patchSenseFlags("A2:0024", {studied:true})]);
  const snapshot = await first.refresh();
  await first.patchPreferences({level:"B1",selectedSenseId:"B1:0000"});
  first.close(); second.close();
  const reopened = await api.openGuestStore(source);
  const retained = await reopened.load();
  const isolated = await api.openGuestStore("native-integration-other-manifest");
  const other = await isolated.load();
  const status = reopened.getStorageStatus();
  reopened.close(); isolated.close();
  return {results:results.map(r=>r.status),snapshot,retained,other,status};
 });
 expect(result.status.mode).toBe("persistent");
 expect(result.results).toEqual(["saved","saved"]);
 expect(result.snapshot.flags["A2:0024"]).toEqual({favorite:true,studied:true});
 expect(result.retained.flags["A2:0024"]).toEqual({favorite:true,studied:true});
 expect(result.retained.preferences).toEqual({level:"B1",selectedSenseId:"B1:0000"});
 expect(result.other.flags).toEqual({});
});

test("native storage preserves a newer database and falls back without a reset", async ({page})=>{
 await page.goto("/");await page.addScriptTag({content:bundleGuestRuntime()});
 const result=await page.evaluate(async()=>{
  const api=(window as unknown as {__guestRuntime:typeof import("../../src/persistence/guest-store")}).__guestRuntime;
  const name="nordljud-condition-b-core-v1:"+encodeURIComponent("newer-schema-fixture");
  await new Promise<void>((resolve,reject)=>{const r=indexedDB.open(name,2);r.onupgradeneeded=()=>r.result.createObjectStore("sentinel");r.onerror=()=>reject(r.error);r.onsuccess=()=>{const db=r.result;const tx=db.transaction("sentinel","readwrite");tx.objectStore("sentinel").put("preserve-this-test-value","value");tx.oncomplete=()=>{db.close();resolve();};};});
  const store=await api.openGuestStore("newer-schema-fixture");
  const write=await store.patchFlags("A2:0000",{favorite:true});const status=store.getStorageStatus();store.close();
  const retained=await new Promise<{version:number;value:unknown}>((resolve,reject)=>{const r=indexedDB.open(name);r.onerror=()=>reject(r.error);r.onsuccess=()=>{const db=r.result;const request=db.transaction("sentinel").objectStore("sentinel").get("value");request.onsuccess=()=>{resolve({version:db.version,value:request.result});db.close();};};});
  return {write:write.status,status,retained};
 });
 expect(result.status.mode).toBe("session-only");expect(result.write).toBe("session-only");expect(result.retained).toEqual({version:2,value:"preserve-this-test-value"});
});
test("native storage preserves corrupt records and closes on versionchange",async({page})=>{
 await page.goto("/");await page.addScriptTag({content:bundleGuestRuntime()});
 const result=await page.evaluate(async()=>{
  const api=(window as unknown as {__guestRuntime:typeof import("../../src/persistence/guest-store")}).__guestRuntime;
  const source="corrupt-record-fixture",name="nordljud-condition-b-core-v1:"+encodeURIComponent(source);
  const original={schemaVersion:1,sourceManifestId:source,snapshot:{preferences:{level:"A2",selectedSenseId:null},flags:{},unexpectedFutureField:true}};
  await new Promise<void>((resolve,reject)=>{const r=indexedDB.open(name,1);r.onupgradeneeded=()=>r.result.createObjectStore("learning");r.onerror=()=>reject(r.error);r.onsuccess=()=>{const db=r.result,tx=db.transaction("learning","readwrite");tx.objectStore("learning").put(original,"snapshot");tx.oncomplete=()=>{db.close();resolve();};};});
  const corrupt=await api.openGuestStore(source);const fallback=corrupt.getStorageStatus();corrupt.close();
  const retained=await new Promise<unknown>((resolve,reject)=>{const r=indexedDB.open(name);r.onerror=()=>reject(r.error);r.onsuccess=()=>{const db=r.result,read=db.transaction("learning").objectStore("learning").get("snapshot");read.onsuccess=()=>{resolve(read.result);db.close();};};});
  const active=await api.openGuestStore("versionchange-fixture");await active.patchFlags("A2:0000",{favorite:true});
  await new Promise<void>((resolve,reject)=>{const r=indexedDB.open("nordljud-condition-b-core-v1:"+encodeURIComponent("versionchange-fixture"),2);r.onerror=()=>reject(r.error);r.onsuccess=()=>{r.result.close();resolve();};});
  const changed=active.getStorageStatus(),snapshot=active.getSnapshot();active.close();
  return {fallback,original,retained,changed,snapshot};
 });
 expect(result.fallback.mode).toBe("session-only");expect(result.retained).toEqual(result.original);
 expect(result.changed.mode).toBe("session-only");expect(result.snapshot.flags["A2:0000"].favorite).toBe(true);
});
test("injected native transaction abort is unknown until read-back and never automatically replayed",async({page})=>{
 await page.goto("/");await page.addScriptTag({content:bundleGuestRuntime()});
 const result=await page.evaluate(async()=>{
  const api=(window as unknown as {__guestRuntime:typeof import("../../src/persistence/guest-store")}).__guestRuntime;
  const store=await api.openGuestStore("abort-injection-fixture");
  const original=IDBDatabase.prototype.transaction;let writes=0;
  IDBDatabase.prototype.transaction=function(...args:Parameters<typeof original>){const tx=original.apply(this,args);if(args[1]==="readwrite"){writes++;queueMicrotask(()=>tx.abort());}return tx;};
  const attempted=await store.patchFlags("A2:0001",{studied:true});
  await store.refresh();const reconciled=store.getStorageStatus();
  IDBDatabase.prototype.transaction=original;
  const retried=await store.patchFlags("A2:0001",{studied:true});store.close();
  return {attempted:attempted.status,reconciled:reconciled.status,writes,retried:retried.status};
 });
 expect(result).toEqual({attempted:"unknown",reconciled:"conflict",writes:1,retried:"saved"});
});
test("focus refresh sees another connection's committed Guest choice",async({page})=>{
 await page.goto("/");await page.addScriptTag({content:bundleGuestRuntime()});
 await page.evaluate(async()=>{
  const scope=window as unknown as {__guestRuntime:typeof import("../../src/persistence/guest-store");__focusStore:Awaited<ReturnType<typeof import("../../src/persistence/guest-store")["openGuestStore"]>>};
  const first=await scope.__guestRuntime.openGuestStore("focus-refresh-fixture");
  scope.__focusStore=await scope.__guestRuntime.openGuestStore("focus-refresh-fixture");
  await first.patchFlags("A2:0002",{favorite:true});first.close();window.dispatchEvent(new Event("focus"));
 });
 await expect.poll(()=>page.evaluate(()=>(window as unknown as {__focusStore:import("../../src/persistence/guest-store").GuestStore}).__focusStore.getSnapshot().flags["A2:0002"]?.favorite)).toBe(true);
 await page.evaluate(()=>(window as unknown as {__focusStore:import("../../src/persistence/guest-store").GuestStore}).__focusStore.close());
});

test("injected quota and blocked-open conditions preserve existing native records",async({page})=>{
 await page.goto("/");await page.addScriptTag({content:bundleGuestRuntime()});
 const result=await page.evaluate(async()=>{
  const api=(window as unknown as {__guestRuntime:typeof import("../../src/persistence/guest-store")}).__guestRuntime;
  const source="quota-blocked-injection-fixture",store=await api.openGuestStore(source);await store.patchFlags("A2:0004",{favorite:true});
  const original=IDBObjectStore.prototype.put;
  IDBObjectStore.prototype.put=function(){throw new DOMException("Synthetic quota fixture","QuotaExceededError");};
  const failed=await store.patchFlags("A2:0004",{favorite:false});IDBObjectStore.prototype.put=original;
  await store.refresh();const retained=store.getSnapshot();store.close();
  const factory={open:(name:string,version?:number)=>{const request=indexedDB.open(name,version);queueMicrotask(()=>request.onblocked?.(new Event("blocked") as IDBVersionChangeEvent));return request;}} as IDBFactory;
  const blocked=await api.openGuestStore(source,{indexedDB:factory});const fallback=blocked.getStorageStatus();blocked.close();
  const reopened=await api.openGuestStore(source);const after=await reopened.load();reopened.close();
  return {failed:failed.status,retained,fallback,after};
 });
 expect(result.failed).toBe("unknown");expect(result.retained.flags["A2:0004"].favorite).toBe(true);expect(result.fallback.mode).toBe("session-only");expect(result.after.flags["A2:0004"].favorite).toBe(true);
});
