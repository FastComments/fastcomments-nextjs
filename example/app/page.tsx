import Link from 'next/link';

type Entry = { href: string; label: string; hint: string; kind: string };

const widgets: Entry[] = [
    { href: '/comments', label: 'Live Comment Widget', kind: 'widget', hint: 'Full live commenting widget with replies, voting, moderation, and media.' },
    { href: '/comment-count', label: 'Comment Count', kind: 'widget', hint: 'Drop-in count badge you can plug into any listing or feed.' },
    { href: '/live-chat', label: 'Live Chat', kind: 'widget', hint: 'High-velocity streaming chat for live events and broadcasts.' },
    { href: '/collab-chat', label: 'Collab Chat', kind: 'widget', hint: 'Anchor threads to text selections inside any article.' },
    { href: '/image-chat', label: 'Image Chat', kind: 'widget', hint: 'Pin discussions to specific regions of any image.' },
    { href: '/reviews-summary', label: 'Reviews Summary', kind: 'widget', hint: 'Star-rating aggregate with breakdown.' },
    { href: '/user-activity-feed', label: 'Activity Feed', kind: 'widget', hint: 'Chronological stream of a single user\u2019s activity.' },
];

const flows: Entry[] = [
    { href: '/callbacks', label: 'Event Callbacks', kind: 'flow', hint: 'Every lifecycle and user-action hook mirrored into a live event log.' },
    { href: '/dark-mode', label: 'Dark Mode', kind: 'flow', hint: 'Toggle the widget theme at runtime via the hasDarkBackground flag.' },
    { href: '/eu', label: 'EU Region', kind: 'flow', hint: 'Pin widget reads and writes to the EU datacenter.' },
    { href: '/paginated', label: 'Thread Pagination', kind: 'flow', hint: 'Swap urlId at runtime to jump between products, posts, or pages.' },
    { href: '/simple-sso', label: 'Simple SSO', kind: 'flow', hint: 'Unsigned identity flow. Drop in a user object and go.' },
    { href: '/secure-sso', label: 'Secure SSO', kind: 'flow', hint: 'HMAC-signed identity from your server for production use.' },
];

export default function Home() {
    return (
        <>
            <div className="fc-hero">
                <div>
                    <div className="fc-hero__label">fastcomments / nextjs · showcase</div>
                    <h1 className="fc-hero__title">
                        Comment<br />infrastructure<br /><em>for Next.js.</em>
                    </h1>
                    <p className="fc-hero__body">
                        Every component exported by <code style={{ fontFamily: 'var(--fc-mono)', color: 'var(--fc-ink)' }}>fastcomments-nextjs</code>,
                        rendered live against the public demo tenant. Each route is a single-file implementation you can copy into your app.
                    </p>
                </div>

                <div className="fc-hero__meta">
                    <div className="fc-meta-card">
                        <div className="fc-meta-card__key">Widgets</div>
                        <div className="fc-meta-card__value fc-meta-card__value--gradient">{widgets.length}</div>
                    </div>
                    <div className="fc-meta-card">
                        <div className="fc-meta-card__key">Flows</div>
                        <div className="fc-meta-card__value">{flows.length}</div>
                    </div>
                    <div className="fc-meta-card">
                        <div className="fc-meta-card__key">Package</div>
                        <div className="fc-meta-card__value" style={{ fontFamily: 'var(--fc-mono)', fontSize: 14, marginTop: 10 }}>fastcomments-nextjs</div>
                    </div>
                    <div className="fc-meta-card">
                        <div className="fc-meta-card__key">Rendering</div>
                        <div className="fc-meta-card__value" style={{ fontFamily: 'var(--fc-mono)', fontSize: 14, marginTop: 10 }}>SSR + CSR</div>
                    </div>
                </div>
            </div>

            <div className="fc-section-title">
                <span>01</span>
                <h2>Widgets</h2>
                <div className="fc-rule" />
                <span>{widgets.length} components</span>
            </div>
            <div className="fc-grid">
                {widgets.map((item, i) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="fc-card"
                        style={{ animation: 'fc-rise 480ms ease both', animationDelay: `${i * 40}ms` } as React.CSSProperties}
                    >
                        <span className="fc-card__kind">{item.kind}</span>
                        <span className="fc-card__title">{item.label}</span>
                        <span className="fc-card__hint">{item.hint}</span>
                        <span className="fc-card__cta">Open example</span>
                    </Link>
                ))}
            </div>

            <div className="fc-section-title">
                <span>02</span>
                <h2>Flows &amp; configuration</h2>
                <div className="fc-rule" />
                <span>{flows.length} recipes</span>
            </div>
            <div className="fc-grid">
                {flows.map((item, i) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="fc-card"
                        style={{ animation: 'fc-rise 480ms ease both', animationDelay: `${i * 40}ms` } as React.CSSProperties}
                    >
                        <span className="fc-card__kind">{item.kind}</span>
                        <span className="fc-card__title">{item.label}</span>
                        <span className="fc-card__hint">{item.hint}</span>
                        <span className="fc-card__cta">Open example</span>
                    </Link>
                ))}
            </div>
            <style>{`@keyframes fc-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </>
    );
}
