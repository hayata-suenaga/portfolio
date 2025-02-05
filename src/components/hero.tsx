import { FileDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ContactDialog } from "./contact-dialog";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ThemeButton from "./theme-button";

export default function HeroSection() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-4xl grid gap-8 lg:gap-0 lg:grid-cols-2 border border-green-500">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left border border-red-500 order-2 lg:order-1">
          <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
            Hayata Suenaga
          </h1>
          <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
            Full Stack Software Engineer
          </p>
          <div className="flex gap-2 mb-4">
            <Button
              variant="ghost"
              size="icon"
              className="[&_svg]:size-6"
              asChild
            >
              <Link
                href="https://www.linkedin.com/in/hayata-suenaga/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="[&_svg]:size-6"
              asChild
            >
              <Link
                href="https://github.com/hayata-suenaga"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </Link>
            </Button>
            <ThemeButton />
          </div>
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
