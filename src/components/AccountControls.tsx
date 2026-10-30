"use client";
import {useEffect,useMemo,useRef,useState} from "react";
import {createBrowserAuth} from "../auth/browser";
import {canonicalCallback,signOutThisBrowser} from "../auth/policy";
import type {AuthConfiguration,AuthOutcome} from "../auth/policy";
import {runAutomaticOperation} from "../domain/operation-state";
const unavailable=(message="Account operation unavailable. Continue separate Guest learning or try again."):AuthOutcome=>({status:"unavailable",message});
export function AccountControls({configuration}:{configuration:AuthConfiguration|null}){
 const client=useMemo(()=>configuration?createBrowserAuth(configuration):null,[configuration]);
 const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [busy,setBusy]=useState(false);
 const [outcome,setOutcome]=useState<AuthOutcome|null>(null);const epoch=useRef(0);
 useEffect(()=>()=>{epoch.current++;},[]);
 if(!configuration||!client)return <p role="status">Account services are not configured for this local build.</p>;
 const callback=canonicalCallback(configuration);
 async function checkSession():Promise<AuthOutcome>{
  const result=await runAutomaticOperation(async signal=>{const response=await fetch("/api/session",{signal,credentials:"same-origin",cache:"no-store",headers:{Accept:"application/json"}});return {ok:response.ok,value:await response.json() as {status?:string;ownerId?:string}};},{kind:"read"});
  if(result.status!=="ready"||!result.value.ok)return unavailable("Account verification is unavailable. Continue Guest learning or check again.");
  const value=result.value.value;
  if(value.status==="authenticated"&&typeof value.ownerId==="string"&&/^[0-9a-f-]{36}$/i.test(value.ownerId))return {status:"authenticated",ownerId:value.ownerId,message:"Account session verified in this browser."};
  return value.status==="signed-out"?{status:"signed-out",message:"Signed out. Guest learning remains available."}:unavailable("Account verification is unavailable. Continue Guest learning or check again.");
 }
 async function act(work:()=>Promise<AuthOutcome>){
  if(busy)return;const current=++epoch.current;setBusy(true);setOutcome(unavailable("Checking the account operation. Guest records remain separate."));
  try{const next=await work();if(epoch.current===current)setOutcome(next);}catch{if(epoch.current===current)setOutcome(unavailable());}
  finally{if(epoch.current===current){setBusy(false);setPassword("");}}
 }
 async function signIn(){
  if(!client)return unavailable();
  const result=await runAutomaticOperation(()=>client.auth.signInWithPassword({email,password}),{kind:"write"});
  if(result.status!=="saved")return unavailable("Sign-in outcome is unknown. Check the session before trying again.");
  if(result.value.error)return unavailable("Sign-in did not complete. Check your credentials or try again later.");
  return checkSession();
 }
 async function register(){
  if(!client||!callback)return unavailable();
  const result=await runAutomaticOperation(()=>client.auth.signUp({email,password,options:{emailRedirectTo:callback}}),{kind:"write"});
  if(result.status!=="saved")return unavailable("Registration outcome is unknown. Check your email and session before trying again.");
  if(result.value.error)return unavailable("Registration did not complete. Review your details or try again later.");
  return result.value.data.session?checkSession():unavailable("Check your email for confirmation. You are not signed in by this registration until the session is verified.");
 }
 async function google(){
  if(!client||!callback)return unavailable();
  const result=await runAutomaticOperation(()=>client.auth.signInWithOAuth({provider:"google",options:{redirectTo:callback,scopes:"openid email profile"}}),{kind:"read"});
  return result.status==="ready"&&!result.value.error?unavailable("Continue with the provider. After returning, check your session; a redirect alone does not confirm sign-in."):unavailable("Google sign-in did not start. Continue Guest learning or try again later.");
 }
 return <div className="account-controls"><p className="notice">Cloud progress is not implemented in this build. Learning choices remain in the separate Guest workspace.</p>
  <form className="account-form" onSubmit={event=>{event.preventDefault();void act(signIn);}}><label htmlFor="account-email">Email</label><input id="account-email" type="email" autoComplete="username" required maxLength={254} value={email} onChange={event=>setEmail(event.target.value)}/><label htmlFor="account-password">Password</label><input id="account-password" type="password" autoComplete="current-password" required value={password} onChange={event=>setPassword(event.target.value)}/><div className="actions"><button type="submit" aria-disabled={busy}>Sign in</button><button type="button" className="secondary" aria-disabled={busy} onClick={()=>{if(email&&password)void act(register);}}>Create account</button></div></form>
  <div className="actions"><button type="button" className="secondary" aria-disabled={busy} onClick={()=>void act(google)}>Continue with Google</button><button type="button" className="secondary" aria-disabled={busy} onClick={()=>void act(()=>signOutThisBrowser(client.auth))}>Sign out this browser</button><button type="button" className="text-button" aria-disabled={busy} onClick={()=>void act(checkSession)}>Check session</button></div>
  <p role="status" aria-live="polite">{outcome?.message??"Account session has not been checked. Use Check session to verify it."}</p>
 </div>;
}
