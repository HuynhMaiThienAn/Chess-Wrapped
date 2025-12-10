'use client';

import { Github, BookOpen, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-[100] bg-[#18181b]/80 backdrop-blur-md border-b border-[#ffffff10] h-20 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

                <Link href="/" className="flex items-center gap-3 group">
                    <img
                        src="/icon.png"
                        alt="ChessWrapped Logo"
                        className="w-10 h-10 rounded-lg shadow-lg group-hover:scale-105 transition duration-200"
                    />
                    <span className="font-extrabold text-xl text-white tracking-tight">
                        Chess<span className="text-[#81b64c]">Wrapped</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 bg-[#27272a]/50 px-6 py-2 rounded-full border border-[#ffffff08]">
                    <a href="#" className="text-[#a1a1aa] hover:text-white text-sm font-bold flex items-center gap-2 transition hover:scale-105">
                        <BookOpen size={16} className="text-[#81b64c]" /> How It Works
                    </a>
                    <div className="w-[1px] h-4 bg-[#ffffff10]" />
                    <a href="#" className="text-[#a1a1aa] hover:text-white text-sm font-bold flex items-center gap-2 transition hover:scale-105">
                        <BarChart3 size={16} className="text-[#81b64c]" /> Features
                    </a>
                </nav>

                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/HuynhMaiThienAn/ChessWrapped"
                        target="_blank"
                        rel="noreferrer"
                        className="hidden md:flex items-center gap-2 text-[#a1a1aa] hover:text-white transition font-medium text-sm"
                    >
                        <Github size={20} />
                        <span className="sr-only">GitHub</span>
                    </a>

                    <Link
                        href="https://forms.gle/Eweg1RtYs9is9p6x5"
                        target="_blank"
                        className="bg-[#81b64c] hover:bg-[#6aa03b] text-white px-5 py-2.5 rounded-xl text-sm font-black transition-all shadow-lg hover:shadow-[#81b64c]/20 hover:-translate-y-0.5"
                    >
                        Feedback
                    </Link>
                </div>
            </div>
        </header>
    );
}