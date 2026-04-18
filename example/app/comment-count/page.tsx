'use client';

import { FastCommentsCommentCount } from 'fastcomments-nextjs';
import { useTheme } from '../_components/ThemeProvider';
import CodePanel from '../_components/CodePanel';

const CODE = `import { FastCommentsCommentCount } from 'fastcomments-nextjs';

export default function CommentCountPage() {
  return (
    <p>This page has <FastCommentsCommentCount tenantId="demo" /> comments.</p>
  );
}`;

export default function CommentCountPage() {
    const { isDark } = useTheme();
    return (
        <div className="fc-demo">
            <header className="fc-demo__head">
                <div>
                    <div className="fc-demo__breadcrumb">Widgets <em>/ Comment Count</em></div>
                    <h1 className="fc-demo__title">Comment Count</h1>
                    <p className="fc-demo__subtitle">
                        A low-weight count badge you can drop inline with any list item, card, or document link
                        stays live as new comments come in.
                    </p>
                </div>
                <div className="fc-demo__actions">
                    <span className="fc-tag fc-tag--brand">Tenant · demo</span>
                </div>
            </header>

            <div className="fc-stage__panel" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontFamily: 'var(--fc-mono)', fontSize: 12, color: 'var(--fc-ink-mute)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    Count rendered →
                </span>
                <div style={{ fontFamily: 'var(--fc-body)', fontSize: 14, color: 'var(--fc-ink)' }}>
                    <FastCommentsCommentCount key={isDark ? 'd' : 'l'} tenantId="demo" hasDarkBackground={isDark} />
                </div>
            </div>
            <CodePanel label="app/comment-count/page.tsx" code={CODE} />
        </div>
    );
}
