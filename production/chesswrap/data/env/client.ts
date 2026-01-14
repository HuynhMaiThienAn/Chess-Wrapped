import {createEnv} from "@t3-oss/env-nextjs"
import {z} from "zod";

export const env = createEnv({
    emptyStringAsUndefined: true, // show error if pass empty db URL
    client: {
        NEXT_PUBLIC_CHESS_API_URL: z.string(),
    },
    experimental__runtimeEnv: {
        NEXT_PUBLIC_CHESS_API_URL: process.env.NEXT_PUBLIC_CHESS_API_URL
    }
})