const BASE_URL = process.env.NEXT_PUBLIC_CHESS_API_URL || "https://api.chess.com/pub";

export const apiRequest = async <T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> => {

    const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

    const res = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'ChessWrapped/1.0 (contact: huynhmaithienan.2005@gmail.com)',
            ...options.headers,
        },
    });

    if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
};