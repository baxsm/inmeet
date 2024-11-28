import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "inMeet",
  description:
    "Welcome to inMeet! A modern and streamlined meeting scheduling tool inspired by the likes of Calendly. Share your availability, create event types, and let others schedule meetings with you effortlessly! 😎✨",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-sans antialiased", poppins.className)}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <main>
          <Providers>{children}</Providers>
        </main>
        <Toaster richColors position="bottom-right" closeButton />
      </body>
    </html>
  );
}
