import { useAuthStore } from '@/app/store/auth-store';
import { toast } from '@/app/utils/toast-emitter';

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:4000';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RequestOptions = RequestInit & {
  method?: HttpMethod;
  responseType?: 'json' | 'blob' | 'text';
};

export const http = {
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
    const headers = buildHeaders(options.headers, options.body);

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      toast({ title: 'Session expired', description: 'Please sign in again', variant: 'warning' });
      useAuthStore.getState().logout();
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const message = await safeJson(response);
      throw new Error(message?.message ?? 'Request failed');
    }

    if (response.status === 204) {
      return undefined as T;
    }

    if (options.responseType === 'blob') {
      return (await response.blob()) as T;
    }

    if (options.responseType === 'text') {
      return (await response.text()) as T;
    }

    return (await response.json()) as T;
  },
  get<T>(endpoint: string, options?: Omit<RequestOptions, 'method'>) {
    return this.request<T>(endpoint, { method: 'GET', ...options });
  },
  post<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
      ...options,
    });
  },
  patch<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
      ...options,
    });
  },
};

const buildHeaders = (existing?: HeadersInit, body?: BodyInit | null): HeadersInit => {
  const headers = new Headers(existing);
  const { tokens } = useAuthStore.getState();
  if (tokens?.accessToken) {
    headers.set('Authorization', `Bearer ${tokens.accessToken}`);
  }
  if (!(body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  return headers;
};

const safeJson = async (response: Response) => {
  try {
    return await response.json();
  } catch (error) {
    return null;
  }
};
