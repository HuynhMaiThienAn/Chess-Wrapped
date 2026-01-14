
import { defineConfig } from "drizzle-kit";
import { env } from "@/data/env/server";

export default defineConfig({
    schema: "./drizzle/schema.ts",
    out: "./drizzle/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: env.SUPABASE_URL,
    },
});
