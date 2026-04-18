'use client';

import { useState } from 'react';
import { FastComments } from 'fastcomments-nextjs';
import { useTheme } from '../_components/ThemeProvider';
import CodePanel from '../_components/CodePanel';

const CODE = `'use client';

import { useState } from 'react';
import { FastComments } from 'fastcomments-nextjs';

export default function PaginatedPage() {
  const [page, setPage] = useState(0);
  return (
    <>
      <button onClick={() => setPage(page - 1)}>Prev</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
      <FastComments tenantId="demo" urlId={\`product-\${page}\`} />
    </>
  );
}`;

export default function PaginatedPage() {
    const { isDark } = useTheme();
    const [page, setPage] = useState(0);
    const urlId = `nextjs-demo-page-${page}`;

    return (
        <div className="fc-demo">
            <header className="fc-demo__head">
                <div>
                    <div className="fc-demo__breadcrumb">Flows <em>/ Thread Pagination</em></div>
                    <h1 className="fc-demo__title">Thread Pagination</h1>
                    <p className="fc-demo__subtitle">
                        Swap the widget&rsquo;s <code style={{ fontFamily: 'var(--fc-mono)', color: 'var(--fc-ink)' }}>urlId</code>{' '}
                        at runtime to jump between products, posts, or pages. Threads provision lazily. No pre-creation needed.
                    </p>
                </div>
                <div className="fc-demo__actions">
                    <span className="fc-tag fc-tag--brand">Page · {page}</span>
                    <span className="fc-tag">urlId · {urlId}</span>
                </div>
            </header>

            <div className="fc-stage__panel" style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 14, boxShadow: 'inset 0 -1px 0 0 var(--fc-border)', marginBottom: 20, flexWrap: 'wrap' }}>
                    <button className="fc-btn" onClick={() => setPage(page - 1)}>← prev</button>
                    <button className="fc-btn fc-btn--primary" onClick={() => setPage(page + 1)}>next →</button>
                    <div style={{ fontFamily: 'var(--fc-mono)', fontSize: 13, color: 'var(--fc-ink-dim)', marginLeft: 'auto' }}>
                        <span style={{ color: 'var(--fc-ink-mute)' }}>page </span>
                        <span style={{ color: 'var(--fc-ink)' }}>{page}</span>
                    </div>
                </div>
                <div className="fc-stage__panel fc-stage__panel--light" style={{ padding: 20 }}>
                    <FastComments key={`${urlId}-${isDark ? 'd' : 'l'}`} tenantId="demo" urlId={urlId} hasDarkBackground={isDark} />
                </div>
            </div>

            <CodePanel label="app/paginated/page.tsx" code={CODE} />
        </div>
    );
}
