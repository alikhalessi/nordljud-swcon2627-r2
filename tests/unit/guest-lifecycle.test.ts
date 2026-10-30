import {beforeEach,describe,it,expect,vi} from "vitest";
const adapter=vi.hoisted(()=>({open:vi.fn()}));
vi.mock("../../src/persistence/guest-db",()=>({openGuestDatabase:adapter.open}));
import {openGuestStore} from "../../src/persistence/guest-store";
import type {GuestDatabase} from "../../src/persistence/guest-db";
import type {GuestSnapshot} from "../../src/persistence/guest-store";
const initial:GuestSnapshot={preferences:{level:"A2",selectedSenseId:null},flags:{}};
beforeEach(()=>adapter.open.mockReset());
describe("late native adapter responses after Guest connection invalidation; injected adapter",()=>{
 it("does not replace memory choices with a late refresh from an invalidated connection",async()=>{
  let finish!:(value:GuestSnapshot)=>void;
  const database:GuestDatabase={load:vi.fn().mockResolvedValueOnce(initial).mockImplementationOnce(()=>new Promise<GuestSnapshot>(resolve=>{finish=resolve;})),patchPreferences:async()=>{},patchFlags:async()=>{},close:vi.fn()};
  adapter.open.mockResolvedValue(database);const store=await openGuestStore("lifecycle-fixture");
  const refresh=store.refresh();database.onVersionChange?.();await store.patchFlags("A2:0000",{favorite:true});
  finish(initial);await refresh;
  expect(store.getStorageStatus().mode).toBe("session-only");expect(store.getSnapshot().flags["A2:0000"].favorite).toBe(true);store.close();
 });
 it("does not restore a persistent status after an invalidated in-flight write",async()=>{
  let finish!:()=>void;
  const database:GuestDatabase={load:async()=>initial,patchPreferences:async()=>{},patchFlags:()=>new Promise<void>(resolve=>{finish=resolve;}),close:vi.fn()};
  adapter.open.mockResolvedValue(database);const store=await openGuestStore("write-lifecycle-fixture");
  const write=store.patchFlags("A2:0000",{favorite:true});database.onVersionChange?.();finish();await write;
  expect(store.getStorageStatus().mode).toBe("session-only");expect(store.getStorageStatus().status).not.toBe("saved");store.close();
 });
 it("recovers writes after a failed refresh is followed by a successful same-context read",async()=>{
  let backing:GuestSnapshot=structuredClone(initial);
  const database:GuestDatabase={load:vi.fn().mockResolvedValueOnce(backing).mockRejectedValueOnce(new Error("synthetic-read-failure")).mockImplementation(async()=>backing),patchPreferences:async()=>{},patchFlags:async(id,patch)=>{backing={...backing,flags:{...backing.flags,[id]:{favorite:false,studied:false,...patch}}};},close:vi.fn()};
  adapter.open.mockResolvedValue(database);const store=await openGuestStore("refresh-recovery-fixture");
  await store.refresh();expect(store.getStorageStatus().status).toBe("unknown");
  await store.refresh();expect(store.getStorageStatus().status).toBe("ready");
  expect((await store.patchFlags("A2:0003",{favorite:true})).status).toBe("saved");store.close();
 });
});
