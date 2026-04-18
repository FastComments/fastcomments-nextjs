'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';

type Entry = { href: string; label: string; hint: string };

const WIDGETS: Entry[] = [
    { href: '/comments', label: 'Live Comment Widget', hint: 'Full live commenting widget' },
    { href: '/comment-count', label: 'Comment Count', hint: 'Inline count badge' },
    { href: '/live-chat', label: 'Live Chat', hint: 'Realtime stream widget' },
    { href: '/collab-chat', label: 'Collab Chat', hint: 'Text-anchored discussion' },
    { href: '/image-chat', label: 'Image Chat', hint: 'Region comments on images' },
    { href: '/reviews-summary', label: 'Reviews Summary', hint: 'Star ratings overview' },
    { href: '/user-activity-feed', label: 'Activity Feed', hint: 'Per-user timeline' },
];

const FLOWS: Entry[] = [
    { href: '/callbacks', label: 'Event Callbacks', hint: 'Lifecycle events mirrored live' },
    { href: '/dark-mode', label: 'Dark Mode', hint: 'Runtime theme switching' },
    { href: '/eu', label: 'EU Region', hint: 'Data residency via region flag' },
    { href: '/paginated', label: 'Thread Pagination', hint: 'Swap urlId at runtime' },
    { href: '/simple-sso', label: 'Simple SSO', hint: 'Unsigned identity' },
    { href: '/secure-sso', label: 'Secure SSO', hint: 'HMAC-signed identity' },
];

export default function Rail() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    return (
        <aside className="fc-rail">
            <Link href="/" className="fc-brand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="fc-brand__logo fc-brand__logo--light" src="https://fastcomments.com/images/svg/v2/logo.svg" alt="FastComments" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="fc-brand__logo fc-brand__logo--dark" src="https://fastcomments.com/images/svg/v2/logo_white.svg" alt="" aria-hidden />
                <span className="fc-brand__wordmark">
                    <span className="fc-brand__name">FastComments</span>
                    <span className="fc-brand__slug">nextjs · showcase</span>
                </span>
            </Link>

            <nav className="fc-nav" aria-label="Examples">
                <div className="fc-nav__group">
                    <div className="fc-nav__heading"><span>01</span><em>Widgets</em></div>
                    {WIDGETS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`fc-nav__item${pathname === item.href ? ' is-active' : ''}`}
                        >
                            <span className="fc-nav__item-label">{item.label}</span>
                            <span className="fc-nav__item-hint">{item.hint}</span>
                        </Link>
                    ))}
                </div>

                <div className="fc-nav__group">
                    <div className="fc-nav__heading"><span>02</span><em>Flows &amp; configuration</em></div>
                    {FLOWS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`fc-nav__item${pathname === item.href ? ' is-active' : ''}`}
                        >
                            <span className="fc-nav__item-label">{item.label}</span>
                            <span className="fc-nav__item-hint">{item.hint}</span>
                        </Link>
                    ))}
                </div>
            </nav>

            <footer className="fc-rail__foot">
                <div className="fc-theme-toggle" role="group" aria-label="Theme">
                    <button type="button" className={`fc-theme-toggle__btn${theme === 'light' ? ' is-active' : ''}`} onClick={() => setTheme('light')}>Light</button>
                    <button type="button" className={`fc-theme-toggle__btn${theme === 'dark' ? ' is-active' : ''}`} onClick={() => setTheme('dark')}>Dark</button>
                </div>
                <div><code>npm i fastcomments-nextjs</code></div>
                <a href="https://fastcomments.com" rel="noopener">fastcomments.com &nearr;</a>
            </footer>
        </aside>
    );
}
