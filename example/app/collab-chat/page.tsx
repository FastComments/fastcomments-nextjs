'use client';

import { FastCommentsCollabChat } from 'fastcomments-nextjs';
import { useTheme } from '../_components/ThemeProvider';
import CodePanel from '../_components/CodePanel';

const CODE = `import { FastCommentsCollabChat } from 'fastcomments-nextjs';

export default function CollabChatPage() {
  return (
    <>
      <article id="demo-content">
        <h2>Highlight any passage to pin a discussion.</h2>
        <p>Readers select any text to open a thread anchored to the selection.</p>
      </article>
      <FastCommentsCollabChat tenantId="demo" target="#demo-content" />
    </>
  );
}`;

export default function CollabChatPage() {
    const { isDark } = useTheme();
    return (
        <div className="fc-demo">
            <header className="fc-demo__head">
                <div>
                    <div className="fc-demo__breadcrumb">Widgets <em>/ Collab Chat</em></div>
                    <h1 className="fc-demo__title">Collab Chat</h1>
                    <p className="fc-demo__subtitle">
                        Anchor discussion threads to specific text selections. Select any passage in the sample article
                        below to see the selection popover and attach a comment to that exact excerpt.
                    </p>
                </div>
                <div className="fc-demo__actions">
                    <span className="fc-tag fc-tag--brand">Tenant · demo</span>
                </div>
            </header>

            <div className="fc-stage__panel fc-stage__panel--light">
                <article id="demo-content" style={{ fontFamily: 'Georgia, serif', color: 'var(--fc-light-panel-ink)', maxWidth: '64ch', margin: '0 auto 32px', lineHeight: 1.7 }}>
                    <h2 style={{ fontFamily: 'var(--fc-display)', fontWeight: 700, fontSize: 28, letterSpacing: '-0.02em', color: 'var(--fc-light-panel-ink)', marginTop: 0 }}>
                        The Rise of Real-Time Collaboration
                    </h2>
                    <p>
                        Real-time collaboration tools have transformed how teams work together. From shared documents
                        to inline commenting, the ability to discuss content in context reduces miscommunication and
                        speeds up decision-making.
                    </p>
                    <p>
                        FastComments Collab Chat brings this experience to any web page. Users can highlight text and
                        attach comments directly to it, creating threaded discussions tied to specific passages.
                    </p>
                </article>
                <FastCommentsCollabChat key={isDark ? 'd' : 'l'} tenantId="demo" target="#demo-content" hasDarkBackground={isDark} />
            </div>
            <CodePanel label="app/collab-chat/page.tsx" code={CODE} />
        </div>
    );
}
