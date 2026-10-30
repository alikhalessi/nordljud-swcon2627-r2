import {operationFeedback} from "../domain/feedback";
import { AccessibleFeedback } from "./AccessibleFeedback";
export interface OperationStatusProps {status:string;error?:unknown;onRetry?:()=>void;message?:string}
export function OperationStatus({status,onRetry,message}:OperationStatusProps) {
 const retryLabel=status==="unknown"||status==="conflict"?"Check saved state":"Try again";
 return <AccessibleFeedback status={status}><span>{message??operationFeedback(status)}</span>{onRetry&&<button type="button" className="text-button" onClick={onRetry}>{retryLabel}</button>}</AccessibleFeedback>;
}
