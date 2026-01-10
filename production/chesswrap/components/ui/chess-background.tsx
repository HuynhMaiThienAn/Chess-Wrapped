'use client';

import { motion } from 'motion/react';
import {
    ChessKing,
    ChessQueen,
    ChessRook,
    ChessBishop,
    ChessKnight,
    ChessPawn,
} from 'lucide-react';

export function ChessBackground() {
    return (
        <>
            {/* Background Pattern */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#fff 3px, transparent 3px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Floating Chess Pieces */}
            <motion.div
                animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-[10%] left-[10%] text-[#ffc800] drop-shadow-md z-0"
            >
                <ChessKing size={80} strokeWidth={3} />
            </motion.div>

            <motion.div
                animate={{ y: [10, -10, 10], rotate: [0, -5, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute bottom-[15%] right-[10%] text-white drop-shadow-md z-0"
            >
                <ChessRook size={70} strokeWidth={3} />
            </motion.div>

            <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [10, 0, 10] }}
                transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                className="absolute top-[20%] right-[15%] text-[#302e2b] opacity-20 drop-shadow-md z-0"
            >
                <ChessKnight size={60} strokeWidth={3} />
            </motion.div>

            <motion.div
                animate={{ y: [-15, 15, -15], rotate: [0, -5, 5, 0] }}
                transition={{ duration: 7, repeat: Infinity, delay: 2.5 }}
                className="absolute bottom-[5%] left-[5%] text-[#ffc800] opacity-60 drop-shadow-md z-0"
            >
                <ChessQueen size={60} strokeWidth={3} />
            </motion.div>

            <motion.div
                animate={{ x: [5, -5, 5], rotate: [10, -10, 10] }}
                transition={{ duration: 6, repeat: Infinity, delay: 3.5 }}
                className="absolute top-[40%] left-[5%] text-white opacity-50 drop-shadow-md z-0"
            >
                <ChessBishop size={50} strokeWidth={3} />
            </motion.div>

            <motion.div
                animate={{ rotate: [0, 180, 0] }}
                transition={{ duration: 10, repeat: Infinity, delay: 4.5 }}
                className="absolute bottom-[5%] left-[45%] text-[#302e2b] opacity-20 drop-shadow-md z-0"
            >
                <ChessPawn size={40} strokeWidth={3} />
            </motion.div>
        </>
    );
}
