// app/providers/QueryProvider.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // ⏰ Data stays fresh for 5 minutes
            staleTime: 5 * 60 * 1000,
            
            // 🗑️ Garbage collection time (was cacheTime in v4)
            // Data stays in cache for 10 minutes even if unused
            gcTime: 10 * 60 * 1000,
            
            // 🔄 Don't auto-refetch
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            
            // 🔁 Retry failed requests
            retry: 3,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
          },
          mutations: {
            retry: 2,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}