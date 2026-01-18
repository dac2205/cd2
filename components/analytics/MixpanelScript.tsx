'use client';

import { useEffect } from 'react';
import mixpanel from 'mixpanel-browser';

export default function MixpanelScript() {
    useEffect(() => {
        mixpanel.init('0dcc38c655d6af633a17789aacdb82b9', {
            debug: true,
            track_pageview: true,
            persistence: "localStorage",
            autocapture: true,
            record_sessions_percent: 100,
        });
    }, []);

    return null;
}
