import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
    ChessKing,
    ChessQueen,
    ChessRook,
    ChessBishop,
    ChessKnight,
    ChessPawn,
} from 'lucide-react';

interface StoryCardProps {
    id: string;
    children: ReactNode;
    className?: string;
}

export default function StoryCard({ id, children, className = '' }: StoryCardProps) {
    return (
        <div className={`relative w-full h-full ${className}`}>
            {/* Screen Texture Overlay */}
            <div className="absolute inset-0 bg-[#302e2b] rounded-[2.5rem] overflow-hidden border-[12px] border-white shadow-2xl">

                {/* Floating Chess Pieces Background */}
                <div className="absolute inset-0 overflow-hidden opacity-5">
                    <motion.div
                        animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                        className="absolute top-[10%] left-[10%] text-white"
                    >
                        <ChessKing size={80} strokeWidth={2} />
                    </motion.div>

                    <motion.div
                        animate={{ y: [10, -10, 10], rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
                        className="absolute bottom-[15%] right-[10%] text-white"
                    >
                        <ChessRook size={70} strokeWidth={2} />
                    </motion.div>

                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [10, 0, 10] }}
                        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
                        className="absolute top-[25%] right-[15%] text-white"
                    >
                        <ChessKnight size={60} strokeWidth={2} />
                    </motion.div>

                    <motion.div
                        animate={{ y: [-15, 15, -15], rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 9, repeat: Infinity, delay: 2.5 }}
                        className="absolute bottom-[10%] left-[8%] text-white"
                    >
                        <ChessQueen size={65} strokeWidth={2} />
                    </motion.div>

                    <motion.div
                        animate={{ x: [5, -5, 5], rotate: [10, -10, 10] }}
                        transition={{ duration: 7, repeat: Infinity, delay: 3.5 }}
                        className="absolute top-[45%] left-[5%] text-white"
                    >
                        <ChessBishop size={50} strokeWidth={2} />
                    </motion.div>

                    <motion.div
                        animate={{ rotate: [0, 180, 0] }}
                        transition={{ duration: 12, repeat: Infinity, delay: 4.5 }}
                        className="absolute bottom-[8%] right-[48%] text-white"
                    >
                        <ChessPawn size={45} strokeWidth={2} />
                    </motion.div>
                </div>

                {/* Inner Dark "Screen" */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
