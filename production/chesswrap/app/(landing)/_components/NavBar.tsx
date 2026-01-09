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
                    About
                </Link>
                <Link href ="/">
                    Docs
                </Link>
                <Link href ="/">
                    Star on Github
                </Link>
            </nav>
        </header>
    )
}