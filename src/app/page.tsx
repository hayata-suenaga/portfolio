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
        <article className="prose dark:prose-invert max-w-none">
          <p>
            Hi! I'm Hayata, a software engineer with over three years of
            industry experience, much of which I spent at{" "}
            <strong>Expensify</strong> working on systems serving{" "}
            <u>15M+ users</u>. Based in San Francisco and sometimes in Japan.
          </p>

          <p>
            At Expensify, I led critical projects and managed engineering teams.
            Now, I'm building
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
      </main>
    </div>
  );
}
