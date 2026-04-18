'use client';

import { useState } from 'react';
import { FastComments } from 'fastcomments-nextjs';
import { useTheme } from '../_components/ThemeProvider';
import CodePanel from '../_components/CodePanel';

const CODE = `'use client';

import { useState } from 'react';
import { FastComments } from 'fastcomments-nextjs';

export default function DarkModePage() {
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <button onClick={() => setIsDark(false)}>Light</button>
      <button onClick={() => setIsDark(true)}>Dark</button>
      <FastComments
        key={isDark ? 'd' : 'l'}
        tenantId="demo"
        urlId="nextjs-demo-dark"
        hasDarkBackground={isDark}
      />
    </>
  );
}`;

export default function DarkModePage() {
    const { isDark: themeIsDark } = useTheme();
    const [isDark, setIsDark] = useState(themeIsDark);

    return (
        <div className="fc-demo">
            <header className="fc-demo__head">
                <div>
                    <div className="fc-demo__breadcrumb">Flows <em>/ Dark Mode</em></div>
                    <h1 className="fc-demo__title">Dark Mode</h1>
                    <p className="fc-demo__subtitle">
                        Toggle the widget theme at runtime. The widget re-renders immediately when{' '}
                        <code style={{ fontFamily: 'var(--fc-mono)', color: 'var(--fc-ink)' }}>hasDarkBackground</code>{' '}
                        changes.
                    </p>
                </div>
                <div className="fc-demo__actions">
                    <span className="fc-tag fc-tag--brand">Active · {isDark ? 'dark' : 'light'}</span>
                </div>
            </header>

            <div className="fc-stage__panel" style={{ padding: 20 }}>
                <div style={{ display: 'flex', gap: 10, paddingBottom: 16, boxShadow: 'inset 0 -1px 0 0 var(--fc-border)', marginBottom: 20 }}>
                    <button className={`fc-btn${!isDark ? ' fc-btn--primary' : ''}`} onClick={() => setIsDark(false)}>Light</button>
                    <button className={`fc-btn${isDark ? ' fc-btn--primary' : ''}`} onClick={() => setIsDark(true)}>Dark</button>
                </div>
                <div style={{
                    padding: 24,
                    borderRadius: 12,
                    transition: 'background 250ms ease, color 250ms ease',
                    background: isDark ? '#0b0b0b' : '#ffffff',
                    color: isDark ? '#fff' : '#111',
                }}>
                    <FastComments key={isDark ? 'd' : 'l'} tenantId="demo" urlId="nextjs-demo-dark" hasDarkBackground={isDark} />
                </div>
            </div>

            <CodePanel label="app/dark-mode/page.tsx" code={CODE} />
        </div>
    );
}
