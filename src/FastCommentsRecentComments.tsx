'use client';

import { useEffect, useId, useRef } from 'react';
import { cdnBaseFor, ensureScript, sanitizeConfig } from './internal/ensure-script';

export interface FastCommentsRecentCommentsProps {
    tenantId: string;
    urlId?: string;
    count?: number;
    hasDarkBackground?: boolean;
    translations?: Record<string, string>;
    region?: 'eu' | string;
    apiHost?: string;
}

type WidgetGlobal = { FastCommentsRecentCommentsV2?: (el: HTMLElement, cfg: unknown) => void };

export function FastCommentsRecentComments(props: FastCommentsRecentCommentsProps) {
    const containerId = `fc-recent-comments-${useId().replace(/:/g, '')}`;
    const propsRef = useRef(props);
    propsRef.current = props;

    useEffect(() => {
        const scriptSrc = `${cdnBaseFor(props.region)}/js/widget-recent-comments-v2.min.js`;
        let cancelled = false;

        ensureScript(scriptSrc, 'data-fc-recent-comments-v2');

        const tryInit = () => {
            if (cancelled) return;
            const w = window as unknown as WidgetGlobal;
            const el = document.getElementById(containerId);
            if (w.FastCommentsRecentCommentsV2 && el) {
                w.FastCommentsRecentCommentsV2(el, sanitizeConfig(propsRef.current));
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
