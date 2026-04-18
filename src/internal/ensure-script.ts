export function ensureScript(src: string, marker: string): void {
    if (typeof document === 'undefined') return;
    if (document.querySelector(`script[${marker}]`)) return;
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.setAttribute(marker, '');
    document.head.appendChild(script);
}

export function cdnBaseFor(region?: string): string {
    return region === 'eu' ? 'https://cdn-eu.fastcomments.com' : 'https://cdn.fastcomments.com';
}

export function sanitizeConfig(props: object): Record<string, unknown> {
    return { ...(props as Record<string, unknown>) };
}
