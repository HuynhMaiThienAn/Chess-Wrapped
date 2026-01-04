import React, { ReactNode } from 'react';

interface StoryCardProps {
    id: string;
    children: ReactNode;
    className?: string;
}

export default function StoryCard({ id, children, className = '' }: StoryCardProps) {
    return (
        <div className={`relative w-full h-full ${className}`}>
            {/* Screen Texture Overlay */}
            <div className="absolute inset-0 bg-[#302e2b] rounded-3xl overflow-hidden border-8 border-white shadow-2xl">
                {/* Inner Dark "Screen" */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
