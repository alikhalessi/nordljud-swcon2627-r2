import type {NextRequest} from "next/server";
import {readAuthConfiguration,verifiedSession} from "@/auth/policy";
import {createRequestAuth,privateJson} from "@/auth/server";
export const dynamic="force-dynamic";
export async function GET(request:NextRequest){
 const context=createRequestAuth(readAuthConfiguration(),request.cookies);
 if(!context)return privateJson({status:"unavailable",message:"Account services are not configured for this local build."},503);
 const outcome=await verifiedSession(context.client.auth);
 return context.apply(privateJson(outcome,outcome.status==="unavailable"?503:200));
}
