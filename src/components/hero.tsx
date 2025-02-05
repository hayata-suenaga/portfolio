import { FileDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ContactDialog } from "./contact-dialog";

export default function HeroSection({
  heading = "Blocks Built With Shadcn & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
}: {
  badge?: string;
  heading: string;
  description: string;
}) {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-4xl grid gap-8 lg:gap-0 lg:grid-cols-2 border border-green-500">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left border border-red-500 order-2 lg:order-1">
          <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
            {heading}
          </h1>
          <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
            {description}
          </p>
          <div className="flex flex-wrap gap-4">
            <ContactDialog />
            <a href="/resume.pdf" download>
              <Button variant="outline" className="gap-2">
                <FileDown className="h-4 w-4" />
                Download Resume
              </Button>
            </a>
          </div>
        </div>
        <div className="flex justify-center items-center border border-blue-500 order-1 lg:order-2">
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
