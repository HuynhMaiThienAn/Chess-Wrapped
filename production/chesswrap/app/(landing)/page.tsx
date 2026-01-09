'use client';

import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Github, Globe, Users } from "lucide-react";
import { Input } from "@/components/ui/input"
import CountUp from 'react-countup';
import { COUNTRIES, STARS, VIEWERS, UserFeedback, feedbackData } from "@/app/(landing)/_data/website-stats";
import { FooterLinkGroup } from "@/app/(landing)/_components/FooterLinkGroup";
import { InfiniteCarousel } from "@/app/(landing)/_components/InfiniteCarousel";

export default function HomePage() {
  return (
    <>
      <section className="min-h-screen flex items-center justify-center text-center text-balance flex-col gap-8 px-4">
        <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
          Your chess journey in 2025
        </h1>
        <p className="text-lg lg:text-3xl max-w-screen-xl">
          How well did you do in chess in 2025? Check out your stats with just a single click!
        </p>
        <div className="items-center flex max-w gap-2">
          <Input className="p-6 rounded-xl font-semibold text-lg border-black border-2" placeholder="Chess.com username" />
          <Button className="text-lg p-6 rounded-xl flex gap-2">
            Get started <ArrowRightIcon className="size-5" />
          </Button>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground flex items-center justify-center text-center text-balance flex-col gap-8 px-4">
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
                scrollSpyOnce={true}
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
                scrollSpyOnce={true}
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
                scrollSpyOnce={true}
              /> +
              <br />
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
            <InfiniteCarousel feedbackData={feedbackData.slice(0, 5)} />
            <InfiniteCarousel feedbackData={feedbackData.slice(5, 10)} reverse={true} />
          </div>
        </div>
      </section>

      <footer>
        <FooterLinkGroup
          title="what"
          links={[
            { label: "hello", href: "#" }
          ]} />

      </footer>
    </>
  );
}
