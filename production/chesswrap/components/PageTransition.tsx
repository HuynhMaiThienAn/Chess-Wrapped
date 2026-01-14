'use client';

import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAbout = pathname === '/about';

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ x: isAbout ? 500 : -500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: isAbout ? 500 : -500, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
