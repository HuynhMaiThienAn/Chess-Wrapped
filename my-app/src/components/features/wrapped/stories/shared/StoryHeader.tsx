import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from './animations';
import { TYPOGRAPHY, CONTAINERS } from './styles';

interface StoryHeaderProps {
    icon: ReactNode;
    title: string;
    subtitle?: string | ReactNode;
    iconColor?: string;
}

export default function StoryHeader({ icon, title, subtitle, iconColor = 'text-[#ffc800]' }: StoryHeaderProps) {
    return (
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-6 z-20 relative">

            {/* Icon Bubble */}
            <div className={`${CONTAINERS.iconWrapper} ${iconColor} border-4 border-white/10`}>
                {icon}
            </div>

            {/* Title */}
            <h2 className={TYPOGRAPHY.headerTitle}>
                {title}
            </h2>

            {/* Subtitle */}
            {subtitle && (
                <div className={TYPOGRAPHY.subHeader}>
                    {subtitle}
                </div>
            )}
        </motion.div>
    );
}