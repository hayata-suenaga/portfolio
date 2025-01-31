"use client";

import { Button } from "@/components/ui/button";
import { Sun, Moon, Mail } from "lucide-react";
import { useTheme } from "next-themes";

export default function PortfolioPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background p-6 md:p-24">
      {/* Theme Switcher */}
      <div className="absolute top-6 right-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
          <Moon className="hidden h-5 w-5 dark:block" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      <main className="container mx-auto max-w-2xl">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Hayata Suenaga</h1>
          <h2 className="text-xl text-muted-foreground mb-6">
            Software Engineer
          </h2>
          <Button className="gap-2">
            <Mail className="h-4 w-4" />
            Contact Me
          </Button>
        </header>

        {/* Introduction */}
        <article className="prose dark:prose-invert max-w-none mb-12">
          <p>
            Hi! I&apos;m Hayata, a software engineer with over three years of
            industry experience, much of which I spent at{" "}
            <strong>Expensify</strong> working on systems serving{" "}
            <u>15M+ users</u>. Based in San Francisco and sometimes in Japan.
          </p>

          <p>
            At Expensify, I led critical projects and managed engineering teams.
            Now, I&apos;m building
            <strong> Eisuke</strong>, a language learning platform that combines
            web and mobile applications to help people master English
            vocabulary.
          </p>

          <p>
            I focus on identifying common patterns that can be solved through
            existing solutions, letting teams ship faster by focusing purely on
            business logic. My recent interest is in{" "}
            <u>natural language processing</u> and its applications in the
            EdTech space.
          </p>
        </article>

        {/* Work History */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Work History</h2>

          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">Eisuke L.L.C.</h3>
                <span className="text-sm text-muted-foreground">
                  August 2024 - Present
                </span>
              </div>
              <p className="text-muted-foreground mb-2">
                Founder & Software Engineer
              </p>
              <ul className="list-disc pl-4 space-y-2 text-sm">
                <li>
                  Architected and launched complete learning management system
                  from concept to deployment
                </li>
                <li>
                  Built web portals for teachers and students and cross-platform
                  mobile apps using Turborepo, Next.js, Expo/React Native
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">Expensify</h3>
                <span className="text-sm text-muted-foreground">
                  February 2023 - August 2024
                </span>
              </div>
              <p className="text-muted-foreground mb-2">Software Engineer</p>
              <ul className="list-disc pl-4 space-y-2 text-sm">
                <li>
                  Led development initiatives within 50-person engineering team
                  maintaining platform generating $151M annual revenue
                </li>
                <li>
                  Managed team of 10 contract engineers and co-led TypeScript
                  migration of 350,000+ lines of code
                </li>
                <li>
                  Co-led QuickBooks Online integration project facilitating
                  transition for 15M+ users
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">Dendron</h3>
                <span className="text-sm text-muted-foreground">
                  June 2022 - October 2022
                </span>
              </div>
              <p className="text-muted-foreground mb-2">
                Software Engineer Intern
              </p>
              <ul className="list-disc pl-4 space-y-2 text-sm">
                <li>
                  Implemented core features for document parsing engine and
                  built custom VSCode extension components
                </li>
                <li>
                  Collaborated with CEO on product roadmap and feature
                  prioritization
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Education</h2>

          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">Centre College</h3>
              <span className="text-sm text-muted-foreground">
                August 2019 - May 2022
              </span>
            </div>
            <p className="text-muted-foreground mb-2">
              Bachelor of Science in Computer Science
            </p>
            <ul className="list-disc pl-4 space-y-2 text-sm">
              <li>Founder's Scholarship recipient | Dean's List (4 terms)</li>
              <li>
                Relevant Coursework: Data Structures (UC Berkeley CS 61B),
                Statistics, Discrete Structures
              </li>
              <li>
                Developed comprehensive business plan that became foundation for
                Eisuke L.L.C.
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
