import { useCallback, useRef } from "react";

const LONG_PRESS_DELAY = 500;

export const useLongPress = (onLongPress: () => void) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const start = useCallback(() => {
        timerRef.current = setTimeout(() => {
            onLongPress();
        }, LONG_PRESS_DELAY);
    }, [onLongPress]);

    const cancel = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    return {
        onMouseDown: start,
        onMouseUp: cancel,
        onMouseLeave: cancel,
        onTouchStart: start,
        onTouchEnd: cancel,
    };
};
