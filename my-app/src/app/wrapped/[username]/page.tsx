import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateWrappedStats } from '@/lib/chess';
import Carousel from '@/features/wrapped/Carousel';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { ChessProvider } from '@/context/ChessContext';

interface PageProps {
    params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const username = decodeURIComponent(resolvedParams.username);
    return {
        title: `${username}'s 2025 Chess Wrapped`,
        description: `Check out ${username}'s chess stats for the year 2025!`,
    };
}

export default async function UserWrappedPage({ params }: PageProps) {
    const resolvedParams = await params;
    const username = decodeURIComponent(resolvedParams.username);

    try {
        const stats = await generateWrappedStats(username);

        if (!stats || stats.totalGames === 0) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-[#302e2b] text-white p-4 text-center">
                    <h1 className="text-3xl font-black text-[#81b64c] mb-4">No Games Found</h1>
                    <p className="text-[#989795] mb-8 max-w-md">
                        We couldn't find any games for <strong>{username}</strong> in 2025.
                        Are you sure the username is correct and they have played this year?
                    </p>
                    <Link href="/">
                        <Button>Try Another Username</Button>
                    </Link>
                </div>
            );
        }

        return (
            <ChessProvider stats={stats}>
                <Carousel />
            </ChessProvider>
        );

    } catch (error) {
        console.error("Error generating wrapped:", error);
        notFound();
    }
}