'use client';

import { FastComments } from 'fastcomments-nextjs';
import { useTheme } from '../_components/ThemeProvider';
import CodePanel from '../_components/CodePanel';

const CODE = `import { FastComments } from 'fastcomments-nextjs';

export default function CommentsPage() {
  return <FastComments tenantId="demo" />;
}`;

export default function CommentsPage() {
    const { isDark } = useTheme();
    return (
        <div className="fc-demo">
            <header className="fc-demo__head">
                <div>
                    <div className="fc-demo__breadcrumb">Widgets <em>/ Live Comment Widget</em></div>
                    <h1 className="fc-demo__title">Live Comment Widget</h1>
                    <p className="fc-demo__subtitle">
                        The flagship live commenting widget. Replies, voting, moderation, media attachments, and realtime
                        sync come bundled in the default configuration.
                    </p>
                </div>
                <div className="fc-demo__actions">
                    <span className="fc-tag fc-tag--brand">Tenant · demo</span>
                </div>
            </header>
            <div className="fc-stage__panel fc-stage__panel--light">
                <FastComments key={isDark ? 'd' : 'l'} tenantId="demo" hasDarkBackground={isDark} />
            </div>
            <CodePanel label="app/comments/page.tsx" code={CODE} />
        </div>
    );
}
