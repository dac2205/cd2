---
description: Workflow for debugging login/logout and maintaining auth health.
---

# Authentication Maintenance

## 1. Debug Login/Logout
1.  **User State**: Check `useAuth()` hook in `UserMenu` to verify current user.
2.  **Logout Failure**: If logout hangs, ensure the `logout` function in `lib/auth.ts` has a `try/finally` block that forces `router.push("/login")`.
3.  **Logs**: Check browser console for network errors during `signOut`.

## 2. Upgrade Auth Stack
1.  **Check Versions**: Run `npm outdated @supabase/supabase-js`.
2.  **Upgrade**: Run `npm install @supabase/supabase-js@latest`.
3.  **Verify**: Perform a full Login -> Logout cycle to verify compatibility.

## 3. Environment Check
1.  Verify `.env.local` has valid Supabase URL and Anon Key.
