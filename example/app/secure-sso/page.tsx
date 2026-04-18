'use client';

import { useEffect, useState } from 'react';
import { FastComments } from 'fastcomments-nextjs';
import type { FastCommentsSSO } from 'fastcomments-typescript';
import { useTheme } from '../_components/ThemeProvider';
import CodePanel from '../_components/CodePanel';

const CODE = `'use client';

import { useEffect, useState } from 'react';
import { FastComments } from 'fastcomments-nextjs';
import type { FastCommentsSSO } from 'fastcomments-typescript';

export default function SecureSSOPage() {
  const [sso, setSSO] = useState<FastCommentsSSO>({
    loginURL: 'https://example.com/login',
    logoutURL: 'https://example.com/logout',
  });

  useEffect(() => {
    // Your server HMAC-signs a base64 user payload
    fetch('/sso-user-info')
      .then((r) => r.json())
      .then((info) => setSSO((s) => ({ ...s, ...info })));
  }, []);

  return (
    <FastComments
      tenantId="demo"
      urlId="nextjs-demo-secure-sso"
      sso={sso}
    />
  );
}`;

async function getLoggedInUserInfo(): Promise<Pick<FastCommentsSSO, 'userDataJSONBase64' | 'verificationHash' | 'timestamp'>> {
    const response = await fetch('http://localhost:3003/sso-user-info', {
        headers: { Accept: 'application/json' },
    });
    return await response.json();
}

export default function SecureSSOPage() {
    const { isDark } = useTheme();
    const [sso, setSSO] = useState<FastCommentsSSO>({
        loginURL: 'https://example.com/login',
        logoutURL: 'https://example.com/logout',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');

    useEffect(() => {
        (async () => {
            setStatus('loading');
            try {
                const userInfo = await getLoggedInUserInfo();
                setSSO((existing) => ({ ...existing, ...userInfo }));
                setStatus('ready');
            } catch {
                setStatus('error');
            }
        })();
    }, []);

    return (
        <div className="fc-demo">
            <header className="fc-demo__head">
                <div>
                    <div className="fc-demo__breadcrumb">Flows <em>/ Secure SSO</em></div>
                    <h1 className="fc-demo__title">Secure SSO</h1>
                    <p className="fc-demo__subtitle">
                        Production-grade identity. Your server HMAC-signs a base64 user payload; the widget verifies
                        it before trusting any session. Pair with the{' '}
                        <a
                            href="https://github.com/fastcomments/fastcomments-code-examples/tree/master/sso/node-express"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'var(--fc-accent-c)', textDecoration: 'underline dashed' }}
                        >node-express reference server</a>.
                    </p>
                </div>
                <div className="fc-demo__actions">
                    <span className="fc-tag fc-tag--brand">Mode · HMAC</span>
                    <span className="fc-tag">Status · {status}</span>
                </div>
            </header>

            {status === 'error' && (
                <div className="fc-stage__panel" style={{ borderColor: 'rgba(255, 59, 48, 0.5)', background: 'rgba(255, 59, 48, 0.05)' }}>
                    <div style={{ fontFamily: 'var(--fc-mono)', fontSize: 13, color: '#ff8b85' }}>
                        Couldn&rsquo;t reach the example SSO server.<br />
                        <span style={{ color: 'var(--fc-ink-mute)' }}>
                            Run <code>node-express</code> from <a href="https://github.com/fastcomments/fastcomments-code-examples" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--fc-accent-c)', textDecoration: 'underline dashed' }}>fastcomments-code-examples</a> on port 3003 to continue.
                        </span>
                    </div>
                </div>
            )}

            <div className="fc-stage__panel fc-stage__panel--light">
                <FastComments key={isDark ? 'd' : 'l'} tenantId="demo" urlId="nextjs-demo-secure-sso" sso={sso} hasDarkBackground={isDark} />
            </div>

            <CodePanel label="app/secure-sso/page.tsx" code={CODE} />
        </div>
    );
}
