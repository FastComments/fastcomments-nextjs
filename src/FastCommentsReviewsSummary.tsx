'use client';

import { useEffect, useId, useRef } from 'react';
import { cdnBaseFor, ensureScript } from './internal/ensure-script';

export interface FastCommentsReviewsSummaryProps {
    /** Id that represents you as a customer. */
    tenantId: string;
    /** Id that represents the page, if you don't want to tie comments to the page url. */
    urlId?: string;
    /** The region your account is in. EU customers should set to 'eu'. */
    region?: 'eu';
    /** Set to true if embedding on a dark background. Auto-detected if not set. */
    hasDarkBackground?: boolean;
}

type WidgetGlobal = {
    FastCommentsReviewsSummaryWidget?: (
        el: HTMLElement,
        cfg: unknown,
        cb: (err: Error | null, instance: { destroy?: () => void } | null) => void,
    ) => void;
};

export function FastCommentsReviewsSummary(props: FastCommentsReviewsSummaryProps) {
    const containerId = `fc-rs-${useId().replace(/:/g, '')}`;
    const propsRef = useRef(props);
    propsRef.current = props;

    useEffect(() => {
        const scriptSrc = `${cdnBaseFor(props.region)}/js/embed-reviews-summary.min.js`;
        let cancelled = false;
        let instance: { destroy?: () => void } | null = null;

        ensureScript(scriptSrc, 'data-fc-reviews-summary');

        const tryInit = () => {
            if (cancelled) return;
            const w = window as unknown as WidgetGlobal;
            const el = document.getElementById(containerId);
            if (w.FastCommentsReviewsSummaryWidget && el) {
                w.FastCommentsReviewsSummaryWidget(el, propsRef.current, (err, ins) => {
                    if (err) {
                        console.error('FastComments Reviews Summary Load Failure', err);
                    } else if (cancelled) {
                        ins?.destroy?.();
                    } else {
                        instance = ins;
                    }
                });
            } else {
                setTimeout(tryInit, 50);
            }
        };
        tryInit();

        return () => {
            cancelled = true;
            instance?.destroy?.();
        };
    }, [containerId, props.region]);

    return <div id={containerId} />;
}
