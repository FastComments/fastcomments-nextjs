'use client';

import { useState } from 'react';
import { FastComments } from 'fastcomments-nextjs';
import type { FastCommentsSSOSimple } from 'fastcomments-typescript';
import { useTheme } from '../_components/ThemeProvider';
import CodePanel from '../_components/CodePanel';

const CODE = `'use client';

import { FastComments } from 'fastcomments-nextjs';
import type { FastCommentsSSOSimple } from 'fastcomments-typescript';

export default function SimpleSSOPage() {
  const simpleSSO: FastCommentsSSOSimple = {
    username: 'Someone',
    email: 'someone@somewhere.com',
    avatar: 'https://example.com/avatar.jpg',
  };
  return (
    <FastComments
      tenantId="demo"
      urlId="nextjs-demo-simple-sso"
      simpleSSO={simpleSSO}
    />
  );
}`;

export default function SimpleSSOPage() {
    const { isDark } = useTheme();
    const [simpleSSO] = useState<FastCommentsSSOSimple>({
        avatar: 'https://staticm.fastcomments.com/1582299581264-69384190_3015192525174365_476457575596949504_o.jpg',
        email: 'someone@somewhere.com',
        username: 'Someone',
        websiteUrl: 'https://blog.fastcomments.com',
    });

    return (
        <div className="fc-demo">
            <header className="fc-demo__head">
                <div>
                    <div className="fc-demo__breadcrumb">Flows <em>/ Simple SSO</em></div>
                    <h1 className="fc-demo__title">Simple SSO</h1>
                    <p className="fc-demo__subtitle">
                        The zero-backend identity flow. Hand the widget a user object with a username and optional
                        metadata. The account is created or updated on first comment.
                    </p>
                </div>
                <div className="fc-demo__actions">
                    <span className="fc-tag fc-tag--brand">Mode · Simple</span>
                    <span className="fc-tag">User · {simpleSSO.username}</span>
                </div>
            </header>
            <div className="fc-stage__panel fc-stage__panel--light">
                <FastComments key={isDark ? 'd' : 'l'} tenantId="demo" urlId="nextjs-demo-simple-sso" simpleSSO={simpleSSO} hasDarkBackground={isDark} />
            </div>
            <CodePanel label="app/simple-sso/page.tsx" code={CODE} />
        </div>
    );
}
