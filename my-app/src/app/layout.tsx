import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import BackgroundMusic from '@/components/shared/audio/BackgroundMusic';
import { Analytics } from "@vercel/analytics/next";
import { SoundProvider } from "@/context/SoundContext";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Chess Wrapped 2025',
    description: 'Visualize your year in chess. Artistically.',
    icons: {
        icon: '/icon.png',
        shortcut: '/icon.png',
        apple: '/icon.png',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-[#211f1c] text-white antialiased`}>
                <SoundProvider>
                    <BackgroundMusic />
                    {children}
                    <Analytics />
                </SoundProvider>
            </body>
        </html>
    );
}