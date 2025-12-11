import { Loader2, Gamepad2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#81b64c] relative overflow-hidden font-sans">

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 3px, transparent 3px)', backgroundSize: '40px 40px' }} />

            {/* Loading Cartridge */}
            <div className="bg-white p-3 rounded-[3rem] shadow-[0_12px_0_rgba(0,0,0,0.15)] border-4 border-white/20 animate-pulse">
                <div className="bg-[#302e2b] rounded-[2.5rem] p-10 flex flex-col items-center text-center border-4 border-[#302e2b] relative overflow-hidden">

                    {/* Screen Scanline Texture */}
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/grid-noise.png')] pointer-events-none" />

                    <div className="relative z-10 text-[#81b64c]">
                        <Gamepad2 size={64} className="mb-6 animate-bounce" />
                    </div>

                    <h2 className="text-3xl font-black text-white mb-2 relative z-10">
                        LOADING...
                    </h2>
                    <p className="text-[#989795] font-bold relative z-10">
                        Analyzing your moves
                    </p>

                    {/* Loading Bar */}
                    <div className="w-48 h-4 bg-[#3e3c39] rounded-full mt-6 overflow-hidden border-2 border-white/10 relative z-10">
                        <div className="h-full bg-[#81b64c] w-1/2 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}