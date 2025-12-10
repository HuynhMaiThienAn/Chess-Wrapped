import React, { ReactNode } from 'react';

interface StoryCardProps {
    id: string;
    children: ReactNode;
    className?: string;
}

export default function StoryCard({ id, children, className = '' }: StoryCardProps) {
    return (
        <div
            id={id}
            className={`w-full max-w-md bg-[#262421] rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden min-h-[550px] border-b-4 border-[#1f1e1b] ${className}`}
        >
            {children}
        </div>
    );
}