'use client';

import { useEffect, useRef } from 'react';
import type { FastCommentsCollabChatWidgetConfig } from 'fastcomments-typescript';
import { cdnBaseFor, ensureScript, sanitizeConfig } from './internal/ensure-script';

export interface FastCommentsCollabChatProps extends FastCommentsCollabChatWidgetConfig {
    /** CSS selector for the target element to enable collab chat on (e.g. "#my-content"). */
    target: string;
}

type WidgetGlobal = { FastCommentsCollabChat?: (el: Element, cfg: unknown) => { destroy?: () => void } };

export function FastCommentsCollabChat(props: FastCommentsCollabChatProps) {
    const propsRef = useRef(props);
    propsRef.current = props;

    useEffect(() => {
        const scriptSrc = `${cdnBaseFor(props.region)}/js/embed-collab-chat.min.js`;
        let cancelled = false;
        let instance: { destroy?: () => void } | null = null;

        ensureScript(scriptSrc, 'data-fc-collab-chat');

        const tryInit = () => {
            if (cancelled) return;
            const w = window as unknown as WidgetGlobal;
            const targetEl = document.querySelector(propsRef.current.target);
            if (w.FastCommentsCollabChat && targetEl) {
                const { target: _t, ...cfg } = propsRef.current;
                instance = w.FastCommentsCollabChat(targetEl, sanitizeConfig(cfg));
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
