import { motion } from 'framer-motion';

interface ProgressBarProps {
    current: number;
    total: number;
    color?: string;
    backgroundColor?: string;
    height?: string;
    showLabel?: boolean;
    className?: string;
}

/**
 * Reusable progress bar component
 * Extracted from Carousel for general use
 */
export default function ProgressBar({
    current,
    total,
    color = '#ffc800',
    backgroundColor = 'rgba(62, 60, 57, 0.4)',
    height = '20px',
    showLabel = false,
    className = '',
}: ProgressBarProps) {
    const percentage = ((current / total) * 100).toFixed(0);

    return (
        <div className={`flex-1 rounded-full p-1 backdrop-blur-sm border-2 border-white/30 relative overflow-hidden ${className}`}
            style={{ backgroundColor, height }}>
            <motion.div
                className="h-full rounded-full transition-all duration-500 shadow-[0_2px_0_rgba(0,0,0,0.1)] relative"
                style={{
                    width: `${percentage}%`,
                    backgroundColor: color
                }}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <div className="absolute top-0 right-0 bottom-0 width-2 bg-white/40 blur-[2px]" />
            </motion.div>

            {showLabel && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-white drop-shadow-md">
                        {percentage}%
                    </span>
                </div>
            )}
        </div>
    );
}
