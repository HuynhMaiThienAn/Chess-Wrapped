import Link from "next/link";
import {BrandLogo} from "@/app/(landing)/_components/BrandLogo";

export function NavBar (){
    return (
        <header className="flex py-6 shadow-xl fixed top-0 w-full z-10 bg-background/95 bg-[#4e7837]">
            <nav className = "flex item-center gap-10 container font-semibold">
                <Link href ="/" className="mr-auto">
                    <BrandLogo/>
                </Link>
                <Link href ="/">
                    Review
                </Link>
                <Link href ="/">
                    Leaderboard
                </Link>
                <Link href ="/">
                    Gallery
                </Link>
                <Link href ="/">
                    About us
                </Link>
            </nav>
        </header>
    )
}