"use client";

import dynamic from "next/dynamic";
import { FC, ReactNode, useState } from "react";
import NextTopLoader from "nextjs-toploader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

const NextThemesProvider = dynamic(
  () => import("next-themes").then((e) => e.ThemeProvider),
  {
    ssr: false,
  }
);

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <NextTopLoader color="hsl(var(--primary))" showSpinner={false} />
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          storageKey="inMeet"
          enableSystem
          enableColorScheme
        >
          {children}
        </NextThemesProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
