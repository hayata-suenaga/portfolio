import { ChevronDown, FileDown, Mouse } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ContactDialog } from "./contact-dialog";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="min-h-svh relative flex flex-col justify-center">
      <div className="mx-auto max-w-4xl grid gap-8 lg:gap-0 lg:grid-cols-2 w-full">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left order-2 lg:order-1">
          <h1 className="text-4xl font-bold mb-2">Hayata Suenaga</h1>
          <p className="text-xl text-muted-foreground mb-6">
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
        <div className="flex justify-center items-center order-1 lg:order-2">
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

      <div
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-scroll-out"
        style={{
          animationTimeline: "view()",
        }}
      >
        <a
          href="#whoami"
          className="link-outline animate-bounce hidden md:flex items-center flex-col text-muted-foreground hover:text-primary"
        >
          <span className="text-xs">Scroll</span>
          <Mouse />
          <ChevronDown />
        </a>
      </div>
    </section>
  );
}
