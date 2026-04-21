import type { Metadata } from "next";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://future.ly";

const OG_IMAGE = "/brand/pacific-kings/social-og-1200x630.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "future.ly — Documentary-driven fundraising",
    template: "%s · future.ly",
  },
  description:
    "Documentary-driven commerce for grassroots communities. One story at a time. Thirty days. Every receipt on the table. UK CIC registered.",
  applicationName: "future.ly",
  authors: [{ name: "future.ly" }],
  creator: "future.ly",
  publisher: "future.ly",
  keywords: [
    "documentary",
    "fundraising",
    "transparency",
    "CIC",
    "grassroots",
    "community",
    "storytelling",
    "action sports",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "future.ly",
    title: "future.ly — Fund the story. Follow the money.",
    description:
      "Documentary-driven commerce for grassroots communities. One story at a time. UK CIC registered.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "PACIFIC KINGS — a future.ly project · launching 30 April",
      },
    ],
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "future.ly — Fund the story. Follow the money.",
    description:
      "Documentary-driven fundraising platform. One story at a time. UK CIC.",
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: "/brand/pacific-kings/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/pacific-kings/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/pacific-kings/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/brand/pacific-kings/favicon-180.png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
