import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { pgn } = await request.json();

        if (!pgn) {
            return NextResponse.json(
                { error: 'PGN is required' },
                { status: 400 }
            );
        }

        // Import PGN to Lichess and get the game URL
        const lichessResponse = await fetch('https://lichess.org/api/import', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `pgn=${encodeURIComponent(pgn)}`
        });

        if (!lichessResponse.ok) {
            throw new Error('Failed to import PGN to Lichess');
        }

        const lichessData = await lichessResponse.json();

        if (!lichessData.url) {
            throw new Error('No URL returned from Lichess');
        }

        // Extract game ID from the URL
        const gameId = lichessData.url.split('/').pop();

        // Construct GIF export URL
        const gifUrl = `https://lichess.org/game/export/gif/${gameId}.gif`;

        return NextResponse.json({ gifUrl });
    } catch (error) {
        console.error('Error generating chess GIF:', error);
        return NextResponse.json(
            { error: 'Failed to generate GIF' },
            { status: 500 }
        );
    }
}
