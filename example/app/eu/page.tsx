'use client';

import { FastComments } from 'fastcomments-nextjs';
import { useTheme } from '../_components/ThemeProvider';
import CodePanel from '../_components/CodePanel';

const CODE = `'use client';

import { FastComments } from 'fastcomments-nextjs';

export default function EUPage() {
  return (
    <FastComments
      tenantId="demo"
      region="eu"
      urlId="nextjs-demo-eu"
    />
  );
}`;

export default function EUPage() {
    const { isDark } = useTheme();
    return (
        <div className="fc-demo">
            <header className="fc-demo__head">
                <div>
                    <div className="fc-demo__breadcrumb">Flows <em>/ EU Region</em></div>
                    <h1 className="fc-demo__title">EU Region</h1>
                    <p className="fc-demo__subtitle">
                        Pin widget reads and writes to the EU datacenter to satisfy data-residency requirements.
                        A single <code style={{ fontFamily: 'var(--fc-mono)', color: 'var(--fc-ink)' }}>region=&quot;eu&quot;</code> flag
                        routes everything through the EU cluster.
                    </p>
                </div>
                <div className="fc-demo__actions">
                    <span className="fc-tag fc-tag--brand">Region · EU</span>
                    <span className="fc-tag">GDPR-friendly</span>
                </div>
            </header>
            <div className="fc-stage__panel fc-stage__panel--light">
                <FastComments key={isDark ? 'd' : 'l'} tenantId="demo" region="eu" urlId="nextjs-demo-eu" hasDarkBackground={isDark} />
            </div>
            <CodePanel label="app/eu/page.tsx" code={CODE} />
        </div>
    );
}
