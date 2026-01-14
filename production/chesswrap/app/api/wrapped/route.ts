
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { chessWrapped } from "@/drizzle/schema";
import { fetchChessData, Platform } from "@/lib/chess-data";
import { eq, and } from "drizzle-orm";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    const platform = searchParams.get("platform") as Platform;

    if (!username || !platform) {
        return NextResponse.json({ error: "Missing username or platform" }, { status: 400 });
    }

    const accountType = platform === "lichess" ? 1 : 0;

    try {
        // 1. Check DB
        const existing = await db
            .select()
            .from(chessWrapped)
            .where(
                and(
                    eq(chessWrapped.username, username),
                    eq(chessWrapped.accountType, accountType)
                )
            )
            .limit(1);

        if (existing.length > 0) {
            return NextResponse.json(existing[0]);
        }

        // 2. Fetch External
        const data = await fetchChessData(username, platform);

        // 3. Save to DB
        const inserted = await db.insert(chessWrapped).values(data).returning();

        return NextResponse.json(inserted[0]);
    } catch (error) {
        console.error("Error fetching/saving chess data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
