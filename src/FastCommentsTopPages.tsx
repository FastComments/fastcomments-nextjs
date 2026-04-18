'use client';

import { useEffect, useId, useRef } from 'react';
import { cdnBaseFor, ensureScript, sanitizeConfig } from './internal/ensure-script';

export interface FastCommentsTopPagesProps {
    tenantId: string;
    hasDarkBackground?: boolean;
    region?: 'eu' | string;
    apiHost?: string;
}

type WidgetGlobal = { FastCommentsTopPagesV2?: (el: HTMLElement, cfg: unknown) => void };

export function FastCommentsTopPages(props: FastCommentsTopPagesProps) {
    const containerId = `fc-top-pages-${useId().replace(/:/g, '')}`;
    const propsRef = useRef(props);
    propsRef.current = props;

    useEffect(() => {
        const scriptSrc = `${cdnBaseFor(props.region)}/js/widget-top-pages-v2.min.js`;
        let cancelled = false;

        ensureScript(scriptSrc, 'data-fc-top-pages-v2');

        const tryInit = () => {
            if (cancelled) return;
            const w = window as unknown as WidgetGlobal;
            const el = document.getElementById(containerId);
            if (w.FastCommentsTopPagesV2 && el) {
                w.FastCommentsTopPagesV2(el, sanitizeConfig(propsRef.current));
            } else {
                setTimeout(tryInit, 50);
            }
        };
        tryInit();

        return () => {
            cancelled = true;
        };
    }, [containerId, props.region]);

    return <div id={containerId} />;
}
