'use client';

import { useMemo, useState } from 'react';
import { FastComments } from 'fastcomments-nextjs';
import { useTheme } from '../_components/ThemeProvider';
import CodePanel from '../_components/CodePanel';

const CODE = `'use client';

import { FastComments } from 'fastcomments-nextjs';

export default function CallbacksPage() {
  return (
    <FastComments
      tenantId="demo"
      urlId="nextjs-demo-callbacks"
      onInit={() => console.log('onInit')}
      onRender={() => console.log('onRender')}
      onCommentsRendered={(c) => console.log('rendered', c.length)}
      commentCountUpdated={(n) => console.log('count', n)}
      onAuthenticationChange={(e, d) => console.log(e, d)}
      onReplySuccess={(c) => console.log('reply', c)}
      onVoteSuccess={(c, id, dir) => console.log('vote', dir)}
      onCommentSubmitStart={(c, next) => next()}
    />
  );
}`;

type Event = { id: number; name: string; payload: string; at: string };

export default function CallbacksPage() {
    const { isDark } = useTheme();
    const [events, setEvents] = useState<Event[]>([]);

    const track = useMemo(() => {
        let seq = 0;
        return (name: string, payload: unknown) => {
            const pretty = typeof payload === 'string' ? payload : JSON.stringify(payload).slice(0, 220);
            setEvents((prev) => [{ id: ++seq, name, payload: pretty, at: new Date().toLocaleTimeString() }, ...prev].slice(0, 40));
            console.log(`Callback: ${name}`, payload);
        };
    }, []);

    return (
        <div className="fc-demo">
            <header className="fc-demo__head">
                <div>
                    <div className="fc-demo__breadcrumb">Flows <em>/ Event Callbacks</em></div>
                    <h1 className="fc-demo__title">Event Callbacks</h1>
                    <p className="fc-demo__subtitle">
                        Every lifecycle and user-action hook the widget fires, mirrored live in an event log.
                        Handy for wiring analytics, audit trails, or custom submission gates.
                    </p>
                </div>
                <div className="fc-demo__actions">
                    <span className="fc-tag fc-tag--brand">Tenant · demo</span>
                    <span className="fc-tag">Events · {events.length}</span>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(280px, 0.9fr)', gap: 18 }}>
                <div className="fc-stage__panel fc-stage__panel--light" style={{ minWidth: 0 }}>
                    <FastComments
                        key={isDark ? 'd' : 'l'}
                        tenantId="demo"
                        urlId="nextjs-demo-callbacks"
                        hasDarkBackground={isDark}
                        onInit={() => track('onInit', '')}
                        onRender={() => track('onRender', '')}
                        onCommentsRendered={(comments) => track('onCommentsRendered', `${comments.length} comments`)}
                        commentCountUpdated={(count) => track('commentCountUpdated', `count=${count}`)}
                        onAuthenticationChange={(event, data) => track('onAuthenticationChange', { event, data })}
                        onReplySuccess={(comment) => track('onReplySuccess', comment)}
                        onVoteSuccess={(_c, voteId, direction, status) => track('onVoteSuccess', { voteId, direction, status })}
                        onImageClicked={(src) => track('onImageClicked', src)}
                        onOpenProfile={(context) => { track('onOpenProfile', context); return false; }}
                        onCommentSubmitStart={(c, next) => { track('onCommentSubmitStart', c); next(); }}
                    />
                </div>
                <div className="fc-stage__panel" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontFamily: 'var(--fc-mono)', fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fc-ink-mute)' }}>
                            <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: '#27be69', marginRight: 8 }} />
                            Event log
                        </span>
                        <button className="fc-btn" style={{ padding: '6px 12px', fontSize: 11 }} onClick={() => setEvents([])}>clear</button>
                    </div>
                    <div className="fc-log">
                        {events.length === 0 && <span className="fc-log__line">&gt; waiting for events...</span>}
                        {events.map((e) => (
                            <span key={e.id} className="fc-log__line fc-log__line--in">
                                [{e.at}] {e.name} <span style={{ color: 'var(--fc-ink-mute)' }}>· {e.payload}</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <CodePanel label="app/callbacks/page.tsx" code={CODE} />
        </div>
    );
}
