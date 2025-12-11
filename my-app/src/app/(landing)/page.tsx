'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ChessKing, ChessQueen, ChessRook, ChessBishop, ChessKnight, ChessPawn } from 'lucide-react';

export default function LandingPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim()) return;
        setIsLoading(true);
        router.push(`/wrapped/${encodeURIComponent(username)}`);
    };

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&display=swap');
                .font-bubbly { font-family: 'Fredoka', sans-serif; }
            `}</style>

            <div
                // Moved the card up by adding padding-bottom
                className="min-h-screen w-full flex flex-col items-center justify-center pb-32 bg-[#81b64c] relative overflow-hidden font-bubbly selection:bg-white selection:text-[#81b64c]"
                onClick={() => inputRef.current?.focus()}
            >
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(#fff 3px, transparent 3px)',
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* --- FLOATING CHESS ICONS (Real Pieces) --- */}

                {/* 1. King (Floating Top Left, Yellow) */}
                <motion.div
                    animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-[10%] left-[10%] text-[#ffc800] drop-shadow-md z-0"
                >
                    <ChessKing size={80} strokeWidth={3} />
                </motion.div>

                {/* 2. Rook (Floating Bottom Right, White) */}
                <motion.div
                    animate={{ y: [10, -10, 10], rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-[15%] right-[10%] text-white drop-shadow-md z-0"
                >
                    <ChessRook size={70} strokeWidth={3} />
                </motion.div>

                {/* 3. Knight (Floating Top Right, Dark) */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [10, 0, 10] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                    className="absolute top-[20%] right-[15%] text-[#302e2b] opacity-20 drop-shadow-md z-0"
                >
                    <ChessKnight size={60} strokeWidth={3} />
                </motion.div>

                {/* 4. Queen (NEW - Bottom Left, Yellow) */}
                <motion.div
                    animate={{ y: [-15, 15, -15], rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 7, repeat: Infinity, delay: 2.5 }}
                    className="absolute bottom-[5%] left-[5%] text-[#ffc800] opacity-60 drop-shadow-md z-0"
                >
                    <ChessQueen size={60} strokeWidth={3} />
                </motion.div>

                {/* 5. Bishop (NEW - Mid Left, White) */}
                <motion.div
                    animate={{ x: [5, -5, 5], rotate: [10, -10, 10] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 3.5 }}
                    className="absolute top-[40%] left-[5%] text-white opacity-50 drop-shadow-md z-0"
                >
                    <ChessBishop size={50} strokeWidth={3} />
                </motion.div>

                {/* 6. Pawn (NEW - Bottom Mid, Dark) */}
                <motion.div
                    animate={{ rotate: [0, 180, 0] }}
                    transition={{ duration: 10, repeat: Infinity, delay: 4.5 }}
                    className="absolute bottom-[5%] left-[45%] text-[#302e2b] opacity-20 drop-shadow-md z-0"
                >
                    <ChessPawn size={40} strokeWidth={3} />
                </motion.div>


                {/* MAIN CARD */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative z-10 w-full max-w-md px-6"
                >
                    <div className="bg-white rounded-[3rem] p-3 shadow-[0_12px_0_rgba(0,0,0,0.1)] border-4 border-white/20">
                        <div className="bg-[#302e2b] rounded-[2.5rem] p-8 md:p-10 text-center relative overflow-hidden border-4 border-[#302e2b]">

                            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/grid-noise.png')]" />

                            <div className="mb-8 relative z-10">
                                {/* Badge Icon: Updated to ChessKing */}
                                <div className="inline-flex items-center gap-2 bg-[#ffc800] text-[#302e2b] px-4 py-2 rounded-full font-bold text-sm shadow-sm mb-4 animate-bounce">
                                    <ChessKing size={16} fill="currentColor" /> 2025 RECAP
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-2">
                                    Chess<br/>Wrapped
                                </h1>
                                <p className="text-[#989795] text-lg font-medium">
                                    Ready to see your stats?
                                </p>
                            </div>

                            <form onSubmit={handleFormSubmit} className="relative z-10 space-y-4">
                                <div className="bg-[#262421] rounded-3xl p-2 border-4 border-[#3e3c39] focus-within:border-[#81b64c] transition-colors shadow-inner">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full bg-transparent border-none text-center text-3xl font-bold text-white focus:outline-none placeholder:text-[#3e3c39] py-3 px-2 lowercase"
                                        placeholder="username"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        spellCheck="false"
                                    />
                                </div>

                                <div className="h-16 flex justify-center items-center">
                                    <AnimatePresence mode="wait">
                                        {isLoading ? (
                                            <motion.div
                                                key="loading"
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.8, opacity: 0 }}
                                                className="bg-[#3e3c39] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2"
                                            >
                                                <Loader2 className="animate-spin" /> LOADIN...
                                            </motion.div>
                                        ) : username.length > 0 ? (
                                            <motion.button
                                                key="button"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: 20, opacity: 0 }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                type="submit"
                                                className="bg-[#81b64c] hover:bg-[#72a341] text-white text-xl font-bold px-8 py-3 rounded-full shadow-[0_6px_0_#457524] active:shadow-none active:translate-y-[6px] transition-all flex items-center gap-2 border-2 border-[#81b64c]"
                                            >
                                                <ChessKnight size={24} /> START!
                                            </motion.button>
                                        ) : (
                                            <motion.p
                                                key="hint"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="text-[#52525b] font-bold text-sm"
                                            >
                                                (type your name!)
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}