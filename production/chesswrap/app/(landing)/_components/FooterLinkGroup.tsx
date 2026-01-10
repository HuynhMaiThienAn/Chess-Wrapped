import Link from "next/link";

export function FooterLinkGroup({title, links
}: {
    title: string
    links: {label: string; href: string}[]
}) {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-white">{title}</h3>
            <ul className="flex flex-col gap-2 text-sm text-gray-50">
                {links.map(link =>(
                    <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}