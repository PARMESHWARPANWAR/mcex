export const testing = (query) => {
    console.log('serch query on following >This=>',query)
}

export function myDebounce(func, delay) {
    let timeoutId;
  
    return function(...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
}
  
