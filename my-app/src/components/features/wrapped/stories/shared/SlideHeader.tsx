import { motion } from 'framer-motion';
import { itemVariants } from '@/components/shared/animations';

interface SlideHeaderProps {
    avatarUrl: string;
    username: string;
    title: string;
    subtitle?: string;
}

export default function SlideHeader({ avatarUrl, username, title, subtitle }: SlideHeaderProps) {
    return (
        <motion.div variants={itemVariants} className="w-full flex flex-col items-center px-4 mb-4 z-10">
            {/* Avatar + Title Row */}
            <div className="flex items-center justify-center w-full mb-2">
                <div className="bg-white rounded-full shadow-lg mr-3 flex-shrink-0">
                    <img
                        src={avatarUrl}
                        alt={username}
                        className="w-12 h-12 rounded-full object-cover border-4 border-[#81b64c]"
                    />
                </div>
                <h2 className="text-2xl font-bold text-white drop-shadow-md whitespace-nowrap">
                    {title}
                </h2>
            </div>

            {/* Subtitle */}
            {subtitle && (
                <p className="text-[#989795] font-bold text-xs uppercase tracking-widest text-center">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
}
