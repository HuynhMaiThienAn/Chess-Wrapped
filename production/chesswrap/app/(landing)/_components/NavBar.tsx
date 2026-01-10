import Link from "next/link";
import { BrandLogo } from "@/app/(landing)/_components/BrandLogo";

export function NavBar() {
    return (
        <header className="w-full fixed top-0 z-50 font-bubbly">
            <nav className="max-w-7xl mx-auto px-4 md:px-10 flex items-center gap-10 bg-[#302e2b] border-10 rounded-[3rem] border-white font-semibold py-3">
                <Link href="/" className="mr-auto">
                    <BrandLogo />
                </Link>
                <Link href="/" className="text-white/80 hover:text-[#ffc800] transition-colors">
                    Docs
                </Link>
                <Link href="/" className="text-white/80 hover:text-[#ffc800] transition-colors">
                    Github
                </Link>
                <Link href="/" className="text-white/80 hover:text-[#ffc800] transition-colors">
                    Donate
                </Link>
            </nav>
        </header>
    );
}
