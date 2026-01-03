'use client';

import { useEffect, useRef } from 'react';

interface UseSoundEffectsReturn {
    playTypeSound: () => void;
    playStartSound: () => void;
    playClickSound: () => void;
}

export function useSoundEffects(): UseSoundEffectsReturn {
    const typeSoundRef = useRef<HTMLAudioElement | null>(null);
    const startSoundRef = useRef<HTMLAudioElement | null>(null);
    const clickSoundRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio elements
        typeSoundRef.current = new Audio('/hover.mp3');
        startSoundRef.current = new Audio('/hover.mp3');
        clickSoundRef.current = new Audio('/hover.mp3');

        // Set volumes
        if (typeSoundRef.current) typeSoundRef.current.volume = 0.3;
        if (startSoundRef.current) startSoundRef.current.volume = 0.5;
        if (clickSoundRef.current) clickSoundRef.current.volume = 0.4;

        // Cleanup
        return () => {
            typeSoundRef.current = null;
            startSoundRef.current = null;
            clickSoundRef.current = null;
        };
    }, []);

    const playTypeSound = () => {
        if (typeSoundRef.current) {
            typeSoundRef.current.currentTime = 0;
            typeSoundRef.current.play().catch(() => { });
        }
    };

    const playStartSound = () => {
        if (startSoundRef.current) {
            startSoundRef.current.play().catch(() => { });
        }
    };

    const playClickSound = () => {
        if (clickSoundRef.current) {
            clickSoundRef.current.currentTime = 0;
            clickSoundRef.current.play().catch(() => { });
        }
    };

    return {
        playTypeSound,
        playStartSound,
        playClickSound,
    };
}
