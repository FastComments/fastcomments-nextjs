'use client';

import { FastCommentsImageChat } from 'fastcomments-nextjs';
import { useTheme } from '../_components/ThemeProvider';
import CodePanel from '../_components/CodePanel';

const CODE = `import { FastCommentsImageChat } from 'fastcomments-nextjs';

export default function ImageChatPage() {
  return (
    <>
      <img id="demo-image" src="/demo-image.svg" alt="" />
      <FastCommentsImageChat tenantId="demo" target="#demo-image" />
    </>
  );
}`;

export default function ImageChatPage() {
    const { isDark } = useTheme();
    return (
        <div className="fc-demo">
            <header className="fc-demo__head">
                <div>
                    <div className="fc-demo__breadcrumb">Widgets <em>/ Image Chat</em></div>
                    <h1 className="fc-demo__title">Image Chat</h1>
                    <p className="fc-demo__subtitle">
                        Drag to select any region of the image below. A threaded discussion gets pinned to the exact
                        region. Ideal for design reviews, bug triage, and creative collaboration.
                    </p>
                </div>
                <div className="fc-demo__actions">
                    <span className="fc-tag fc-tag--brand">Tenant · demo</span>
                </div>
            </header>
            <div className="fc-stage__panel fc-stage__panel--light">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img id="demo-image" src="https://fastcomments.com/images/image-chat-demo-1.jpg" alt="Sample image for commenting" style={{ maxWidth: '100%', borderRadius: 12, display: 'block', margin: '0 auto 20px' }} />
                <FastCommentsImageChat key={isDark ? 'd' : 'l'} tenantId="demo" target="#demo-image" hasDarkBackground={isDark} />
            </div>
            <CodePanel label="app/image-chat/page.tsx" code={CODE} />
        </div>
    );
}
