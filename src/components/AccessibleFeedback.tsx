import type { ReactNode } from "react";
export function AccessibleFeedback({status,children,id}:{status:string;children:ReactNode;id?:string}) {
 const urgent=status==="error";
 return <div id={id} className={`feedback feedback-${status}`} role={urgent?"alert":"status"} aria-live={urgent?"assertive":"polite"}>{children}</div>;
}
