
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

export const supabase = createClient(supabaseUrl, supabaseKey);
