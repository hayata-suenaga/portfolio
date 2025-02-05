"use client";

import { Button } from "@/components/ui/button";
import { Sun, Moon, FileDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { ContactDialog } from "@/components/contact-dialog";
import { GitHubCharts } from "@/components/github-charts";
import HeroSection from "@/components/hero";

export default function PortfolioPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background p-6 md:p-24">
      <main className="">
        <HeroSection />

        {/* Header */}
        <header className="mb-12 mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row md:items-start md:gap-8 mb-6">
            <div className="w-48 h-48 relative mb-6 md:mb-0 mx-auto md:mx-0">
              <Image
                src="/profile.png"
                alt="Hayata Suenaga"
                width={192}
                height={192}
                className="rounded-full object-cover"
                priority
              />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">Hayata Suenaga</h1>
              <h2 className="text-xl text-muted-foreground mb-6">
                Software Engineer
              </h2>
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
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  <Sun className="h-5 w-5 hidden dark:block" />
                  <Moon className="h-5 w-5 dark:hidden" />
                  <span className="sr-only">Toggle theme</span>
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
          </div>
        </header>

        {/* GitHub Contributions */}
        <section className="mb-12 mx-auto max-w-4xl">
          <GitHubCharts username="hayata-suenaga" />
        </section>

        {/* Introduction */}
        <article className="prose dark:prose-invert max-w-2xl mb-12 mx-auto">
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

        {/* Experience */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-primary mx-auto max-w-2xl">
            Experience
          </h2>

          <div className="space-y-8">
            <div>
              <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">Eisuke L.L.C.</h3>
                  <span className="text-sm text-muted-foreground">
                    August 2024 - Present
                  </span>
                </div>
                <p className="text-muted-foreground mb-2">Founder & CTO</p>
                <ul className="list-disc pl-4 space-y-2 text-sm">
                  <li>
                    Architect and launch complete learning management system
                    from concept to deployment, including end-to-end technical
                    decisions for authentication, data modeling, and
                    infrastructure
                  </li>
                  <li>
                    Build complete learning management system including web
                    portals for teachers and students and cross-platform mobile
                    apps (iOS/Android) using Turborepo, Vercel/Next.js,
                    Expo/React Native, tRPC, PostgreSQL, Stripe and
                    OpenAI/Anthropic APIs
                  </li>
                </ul>
              </div>

              <div className="max-w-4xl mx-auto">
                {/* Platforms Section */}
                <div className="p-12">
                  <h4 className="text-lg font-semibold mb-6 text-center">
                    Our Platforms
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center group">
                      <WebsitePreview url="eisuke.org" />
                      <p className="text-sm font-medium mt-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        Main Website
                      </p>
                    </div>

                    <div className="flex flex-col items-center group">
                      <WebsitePreview url="app.eisuke.org" />
                      <p className="text-sm font-medium mt-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        Student Portal
                      </p>
                    </div>

                    <div className="flex flex-col items-center sm:col-span-2 lg:col-span-1 group">
                      <WebsitePreview url="teacher.eisuke.org" />
                      <p className="text-sm font-medium mt-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        Teacher Portal
                      </p>
                    </div>
                  </div>
                </div>

                {/* Beta Apps Section */}
                <div>
                  <h4 className="text-lg font-semibold mb-6 text-center">
                    Try Our Beta Apps
                  </h4>
                  <div className="flex gap-12 justify-center">
                    <div className="flex flex-col items-center group">
                      <div className="p-4 bg-background border rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105">
                        <Image
                          src="/qr-ios.svg"
                          alt="iOS Beta QR Code"
                          width={100}
                          height={100}
                          className="dark:invert-[0.15]"
                        />
                      </div>
                      <span className="text-sm font-medium mt-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        iOS Beta
                      </span>
                    </div>
                    <div className="flex flex-col items-center group">
                      <div className="p-4 bg-background border rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105">
                        <Image
                          src="/qr-android.svg"
                          alt="Android Beta QR Code"
                          width={100}
                          height={100}
                          className="dark:invert-[0.15]"
                        />
                      </div>
                      <span className="text-sm font-medium mt-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        Android Beta
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">Expensify</h3>
                <span className="text-sm text-muted-foreground">
                  February 2023 - August 2024
                </span>
              </div>
              <p className="text-muted-foreground mb-2">Software Engineer</p>
              <ul className="list-disc pl-4 space-y-2 text-sm">
                <li>
                  Led engineering projects within lean 50-person team powering
                  platform with $151M annual revenue (2023)
                </li>
                <li>
                  Co-managed Expensify&apos;s strategic initiative to integrate
                  new Expensify experience with classic platform, a key project
                  highlighted in multiple earnings reports
                </li>
                <li>
                  Spearheaded QuickBooks Online integration project for new
                  Expensify platform, facilitating transition for 15M+ existing
                  users
                </li>
                <li>
                  Co-led TypeScript migration of 350,000+ lines of code across
                  750+ PRs with two teammates, reducing type-related bugs by
                  nearly 100%
                </li>
                <li>
                  Authored language and style guidelines for company&apos;s
                  open-source project, now referenced by 600+ active
                  contributors
                </li>
                <li>
                  Optimized critical SQL queries achieving 30%+ performance
                  improvement in key database operations
                </li>
                <li>
                  Managed and mentored a team of 10 contract engineers,
                  overseeing multiple concurrent projects
                </li>
              </ul>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">JackBeNimble Inc</h3>
                <span className="text-sm text-muted-foreground">
                  October 2022 - January 2023
                </span>
              </div>
              <p className="text-muted-foreground mb-2">Software Engineer</p>
              <ul className="list-disc pl-4 space-y-2 text-sm">
                <li>
                  Independently designed and built complete mobile application
                  from ground up, managing entire development lifecycle from
                  requirements gathering to App Store deployment
                </li>
                <li>
                  Implemented comprehensive glossary system using Sanity CMS for
                  education terminology
                </li>
              </ul>
            </div>

            <div className="max-w-2xl mx-auto">
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
                  built custom VSCode extension components for previewing parsed
                  notes using React and TypeScript
                </li>
                <li>
                  Collaborated with CEO on product roadmap and feature
                  prioritization for core Dendron offerings
                </li>
              </ul>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">Centre College</h3>
                <span className="text-sm text-muted-foreground">
                  June 2021 - August 2021
                </span>
              </div>
              <p className="text-muted-foreground mb-2">Research Assistant</p>
              <ul className="list-disc pl-4 space-y-2 text-sm">
                <li>
                  Collaborated with biology department at Piedmont University to
                  develop data visualization tool for analyzing operational
                  taxonomic unit (OTU) occurrence in microbiome samples
                </li>
                <li>
                  Co-authored peer-reviewed research paper in the Journal of
                  Computational Science Education detailing the development of
                  the visualization tool
                </li>
                <li>
                  Worked on data preprocessing for molecular docking software
                  analysis in collaboration with Centre College biology
                  department
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-12 mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-primary">Education</h2>

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
              <li>
                Founder&apos;s Scholarship recipient | Dean&apos;s List (4
                terms) | President of Japanese Club
              </li>
              <li>
                Relevant Coursework: Data Structures (UC Berkeley CS 61B, A-),
                Statistics (MAT 130, A), Discrete Structures (CSC 200, A),
                Entrepreneurial Development & Finance (ECO 401, A)
              </li>
              <li>
                Developed comprehensive business plan that became foundation for
                current venture Eisuke L.L.C.
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

function WebsitePreview({ url }: { url: string }) {
  return (
    <a
      href={`https://${url}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block hover:scale-105 transition-transform duration-300"
    >
      <div className="w-[195px] h-[135px] overflow-hidden rounded-sm border border-border pointer-events-none">
        <iframe
          src={`https://${url}`}
          style={{
            width: "1300px",
            height: "900px",
            transform: "scale(0.15)",
            transformOrigin: "0 0",
          }}
        />
      </div>
    </a>
  );
}
