import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface AvatarProps {
    src: string;
    alt: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    borderColor?: string;
    borderWidth?: number;
    rotation?: number;
    hasPulse?: boolean;
    className?: string;
}

/**
 * Reusable avatar component with various sizes and effects
 */
export default function Avatar({
    src,
    alt,
    size = 'md',
    borderColor = '#81b64c',
    borderWidth = 4,
    rotation = 0,
    hasPulse = false,
    className = '',
}: AvatarProps) {
    const sizes = {
        sm: 'w-16 h-16',
        md: 'w-24 h-24',
        lg: 'w-36 h-36',
        xl: 'w-48 h-48',
    };

    return (
        <div className={`relative ${className}`}>
            {/* Pulsing Glow Behind Avatar */}
            {hasPulse && (
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-white blur-xl rounded-full"
                />
            )}

            <div
                className={`relative p-2 bg-white rounded-full shadow-2xl`}
                style={{ rotate: `${rotation}deg` }}
            >
                <img
                    src={src}
                    alt={alt}
                    className={`${sizes[size]} rounded-full object-cover`}
                    style={{
                        border: `${borderWidth}px solid ${borderColor}`,
                    }}
                />
            </div>
        </div>
    );
}
