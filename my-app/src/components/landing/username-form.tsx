'use client';

import { FormEvent, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ChessKnight } from 'lucide-react';

interface UsernameFormProps {
    username: string;
    onUsernameChange: (username: string) => void;
    onSubmit: () => void;
    isLoading: boolean;
    hasError: boolean;
    onType?: () => void;
    onStart?: () => void;
}

export function UsernameForm({
    username,
    onUsernameChange,
    onSubmit,
    isLoading,
    hasError,
    onType,
    onStart,
}: UsernameFormProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!username.trim() || isLoading) return;

        onStart?.();
        onSubmit();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onUsernameChange(e.target.value);
        onType?.();
    };

    return (
        <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
            <div
                className={`bg-[#262421] rounded-3xl p-2 border-4 transition-colors shadow-inner ${hasError
                        ? 'border-red-500'
                        : 'border-[#3e3c39] focus-within:border-[#81b64c]'
                    }`}
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={username}
                    onChange={handleChange}
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
    );
}
