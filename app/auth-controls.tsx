"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { getBrowserAuth, getAuthSetupMessage } from "../lib/supabase-browser";
import { authErrorText, getAuthRedirectUrl, safeOriginsFromConfig } from "../lib/auth-flow.mjs";

type AuthMode = "sign-in" | "sign-up";

export default function AuthControls() {
  const [account, setAccount] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const setupMessage = getAuthSetupMessage();
  const [recoverySent, setRecoverySent] = useState(false);
  function redirectFor(path: "/auth/callback"|"/auth/reset") {
    return getAuthRedirectUrl(window.location.origin,path,
      safeOriginsFromConfig(process.env.NEXT_PUBLIC_AUTH_ALLOWED_ORIGINS,process.env.NODE_ENV==="development"));
  }

  useEffect(() => {
    const auth = getBrowserAuth();
    if (!auth) {
      setChecking(false);
      return;
    }
    let active = true;
    const { data: { subscription } } = auth.auth.onAuthStateChange((_event, session) => {
      if (active) {
        setAccount(session?.user ?? null);
        setChecking(false);
      }
    });
    void auth.auth.getUser().then(({ data, error: authError }) => {
      if (!active) return;
      if (authError && authError.message !== "Auth session missing!") {
        setError("Could not check the current session. You can still learn as a guest.");
      }
      setAccount(data.user);
      setChecking(false);
    }).catch(() => {
      if (active) {
        setChecking(false);
        setError("Could not connect to authentication. Guest Mode remains available.");
      }
    });
    const params = new URLSearchParams(window.location.search);
    if (params.has("error") || params.has("error_description")) {
      setError("Sign-in was not completed. Please try again or continue as a guest.");
      setOpen(true);
    }
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  function switchMode(next: AuthMode) {
    setMode(next);
    setStatus("");
    setError("");
    setPassword("");
    setRecoverySent(false);
  }

  function continueGuest() {
    setOpen(false);
    setPassword("");
    setError("");
    setStatus("");
  }

  async function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const auth = getBrowserAuth();
    if (!auth || busy) return;
    const normalized = email.trim();
    if (!normalized || password.length < 6) {
      setError("Please enter an email and password of at least six characters.");
      return;
    }
    setBusy(true);
    setError("");
    setStatus("");
    try {
      if (mode === "sign-up") {
        const { data, error: authError } = await auth.auth.signUp({
          email: normalized,
          password,
          options: { emailRedirectTo: redirectFor("/auth/callback") }
        });
        if (authError) throw authError;
        setPassword("");
        if (data.session) {
          setStatus("Your account was created and you are signed in.");
          setOpen(false);
        } else {
          setStatus("Check your inbox for a confirmation message. If the address is eligible, you will receive an email.");
        }
      } else {
        const { error: authError } = await auth.auth.signInWithPassword({
          email: normalized,
          password
        });
        if (authError) throw authError;
        setPassword("");
        setOpen(false);
        setStatus("");
      }
    } catch (cause) {
      setError(authErrorText(cause instanceof Error ? cause : null));
    } finally {
      setBusy(false);
    }
  }

  async function signInGoogle() {
    const auth = getBrowserAuth();
    if (!auth || busy) return;
    setBusy(true);
    setError("");
    setStatus("");
    try {
      // Redirect back to the actual hosted origin, never localhost hard-coded.
      const { error: authError } = await auth.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: redirectFor("/auth/callback") }
      });
      if (authError) throw authError;
      // A successful invocation redirects to the provider, not yet a completed login.
    } catch (cause) {
      setError(authErrorText(cause instanceof Error ? cause : null));
      setBusy(false);
    }
  }

  async function requestPasswordReset() {
    const auth = getBrowserAuth();
    if (!auth || busy) return;
    const normalized=email.trim();
    if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      setError("Enter your email address first to request a password reset.");
      return;
    }
    setBusy(true);setError("");setRecoverySent(false);
    try {
      const { error: authError } = await auth.auth.resetPasswordForEmail(normalized,{
        redirectTo:redirectFor("/auth/reset")
      });
      if (authError) throw authError;
      setRecoverySent(true);
      setStatus("If this address is eligible, a recovery email will be sent. Check your inbox.");
    } catch(cause) {
      setError(authErrorText(cause instanceof Error ? cause : null));
    } finally {setBusy(false);}
  }

  async function signOut() {
    const auth = getBrowserAuth();
    if (!auth || busy) return;
    setBusy(true);
    setError("");
    try {
      const { error: authError } = await auth.auth.signOut();
      if (authError) throw authError;
      setAccount(null);
      setOpen(false);
      setPassword("");
      setStatus("You are signed out. You can continue learning as a guest.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not sign out.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="nordljud-auth">
      <div className="auth-status-row">
        <span className="auth-identity" role="status">
          {checking ? "Checking sign-in…" : account ? "Signed in: " + (account.email ?? "Account") : "Guest Mode"}
        </span>
        {account ? (
          <button type="button" className="auth-header-action" disabled={busy} onClick={() => void signOut()}>
            {busy ? "Please wait…" : "Log out"}
          </button>
        ) : (
          <button
            type="button"
            className="auth-header-action"
            aria-expanded={open}
            onClick={() => { setOpen(!open); setError(""); }}
          >
            {open ? "Close" : "Sign in / Register"}
          </button>
        )}
      </div>
      {status && <p className="auth-info" role="status">{status}</p>}
      {error && !open && <p className="auth-error" role="alert">{error}</p>}

      {open && !account && (
        <section className="auth-drawer" aria-label="Nordljud account access">
          <div className="auth-mode-tabs" role="group" aria-label="Account action">
            <button type="button" aria-pressed={mode === "sign-in"} onClick={() => switchMode("sign-in")}>Sign in</button>
            <button type="button" aria-pressed={mode === "sign-up"} onClick={() => switchMode("sign-up")}>Create account</button>
          </div>
          <p className="auth-context">Accounts are optional. Your vocabulary and Practice Mode remain available without signing in.</p>
          {setupMessage ? (
            <p className="auth-info" role="status">{setupMessage}</p>
          ) : (
            <>
              <form className="auth-form" onSubmit={(event) => void submitEmail(event)}>
                <label htmlFor="auth-email">Email</label>
                <input
                  id="auth-email" type="email" required autoComplete="email"
                  value={email} onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com" disabled={busy}
                />
                <label htmlFor="auth-password">Password</label>
                <input
                  id="auth-password" type="password" required minLength={6}
                  autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
                  value={password} onChange={(event) => setPassword(event.target.value)}
                  disabled={busy}
                />
                <button className="auth-submit" type="submit" disabled={busy}>
                  {busy ? "Please wait…" : mode === "sign-up" ? "Create account" : "Sign in with email"}
                </button>
              </form>
              {mode === "sign-in" && (
                <button type="button" disabled={busy} className="auth-guest"
                  onClick={() => void requestPasswordReset()}>
                  Forgot password?
                </button>
              )}
              {recoverySent && <p role="status" className="auth-info">If eligible, check your inbox for a recovery link.</p>}
              <div className="auth-divider"><span>or</span></div>
              <button type="button" className="auth-google" disabled={busy} onClick={() => void signInGoogle()}>
                Continue with Google
              </button>
            </>
          )}
          {status && <p className="auth-info" role="status">{status}</p>}
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button type="button" className="auth-guest" onClick={continueGuest}>Continue as guest</button>
        </section>
      )}
    </div>
  );
}
