import React, { useRef, useEffect } from 'react';

interface AutoFitTextProps {
    text: string;
    className?: string;
}

/**
 * Auto-scaling text component that fits text to its container width
 * Extracted from WelcomeSlide for reusability
 */
export default function AutoFitText({ text, className = '' }: AutoFitTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const resize = () => {
            const container = containerRef.current;
            const txt = textRef.current;
            if (!container || !txt) return;

            txt.style.transform = 'scale(1)';
            const containerWidth = container.clientWidth;
            const textWidth = txt.scrollWidth;

            if (textWidth > containerWidth) {
                const scale = containerWidth / textWidth;
                txt.style.transform = `scale(${scale})`;
            }
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, [text]);

    return (
        <div ref={containerRef} className={`w-full flex justify-center items-center overflow-hidden h-16 ${className}`}>
            <div
                ref={textRef}
                className="whitespace-nowrap origin-center font-black text-white drop-shadow-md text-5xl md:text-6xl transition-transform duration-200"
                style={{ textShadow: '0 4px 0 rgba(0,0,0,0.2)' }}
            >
                {text}
            </div>
        </div>
    );
}
