import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AlienClaw — Evolutionary AI Agent Infrastructure",
  description:
    "Three governing AIs. One evolving swarm. Less compute through evolution. Submit a genome to the community leaderboard.",
  openGraph: {
    title: "AlienClaw",
    description:
      "Three governing AIs. One evolving swarm. Less compute through evolution.",
    images: ["/og-image.png"],
    type: "website",
    url: "https://alienclaw.net",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlienClaw — Evolutionary AI Agent Infrastructure",
    description:
      "Three governing AIs. One evolving swarm. Less compute through evolution.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://alienclaw.net"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-canvas text-ink font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
