---
description: Standards for Authentication logic and state management.
globs: ["lib/auth.tsx", "components/auth/**"]
---

# Authentication Standards

## 1. Logout Logic
*   **Redirect Policy**: Logout implementations MUST force a redirect to `/login` regardless of the server-side `signOut` response.
*   **State Cleanup**: Client-side state (Variables, LocalStorage, Mixpanel) MUST be cleared synchronously before/during redirect.

## 2. Dependencies
*   **Supabase**: Always keep `@supabase/supabase-js` at the latest stable version.
*   **React Context**: Auth state MUST be managed via `AuthProvider` and consumed via `useAuth()`. Direct usage of supabase client in components should be minimal.

## 3. Environment
*   **Keys**: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are required for Auth to function.
