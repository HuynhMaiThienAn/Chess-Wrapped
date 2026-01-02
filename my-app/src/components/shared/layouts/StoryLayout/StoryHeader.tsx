import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StoryHeaderProps {
    icon: LucideIcon;
    title: string;
    subtitle?: string;
    iconColor?: string;
}

/**
 * Reusable header component for story slides
 * Displays an icon, title, and optional subtitle
 */
export default function StoryHeader({
    icon: Icon,
    title,
    subtitle,
    iconColor = '#ffc800'
}: StoryHeaderProps) {
    return (
        <motion.div
            className="flex flex-col items-center gap-4 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Icon */}
            <div
                className="mb-4 bg-white/10 p-4 rounded-[2rem] shadow-inner"
                style={{ color: iconColor }}
            >
                <Icon size={48} strokeWidth={2.5} />
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 drop-shadow-md text-center">
                {title}
            </h2>

            {/* Subtitle */}
            {subtitle && (
                <p className="text-[#989795] text-lg font-medium mb-1 text-center">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
}
