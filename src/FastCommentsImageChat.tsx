'use client';

import { useEffect, useRef } from 'react';
import type { FastCommentsImageChatWidgetConfig } from 'fastcomments-typescript';
import { cdnBaseFor, ensureScript, sanitizeConfig } from './internal/ensure-script';

export interface FastCommentsImageChatProps extends FastCommentsImageChatWidgetConfig {
    /** CSS selector for the target image element (e.g. "#my-image"). */
    target: string;
}

type WidgetGlobal = { FastCommentsImageChat?: (el: Element, cfg: unknown) => { destroy?: () => void } };

export function FastCommentsImageChat(props: FastCommentsImageChatProps) {
    const propsRef = useRef(props);
    propsRef.current = props;

    useEffect(() => {
        const scriptSrc = `${cdnBaseFor(props.region)}/js/embed-image-chat.min.js`;
        let cancelled = false;
        let instance: { destroy?: () => void } | null = null;

        ensureScript(scriptSrc, 'data-fc-image-chat');

        const tryInit = () => {
            if (cancelled) return;
            const w = window as unknown as WidgetGlobal;
            const targetEl = document.querySelector(propsRef.current.target);
            if (w.FastCommentsImageChat && targetEl) {
                const { target: _t, ...cfg } = propsRef.current;
                instance = w.FastCommentsImageChat(targetEl, sanitizeConfig(cfg));
            } else {
                setTimeout(tryInit, 50);
            }
        };
        tryInit();

        return () => {
            cancelled = true;
            instance?.destroy?.();
        };
    }, [props.target, props.region]);

    return null;
}
