import Link from 'next/link';
import Button from '@/components/ui/Button/Button';

interface NoGamesStateProps {
    username: string;
}

export function NoGamesState({ username }: NoGamesStateProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#302e2b] text-white p-4 text-center">
            <h1 className="text-3xl font-black text-[#81b64c] mb-4">
                No Games Found
            </h1>
            <p className="text-[#989795] mb-8 max-w-md">
                We couldn't find any games for <strong>{username}</strong> in 2025.
                <br />
                Are you sure the username is correct and they have played this year?
            </p>
            <Link href="/">
                <Button>Try Another Username</Button>
            </Link>
        </div>
    );
}
