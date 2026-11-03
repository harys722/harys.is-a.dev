// Sends events to Google Tag Manager through window.dataLayer.
type Params = Record<string, string | number | boolean>;

declare global {
  interface Window { dataLayer?: unknown[] }
}

export function track(event: string, params: Params = {}): void {
  try {
    (window.dataLayer = window.dataLayer || []).push({ event, ...params });
  } catch {
  }
}

export type OpenSource = 'click' | 'url' | 'auto';

export function openSource(restoring: boolean): OpenSource {
  if (restoring) return 'url';
  const activation = (navigator as any).userActivation;
  return activation && !activation.isActive ? 'auto' : 'click';
}

export function trackWindowOpen(id: string, name: string, source: OpenSource): void {
  track('window_open', {
    window_id: id,
    window_name: name,
    window_kind: id.includes('/') ? id.split('/')[0] : 'page',
    window_source: source,
  });
}
