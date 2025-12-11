'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#81b64c] relative overflow-hidden font-sans p-4">

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 3px, transparent 3px)', backgroundSize: '40px 40px' }} />

            {/* Error Cartridge */}
            <div className="w-full max-w-md bg-white p-3 rounded-[3rem] shadow-[0_12px_0_rgba(0,0,0,0.15)] border-4 border-white/20">
                <div className="bg-[#302e2b] rounded-[2.5rem] p-8 flex flex-col items-center text-center border-4 border-[#302e2b] relative overflow-hidden">

                    {/* Icon */}
                    <div className="mb-6 text-red-500 bg-red-500/10 p-4 rounded-full border-4 border-red-500/20">
                        <AlertTriangle size={48} strokeWidth={3} />
                    </div>

                    <h2 className="text-4xl font-black text-white mb-2">GAME OVER</h2>
                    <p className="text-[#989795] font-bold mb-8 leading-relaxed">
                        Something went wrong while generating your stats.
                    </p>

                    {/* Chunky Buttons */}
                    <div className="flex flex-col w-full gap-3">
                        <button
                            onClick={() => reset()}
                            className="w-full bg-[#81b64c] hover:bg-[#72a341] text-white font-black text-lg py-4 rounded-2xl shadow-[0_4px_0_#457524] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2"
                        >
                            <RotateCcw size={20} strokeWidth={3} /> TRY AGAIN
                        </button>

                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full bg-[#3e3c39] hover:bg-[#4b4845] text-white font-black text-lg py-4 rounded-2xl shadow-[0_4px_0_#262421] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2"
                        >
                            <Home size={20} strokeWidth={3} /> GO HOME
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}