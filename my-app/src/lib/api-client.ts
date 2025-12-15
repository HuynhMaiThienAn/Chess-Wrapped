const BASE_URL = process.env.NEXT_PUBLIC_CHESS_API_URL;

import axios, {AxiosResponse} from "axios";
/*
Reference from
https://medium.com/@ignatovich.dm/creating-a-type-safe-api-client-with-typescript-and-react-ce1b82bf8b9b
*/

const apiClient = axios.create({
    baseURL: BASE_URL,
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
};