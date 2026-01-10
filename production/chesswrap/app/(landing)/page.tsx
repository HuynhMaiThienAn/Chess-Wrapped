'use client';

import { Button } from "@/components/ui/button";
import { ArrowRightIcon, ChessKing, Github, Globe, Users } from "lucide-react";
import { Input } from "@/components/ui/input"
import CountUp from 'react-countup';
import { COUNTRIES, STARS, VIEWERS, feedbackData } from "@/app/(landing)/_data/website-stats";
import { FooterLinkGroup } from "@/app/(landing)/_components/FooterLinkGroup";
import { InfiniteCarousel } from "@/app/(landing)/_components/InfiniteCarousel";
import { BrandLogo } from "@/app/(landing)/_components/BrandLogo";
import Link from "next/link";
import { ChessBackground } from "@/components/ui/chess-background";
import { motion } from "motion/react";

export default function HomePage() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&display=swap');
      `}</style>

      <section className="py-40 min-h-screen flex items-center justify-center text-center text-balance flex-col gap-8 px-4 pb-32 bg-[#81b64c] relative overflow-hidden font-bubbly selection:bg-white selection:text-[#81b64c]">
        <ChessBackground />

        {/* Main Input Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 w-full max-w-md px-6"
        >
          <div className="bg-white rounded-[3rem] p-3 border-4 border-white/20">
            <div className="bg-[#302e2b] rounded-[2.5rem] p-8 md:p-10 text-center relative overflow-hidden border-4 border-[#302e2b]">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/grid-noise.png')]" />

              {/* Header */}
              <div className="mb-8 relative z-10">
                <div className="inline-flex items-center gap-2 bg-[#ffc800] text-[#302e2b] px-4 py-2 rounded-full font-bold text-sm shadow-sm mb-4 animate-bounce">
                  <ChessKing size={16} fill="currentColor" /> 2025 RECAP
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-2">
                  ChessWrap
                </h1>
                <p className="text-[#989795] text-lg font-medium">
                  Wrap up your chess journey
                </p>
              </div>

              {/* Form */}
              <div className="relative z-10 space-y-4">
                <div className="bg-[#262421] rounded-3xl p-2 border-4 border-[#3e3c39]">
                  <Input
                    className="w-full bg-transparent border-none text-center text-2xl xl:text-2xl lg:text-2xl md:text-2xl font-bold text-white focus:outline-none placeholder:text-[#3e3c39] py-3 px-2"
                    placeholder="username"
                  />
                </div>

                <div className="flex gap-2">
                  <select className="flex-1 bg-[#262421] border-4 border-[#3e3c39] text-white rounded-2xl p-3 text-lg font-semibold">
                    <option value="chesscom">Chess.com</option>
                    <option value="lichess">Lichess</option>
                  </select>
                  <Button className="bg-[#81b64c] hover:bg-[#72a341] text-white text-lg font-bold px-6 py-3 rounded-2xl p-5.5 shadow-[0_6px_0_#457524] active:shadow-none active:translate-y-[6px] transition-all flex items-center gap-2 border-2 border-[#81b64c]">
                    Start! <ArrowRightIcon className="size-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section
        className="bg-[#262421] text-white flex items-center justify-center text-center text-balance flex-col gap-8 px-4 font-bubbly border-10">
        <div className="container flex flex-col px-8 py-16 md:px-16">
          <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold">
            ChessWrap Stats
          </h2>

          <div className="px-16 gap-20 text-center flex justify-center">
            <div className="text-2xl py-20 lg:text-4xl xl:text-6xl">
              <Users className="w-16 h-16 lg:w-24 lg:h-24 xl:w-32 xl:h-32 mx-auto" />
              <CountUp
                end={VIEWERS}
                duration={2.5}
                separator=","
                enableScrollSpy={true}
              /> +
              <br />
              Viewers
            </div>

            <div className="text-2xl py-20 lg:text-4xl xl:text-6xl">
              <Globe className="w-16 h-16 lg:w-24 lg:h-24 xl:w-32 xl:h-32 mx-auto" />
              <CountUp
                end={COUNTRIES}
                duration={2.5}
                separator=","
                enableScrollSpy={true}
              /> +
              <br />
              Countries
            </div>

            <div className="text-2xl py-20 lg:text-4xl xl:text-6xl">
              <Github className="w-16 h-16 lg:w-24 lg:h-24 xl:w-32 xl:h-32 mx-auto" />
              <CountUp
                end={STARS}
                duration={2.5}
                separator=","
                enableScrollSpy={true}
              /> +
              <br />
              Stars
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#81b64c] relative overflow-hidden flex items-center justify-center text-center text-balance flex-col font-bubbly selection:bg-white selection:text-[#81b64c] py-16">
        <ChessBackground />
        <div className="w-full flex flex-col relative z-10">
          <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold px-4 text-white">
            Our Community
          </h2>
          <div className="space-y-4 w-full py-16">
            <InfiniteCarousel feedbackData={feedbackData.slice(0, 5)} />
            <InfiniteCarousel feedbackData={feedbackData.slice(5, 10)} reverse={true} />
          </div>
        </div>
      </section>


      <footer className="w-full border-10 bg-[#262421] font-bubbly">
        <div className="container mx-auto flex gap-10 px-6 py-12 md:flex-row md:justify-between md:gap-20">
          <div className="flex flex-col gap-4 md:max-w-xs">
            <Link href="/" className="w-fit">
              <BrandLogo />
            </Link>
            <p className="text-sm text-white text-muted-foreground">
              Capture your best chess moments
              <br />
              Developed by Ryan.H
            </p>
          </div>

          <div className="flex gap-16">
            <FooterLinkGroup
              title="Project"
              links={[
                { label: "About", href: "/about" },
                { label: "Github", href: "https://github.com/your-repo" },
                { label: "Donate", href: "/donate" },
              ]}
            />

            <FooterLinkGroup
              title="Social"
              links={[
                { label: "Chess.com", href: "/" },
                { label: "Instagram", href: "/s" },
                { label: "Discord", href: "/w" },
              ]}
            />
          </div>
        </div>

        <div className="border-t-10">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
            <p className="text-sm text-white text-muted-foreground text-center sm:text-left">
              &copy; {new Date().getFullYear()} ChessWrap. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
