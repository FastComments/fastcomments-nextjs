import type { ReactNode } from 'react';
import Rail from './_components/Rail';
import { ThemeProvider } from './_components/ThemeProvider';
import './fastcomments-showcase.css';

export const metadata = {
    title: 'FastComments Next.js Showcase',
    description: 'Live examples of every widget exported by fastcomments-nextjs.',
};

const themeBootScript = `
(function(){try{var s=localStorage.getItem('fc-showcase-theme');if(s!=='light'&&s!=='dark'){s=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-fc-theme',s);}catch(e){}})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
            </head>
            <body>
                <ThemeProvider>
                    <div className="fc-shell">
                        <Rail />
                        <main className="fc-stage">{children}</main>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
