'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ChessKing, ChessQueen, ChessRook, ChessBishop, ChessKnight, ChessPawn, AlertTriangle, X } from 'lucide-react';



export default function LandingPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // State for error popup
    const inputRef = useRef<HTMLInputElement>(null);

    
    const typeSoundRef = useRef<HTMLAudioElement | null>(null);
    const startSoundRef = useRef<HTMLAudioElement | null>(null);

    
    useEffect(() => {
        inputRef.current?.focus();
        typeSoundRef.current = new Audio('/hover.mp3');
        startSoundRef.current = new Audio('/hover.mp3');

        if (typeSoundRef.current) typeSoundRef.current.volume = 0.3;
        if (startSoundRef.current) startSoundRef.current.volume = 0.5;
    }, []);

    const playTypeSound = () => {
        if (typeSoundRef.current) {
            typeSoundRef.current.currentTime = 0;
            typeSoundRef.current.play().catch(() => {});
        }
    };

    const playStartSound = () => {
        if (startSoundRef.current) {
            startSoundRef.current.play().catch(() => {});
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        if(error) setError(null); // Clear error when typing
        playTypeSound();
    };

    
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim()) return;

        playStartSound();
        setIsLoading(true);
        setError(null);

        const cleanUser = username.trim();

        try {
            // A. Check if user exists
            const userRes = await fetch(`https://api.chess.com/pub/player/${cleanUser}`);

            if (userRes.status === 404) {
                throw new Error("User not found on Chess.com!");
            }
            if (!userRes.ok) {
                throw new Error("API Connection Error");
            }

            // B. Check if they have 2025 archives
            const archivesRes = await fetch(`https://api.chess.com/pub/player/${cleanUser}/games/archives`);
            const archivesData = await archivesRes.json();

            // Look for '2025' in the archive URLs
            const has2025 = archivesData.archives && archivesData.archives.some((url: string) => url.includes('/2025/'));

            if (!has2025) {
                throw new Error("No games found for 2025!");
            }

            // C. All good? Navigate.
            router.push(`/wrapped/${encodeURIComponent(cleanUser)}`);

        } catch (err: any) {
            // D. Something failed? Show popup.
            setIsLoading(false);
            setError(err.message || "Something went wrong");
        }
    };

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&display=swap');
                .font-bubbly { font-family: 'Fredoka', sans-serif; }
            `}</style>

            <div
                className="min-h-screen w-full flex flex-col items-center justify-center pb-32 bg-[#81b64c] relative overflow-hidden font-bubbly selection:bg-white selection:text-[#81b64c]"
                onClick={() => !error && inputRef.current?.focus()}
            >
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(#fff 3px, transparent 3px)',
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* --- FLOATING CHESS ICONS --- */}
                {/* (Kept exactly as before) */}
                <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-[10%] left-[10%] text-[#ffc800] drop-shadow-md z-0"><ChessKing size={80} strokeWidth={3} /></motion.div>
                <motion.div animate={{ y: [10, -10, 10], rotate: [0, -5, 5, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute bottom-[15%] right-[10%] text-white drop-shadow-md z-0"><ChessRook size={70} strokeWidth={3} /></motion.div>
                <motion.div animate={{ scale: [1, 1.1, 1], rotate: [10, 0, 10] }} transition={{ duration: 6, repeat: Infinity, delay: 2 }} className="absolute top-[20%] right-[15%] text-[#302e2b] opacity-20 drop-shadow-md z-0"><ChessKnight size={60} strokeWidth={3} /></motion.div>
                <motion.div animate={{ y: [-15, 15, -15], rotate: [0, -5, 5, 0] }} transition={{ duration: 7, repeat: Infinity, delay: 2.5 }} className="absolute bottom-[5%] left-[5%] text-[#ffc800] opacity-60 drop-shadow-md z-0"><ChessQueen size={60} strokeWidth={3} /></motion.div>
                <motion.div animate={{ x: [5, -5, 5], rotate: [10, -10, 10] }} transition={{ duration: 6, repeat: Infinity, delay: 3.5 }} className="absolute top-[40%] left-[5%] text-white opacity-50 drop-shadow-md z-0"><ChessBishop size={50} strokeWidth={3} /></motion.div>
                <motion.div animate={{ rotate: [0, 180, 0] }} transition={{ duration: 10, repeat: Infinity, delay: 4.5 }} className="absolute bottom-[5%] left-[45%] text-[#302e2b] opacity-20 drop-shadow-md z-0"><ChessPawn size={40} strokeWidth={3} /></motion.div>


                {/* MAIN INPUT CARD */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative z-10 w-full max-w-md px-6"
                >
                    <div className="bg-white rounded-[3rem] p-3 shadow-[0_12px_0_rgba(0,0,0,0.1)] border-4 border-white/20">
                        <div className="bg-[#302e2b] rounded-[2.5rem] p-8 md:p-10 text-center relative overflow-hidden border-4 border-[#302e2b]">

                            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/grid-noise.png')]" />

                            <div className="mb-8 relative z-10">
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
                                <div className={`bg-[#262421] rounded-3xl p-2 border-4 transition-colors shadow-inner ${error ? 'border-red-500' : 'border-[#3e3c39] focus-within:border-[#81b64c]'}`}>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={username}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="w-full bg-transparent border-none text-center text-3xl font-bold text-white focus:outline-none placeholder:text-[#3e3c39] py-3 px-2 disabled:opacity-50"
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
                                                <Loader2 className="animate-spin" /> CHECKING...
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
                                                className="text-[#ffffff] text-1xl"
                                            >
                                                (type your chess.com username!)
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>

                {/* --- ERROR MODAL (POPUP) --- */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                            onClick={() => setError(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.8, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.8, y: 20 }}
                                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                                className="bg-[#262421] border-4 border-[#3e3c39] p-6 rounded-3xl shadow-2xl max-w-sm w-full text-center relative"
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#ca3431] text-white p-4 rounded-full border-4 border-[#262421]">
                                    <AlertTriangle size={32} strokeWidth={3} />
                                </div>

                                <h3 className="text-white text-2xl font-black mt-6 mb-2">OOPS!</h3>
                                <p className="text-[#989795] font-bold mb-6">{error}</p>

                                <button
                                    onClick={() => setError(null)}
                                    className="w-full bg-[#ca3431] hover:bg-[#a62b29] text-white font-bold py-3 rounded-xl shadow-[0_4px_0_#8a1c1a] active:translate-y-[4px] active:shadow-none transition-all"
                                >
                                    TRY AGAIN
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}