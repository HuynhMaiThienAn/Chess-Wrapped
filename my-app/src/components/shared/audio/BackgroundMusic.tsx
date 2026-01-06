'use client';

import { useEffect, useRef } from 'react';
import { useSound } from '@/context/SoundContext';

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { isMuted } = useSound();

    useEffect(() => {
        // 1. Initialize Audio
        audioRef.current = new Audio('/1-04. Thank You For Your Patience.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.2;
        audioRef.current.muted = isMuted;

        // 2. Attempt Autoplay (Will likely fail, which is fine)
        const attemptPlay = async () => {
            if (!audioRef.current) return;
            try {
                await audioRef.current.play();
            } catch (err) {
                // Browser blocked it. Ignore this error.
                // We will unlock it on the first click below.
            }
        };
        attemptPlay();

        // 3. One-time "Unlock" Listener
        // This waits for ANY click on the page to start the audio engine
        const unlockAudio = () => {
            if (audioRef.current) {
                audioRef.current.play().catch(() => { });
                // Once played successfully, remove these listeners
                window.removeEventListener('click', unlockAudio);
                window.removeEventListener('keydown', unlockAudio);
            }
        };

        window.addEventListener('click', unlockAudio);
        window.addEventListener('keydown', unlockAudio);

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('keydown', unlockAudio);
        };
    }, []);

    // 4. Handle Mute Toggle Button
    useEffect(() => {
        if (!audioRef.current) return;

        audioRef.current.muted = isMuted;

        // If user un-mutes and it's paused, try to play again
        if (!isMuted && audioRef.current.paused) {
            audioRef.current.play().catch(() => { });
        }
    }, [isMuted]);

    return null;
}
