'use client';

import { motion } from 'framer-motion';
import React from 'react';

// Particle effect component
export const ParticleEffect = ({ count = 20 }: { count?: number }) => {
    const particles = Array.from({ length: count });

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-[#ffc800] rounded-full"
                    initial={{
                        x: `${Math.random() * 100}%`,
                        y: `${Math.random() * 100}%`,
                        opacity: 0,
                        scale: 0
                    }}
                    animate={{
                        y: [`${Math.random() * 100}%`, `${Math.random() * 100 - 50}%`],
                        x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

// Shimmer effect for loading states
export const ShimmerEffect = () => {
    return (
        <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
                x: ['-100%', '100%']
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
            }}
        />
    );
};

// Glow effect wrapper
export const GlowWrapper = ({ children, color = '#ffc800' }: { children: React.ReactNode; color?: string }) => {
    return (
        <motion.div
            className="relative"
            animate={{
                boxShadow: [
                    `0 0 0px ${color}`,
                    `0 0 20px ${color}`,
                    `0 0 0px ${color}`
                ]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            {children}
        </motion.div>
    );
};

