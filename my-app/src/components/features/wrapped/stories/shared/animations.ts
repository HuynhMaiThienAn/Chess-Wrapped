import { Variants } from 'framer-motion';

export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.15
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
            stiffness: 200,
            damping: 15,
            mass: 0.8
        }
    }
};

// Enhanced floating "bobbing" animation for stickers
export const floatVariant = (delay: number): Variants => ({
    animate: {
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1],
        transition: {
            duration: 4,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
});

// Stagger animation for list items
export const staggerItemVariants: Variants = {
    hidden: { opacity: 0, x: -30, scale: 0.9 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            delay: i * 0.1,
            type: "spring",
            stiffness: 200,
            damping: 15
        }
    })
};

// Slide transition variants for carousel
export const slideTransitionVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
        scale: 0.9,
        rotateY: direction > 0 ? 15 : -15
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0
    },
    exit: (direction: number) => ({
        x: direction > 0 ? -300 : 300,
        opacity: 0,
        scale: 0.9,
        rotateY: direction > 0 ? -15 : 15
    })
};

// Glow animation for important numbers
export const glowVariant: Variants = {
    initial: { 
        filter: 'brightness(1) drop-shadow(0 0 0px rgba(255, 200, 0, 0))',
        scale: 1
    },
    animate: {
        filter: [
            'brightness(1) drop-shadow(0 0 0px rgba(255, 200, 0, 0))',
            'brightness(1.2) drop-shadow(0 0 20px rgba(255, 200, 0, 0.6))',
            'brightness(1) drop-shadow(0 0 0px rgba(255, 200, 0, 0))'
        ],
        scale: [1, 1.05, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

// Pulse animation for avatars
export const pulseVariant: Variants = {
    initial: { scale: 1 },
    animate: {
        scale: [1, 1.05, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    },
    hover: {
        scale: 1.1,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    }
};

// Number count-up animation
export const countUpVariant = (value: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 15
        }
    }
});