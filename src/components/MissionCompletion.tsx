"use client";
export function MissionCompletion({completed,onComplete}:{completed:boolean;onComplete:()=>void}){
 return <div className="completion"><button type="button" disabled={completed} onClick={onComplete}>{completed?"Completed by you":"Mark mission complete"}</button><p className="small muted">Completion is your self-report, separate from correctness or mastery. Guest completion resets on refresh.</p></div>;
}
