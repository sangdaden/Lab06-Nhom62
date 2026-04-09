import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { cn } from "@/lib/utils";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vinmec AI Agent Demo",
  description: "Vinmec AI Medical Chatbot powered by GPT-4o-mini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={cn("font-sans", beVietnamPro.variable)}>
      <body className="antialiased">
          {children}
          <Toaster position="top-center" richColors />
        </body>
    </html>
  );
}
