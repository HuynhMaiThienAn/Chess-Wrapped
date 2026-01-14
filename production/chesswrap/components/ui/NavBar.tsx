'use client';

import Link from "next/link";
import { BrandLogo } from "@/app/(landing)/_components/BrandLogo";
import { usePathname } from "next/navigation";

export function NavBar() {
    const pathname = usePathname();
    const isAboutPage = pathname === "/about";

    return (
        <header className="w-full px-5 fixed top-0 z-50 font-bubbly py-2">
            <nav className="max-w-7xl mx-auto px-4 md:px-10 flex items-center gap-4 md:gap-10 bg-[#302e2b]/95 border-6 md:border-4 rounded-[3rem] border-white font-semibold py-3 justify-between">
                <Link href="/">
                    <BrandLogo />
                </Link>
                <div className="flex items-center gap-4 md:gap-10">
                    <Link
                        href={isAboutPage ? "/" : "/about"}
                        className="text-white/80 hover:text-[#ffc800] transition-colors"
                    >
                        {isAboutPage ? "Home" : "About"}
                    </Link>
                    <Link href="https://github.com/HuynhMaiThienAn/Chess-Wrapped" target="_blank" className="text-white/80 hover:text-[#ffc800] transition-colors">
                        Github
                    </Link>
                    <Link href="https://buymeacoffee.com/ryan.h" target="_blank" className="text-white/80 hover:text-[#ffc800] transition-colors">
                        Donate
                    </Link>
                </div>
            </nav>
        </header>
    );
}
