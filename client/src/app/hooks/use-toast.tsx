import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { subscribeToToasts, toast, type ToastPayload } from '@/app/utils/toast-emitter';

export type ToastItem = ToastPayload & { id: string };

type ToastContextValue = {
  toast: (payload: ToastPayload) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<ToastItem[]>([]);
  const timers = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    if (typeof window === 'undefined') {
      return () => undefined;
    }
    const unsubscribe = subscribeToToasts((item) => {
      setItems((prev) => [...prev, item]);
      const timerId = window.setTimeout(() => {
        setItems((prev) => prev.filter((toastItem) => toastItem.id !== item.id));
        timers.current.delete(item.id);
      }, item.durationMs ?? 4000);
      timers.current.set(item.id, timerId);
    });

    return () => {
      unsubscribe();
      timers.current.forEach((timerId) => window.clearTimeout(timerId));
      timers.current.clear();
    };
  }, []);

  const value = useMemo(() => ({ toast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex w-80 flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`pointer-events-auto rounded-xl border bg-white/95 p-4 shadow-soft-card backdrop-blur ${
              variantStyles[item.variant ?? 'default']
            }`}
          >
            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
            {item.description ? (
              <p className="mt-1 text-sm text-slate-600">{item.description}</p>
            ) : null}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const variantStyles: Record<string, string> = {
  default: 'border-slate-200',
  success: 'border-green-200 bg-green-50/95',
  warning: 'border-amber-200 bg-amber-50/95',
  error: 'border-red-200 bg-red-50/95',
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
