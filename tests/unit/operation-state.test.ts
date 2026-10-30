import { afterEach, describe, expect, it, vi } from 'vitest';
import { AUTOMATIC_WAIT_MS, reconcileWriteIntent, runAutomaticOperation } from '../../src/domain/operation-state';

afterEach(() => vi.useRealTimers());
describe('automatic operation boundaries (G01)', () => {
  it('returns an acknowledged read value and confirmed write value', async () => {
    expect(await runAutomaticOperation(async () => 42, {kind: 'read'})).toEqual({status: 'ready', value: 42});
    expect(await runAutomaticOperation(async () => 'confirmed', {kind: 'write'})).toEqual({status: 'saved', value: 'confirmed'});
  });
  it('waits until the approved 15-second boundary, then marks an unacknowledged write unknown', async () => {
    vi.useFakeTimers();
    let settled = false;
    let aborted = false;
    const operation = runAutomaticOperation(signal => { signal.addEventListener('abort', () => {aborted = true;}); return new Promise<string>(() => {}); }, {kind: 'write'});
    void operation.then(() => { settled = true; });
    await vi.advanceTimersByTimeAsync(AUTOMATIC_WAIT_MS - 1);
    expect(settled).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    expect(await operation).toEqual({status: 'unknown', reason: 'timeout'});
    expect(aborted).toBe(true);
  });
  it('makes a timed-out read unavailable without inventing source data', async () => {
    vi.useFakeTimers();
    const operation = runAutomaticOperation(() => new Promise<string>(() => {}), {kind: 'read'});
    await vi.advanceTimersByTimeAsync(AUTOMATIC_WAIT_MS);
    expect(await operation).toEqual({status: 'unavailable', reason: 'timeout'});
  });
  it('cancels an unacknowledged write as unknown, with no automatic replay', async () => {
    const abort = new AbortController();
    const work = vi.fn(() => new Promise<string>(() => {}));
    const operation = runAutomaticOperation(work, {kind: 'write', signal: abort.signal});
    abort.abort();
    expect(await operation).toEqual({status: 'unknown', reason: 'cancelled'});
    expect(work).toHaveBeenCalledTimes(1);
  });
  it('does not begin work for an already cancelled operation', async () => {
    const abort = new AbortController(); abort.abort();
    const work = vi.fn(async () => 'must not run');
    expect(await runAutomaticOperation(work, {kind:'read', signal:abort.signal})).toEqual({status:'unavailable',reason:'cancelled'});
    expect(work).not.toHaveBeenCalled();
  });
  it('ignores responses whose owner/source/resource context became obsolete', async () => {
    let current = true;
    let complete!: (value: string) => void;
    const operation = runAutomaticOperation(() => new Promise<string>(resolve => {complete = resolve;}), {kind:'write', isCurrent:()=>current});
    await Promise.resolve();
    current = false; complete('old owner state');
    expect(await operation).toEqual({status:'stale',reason:'context-changed'});
  });
  it('never upgrades a timed-out result when a late acknowledgement arrives', async () => {
    vi.useFakeTimers();
    let complete!: (value: string) => void;
    const operation = runAutomaticOperation(() => new Promise<string>(resolve => {complete = resolve;}), {kind:'write'});
    await vi.advanceTimersByTimeAsync(AUTOMATIC_WAIT_MS);
    const result = await operation;
    complete('late confirmed result'); await Promise.resolve();
    expect(result).toEqual({status:'unknown',reason:'timeout'});
  });
  it('handles failed reads and uncertain failed writes separately', async () => {
    const fail = async () => { throw new Error('synthetic transport failure'); };
    expect(await runAutomaticOperation(fail,{kind:'read'})).toEqual({status:'unavailable',reason:'failed'});
    expect(await runAutomaticOperation(fail,{kind:'write'})).toEqual({status:'unknown',reason:'failed'});
  });
});
describe('explicit write-intent reconciliation',()=>{
  it('accepts confirmed current desired state without replaying a write',()=>expect(reconcileWriteIntent({sameContext:true,readAvailable:true,matchesIntent:true})).toBe('saved'));
  it('requires explicit reapplication after a current-state conflict',()=>expect(reconcileWriteIntent({sameContext:true,readAvailable:true,matchesIntent:false})).toBe('conflict'));
  it('remains unknown when read-back is unavailable',()=>expect(reconcileWriteIntent({sameContext:true,readAvailable:false,matchesIntent:false})).toBe('unknown'));
  it('never replays or restores a previous owner/source context',()=>expect(reconcileWriteIntent({sameContext:false,readAvailable:true,matchesIntent:true})).toBe('obsolete'));
});
