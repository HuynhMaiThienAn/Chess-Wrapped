import { ReactNode } from 'react';

interface StoryBackgroundProps {
    children: ReactNode; // These are the specific slide icons (Castle, Swords, etc.)
}

export default function StoryBackground({ children }: StoryBackgroundProps) {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* Slide-Specific Children (The icons passed from the slide itself) */}
            {children}
        </div>
    );
}
