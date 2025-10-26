export type ToastVariant = 'default' | 'success' | 'warning' | 'error';

export type ToastPayload = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  durationMs?: number;
};

type Listener = (payload: ToastPayload & { id: string }) => void;

const listeners = new Set<Listener>();

const buildId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
};

export const toast = (payload: ToastPayload) => {
  const enriched = { ...payload, variant: payload.variant ?? 'default', id: buildId() };
  listeners.forEach((listener) => listener(enriched));
};

export const subscribeToToasts = (listener: Listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
