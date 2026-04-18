'use client';

import { useState } from 'react';

export default function CodePanel({ label, code }: { label: string; code: string }) {
    const [copied, setCopied] = useState(false);
    async function copy() {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        } catch (_) {}
    }
    return (
        <div className="fc-code-panel">
            <div className="fc-code-panel__head">
                <span className="fc-code-panel__head-label">{label}</span>
                <button type="button" className="fc-code-panel__copy" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
            </div>
            <pre className="fc-code-panel__body">{code}</pre>
        </div>
    );
}
