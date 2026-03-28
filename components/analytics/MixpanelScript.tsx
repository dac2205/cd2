'use client';

import { useEffect } from 'react';
import mixpanel from 'mixpanel-browser';

export default function MixpanelScript() {
    useEffect(() => {
        // Token must be provided in .env.local
        const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

        if (!MIXPANEL_TOKEN) {
            console.error('Mixpanel Token is missing in .env.local');
            return;
        }

        mixpanel.init(MIXPANEL_TOKEN, {
            debug: process.env.NODE_ENV === 'development', // Debug only in Dev
            track_pageview: true, // Automatic page tracking
            persistence: 'localStorage',
            ignore_dnt: true
        });

        // Register super properties that will be sent with all events
        mixpanel.register({
            site: "cd2.conan.school", // Site identifier
            env: "prod"
        });
    }, []);

    return null;
}
