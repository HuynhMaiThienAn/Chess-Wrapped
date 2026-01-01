import { ChessGame } from '@/types';
import { MethodCount } from '../types';

export interface VariantAnalysisResult {
    gamesByVariant: MethodCount[];
    mostPlayedVariant: string;
}

/**
 * Analyzes game variants/time classes (Blitz, Rapid, Bullet, etc.).
 */
export function analyzeVariants(games: ChessGame[]): VariantAnalysisResult {
    const variantCounts: Record<string, number> = {};

    games.forEach(game => {
        const mode = game.time_class;
        const modeName = mode.charAt(0).toUpperCase() + mode.slice(1);
        variantCounts[modeName] = (variantCounts[modeName] || 0) + 1;
    });

    const gamesByVariant = Object.entries(variantCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

    return {
        gamesByVariant,
        mostPlayedVariant: gamesByVariant.length > 0 ? gamesByVariant[0].name : 'Chess'
    };
}
