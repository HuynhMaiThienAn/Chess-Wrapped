<<<<<<< HEAD
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
=======
import axios, {AxiosResponse} from "axios";
/*
Reference from
https://medium.com/@ignatovich.dm/creating-a-type-safe-api-client-with-typescript-and-react-ce1b82bf8b9b
*/

const apiClient = axios.create({
    baseURL: "https://api.chess.com/pub",
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': '/1.0 (contact: huynhmaithienan.2005@gmail.com)'
    },
    timeout: 10000 // wait for 10s cuz why not
})

// generic API function
export const apiRequest = async <T>(url: string, method: 'GET' | 'POST', data?: any): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient({
        method,
        url,
        data,
    });

    return response.data;
>>>>>>> parent of 5c0ac45 (feat: use fetch with cache data to speed up and reduce api calls)
};