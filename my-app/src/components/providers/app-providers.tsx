'use client';

import { Analytics } from '@vercel/analytics/next';
import { SoundProvider } from '@/context/SoundContext';
import BackgroundMusic from '@/components/shared/audio/BackgroundMusic';

interface AppProvidersProps {
    children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
    return (
        <SoundProvider>
            <BackgroundMusic />
            {children}
            <Analytics />
        </SoundProvider>
    );
}
