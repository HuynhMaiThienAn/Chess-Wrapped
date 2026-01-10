import { ReactNode } from "react";
import { NavBar } from "@/app/(landing)/_components/NavBar";

export default function HomePageLayout({ children }: {
    children: ReactNode
}) {
    return (
        <div>
            <NavBar />
            <main>
                {children}
            </main>
        </div>
    )
}
