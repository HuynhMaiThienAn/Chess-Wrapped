import Link from "next/link";

export function FooterLinkGroup({
                                    title, links
                                }: {
    title: string
    links: {label: string; href: string}[]
}) {
    return (
        <div>
            <h3>{title}</h3>
            <ul>
                {links.map(link =>(
                    <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}