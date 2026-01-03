import { Metadata } from 'next';
import { sanitizeUsername, escapeHtml } from './security-utils';

/**
 * Generate metadata for wrapped pages
 */
export function generateWrappedMetadata(
    rawUsername: string,
    year: number = 2025
): Metadata {
    const username = sanitizeUsername(rawUsername);
    const safeUsername = escapeHtml(username);

    return {
        title: `${safeUsername}'s ${year} Chess Wrapped`,
        description: `Check out ${safeUsername}'s chess stats for the year ${year}!`,
        openGraph: {
            title: `${safeUsername}'s Chess Wrapped`,
            description: `Check out my ${year} chess journey!`,
            images: ['/og-image.jpg'],
            type: 'website',
            siteName: 'Chess Wrapped',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${safeUsername}'s Chess Wrapped`,
            description: `My ${year} chess stats`,
            images: ['/og-image.jpg'],
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

/**
 * Generate default metadata for root layout
 */
export function generateDefaultMetadata(): Metadata {
    return {
        title: 'Chess Wrapped 2025',
        description: 'Visualize your year in chess. Artistically.',
        keywords: ['chess', 'chess.com', 'wrapped', 'statistics', 'analytics', 'chess stats'],
        authors: [{ name: 'Chess Wrapped' }],
        openGraph: {
            title: 'Chess Wrapped',
            description: 'Your year in chess, wrapped beautifully.',
            images: ['/og-image.jpg'],
            type: 'website',
            siteName: 'Chess Wrapped',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Chess Wrapped',
            description: 'Your year in chess, wrapped beautifully.',
            images: ['/og-image.jpg'],
        },
        icons: {
            icon: '/icon.png',
            shortcut: '/icon.png',
            apple: '/icon.png',
        },
        robots: {
            index: true,
            follow: true,
        },
        metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'),
    };
}

/**
 * Generate metadata for landing page
 */
export function generateLandingMetadata(): Metadata {
    return {
        title: 'Chess Wrapped 2025 - Your Year in Chess',
        description: 'Discover your chess journey in 2025. View your stats, achievements, and progress beautifully visualized.',
        keywords: ['chess wrapped', 'chess statistics', 'chess.com stats', 'chess analytics'],
        openGraph: {
            title: 'Chess Wrapped 2025',
            description: 'Discover your chess journey',
            images: ['/og-image.jpg'],
            type: 'website',
        },
    };
}
