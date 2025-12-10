import { Variants } from 'framer-motion';

export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100 }
    }
};

export const floatVariant = (delay: number): Variants => ({
    animate: {
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
        opacity: [0.05, 0.1, 0.05],
        transition: { duration: 8, delay: delay, repeat: Infinity, ease: "easeInOut" }
    }
});