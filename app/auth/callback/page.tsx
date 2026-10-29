"use client";

import { useEffect, useState } from "react";
import { getBrowserAuth } from "../../../lib/supabase-browser";

export default function AuthCallbackPage() {
  const [status,setStatus]=useState("Completing sign-in…");
  useEffect(()=>{
    let active=true;
    const auth=getBrowserAuth();
    if(!auth){setStatus("Authentication is unavailable. Return to the app and use Guest Mode.");return;}
    const run=async()=>{
      try{
        const params=new URLSearchParams(window.location.search);
        if(params.has("error")||params.has("error_description"))throw new Error("Provider returned an error");
        let {data:{session},error}=await auth.auth.getSession();
        if(error)throw error;
        if(!session&&params.has("code")){
          const result=await auth.auth.exchangeCodeForSession(params.get("code")!);
          if(result.error)throw result.error;
          session=result.data.session;
        }
        if(!active)return;
        if(!session){setStatus("Sign-in was not completed. Return to the app to try again.");return;}
        // Remove the one-time code from browser history before returning to the app.
        window.history.replaceState(null,"","/auth/callback");
        window.location.replace("/");
      }catch{if(active)setStatus("Sign-in was not completed. Return to the app to try again.");}
    };
    void run();
    return()=>{active=false;};
  },[]);
  return <main className="site"><section className="daily-archive" aria-live="polite">
    <h1>Nordljud account access</h1><p role="status">{status}</p><a href="/">Back to Nordljud</a>
  </section></main>;
}
