import { describe, expect, it } from 'vitest';
import { decodeGuestSnapshot, openGuestStore, validateGuestFlags, validateGuestPreferences } from '../../src/persistence/guest-store';
import { guestDatabaseName } from '../../src/persistence/guest-db';

describe('Guest record validation and identity',()=>{
 it('accepts only an approved level and a matching valid selected sense',()=>{
   expect(validateGuestPreferences({level:'B1',selectedSenseId:'B1:0361'})).toBe(true);
   expect(validateGuestPreferences({level:'C1',selectedSenseId:null})).toBe(true);
   for(const value of [{level:'A1',selectedSenseId:null},{level:'A2',selectedSenseId:'B1:0001'},{level:'A2',selectedSenseId:'A2:0456'},{level:'A2',selectedSenseId:'A2:01'},{level:'A2',selectedSenseId:null,owner_id:'synthetic-owner'}]) expect(validateGuestPreferences(value)).toBe(false);
 });
 it('accepts only independent Boolean flags, never mission/practice/account payloads',()=>{
   expect(validateGuestFlags({favorite:true,studied:false})).toBe(true);
   for(const value of [{favorite:true},{favorite:'true',studied:false},{favorite:false,studied:false,completed:true},{favorite:false,studied:false,latestResult:'correct'}]) expect(validateGuestFlags(value)).toBe(false);
 });
 it('decodes a strictly bounded Guest snapshot without extending retained state',()=>{
   const good={preferences:{level:'A2',selectedSenseId:'A2:0361'},flags:{'A2:0361':{favorite:true,studied:false},'B1:0361':{favorite:false,studied:true}}};
   expect(decodeGuestSnapshot(good)).toEqual(good);
   expect(decodeGuestSnapshot({...good,missionCompletion:{'mission-a':true}})).toBeNull();
   expect(decodeGuestSnapshot({...good,flags:{'A2:0456':{favorite:true,studied:false}}})).toBeNull();
   expect(decodeGuestSnapshot({...good,flags:{'A2:0361':{favorite:true,studied:false,owner_id:'synthetic-owner'}}})).toBeNull();
 });
 it('isolates Condition B namespaces by source revision',()=>{
   expect(guestDatabaseName('source-a')).toContain('nordljud-condition-b-core-v1');
   expect(guestDatabaseName('source-a')).not.toBe(guestDatabaseName('source-b'));
 });
});
describe('truthful memory-only Guest fallback',()=>{
 it('continues with per-level flags and preferences when native storage is unavailable',async()=>{
   const store=await openGuestStore('source-a',{indexedDB:null});
   expect(store.getStorageStatus().mode).toBe('session-only');
   const pref=await store.patchPreferences({level:'B1',selectedSenseId:'B1:0361'});
   expect(pref.status).toBe('session-only');
   const first=await store.patchSenseFlags('A2:0361',{favorite:true});
   const second=await store.patchSenseFlags('B1:0361',{studied:true});
   expect(first.status).not.toBe('saved');
   expect(second.snapshot.preferences).toEqual({level:'B1',selectedSenseId:'B1:0361'});
   expect(second.snapshot.flags['A2:0361']).toEqual({favorite:true,studied:false});
   expect(second.snapshot.flags['B1:0361']).toEqual({favorite:false,studied:true});
   expect(Object.keys(second.snapshot).sort()).toEqual(['flags','preferences']);
   store.close();
 });
 it('preserves independent fields on repeated explicit flag edits',async()=>{
   const store=await openGuestStore('source-a',{indexedDB:null});
   await store.patchFlags('A2:0361',{favorite:true});
   await store.patchFlags('A2:0361',{studied:true});
   const result=await store.patchFlags('A2:0361',{favorite:false});
   expect(result.snapshot.flags['A2:0361']).toEqual({favorite:false,studied:true});
   store.close();
 });
 it('reports only fixed learner-facing feedback for synthetic storage exceptions',async()=>{
   const factory={open(){throw new Error('SYNTHETIC_PRIVATE_EXCEPTION_SENTINEL');}} as unknown as IDBFactory;
   const store=await openGuestStore('source-a',{indexedDB:factory});
   const result=await store.patchFlags('A2:0361',{favorite:true});
   expect(result.status).toBe('session-only');
   expect(result.reason).toBeTruthy();
   expect(result.reason).not.toContain('SYNTHETIC_PRIVATE_EXCEPTION_SENTINEL');
   expect(result.snapshot.flags['A2:0361'].favorite).toBe(true);
   store.close();
 });
});
