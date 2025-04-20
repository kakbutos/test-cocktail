import '@testing-library/jest-dom';
import * as util from 'util';

// Полифил для TextEncoder/TextDecoder
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.TextEncoder = util.TextEncoder as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.TextDecoder = util.TextDecoder as any;

// Полифил для IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  root: Element | Document | null = null;
  rootMargin: string = '0px';
  thresholds: ReadonlyArray<number> = [0];
  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    if (options?.root) this.root = options.root;
    if (options?.rootMargin) this.rootMargin = options.rootMargin;
    if (options?.threshold) this.thresholds = Array.isArray(options.threshold) 
      ? options.threshold : [options.threshold];
  }

  observe(): void {
    // Имитируем видимость элемента после наблюдения
    setTimeout(() => {
      this.callback([{
        isIntersecting: true,
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRatio: 1,
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: null,
        target: {} as Element,
        time: Date.now()
      }], this);
    }, 0);
  }

  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
}

global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver; 