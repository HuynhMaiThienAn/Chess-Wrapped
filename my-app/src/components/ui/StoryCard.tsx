import React, { ReactNode } from 'react';

interface StoryCardProps {
    id: string;
    children: ReactNode;
    className?: string;
}

export default function StoryCard({ id, children, className = '' }: StoryCardProps) {
    return (
        // Outer White "Shell" (Width reduced from max-w-md to max-w-sm)
        <div className="w-full max-w-sm bg-white p-3 rounded-[3rem] shadow-[0_12px_0_rgba(0,0,0,0.15)] border-4 border-white/20 relative z-10 transition-transform hover:scale-[1.01] duration-500">

            {/* Inner Dark "Screen" (Min height and padding reduced) */}
            <div
                id={id}
                className={`
                    w-full h-full bg-[#302e2b] rounded-[2.5rem] p-5 flex flex-col items-center justify-center text-center 
                    relative overflow-hidden min-h-[500px] border-4 border-[#302e2b] shadow-inner
                    ${className}
                `}
            >
                {/* Screen Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/grid-noise.png')] pointer-events-none z-0" />

                {/* Content Container (z-10 ensures it sits above the texture) */}
                <div className="relative z-10 w-full h-full flex flex-col items-center">
                    {children}
                </div>
            </div>
        </div>
    );
}