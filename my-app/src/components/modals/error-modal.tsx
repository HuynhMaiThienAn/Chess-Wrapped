'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface ErrorModalProps {
    error: string | null;
    onClose: () => void;
}

export function ErrorModal({ error, onClose }: ErrorModalProps) {
    return (
        <AnimatePresence>
            {error && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.8, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.8, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#262421] border-4 border-[#3e3c39] p-6 rounded-3xl shadow-2xl max-w-sm w-full text-center relative"
                    >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#ca3431] text-white p-4 rounded-full border-4 border-[#262421]">
                            <AlertTriangle size={32} strokeWidth={3} />
                        </div>

                        <h3 className="text-white text-2xl font-black mt-6 mb-2">
                            OOPS!
                        </h3>
                        <p className="text-[#989795] font-bold mb-6">{error}</p>

                        <button
                            onClick={onClose}
                            className="w-full bg-[#ca3431] hover:bg-[#a62b29] text-white font-bold py-3 rounded-xl shadow-[0_4px_0_#8a1c1a] active:translate-y-[4px] active:shadow-none transition-all"
                        >
                            TRY AGAIN
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
