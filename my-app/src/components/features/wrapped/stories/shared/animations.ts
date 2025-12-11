import { Variants } from 'framer-motion';

export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 150,
            damping: 12
        }
    }
};

// Floating "bobbing" animation for stickers
export const floatVariant = (delay: number): Variants => ({
    animate: {
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0],
        transition: {
            duration: 4,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
});