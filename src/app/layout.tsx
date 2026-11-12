import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin", "cyrillic"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin", "cyrillic"], display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "ViralLab AI — превращай идеи в вирусный контент",
    template: "%s · ViralLab AI",
  },
  description:
    "AI-студия для TikTok, Instagram Reels и YouTube Shorts: идеи, сценарии, хуки, описания, хештеги, контент-календарь и аналитика.",
  keywords: ["AI", "TikTok", "Reels", "YouTube Shorts", "сценарии", "SMM", "контент"],
  openGraph: {
    title: "ViralLab AI — превращай идеи в вирусный контент",
    description: "Твоя AI-студия для создания контента, который привлекает внимание и увеличивает охваты.",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  themeColor: "#060509",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} grain font-sans antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Перейти к содержимому
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
