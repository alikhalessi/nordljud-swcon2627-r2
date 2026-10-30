/** Fixed learner-facing copy: never derives text from an exception or token. */
export function operationFeedback(status:string):string{
 const copy:Record<string,string>={loading:"Loading source content…",saving:"Saving browser choices…",saved:"Saved.",unknown:"Save status unknown. Check saved state before making another change.",conflict:"Saved state differs from your choice. Review it before retrying.","session-only":"Choices are kept for this session only. Browser storage is unavailable.",error:"This operation is unavailable. You can continue supported learning and try again.",unavailable:"This service is unavailable. Continue learning as a Guest.",cancelled:"Waiting cancelled. You can try again when ready."};
 return copy[status]??"Ready.";
}
