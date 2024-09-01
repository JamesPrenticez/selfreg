// Reusable intersection observer function
export function observeIntersection(
  element: HTMLElement,
  callback: (event?: Event) => void,
  eventType: string,
  debounceTime?: number
): (() => void) | undefined {
  const eventListener = (event: Event) => {
    callback(event);
  };

  const debouncedEventListener = debounceTime
    ? debounce((e: Event) => eventListener(e), debounceTime)
    : eventListener;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Attach event listener when the element is in the viewport
        window.addEventListener(eventType, debouncedEventListener);
        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(element);

  // Return a cleanup function
  return () => {
    observer.disconnect();
    window.removeEventListener(eventType, debouncedEventListener);
  };
}

// Reusable debounce function
export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: Parameters<T>): void {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(context, args), delay);
  };
}
