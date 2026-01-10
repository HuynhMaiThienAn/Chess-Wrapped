
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChessWrap - Your 2025 Chess Journey Wrapped",
  description: "Discover your chess stats for 2025! Analyze your Chess.com and Lichess games with beautiful visualizations, track your progress, and share your chess journey.",
  keywords: ["chess", "chess.com", "lichess", "chess stats", "chess wrapped", "chess analytics", "chess year in review", "chess 2025"],
  authors: [{ name: "Ryan.H" }],
  metadataBase: new URL('https://chesswrap.com'),
  openGraph: {
    title: "ChessWrap - Your 2025 Chess Journey Wrapped",
    description: "Discover your chess stats for 2025 with beautiful visualizations. Analyze your Chess.com and Lichess games.",
    type: "website",
    url: "https://chesswrap.com",
    siteName: "ChessWrap",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ChessWrap - Your Chess Journey Wrapped",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChessWrap - Your 2025 Chess Journey Wrapped",
    description: "Discover your chess stats for 2025 with beautiful visualizations",
    images: ["/og-image.png"],
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "ChessWrap",
              "description": "Discover your chess stats for 2025! Analyze your Chess.com and Lichess games with beautiful visualizations.",
              "url": "https://chesswrap.com",
              "applicationCategory": "SportsApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Person",
                "name": "Ryan.H"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
