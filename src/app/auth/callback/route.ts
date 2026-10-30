import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {readAuthConfiguration,completeCallback} from "@/auth/policy";
import {createRequestAuth,hasPkceVerifier,privateJson} from "@/auth/server";
export const dynamic="force-dynamic";
export async function GET(request:NextRequest){
 const configuration=readAuthConfiguration();
 if(!configuration)return privateJson({status:"unavailable",message:"Account services are not configured. Continue Guest learning."},503);
 if(request.nextUrl.origin!==configuration.canonicalOrigin)return privateJson({status:"unavailable",message:"Return to the configured application and start a fresh sign-in."},400);
 const context=createRequestAuth(configuration,request.cookies);
 if(!context)return privateJson({status:"unavailable",message:"Account services are unavailable. Continue Guest learning."},503);
 const hasVerifier=hasPkceVerifier(configuration,request.cookies);
 const outcome=await completeCallback(context.client.auth,request.nextUrl.searchParams,hasVerifier);
 // Only fixed application destinations; never echo a code, next URL or provider error.
 return context.apply(NextResponse.redirect(`${configuration.canonicalOrigin}/?auth=${outcome.status==="authenticated"?"complete":"incomplete"}`,303));
}
