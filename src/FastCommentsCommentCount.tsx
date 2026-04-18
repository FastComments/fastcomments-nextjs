'use client';

import { useEffect, useId, useRef } from 'react';
import type { FastCommentsCommentCountConfig } from 'fastcomments-typescript';
import { cdnBaseFor, ensureScript, sanitizeConfig } from './internal/ensure-script';

export interface FastCommentsCommentCountProps extends FastCommentsCommentCountConfig {}

type WidgetGlobal = { FastCommentsCommentCount?: (el: HTMLElement, cfg: unknown) => { destroy?: () => void } };

export function FastCommentsCommentCount(props: FastCommentsCommentCountProps) {
    const containerId = `fc-count-${useId().replace(/:/g, '')}`;
    const propsRef = useRef(props);
    propsRef.current = props;

    useEffect(() => {
        const scriptSrc = `${cdnBaseFor(props.region)}/js/widget-comment-count.min.js`;
        let cancelled = false;
        let instance: { destroy?: () => void } | null = null;

        ensureScript(scriptSrc, 'data-fc-count');

        const tryInit = () => {
            if (cancelled) return;
            const w = window as unknown as WidgetGlobal;
            const el = document.getElementById(containerId);
            if (w.FastCommentsCommentCount && el) {
                instance = w.FastCommentsCommentCount(el, sanitizeConfig(propsRef.current));
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

    return <span id={containerId} />;
}
