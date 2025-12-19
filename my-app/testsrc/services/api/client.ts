import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_CHESS_API_URL;
export const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'ChessWrapped/1.0 (contact huynhmaithienan.2005@gmail.com)'
    }
});