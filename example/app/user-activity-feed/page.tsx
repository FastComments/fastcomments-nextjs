'use client';

import { FastCommentsUserActivityFeed } from 'fastcomments-nextjs';
import { useTheme } from '../_components/ThemeProvider';
import CodePanel from '../_components/CodePanel';

const CODE = `import { FastCommentsUserActivityFeed } from 'fastcomments-nextjs';

export default function UserActivityFeedPage() {
  // SSO userId format: \`\${tenantId}:\${appUserId}\`
  return (
    <FastCommentsUserActivityFeed tenantId="demo" userId="demo:someone@somewhere.com" />
  );
}`;

export default function UserActivityFeedPage() {
    const { isDark } = useTheme();
    return (
        <div className="fc-demo">
            <header className="fc-demo__head">
                <div>
                    <div className="fc-demo__breadcrumb">Widgets <em>/ Activity Feed</em></div>
                    <h1 className="fc-demo__title">User Activity Feed</h1>
                    <p className="fc-demo__subtitle">
                        A chronological stream of a single user&rsquo;s comments and interactions. Perfect for
                        profile pages, moderation views, and reputation dashboards.
                    </p>
                </div>
                <div className="fc-demo__actions">
                    <span className="fc-tag fc-tag--brand">Tenant · demo</span>
                    <span className="fc-tag">userId · demo:someone@somewhere.com</span>
                </div>
            </header>
            <div className="fc-stage__panel fc-stage__panel--light">
                <FastCommentsUserActivityFeed key={isDark ? 'd' : 'l'} tenantId="demo" userId="demo:someone@somewhere.com" hasDarkBackground={isDark} />
            </div>
            <CodePanel label="app/user-activity-feed/page.tsx" code={CODE} />
        </div>
    );
}
