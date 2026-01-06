/**
 * Generates a GIF URL from PGN using Lichess GIF export API
 * @param pgn - The PGN string of the chess game
 * @returns URL to the generated GIF
 */
export async function generateChessGif(pgn: string): Promise<string | null> {
    if (!pgn) return null;

    try {
        // Lichess GIF export API endpoint
        const apiUrl = 'https://lichess.org/api/import';

        // Send POST request with PGN
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `pgn=${encodeURIComponent(pgn)}`
        });

        if (!response.ok) {
            console.error('Failed to import PGN to Lichess:', response.statusText);
            return null;
        }

        const data = await response.json();

        // Lichess returns the game URL, we can append /thumbnail.gif or use the game ID
        // Format: https://lichess.org/{gameId}
        if (data.url) {
            // Extract game ID from URL
            const gameId = data.url.split('/').pop();
            // Return GIF URL - Lichess provides gif exports
            return `https://lichess.org/game/export/gif/${gameId}.gif`;
        }

        return null;
    } catch (error) {
        console.error('Error generating chess GIF:', error);
        return null;
    }
}

/**
 * Alternative: Generate a static board image from FEN using Lichess
 * @param fen - The FEN string of a chess position
 * @returns URL to the board image
 */
export function generateBoardImage(fen: string): string {
    // Lichess provides a simple board image API
    // Format: https://lichess1.org/export/fen.gif?fen={FEN}&theme=brown&piece=cburnett
    const encodedFen = encodeURIComponent(fen);
    return `https://lichess1.org/export/fen.gif?fen=${encodedFen}&theme=green&piece=cburnett&size=800`;
}

/**
 * Client-side helper to get GIF URL with caching
 */
export function getGameGifUrl(pgn?: string): string | null {
    if (!pgn) return null;

    // For client-side, we'll need to make an API call to our backend
    // which will handle the Lichess API communication
    // For now, return null and we'll implement backend endpoint
    return null;
}
