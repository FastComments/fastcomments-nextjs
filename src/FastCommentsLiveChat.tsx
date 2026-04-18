'use client';

import { useEffect, useId, useRef } from 'react';
import type { FastCommentsLiveChatWidgetConfig } from 'fastcomments-typescript';
import { cdnBaseFor, ensureScript, sanitizeConfig } from './internal/ensure-script';

export interface FastCommentsLiveChatProps extends FastCommentsLiveChatWidgetConfig {}

type WidgetGlobal = { FastCommentsLiveChat?: (el: HTMLElement, cfg: unknown) => { destroy?: () => void } };

export function FastCommentsLiveChat(props: FastCommentsLiveChatProps) {
    const containerId = `fc-live-chat-${useId().replace(/:/g, '')}`;
    const propsRef = useRef(props);
    propsRef.current = props;

    useEffect(() => {
        const scriptSrc = `${cdnBaseFor(props.region)}/js/embed-live-chat.min.js`;
        let cancelled = false;
        let instance: { destroy?: () => void } | null = null;

        ensureScript(scriptSrc, 'data-fc-live-chat');

        const tryInit = () => {
            if (cancelled) return;
            const w = window as unknown as WidgetGlobal;
            const el = document.getElementById(containerId);
            if (w.FastCommentsLiveChat && el) {
                instance = w.FastCommentsLiveChat(el, sanitizeConfig(propsRef.current));
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
