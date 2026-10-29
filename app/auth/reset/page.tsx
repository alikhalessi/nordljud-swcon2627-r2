"use client";

import { useEffect,useState,type FormEvent } from "react";
import { getBrowserAuth } from "../../../lib/supabase-browser";
import { authErrorText } from "../../../lib/auth-flow.mjs";

export default function ResetPasswordPage() {
  const [ready,setReady]=useState(false);
  const [busy,setBusy]=useState(false);
  const [password,setPassword]=useState("");
  const [status,setStatus]=useState("Validating your recovery session…");
  const [error,setError]=useState("");
  useEffect(()=>{
    const db=getBrowserAuth();
    if(!db){setStatus("Authentication is unavailable.");return;}
    let active=true;
    void db.auth.getSession().then(({data,error})=>{
      if(!active)return;
      if(error||!data.session){setStatus("Your recovery session is unavailable or expired. Request a new reset email.");return;}
      setReady(true);setStatus("Choose a new password for the signed-in account.");
      // Supabase validates the session itself; this route never trusts URL-only identity claims.
    }).catch(()=>{if(active)setStatus("Could not verify the recovery session.");});
    return()=>{active=false;};
  },[]);
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    const db=getBrowserAuth();
    if(!db||!ready||busy)return;
    if(password.length<12){setError("Use a password of at least 12 characters.");return;}
    setBusy(true);setError("");
    try{
      const {error:failure}=await db.auth.updateUser({password});
      if(failure)throw failure;
      setPassword("");setReady(false);
      setStatus("Password changed. You can return to Nordljud.");
    }catch(cause){setError(authErrorText(cause instanceof Error?cause:null));}
    finally{setBusy(false);}
  }
  return <main className="site"><section className="daily-archive" aria-labelledby="reset-title">
    <h1 id="reset-title">Reset your Nordljud password</h1>
    <p role="status">{status}</p>
    {ready&&<form className="auth-form" onSubmit={e=>void submit(e)}>
      <label htmlFor="new-account-password">New password</label>
      <input id="new-account-password" type="password" required minLength={12}
        autoComplete="new-password" value={password} onChange={e=>setPassword(e.target.value)} disabled={busy}/>
      <button disabled={busy} type="submit">{busy?"Updating…":"Update password"}</button>
    </form>}
    {error&&<p role="alert">{error}</p>}
    <a href="/">Back to Nordljud</a>
  </section></main>;
}
