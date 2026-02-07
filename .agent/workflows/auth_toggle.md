---
description: Toggle authentication on/off using environment variables
---

# Authentication Toggle Workflow

This workflow guides you through enabling or disabling Google Auth authentication in the AI Factory application.

## When to Use

- **Disable Auth**: When you want public access to the application without requiring login
- **Enable Auth**: When you want to require Google Auth login and track user sessions

---

## Prerequisites

- Access to `.env.local` file (or deployment environment variables)
- Understanding of the application's authentication system

---

## Workflow Steps

### 1. Locate Environment Configuration

```bash
# If .env.local doesn't exist, copy from example
cp .env.local.example .env.local
```

### 2. Update Authentication Flag

Edit `.env.local`:

**To Disable Authentication (Public Access):**
```env
NEXT_PUBLIC_ENABLE_AUTH=false
```

**To Enable Authentication (Require Login):**
```env
NEXT_PUBLIC_ENABLE_AUTH=true
```

> [!IMPORTANT]
> When enabling auth, ensure Supabase credentials are configured:
> ```env
> NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
> NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
> ```

### 3. Restart Development Server

```bash
# Stop current server (Ctrl+C)
# Start fresh server
npm run dev
```

> [!NOTE]
> Environment variable changes require a server restart to take effect.

### 4. Verify Behavior

**When Auth is Disabled (`false`):**
- [ ] Homepage loads without login prompt
- [ ] All pages accessible without authentication
- [ ] UserMenu is hidden in navbar
- [ ] `/login` page redirects to homepage

**When Auth is Enabled (`true`):**
- [ ] Unauthenticated users redirect to `/login`
- [ ] Google Auth login button appears
- [ ] After login, UserMenu appears in navbar
- [ ] Protected routes require authentication

---

## Deployment (Vercel)

### Update Environment Variables

1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add/Update: `NEXT_PUBLIC_ENABLE_AUTH`
   - Value: `true` or `false`
3. Redeploy the application

```bash
# Or redeploy via CLI
vercel --prod
```

---

## Troubleshooting

### Auth Disabled But Still Seeing Login Page

**Cause**: Environment variable not loaded or server not restarted

**Solution**:
1. Verify `.env.local` has `NEXT_PUBLIC_ENABLE_AUTH=false`
2. Restart dev server completely
3. Clear browser cache and reload

### Auth Enabled But Login Fails

**Cause**: Missing or invalid Supabase credentials

**Solution**:
1. Check `NEXT_PUBLIC_SUPABASE_URL` is set
2. Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
3. Verify credentials in Supabase dashboard
4. Check browser console for errors

### UserMenu Still Visible When Auth Disabled

**Cause**: Feature flag not properly imported

**Solution**:
1. Check `components/auth/UserMenu.tsx` imports `FEATURES`
2. Verify `FEATURES.AUTH_ENABLED` check is present
3. Rebuild application: `npm run build`

---

## Related Files

- [lib/config/features.ts](file:///Users/dac/ConanCode/conan.school%20websites/aifactory.conan.school/lib/config/features.ts) - Feature flag configuration
- [lib/auth.tsx](file:///Users/dac/ConanCode/conan.school%20websites/aifactory.conan.school/lib/auth.tsx) - Authentication provider
- [.env.local.example](file:///Users/dac/ConanCode/conan.school%20websites/aifactory.conan.school/.env.local.example) - Environment variables template
