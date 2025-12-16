'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, RotateCcw, Home, Star } from 'lucide-react';
import Link from 'next/link';
import { useChessStats } from '@/context/ChessContext';

// Import Slides
import WelcomeSlide from './stories/WelcomeSlide';
import TotalGamesSlide from './stories/TotalGamesSlide';
import EloGraphSlide from './stories/EloGraphSlide';
import ImpressiveMatchesSlide from './stories/ImpressiveMatchesSlide';
import WorstOpeningSlide from './stories/WorstOpeningSlide';
import EndSlide from './stories/EndSlide';
import TopOpeningSlide from './stories/topOpenings';
import FriendsSlide from './stories/friends';

export default function Carousel() {
    const { stats: data } = useChessStats();
    const [currentStep, setCurrentStep] = useState(0);

    // --- AUDIO LOGIC ---
    const clickSoundRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        clickSoundRef.current = new Audio('/hover.mp3');
        if (clickSoundRef.current) clickSoundRef.current.volume = 0.3;
    }, []);

    const playClick = () => {
        if (clickSoundRef.current) {
            clickSoundRef.current.currentTime = 0;
            clickSoundRef.current.play().catch(() => {});
        }
    };

    // Slides
    const allSlides = [
        { id: 'welcome', component: <WelcomeSlide /> },
        { id: 'games', component: <TotalGamesSlide /> },
        { id: 'elo', component: <EloGraphSlide /> },
        { id: 'op_top', component: <TopOpeningSlide /> },
        { id: 'op_worst', component: <WorstOpeningSlide />, condition: () => (data.worstOpeningsWhite.length > 0 || data.worstOpeningsBlack.length > 0) },
        { id: 'friends', component: <FriendsSlide /> },
        { id: 'impressive', component: <ImpressiveMatchesSlide />, condition: () => data.impressiveMatches.length > 0 },
        { id: 'end', component: <EndSlide onReset={() => window.location.reload()} /> },
    ];

    const slides = allSlides.filter(slide => slide.condition ? slide.condition() : true);

    const handleNext = useCallback(() => {
        playClick();
        if (currentStep < slides.length - 1) setCurrentStep(c => c + 1);
    }, [currentStep, slides.length]);

    const handlePrev = useCallback(() => {
        playClick();
        if (currentStep > 0) setCurrentStep(c => c - 1);
    }, [currentStep]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrev]);

    const isFirstSlide = currentStep === 0;
    const isLastSlide = currentStep === slides.length - 1;

    return (
        <div className="fixed inset-0 bg-[#81b64c] flex flex-col items-center p-4 font-sans text-white overflow-hidden select-none">

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                 style={{ backgroundImage: 'radial-gradient(#fff 3px, transparent 3px)', backgroundSize: '30px 30px' }}
            />

            {/* TOP HUD */}
            <div className="w-full max-w-[380px] flex items-center gap-4 -mt-2 mb-2 shrink-0 z-50 pb-13">
                <Link
                    href="/"
                    onClick={playClick}
                    className="w-10 h-10 bg-white text-[#302e2b] rounded-full flex items-center justify-center shadow-[0_4px_0_rgba(0,0,0,0.1)] active:translate-y-[4px] active:shadow-none transition-all border-2 border-white hover:scale-105"
                >
                    <Home size={20} strokeWidth={3} />
                </Link>

                {/* Life Bar Progress */}
                <div className="flex-1 bg-[#3e3c39]/40 h-5 rounded-full p-1 backdrop-blur-sm border-2 border-white/30 relative overflow-hidden">
                    <div
                        className="h-full bg-[#ffc800] rounded-full transition-all duration-500 shadow-[0_2px_0_rgba(0,0,0,0.1)] relative"
                        style={{ width: `${((currentStep + 1) / slides.length) * 100}%` }}
                    >
                        <div className="absolute top-0 right-0 bottom-0 width-2 bg-white/40 blur-[2px]" />
                    </div>
                </div>

                <div className="font-black text-sm drop-shadow-md flex items-center gap-1 bg-[#3e3c39]/40 px-2 py-1 rounded-lg border-2 border-white/30">
                    <Star size={14} fill="currentColor" className="text-[#ffc800]" />
                    {currentStep + 1}/{slides.length}
                </div>
            </div>

            {/* SLIDE AREA */}
            <div className="flex-1 w-full flex items-center justify-center relative min-h-0 perspective-1000 py-2 h-full pb-30">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={slides[currentStep].id}
                        initial={{ opacity: 0, x: 50, scale: 0.95, rotate: 2 }}
                        animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, x: -50, scale: 0.95, rotate: -2 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="w-full flex justify-center h-full items-center"
                    >
                        <div className="w-full max-w-[350px] h-[580px] max-h-[80vh] flex items-center justify-center">
                            {slides[currentStep].component}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* CONTROLS */}
            <div className="absolute bottom-3 w-full max-w-[300px] flex gap-4 justify-between z-50">
                <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="w-12 h-12 rounded-[20px] bg-white text-[#302e2b] border-b-4 border-r-4 border-gray-300 flex items-center justify-center active:border-b-0 active:border-r-0 active:translate-y-2 active:translate-x-1 transition-all disabled:opacity-0 disabled:pointer-events-none "
                >
                    <ArrowLeft size={20} strokeWidth={4} />
                </button>

                {!isLastSlide ? (
                    <button
                        onClick={handleNext}
                        className="flex-1 h-12 bg-[#ffc800] hover:bg-[#ffda66] text-[#302e2b] rounded-[20px] border-b-4 border-r-4 border-[#e6b800] flex items-center justify-center gap-3 active:border-b-0 active:border-r-0 active:translate-y-2 active:translate-x-1 transition-all"
                    >
                        <span className="font-black text-l tracking-wider uppercase">
                            {isFirstSlide ? "Start!" : "Next"}
                        </span>
                        <ArrowRight size={20} strokeWidth={4} />
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            playClick();
                            window.location.reload();
                        }}
                        className="flex-1 h-12 bg-[#ffc800] hover:bg-[#ffda66] text-[#302e2b] rounded-[20px] border-b-4 border-r-4 border-[#e6b800] flex items-center justify-center gap-3 active:border-b-0 active:border-r-0 active:translate-y-2 active:translate-x-1 transition-all"
                    >
                        <span className="font-black text-l tracking-wider uppercase">Replay</span>
                        <RotateCcw size={20} strokeWidth={4} />
                    </button>
                )}
            </div>
        </div>
    );
}