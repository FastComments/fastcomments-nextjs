'use client';

import { FastCommentsLiveChat } from 'fastcomments-nextjs';
import { useTheme } from '../_components/ThemeProvider';
import CodePanel from '../_components/CodePanel';

const CODE = `import { FastCommentsLiveChat } from 'fastcomments-nextjs';

export default function LiveChatPage() {
  return <FastCommentsLiveChat tenantId="demo" />;
}`;

export default function LiveChatPage() {
    const { isDark } = useTheme();
    return (
        <div className="fc-demo">
            <header className="fc-demo__head">
                <div>
                    <div className="fc-demo__breadcrumb">Widgets <em>/ Live Chat</em></div>
                    <h1 className="fc-demo__title">Live Chat</h1>
                    <p className="fc-demo__subtitle">
                        The high-velocity streaming variant. Tuned for live events, launches, and broadcasts where
                        conversation volume would overwhelm a conventional threaded view.
                    </p>
                </div>
                <div className="fc-demo__actions">
                    <span className="fc-tag fc-tag--brand">Tenant · demo</span>
                    <span className="fc-tag">Mode · streaming</span>
                </div>
            </header>
            <div className="fc-stage__panel fc-stage__panel--light">
                <FastCommentsLiveChat key={isDark ? 'd' : 'l'} tenantId="demo" hasDarkBackground={isDark} />
            </div>
            <CodePanel label="app/live-chat/page.tsx" code={CODE} />
        </div>
    );
}
