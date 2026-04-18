'use client';

import { useEffect, useId, useRef } from 'react';
import type { FastCommentsCommentWidgetConfig } from 'fastcomments-typescript';
import { cdnBaseFor, ensureScript, sanitizeConfig } from './internal/ensure-script';

export interface FastCommentsUserActivityFeedProps extends FastCommentsCommentWidgetConfig {
    /** With SSO: tenantId + ':' + userId. With Simple SSO: tenantId + ':' + userEmail. */
    userId: string;
}

type WidgetGlobal = {
    FastCommentsUserActivity?: (
        el: HTMLElement,
        cfg: unknown,
        cb: (err: Error | null, instance: { destroy?: () => void } | null) => void,
    ) => void;
};

export function FastCommentsUserActivityFeed(props: FastCommentsUserActivityFeedProps) {
    const containerId = `fc-activity-${useId().replace(/:/g, '')}`;
    const propsRef = useRef(props);
    propsRef.current = props;

    useEffect(() => {
        const scriptSrc = `${cdnBaseFor(props.region)}/js/embed-user-activity.min.js`;
        let cancelled = false;
        let instance: { destroy?: () => void } | null = null;

        ensureScript(scriptSrc, 'data-fc-user-activity');

        const tryInit = () => {
            if (cancelled) return;
            const w = window as unknown as WidgetGlobal;
            const el = document.getElementById(containerId);
            if (w.FastCommentsUserActivity && el) {
                w.FastCommentsUserActivity(el, sanitizeConfig(propsRef.current), (err, ins) => {
                    if (err) {
                        console.error('FastComments User Activity Load Failure', err);
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
