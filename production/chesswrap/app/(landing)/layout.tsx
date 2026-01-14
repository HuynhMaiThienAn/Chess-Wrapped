import { ReactNode } from "react";

export default function HomePageLayout({ children }: {
    children: ReactNode
}) {
    return (
        <main>
            {children}
        </main>
    )
}
