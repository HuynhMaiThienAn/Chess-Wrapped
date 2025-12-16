'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ConfettiPiece {
    id: number;
    x: number;
    y: number;
    rotation: number;
    color: string;
    size: number;
}

const COLORS = ['#ffc800', '#81b64c', '#ca3431', '#ebecd0', '#ffffff'];

export default function Confetti({ 
    trigger = false,
    count = 50 
}: { 
    trigger?: boolean;
    count?: number;
}) {
    const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

    useEffect(() => {
        if (trigger) {
            const newPieces: ConfettiPiece[] = Array.from({ length: count }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: -10,
                rotation: Math.random() * 360,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                size: Math.random() * 8 + 4
            }));
            setPieces(newPieces);

            // Clear pieces after animation
            const timer = setTimeout(() => setPieces([]), 3000);
            return () => clearTimeout(timer);
        }
    }, [trigger, count]);

    if (pieces.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {pieces.map((piece) => (
                <motion.div
                    key={piece.id}
                    className="absolute"
                    style={{
                        left: `${piece.x}%`,
                        top: `${piece.y}%`,
                        width: `${piece.size}px`,
                        height: `${piece.size}px`,
                        backgroundColor: piece.color,
                        borderRadius: '2px'
                    }}
                    initial={{
                        y: -10,
                        rotate: piece.rotation,
                        opacity: 1
                    }}
                    animate={{
                        y: window.innerHeight + 100,
                        rotate: piece.rotation + 360,
                        x: (Math.random() - 0.5) * 200,
                        opacity: [1, 1, 0]
                    }}
                    transition={{
                        duration: Math.random() * 2 + 1.5,
                        ease: "easeOut",
                        delay: Math.random() * 0.5
                    }}
                />
            ))}
        </div>
    );
}

