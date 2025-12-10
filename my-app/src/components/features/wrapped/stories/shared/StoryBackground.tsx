import { ReactNode } from 'react';

interface StoryBackgroundProps {
    children: ReactNode;
}

export default function StoryBackground({ children }: StoryBackgroundProps) {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
            {children}
        </div>
    );
}