# V-005 — approved Authentication and Google Login prompt

**Date:** 2026-10-29 (Europe/Helsinki)  
**Method:** V2-A assisted Vibe Coding, `condition/vibe` only.  
**Approval:** This English text was authored by ChatGPT in WritingBlock 73519; student explicitly approved it in the subsequent turn: **"yes dear comrade!"**. The student did not individually author the English wording.  
**Status at capture:** Exact user-approved prompt preserved **before V-005 code changes**. No independent Copilot, Gemini, or Spec Kit agent was invoked.

## Exact approved text (verbatim)

```text
I have tested the current Nordljud learning application, and I would now like to add user authentication.

At the moment, I can study Swedish verbs, compare vocabulary across different levels, listen to pronunciation, practise questions and see photos for some verbs.

Now I want users to be able to create an account and sign in.

I would like to support Google Login as well as registration and login using an email address and password.

Please also keep a Guest Mode so people can use the application without creating an account.

When a user signs in, I want the application to clearly show that they are logged in, and provide a simple way to log out.

Please use Supabase Authentication if it is suitable for this project, and make sure the authentication works correctly on the deployed Vercel website, not just locally.

I don't want passwords, private authentication keys or other sensitive information exposed in the code.

If some configuration must be completed manually in Supabase, Google Cloud or Vercel, please explain exactly what I need to do instead of assuming that you have access to those settings.

Please provide clear error messages when login fails and make sure users can still access the existing learning features.

For now, I only want authentication. We can add saved vocabulary, favourites and learning progress in the next development stage.

Keep the existing design and all current learning features unchanged.

Let's implement authentication first, and then I will test registration, Google Login, logout and Guest Mode myself before we continue.
```

## Implementation research context (assistant interpretation; not part of the prompt)

- The repository is a publicly readable Next.js 15.5.28 App Router application with only client-side learning state and no protected server routes or user database tables at this increment. For this feature, a browser Supabase client is appropriate; avoid pretending server SSR / RLS have already been implemented.
- The currently connected Supabase account lists an older **inactive** `Nordlyd-3B` project; do **not** change or silently reuse it for V2. New Supabase configuration and Google provider credentials require manual project selection/creation, and must be kept out of Git.
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` are public client configuration, **not privileged server secrets**. No `service_role`, `secret key`, or Google OAuth secret may be committed or exposed.
- Before a Supabase project and authorized Google OAuth redirect addresses are actually configured and manually tested, code/build success cannot be described as real sign-in success.
- Authentication features should degrade gracefully into usable Guest Mode when env variables are absent. V-006 persistence remains out of scope.

## Official docs checked
- https://supabase.com/docs/guides/auth/choosing-a-server-package
- https://supabase.com/docs/reference/javascript/auth-signup
- https://supabase.com/docs/guides/auth/social-sign-in/auth-google
- https://supabase.com/docs/guides/auth/redirect-urls
