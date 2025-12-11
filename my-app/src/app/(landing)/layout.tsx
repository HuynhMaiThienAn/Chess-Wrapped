import React from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

export default function LandingLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (

        // 1. Changed min-h-screen to h-screen for strict viewport height control
        <div className="h-screen flex flex-col overflow-hidden">
            <Header />
            {/* 2. Added py-6 (padding vertical) for buffer space, ensuring the card doesn't visually touch the Header/Footer */}
            <main className="flex-grow flex flex-col items-center justify-center relative z-10 py-20">
                {children}
            </main>
        </div>
    );
}