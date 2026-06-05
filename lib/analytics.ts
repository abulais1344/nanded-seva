declare const window: Window & { gtag?: (...args: unknown[]) => void };

export function trackServiceClick(serviceName: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'service_click', {
      event_category: 'Services',
      event_label: serviceName,
    });
  }
}
