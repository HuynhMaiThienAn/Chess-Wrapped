import { ReactNode } from 'react';
import { Star, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export interface BadgeProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning';
    size?: 'sm' | 'md' | 'lg';
    icon?: LucideIcon;
    rotation?: number;
    className?: string;
}

/**
 * Reusable badge component
 * Used throughout the app for labels, status indicators, etc.
 */
export default function Badge({
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    rotation = 0,
    className = '',
}: BadgeProps) {
    const variants = {
        primary: 'bg-[#81b64c] text-white border-white/20',
        secondary: 'bg-[#302e2b] text-white border-[#81b64c]',
        accent: 'bg-[#ffc800] text-[#302e2b] border-white/20',
        success: 'bg-green-500 text-white border-white/20',
        warning: 'bg-orange-500 text-white border-white/20',
    };

    const sizes = {
        sm: 'px-3 py-1 text-xs',
        md: 'px-5 py-1.5 text-sm',
        lg: 'px-6 py-2 text-base',
    };

    return (
        <motion.div
            className={`
                ${variants[variant]} 
                ${sizes[size]} 
                rounded-full font-black 
                shadow-[0_4px_0_rgba(0,0,0,0.2)] 
                border-2 
                flex items-center gap-2
                ${className}
            `}
            style={{ rotate: `${rotation}deg` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
        >
            {Icon && <Icon size={16} fill="currentColor" />}
            {children}
        </motion.div>
    );
}
