import Link from 'next/link';
import { ExternalLink, LucideIcon } from 'lucide-react';

interface MenuItemProps {
    href: string;
    icon: LucideIcon;
    label: string;
    colorClass: string;
    onClick: () => void;
}

const MenuItem = ({ href, icon: Icon, label, colorClass, onClick }: MenuItemProps) => (
    <Link
        href={href}
        target="_blank"
        onClick={onClick}
        className={`flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group w-full text-left`}
    >
        <div className={`p-2 rounded-lg ${colorClass} text-white shadow-sm group-hover:scale-110 transition-transform`}>
            <Icon size={18} />
        </div>
        <span className="font-bold text-white text-sm">{label}</span>
        <ExternalLink size={14} className="ml-auto text-white/30 group-hover:text-white/70" />
    </Link>
);

export default MenuItem;
