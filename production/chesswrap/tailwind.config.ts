import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./chesswrap/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./chesswrap/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            animation: {
                "scroll": "scroll 40s linear infinite",
                "scroll-reverse": "scroll 40s linear infinite reverse",
            },
            keyframes: {
                scroll: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-100%)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;