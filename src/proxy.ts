import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {readAuthConfiguration} from "./auth/policy";
import {createRequestAuth} from "./auth/server";
import {runAutomaticOperation} from "./domain/operation-state";
export async function proxy(request:NextRequest){
 const path=request.nextUrl.pathname;
 if(path!=="/api/session"&&!path.startsWith("/api/me/"))return NextResponse.next();
 const configuration=readAuthConfiguration();
 if(!configuration)return NextResponse.next();
 const context=createRequestAuth(configuration,request.cookies);
 if(!context)return NextResponse.next();
 // Refresh verification is not private-route authorization: handlers still getUser.
 await runAutomaticOperation(()=>context.client.auth.getClaims(),{kind:"read"});
 return context.apply(NextResponse.next({request}));
}
export const config={matcher:["/api/session","/api/me/:path*"]};
