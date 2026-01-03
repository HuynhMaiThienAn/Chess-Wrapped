import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateWrappedStats } from '@/lib/chess';
import Carousel from '@/components/organisms/Carousel';
import { ChessProvider } from '@/context/ChessContext';
import { NoGamesState } from '@/components/wrapped/no-games-state';
import { generateWrappedMetadata } from '@/lib/utils/metadata-utils';
import { validateAndSanitizeUsername } from '@/lib/utils/security-utils';
import { logError } from '@/lib/utils/env-utils';

interface PageProps {
    params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const rawUsername = decodeURIComponent(resolvedParams.username);

    // Use centralized metadata generator with sanitization
    return generateWrappedMetadata(rawUsername);
}

export default async function UserWrappedPage({ params }: PageProps) {
    const resolvedParams = await params;
    const rawUsername = decodeURIComponent(resolvedParams.username);

    try {
        // Sanitize and validate username
        const username = validateAndSanitizeUsername(rawUsername);

        // Generate stats
        const stats = await generateWrappedStats(username);

        // Check for empty stats
        if (!stats || stats.totalGames === 0) {
            return <NoGamesState username={username} />;
        }

        // Success - show wrapped
        return (
            <ChessProvider stats={stats}>
                <Carousel />
            </ChessProvider>
        );
    } catch (error) {
        // Production-safe error logging
        logError('Error generating wrapped', error);
        notFound();
    }
}