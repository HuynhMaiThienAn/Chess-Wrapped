import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Star, Cloud, Sparkles } from 'lucide-react';

interface StoryBackgroundProps {
    children: ReactNode; // These are the specific slide icons (Castle, Swords, etc.)
}

export default function StoryBackground({ children }: StoryBackgroundProps) {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">

            {/* 1. Polka Dot Pattern */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: 'radial-gradient(#fff 3px, transparent 3px)',
                    backgroundSize: '30px 30px'
                }}
            />

            {/* 2. Floating "Stickers" (Generic Decorative Elements) */}
            <motion.div
                animate={{ y: [-10, 10, -10], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -left-6 text-[#ffc800] opacity-20"
            >
                <Star size={80} fill="currentColor" strokeWidth={0} />
            </motion.div>

            <motion.div
                animate={{ x: [-10, 10, -10], rotate: [0, -5, 5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 -right-8 text-white opacity-10"
            >
                <Cloud size={100} fill="currentColor" strokeWidth={0} />
            </motion.div>

            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#81b64c]"
            >
                <Sparkles size={200} strokeWidth={1} />
            </motion.div>

            {/* 3. Slide-Specific Children (The icons passed from the slide itself) */}
            {children}
        </div>
    );
}
