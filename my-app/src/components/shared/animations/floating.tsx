'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FloatingIconProps {
    children: ReactNode;
    delay: number;
    x: number;
    y: number;
    className?: string;
}

/**
 * Reusable floating icon component with bobbing animation
 * Commonly used in story backgrounds for decorative elements
 */
export const FloatingIcon = ({ children, delay, x, y, className = '' }: FloatingIconProps) => (
    <motion.div
        className={`absolute opacity-10 text-white pointer-events-none ${className}`}
        initial={{ x, y }}
        animate={{
            y: [y, y - 20, y],
            rotate: [0, 5, -5, 0]
        }}
        transition={{
            duration: 4,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    >
        {children}
    </motion.div>
);
