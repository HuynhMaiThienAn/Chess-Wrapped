'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChessKing } from 'lucide-react';
import { ChessBackground } from '@/components/landing/chess-background';
import { UsernameForm } from '@/components/landing/username-form';
import { ErrorModal } from '@/components/modals/error-modal';
import { useUsernameValidation } from '@/lib/hooks/use-username-validation';
import { useSoundEffects } from '@/lib/hooks/use-sound-effects';

export default function LandingPage() {
    const {
        username,
        setUsername,
        isLoading,
        error,
        handleSubmit,
        clearError,
    } = useUsernameValidation();

    const { playTypeSound, playStartSound } = useSoundEffects();

    const handleUsernameChange = (newUsername: string) => {
        setUsername(newUsername);
        if (error) clearError();
    };

    return (
        <>
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&display=swap');
        .font-bubbly {
          font-family: 'Fredoka', sans-serif;
        }
      `}</style>

            <div className="min-h-screen w-full flex flex-col items-center justify-center pb-32 bg-[#81b64c] relative overflow-hidden font-bubbly selection:bg-white selection:text-[#81b64c]">
                <ChessBackground />

                {/* Main Input Card */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative z-10 w-full max-w-md px-6"
                >
                    <div className="bg-white rounded-[3rem] p-3 shadow-[0_12px_0_rgba(0,0,0,0.1)] border-4 border-white/20">
                        <div className="bg-[#302e2b] rounded-[2.5rem] p-8 md:p-10 text-center relative overflow-hidden border-4 border-[#302e2b]">
                            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/grid-noise.png')]" />

                            {/* Header */}
                            <div className="mb-8 relative z-10">
                                <div className="inline-flex items-center gap-2 bg-[#ffc800] text-[#302e2b] px-4 py-2 rounded-full font-bold text-sm shadow-sm mb-4 animate-bounce">
                                    <ChessKing size={16} fill="currentColor" /> 2025 RECAP
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-2">
                                    Chess
                                    <br />
                                    Wrapped
                                </h1>
                                <p className="text-[#989795] text-lg font-medium">
                                    Ready to see your stats?
                                </p>
                            </div>

                            {/* Form */}
                            <UsernameForm
                                username={username}
                                onUsernameChange={handleUsernameChange}
                                onSubmit={handleSubmit}
                                isLoading={isLoading}
                                hasError={!!error}
                                onType={playTypeSound}
                                onStart={playStartSound}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Error Modal */}
                <ErrorModal error={error} onClose={clearError} />

                {/* Demo Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative z-10 mt-8"
                >
                    <Link
                        href="http://localhost:3001"
                        target="_blank"
                        className="text-white/80 hover:text-white font-bubbly font-semibold text-lg hover:underline transition-all flex items-center gap-2"
                    >
                        View Production Demo <span aria-hidden="true">→</span>
                    </Link>
                </motion.div>
            </>
            );
}
