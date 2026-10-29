"use client";

import { useEffect, useRef, useState } from "react";
import { getBrowserAuth } from "../../../lib/supabase-browser";

export default function AuthCallbackPage() {
  const [status, setStatus] = useState("Completing sign-in…");
  // A PKCE authorization code may only be consumed once. Keep the promise
  // across React StrictMode's setup/cleanup/setup effect replay.
  const exchange = useRef<Promise<void> | null>(null);
  useEffect(() => {
    let active = true;
    const auth = getBrowserAuth();
    if (!auth) {
      setStatus("Authentication is unavailable. Return to the app and use Guest Mode.");
      return;
    }
    exchange.current ??= (async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const providerError = params.has("error") || params.has("error_description");
      // Scrub the one-time code from the browser history before any API request.
      window.history.replaceState(null, "", "/auth/callback");
      if (providerError) throw new Error("Provider returned a sign-in error");
      if(!code) throw new Error("No fresh one-time sign-in code was supplied");
      // An unrelated previously signed-in account must never satisfy this callback.
      const exchanged = await auth.auth.exchangeCodeForSession(code);
      if (exchanged.error || !exchanged.data.session) {
        throw exchanged.error ?? new Error("The one-time sign-in code was not accepted");
      }
      const verified = await auth.auth.getUser();
      if (verified.error || !verified.data.user ||
          verified.data.user.id !== exchanged.data.session.user.id) {
        throw verified.error ?? new Error("Callback account identity could not be verified");
      }
    })();
    void exchange.current.then(() => {
      if (active) window.location.replace("/");
    }).catch(() => {
      if (active) setStatus("Sign-in was not completed. Return to the app to try again.");
    });
    return () => { active = false; };
  }, []);
  return (
    <main className="site">
      <section className="daily-archive" aria-live="polite">
        <h1>Nordljud account access</h1>
        <p role="status">{status}</p>
        <a href="/">Back to Nordljud</a>
      </section>
    </main>
  );
}
