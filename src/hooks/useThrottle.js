import { useEffect, useRef } from 'react';

const useThrottle = (callback, delay) => {
    const lastExecutedTime = useRef(0);
    const handlerTimeout = useRef(null);

    const throttledFunction = (...args) => {
        const now = Date.now();
        const timeElapsed = now - lastExecutedTime.current;

        if (timeElapsed >= delay) {
            callback(...args);
            lastExecutedTime.current = now;
        } else if (!handlerTimeout.current) {
            handlerTimeout.current = setTimeout(() => {
                callback(...args);
                lastExecutedTime.current = Date.now();
                handlerTimeout.current = null;
            }, delay - timeElapsed);
        }
    };

    useEffect(() => {
        return () => {
            if (handlerTimeout.current) {
                clearTimeout(handlerTimeout.current);
            }
        };
    }, []);

    return throttledFunction;
}

export default useThrottle;
