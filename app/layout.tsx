import type { Metadata, Viewport } from "next";
import { profile } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name} · AI Engineer`,
  description: profile.tagline,
  metadataBase: new URL("https://sohumgoel.github.io"),
  openGraph: {
    title: `${profile.name} · AI Engineer`,
    description: profile.tagline,
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#0a0c0b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="font-serif">{children}</body>
    </html>
  );
}
