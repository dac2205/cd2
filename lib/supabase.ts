
import { createClient } from '@supabase/supabase-js';

const getSupabaseUrl = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && (url.startsWith('https://') || url.startsWith('http://'))) {
        return url;
    }
    return 'https://placeholder.supabase.co';
};

const supabaseUrl = getSupabaseUrl();
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Custom Storage Provider using Cookies to share session between subdomains (cd2.conan.school & www.conan.school)
const cookieStorage = {
    getItem: (key: string) => {
        if (typeof document === 'undefined') return null;
        const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    },
    setItem: (key: string, value: string) => {
        if (typeof document === 'undefined') return;
        // Determine domain: if on .conan.school (or subdomains), set for root domain
        const hostname = window.location.hostname;
        let domainStr = '';
        if (hostname.endsWith('.conan.school')) {
            domainStr = '; domain=.conan.school';
        }
        // Set cookie with 1 year expiry (or matching session)
        document.cookie = `${key}=${encodeURIComponent(value)}${domainStr}; path=/; max-age=31536000; SameSite=Lax; Secure`;
    },
    removeItem: (key: string) => {
        if (typeof document === 'undefined') return;
        const hostname = window.location.hostname;
        let domainStr = '';
        if (hostname.endsWith('.conan.school')) {
            domainStr = '; domain=.conan.school';
        }
        document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT${domainStr}; SameSite=Lax; Secure`;
    }
};

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: cookieStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});
