'use client';

import { FastCommentsReviewsSummary } from 'fastcomments-nextjs';
import { useTheme } from '../_components/ThemeProvider';
import CodePanel from '../_components/CodePanel';

const CODE = `import { FastCommentsReviewsSummary } from 'fastcomments-nextjs';

export default function ReviewsSummaryPage() {
  return <FastCommentsReviewsSummary tenantId="demo" urlId="demo-ratings" />;
}`;

export default function ReviewsSummaryPage() {
    const { isDark } = useTheme();
    return (
        <div className="fc-demo">
            <header className="fc-demo__head">
                <div>
                    <div className="fc-demo__breadcrumb">Widgets <em>/ Reviews Summary</em></div>
                    <h1 className="fc-demo__title">Reviews Summary</h1>
                    <p className="fc-demo__subtitle">
                        A compact star-rating aggregate with per-rating breakdown. Drops into product pages, listing
                        previews, or marketing components wherever aggregate sentiment matters more than individual
                        comments.
                    </p>
                </div>
                <div className="fc-demo__actions">
                    <span className="fc-tag fc-tag--brand">Tenant · demo</span>
                </div>
            </header>
            <div className="fc-stage__panel fc-stage__panel--light">
                <FastCommentsReviewsSummary key={isDark ? 'd' : 'l'} tenantId="demo" urlId="demo-ratings" hasDarkBackground={isDark} />
            </div>
            <CodePanel label="app/reviews-summary/page.tsx" code={CODE} />
        </div>
    );
}
