'use client';

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
    return (
        <section className="py-40 min-h-screen flex items-center justify-center text-center text-balance flex-col gap-8 px-4 pb-32 bg-transparent relative overflow-hidden font-bubbly selection:bg-white selection:text-[#81b64c]">

            {/* About Card */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative z-10 w-full max-w-2xl px-4 sm:px-6"
            >
                <div className="bg-white rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-3 border-4 border-white/20">
                    <div className="bg-[#302e2b] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 text-center relative overflow-hidden border-4 border-[#302e2b]">
                        <div className="absolute inset-0 opacity-[0.03]" />

                        {/* Header */}
                        <div className="mb-8 relative z-10">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
                                About
                            </h1>
                        </div>

                        <div className="relative z-10 space-y-6 text-white text-left text-base sm:text-lg leading-relaxed">

                            {/* Simple Intro */}
                            <p className="text-white/90">
                                Inspired by Spotify Wrapped, <strong>ChessWrap</strong> transforms your 2025 archival data from Chess.com and Lichess into a beautiful visual story.
                            </p>

                            {/* Privacy */}
                            <div>
                                <h3 className="text-[#ffc800] font-bold text-xl mb-2">Privacy & Open Source</h3>
                                <p className="text-white/90 text-sm sm:text-base">
                                    We do not store passwords. We only access public game data via official APIs. This project is 100% open source on GitHub.
                                </p>
                            </div>

                            {/* CTA Button */}
                            <div className="pt-6 border-t-2 border-white/10 flex justify-center">
                                <Link href="/">
                                    <Button className="bg-[#81b64c] hover:bg-[#72a341] text-white font-bold px-8 py-6 rounded-2xl shadow-[0_4px_0_#457524] active:shadow-none active:translate-y-[4px] transition-all flex items-center gap-2 text-lg">
                                        <ArrowLeft className="size-5" /> Back to Home
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}