import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection({
  heading = "Blocks Built With Shadcn & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  buttons = {
    primary: {
      text: "Discover all components",
      url: "https://www.shadcnblocks.com",
    },
    secondary: {
      text: "View on GitHub",
      url: "https://www.shadcnblocks.com",
    },
  },
}: {
  badge?: string;
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
}) {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-4xl grid gap-8 lg:gap-0 lg:grid-cols-2 border border-green-500">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left border border-red-500">
          <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
            {heading}
          </h1>
          <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
            {description}
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
            {buttons.primary && (
              <Button asChild className="w-full sm:w-auto">
                <a href={buttons.primary.url}>{buttons.primary.text}</a>
              </Button>
            )}
            {buttons.secondary && (
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a href={buttons.secondary.url}>
                  {buttons.secondary.text}
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center border border-blue-500">
          <Image
            src="/profile.png"
            alt="Hayata Suenaga"
            width={192}
            height={192}
            className="rounded-full object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
