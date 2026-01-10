'use client';

import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Github, Globe, Users } from "lucide-react";
import { Input } from "@/components/ui/input"
import CountUp from 'react-countup';
import { COUNTRIES, STARS, VIEWERS, UserFeedback, feedbackData } from "@/app/(landing)/_data/website-stats";
import { FooterLinkGroup } from "@/app/(landing)/_components/FooterLinkGroup";
import { InfiniteCarousel } from "@/app/(landing)/_components/InfiniteCarousel";
import {BrandLogo} from "@/app/(landing)/_components/BrandLogo";
import Link from "next/link";

export default function HomePage() {
  return (
      <>
        <section className="min-h-screen flex items-center justify-center text-center text-balance flex-col gap-8 px-4">
          <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
            Your chess journey in 2025
          </h1>
          <p className="text-lg lg:text-3xl max-w-screen-xl">
            How well did you do in chess in 2025? Enter your Chess.com or Lichess username
          </p>
          <div className="items-center max-w gap-2">
            <Input className="p-6 max-w rounded-xl font-semibold text-xl md:text-2xl lg:text-2xl xl:text-2xl border-black border-2"
                   placeholder="Username"/>

            <div className="flex py-2 gap-2">
              <select
                  className="p-3 rounded-xl border-2 border-black text-lg font-semibold">
                <option value="chesscom">Chess.com</option>
                <option value="lichess">Lichess</option>
              </select>
              <Button className="text-lg p-6 rounded-xl flex gap-2">
                Get started <ArrowRightIcon className="size-5"/>
              </Button>
            </div>

          </div>
        </section>

        <section
            className="bg-primary text-primary-foreground flex items-center justify-center text-center text-balance flex-col gap-8 px-4">
          <div className="container flex flex-col px-8 py-16 md:px-16">
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold">
              ChessWrap Stats
            </h2>

            <div className="px-16 gap-20 text-center flex justify-center">
              <div className="text-2xl py-20 lg:text-4xl xl:text-6xl">
                <Users className="w-16 h-16 lg:w-24 lg:h-24 xl:w-32 xl:h-32 mx-auto"/>
                <CountUp
                    end={VIEWERS}
                    duration={2.5}
                    separator=","
                    enableScrollSpy={true}
                /> +
                <br/>
                Viewers
              </div>

              <div className="text-2xl py-20 lg:text-4xl xl:text-6xl">
                <Globe className="w-16 h-16 lg:w-24 lg:h-24 xl:w-32 xl:h-32 mx-auto"/>
                <CountUp
                    end={COUNTRIES}
                    duration={2.5}
                    separator=","
                    enableScrollSpy={true}
                /> +
                <br/>
                Countries
              </div>

              <div className="text-2xl py-20 lg:text-4xl xl:text-6xl">
                <Github className="w-16 h-16 lg:w-24 lg:h-24 xl:w-32 xl:h-32 mx-auto"/>
                <CountUp
                    end={STARS}
                    duration={2.5}
                    separator=","
                    enableScrollSpy={true}
                /> +
                <br/>
                Stars
              </div>
            </div>
          </div>
        </section>

        <section className=" flex items-center justify-center text-center text-balance flex-col gap-8 px-4">
          <div className="container flex flex-col px-8 py-8 md:px-16">
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold py-10">
              Our Community
            </h2>
            <div className="space-y-4">
              <InfiniteCarousel feedbackData={feedbackData.slice(0, 5)}/>
              <InfiniteCarousel feedbackData={feedbackData.slice(5, 10)} reverse={true}/>
            </div>
          </div>
        </section>

        <footer className="w-full border-t bg-background">
          <div className="container mx-auto flex gap-10 px-6 py-12 md:flex-row md:justify-between md:gap-20">
            <div className="flex flex-col gap-4 md:max-w-xs">
              <Link href="/" className="w-fit">
                <BrandLogo/>
              </Link>
              <p className="text-sm text-muted-foreground">
                Capture your best chess moments
                <br/>
                Developed by Ryan.H
              </p>
            </div>

            <div className="flex gap-16">
              <FooterLinkGroup
                  title="Project"
                  links={[
                    {label: "About", href: "/about"},
                    {label: "Github", href: "https://github.com/your-repo"},
                    {label: "Donate", href: "/donate"},
                  ]}
              />

              <FooterLinkGroup
                  title="Social"
                  links={[
                    {label: "Facebook", href: "/"},
                    {label: "Instagram", href: "/s"},
                    {label: "Discord", href: "/w"},
                  ]}
              />
            </div>
          </div>

          <div className="border-t">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
              <p className="text-sm text-muted-foreground text-center sm:text-left">
                &copy; {new Date().getFullYear()} ChessWrap. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </>
  );
}
