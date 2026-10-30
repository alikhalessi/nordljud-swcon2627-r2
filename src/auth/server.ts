import {NextResponse} from "next/server";
import {createServerClient} from "@supabase/ssr";
import type {CookieOptions} from "@supabase/ssr";
import type {AuthConfiguration} from "./policy";
export interface RequestCookies {getAll:()=>{name:string;value:string}[];set?:(name:string,value:string)=>unknown}
export interface CookieWrite {name:string;value:string;options:CookieOptions}
const PRIVATE_HEADERS={"Cache-Control":"private, no-cache, no-store, must-revalidate, max-age=0","Pragma":"no-cache","Expires":"0"};
export function createRequestAuth(config:AuthConfiguration|null,cookies:RequestCookies){
 if(!config)return null;
 const writes=new Map<string,CookieWrite>();const headers:Record<string,string>={...PRIVATE_HEADERS};
 const client=createServerClient(config.url,config.publishableKey,{auth:{flowType:"pkce",detectSessionInUrl:false},cookieOptions:{path:"/",sameSite:"lax",secure:true},cookies:{
  getAll:()=>cookies.getAll(),
  setAll:(batch,cacheHeaders)=>{for(const item of batch){writes.set(item.name,item);cookies.set?.(item.name,item.value);}Object.assign(headers,cacheHeaders);}
 }});
 return {client,apply:(response:NextResponse)=>{for(const item of writes.values())response.cookies.set(item.name,item.value,item.options);for(const [key,value] of Object.entries(headers))response.headers.set(key,value);response.headers.set("Cache-Control",PRIVATE_HEADERS["Cache-Control"]);return response;}};
}
export function hasPkceVerifier(config:AuthConfiguration,cookies:RequestCookies):boolean {
 const project=new URL(config.url).hostname.split(".")[0];const key=`sb-${project}-auth-token-code-verifier`;
 return cookies.getAll().some(cookie=>(cookie.name===key||(cookie.name.startsWith(`${key}.`)&&/^\d+$/.test(cookie.name.slice(key.length+1))))&&cookie.value.length>0);
}
export function privateJson(body:unknown,status=200){return NextResponse.json(body,{status,headers:PRIVATE_HEADERS});}
