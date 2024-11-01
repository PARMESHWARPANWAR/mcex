type GenericFunction<A extends unknown[] = never[], R = unknown> = (...args: A) => R;

interface DebouncedFunction<T extends GenericFunction> {
    (...args: Parameters<T>): void;
    cancel: () => void;
}

export function debounce<T extends GenericFunction>(
    func: T,
    delay: number
): DebouncedFunction<T> {
    let timeoutId: NodeJS.Timeout | null = null;

    const debouncedFunction = ((...args: Parameters<T>) => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
            timeoutId = null;
        }, delay);
    }) as DebouncedFunction<T>;

    debouncedFunction.cancel = () => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    };

    return debouncedFunction;
}