import {createEnv} from "@t3-oss/env-nextjs"
import {z} from "zod";

export const env = createEnv({
    emptyStringAsUndefined: true, // show error if pass empty db URL
    server: {
        SUPABASE_URL: z.string(),
        SUPABASE_SERVICE_KEY: z.string()
    },
    experimental__runtimeEnv: process.env
})