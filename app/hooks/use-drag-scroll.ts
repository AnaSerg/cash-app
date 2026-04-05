import { useRef, useCallback } from "react";

export const useDragScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        isDragging.current = true;
        startX.current = e.pageX - (ref.current?.offsetLeft ?? 0);
        scrollLeft.current = ref.current?.scrollLeft ?? 0;
    }, [ref]);

    const onMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDragging.current || !ref.current) return;
        e.preventDefault();
        const x = e.pageX - ref.current.offsetLeft;
        ref.current.scrollLeft = scrollLeft.current - (x - startX.current);
    }, [ref]);

    const onMouseUp = useCallback(() => {
        isDragging.current = false;
    }, []);

    const onTouchStart = useCallback((e: React.TouchEvent) => {
        startX.current = e.touches[0].pageX - (ref.current?.offsetLeft ?? 0);
        scrollLeft.current = ref.current?.scrollLeft ?? 0;
    }, [ref]);

    const onTouchMove = useCallback((e: React.TouchEvent) => {
        if (!ref.current) return;
        const x = e.touches[0].pageX - ref.current.offsetLeft;
        ref.current.scrollLeft = scrollLeft.current - (x - startX.current);
    }, [ref]);

    return {
        onMouseDown,
        onMouseMove,
        onMouseUp,
        onMouseLeave: onMouseUp,
        onTouchStart,
        onTouchMove,
    };
};
