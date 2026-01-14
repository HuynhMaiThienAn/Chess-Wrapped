import { env } from "@/data/env/server";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
    connectionString: env.SUPABASE_URL,
});

export const db = drizzle(pool, { schema });
