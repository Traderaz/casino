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

// Using Google Fonts CDN for Playfair Display SC since it's not available in next/font

export const metadata: Metadata = {
  title: "Lossless Casino - Risk your yield, not your stack",
  description: "Your principal stays safe. Your yield plays degen games for jackpots. Built on Solana with audited smart contracts and insurance vaults.",
  keywords: "DeFi, Solana, yield farming, lossless, casino, jackpots, crypto",
  authors: [{ name: "Lossless Casino" }],
  openGraph: {
    title: "Lossless Casino - Risk your yield, not your stack",
    description: "Your principal stays safe. Your yield plays degen games for jackpots.",
    type: "website",
    siteName: "Lossless Casino",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lossless Casino - Risk your yield, not your stack",
    description: "Your principal stays safe. Your yield plays degen games for jackpots.",
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
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}