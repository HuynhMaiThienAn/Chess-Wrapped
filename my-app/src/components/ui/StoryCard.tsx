import React, { ReactNode } from 'react';

interface StoryCardProps {
    id: string;
    children: ReactNode;
    className?: string;
}

export default function StoryCard({ id, children, className = '' }: StoryCardProps) {
    return (
        <div className="w-full h-full bg-white p-2 rounded-[2.5rem] shadow-[0_10px_0_rgba(0,0,0,0.15)] border-1 border-white/20 relative z-10 transition-transform duration-500">

            {/* Inner Dark "Screen" */}
            <div
                id={id}
                className={`
                    w-full h-full bg-[#302e2b] rounded-[2rem] p-5 flex flex-col items-center justify-center text-center 
                    relative overflow-hidden border-4 border-[#302e2b] shadow-inner
                    ${className}
                `}
            >
                {/* Screen Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/grid-noise.png')] pointer-events-none z-0" />

                {/* Content Container */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                    {children}
                </div>
            </div>
        </div>
    );
}