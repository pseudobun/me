'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ThemeProviderProps } from 'next-themes';
import { ThemeProvider } from 'next-themes';

const queryClient = new QueryClient();

export function Providers({ children }: ThemeProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
        {children}
      </ThemeProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
