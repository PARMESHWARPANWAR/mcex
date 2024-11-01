interface DebouncedFunction<T extends (...args: any[]) => any> {
    (...args: Parameters<T>): void;
    cancel: () => void;
}

export function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): DebouncedFunction<T> {
    let timeoutId: NodeJS.Timeout;

    const debouncedFunction = ((...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    }) as DebouncedFunction<T>;

    debouncedFunction.cancel = () => {
        clearTimeout(timeoutId);
    };

    return debouncedFunction;
}