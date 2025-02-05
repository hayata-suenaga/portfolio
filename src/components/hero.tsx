import { FileDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ContactDialog } from "./contact-dialog";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ThemeButton from "./theme-button";

export default function HeroSection() {
  return (
    <section className="h-screen relative flex flex-col justify-center">
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

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <a
          href="#whoami"
          className="group link-outline animate-bounce hidden md:flex items-center flex-col"
        >
          <span className="group-hover:text-marrsgreen dark:group-hover:text-carrigreen">
            Scroll
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="dark:fill-bglight group-hover:fill-marrsgreen dark:group-hover:fill-carrigreen"
          >
            <path d="M11.975 22H12c3.859 0 7-3.14 7-7V9c0-3.841-3.127-6.974-6.981-7h-.06C8.119 2.022 5 5.157 5 9v6c0 3.86 3.129 7 6.975 7zM7 9a5.007 5.007 0 0 1 4.985-5C14.75 4.006 17 6.249 17 9v6c0 2.757-2.243 5-5 5h-.025C9.186 20 7 17.804 7 15V9z"></path>
            <path d="M11 6h2v6h-2z"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="dark:fill-bglight group-hover:fill-marrsgreen dark:group-hover:fill-carrigreen"
          >
            <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
          </svg>
        </a>
      </div>
    </section>
  );
}
