"use client";

import { useEffect, useRef, useState } from "react";
import { getBrowserAuth } from "../../../lib/supabase-browser";

export default function AuthCallbackPage() {
  const [status, setStatus] = useState("Completing sign-in…");
  // React StrictMode can replay effects; one-time PKCE codes must not be consumed twice.
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    let active = true;
    const auth = getBrowserAuth();
    if (!auth) {
      setStatus("Authentication is unavailable. Return to the app and use Guest Mode.");
      return;
    }
    const run = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        if (params.has("error") || params.has("error_description")) {
          throw new Error("Provider returned a sign-in error");
        }
        const code = params.get("code");
        if (!code) throw new Error("No one-time sign-in code was supplied");
        // Remove the code from the visible URL before making any network request.
        window.history.replaceState(null, "", "/auth/callback");
        // Never accept a pre-existing session as proof that this OAuth callback succeeded.
        const exchanged = await auth.auth.exchangeCodeForSession(code);
        if (exchanged.error || !exchanged.data.session) {
          throw exchanged.error ?? new Error("The one-time code was not accepted");
        }
        const verified = await auth.auth.getUser();
        if (verified.error || !verified.data.user ||
            verified.data.user.id !== exchanged.data.session.user.id) {
          throw verified.error ?? new Error("The callback identity could not be verified");
        }
        if (!active) return;
        window.location.replace("/");
      } catch {
        if (active) {
          // Failed or replayed codes must never be left in browser history.
          window.history.replaceState(null, "", "/auth/callback");
          setStatus("Sign-in was not completed. Return to the app to try again.");
        }
      }
    };
    void run();
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
