import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/components/providers/app-providers';
import { generateDefaultMetadata } from '@/lib/utils/metadata-utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = generateDefaultMetadata();

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-[#211f1c] text-white antialiased`}>
                <AppProviders>{children}</AppProviders>
            </body>
        </html>
    );
}