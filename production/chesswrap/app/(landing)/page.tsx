'use client';

import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Github, Globe, Users } from "lucide-react";
import { Input } from "@/components/ui/input"
import CountUp from 'react-countup';
import {COUNTRIES, STARS, VIEWERS} from "@/data/website-stats";
import Link from "next/link";

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

        <section className="bg-primary text-primary-foreground">
          <div className="container flex flex-col px-8 py-16 md:px-16">
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-balance text-center">
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

        <section>
          <div className="container flex flex-col px-8 py-10 md:px-16">
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-balance text-center">
              Our community feedbacks
            </h2>
          </div>

          <div>
            <div className="text-2xl lg:text-4xl xl:text-6xl">
              <h3>
                  Wrapped your crazy year
              </h3>
                <p>
                    2025 was a chaos year, and we hope that we can capture all of your
                    special moments with chess
                </p>
            </div>

            <div className="text-2xl lg:text-4xl xl:text-6xl">
              How well did you improve?
            </div>
            <div className="text-2xl lg:text-4xl xl:text-6xl">
              Compare with others
            </div>

          </div>
        </section>

        <section>
          Our Community
        </section>

        <section>
          Having ideas? Contact us
        </section>

        <footer>
          <FooterLinkGroup
              title="what"
              links={[
                {label: "hello", href:"#"}
              ]}/>

        </footer>
      </>
  );
}

function FooterLinkGroup({
     title, links
}: {
    title: string
    links: {label: string; href: string}[]
}) {
    return (
    <div>
        <h3>{title}</h3>
        <ul>
            {links.map(link =>(
                <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                </li>
            ))}
        </ul>
    </div>
    )
}