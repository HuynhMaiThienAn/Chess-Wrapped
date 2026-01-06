import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatDisplayProps {
    value: string | number;
    label: string;
    icon?: LucideIcon;
    iconColor?: string;
    variant?: 'default' | 'large' | 'compact';
    comment?: string;
    className?: string;
}

/**
 * Reusable statistic display component
 * Can be used across various slides for consistent stat presentation
 */
export default function StatDisplay({
    value,
    label,
    icon: Icon,
    iconColor = '#ffc800',
    variant = 'default',
    comment,
    className = '',
}: StatDisplayProps) {
    const variants = {
        default: {
            container: 'flex flex-col items-center gap-3',
            stat: 'text-6xl md:text-7xl font-bold text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.2)] my-2',
            label: 'text-2xl md:text-4xl font-bold text-white mb-2 drop-shadow-md',
        },
        large: {
            container: 'flex flex-col items-center gap-4',
            stat: 'text-7xl md:text-8xl font-bold text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.2)] my-3',
            label: 'text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-md',
        },
        compact: {
            container: 'flex flex-col items-center gap-2',
            stat: 'text-4xl md:text-5xl font-bold text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.2)] my-1',
            label: 'text-xl md:text-2xl font-bold text-white mb-1 drop-shadow-md',
        },
    };

    const styles = variants[variant];

    return (
        <motion.div
            className={`${styles.container} ${className}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
        >
            {Icon && (
                <div
                    className="mb-4 bg-white/10 p-4 rounded-[2rem] shadow-inner"
                    style={{ color: iconColor }}
                >
                    <Icon size={48} strokeWidth={2.5} />
                </div>
            )}

            <h2 className={styles.label}>{label}</h2>

            <motion.div
                className={styles.stat}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
                {value}
            </motion.div>

            {comment && (
                <motion.p
                    className="text-l font-bold text-[#81b64c] bg-white px-4 py-2 rounded-xl shadow-sm rotate-[-1deg] inline-block mt-4 border-2 border-[#81b64c]/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {comment}
                </motion.p>
            )}
        </motion.div>
    );
}
