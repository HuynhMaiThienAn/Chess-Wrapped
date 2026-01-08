import {Button} from "@/components/ui/button";
import {ArrowRightIcon} from "lucide-react";
import { Input } from "@/components/ui/input"

export default function homePage(){
  return <>
    <section className="min-h-screen flex items-center justify-center text-center text-balance flex-col gap-8 px-4">
    <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
      Your chess journey in 2025
    </h1>
      <p className="text-lg lg:text-3xl max-w-screen-xl">
        How well did you do in chess in 2025? Check out your stats with just a single click!
      </p>
      <div className="items-center flex max-w gap-2">
        <Input className="p-6 rounded-xl font-semibold text-lg border-black border-2" placeholder="Chess.com username"/>
        <Button className="text-lg p-6 rounded-xl flex gap-2">
          Get started <ArrowRightIcon className="size-5"/>
        </Button>
      </div>
    </section>

    <section className="bg-primary text-primary-foreground">
      <div className="container py-16 flex flex-col gap-16 px-8 md:px-16">
        <h2 className="text-center text-3xl text-semibold">
          More than 10,000 views
        </h2>
      </div>
    </section>
  </>
}