import { QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from '@/app/utils/toast-emitter';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
    mutations: {
      retry: 0,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      toast({
        title: 'Request failed',
        description: error instanceof Error ? error.message : 'Unexpected error',
        variant: 'error',
      });
    },
  }),
});
