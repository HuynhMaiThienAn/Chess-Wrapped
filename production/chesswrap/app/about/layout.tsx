import { ReactNode } from "react";

export default function AboutLayout({ children }: {
    children: ReactNode
}) {
    return (
        <main>
            {children}
        </main>
    )
}
