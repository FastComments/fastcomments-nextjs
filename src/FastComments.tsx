'use client';

import { useEffect, useId, useRef } from 'react';
import type { FastCommentsCommentWidgetConfig } from 'fastcomments-typescript';
import { cdnBaseFor, ensureScript, sanitizeConfig } from './internal/ensure-script';

export interface FastCommentsProps extends FastCommentsCommentWidgetConfig {}

type WidgetGlobal = { FastCommentsUI?: (el: HTMLElement, cfg: unknown) => { destroy?: () => void } };

export function FastComments(props: FastCommentsProps) {
    const containerId = `fc-${useId().replace(/:/g, '')}`;
    const propsRef = useRef(props);
    propsRef.current = props;

    useEffect(() => {
        const scriptSrc = `${cdnBaseFor(props.region)}/js/embed-v2.min.js`;
        let cancelled = false;
        let instance: { destroy?: () => void } | null = null;

        ensureScript(scriptSrc, 'data-fc-embed');

        const tryInit = () => {
            if (cancelled) return;
            const w = window as unknown as WidgetGlobal;
            const el = document.getElementById(containerId);
            if (w.FastCommentsUI && el) {
                instance = w.FastCommentsUI(el, sanitizeConfig(propsRef.current));
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
