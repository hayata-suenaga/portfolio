import Image from "next/image";
import { GitHubCharts } from "@/components/github-charts";
import HeroSection from "@/components/hero";
import ExperienceSection from "@/components/experience";
import { RoughNotation } from "react-rough-notation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-24">
      <main>
        <HeroSection />

        <section className="py-32">
          <div className="mx-auto max-w-4xl">
            <RoughNotation
              type="underline"
              strokeWidth={2}
              order={1}
              color="hsl(47.9, 95.8%, 53.1%)"
              show
            >
              <h2 className="inline text-3xl font-bold">Who am I?</h2>
            </RoughNotation>

            <div className="grid md:grid-cols-2 gap-4 mt-12">
              <div className="flex flex-col justify-center gap-8">
                <Card className="max-w-72">
                  <CardHeader>
                    <CardTitle className="text-base">
                      Years of Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent>+3 years</CardContent>
                </Card>

                <Card className="max-w-72">
                  <CardHeader>
                    <CardTitle className="text-base">Location</CardTitle>
                  </CardHeader>
                  <CardContent>San Francisco, CA / Tokyo, JP</CardContent>
                </Card>
              </div>

              <article className="prose dark:prose-invert">
                <p>
                  Hi! I&apos;m Hayata, a software engineer with over three years
                  of industry experience, much of which I spent at{" "}
                  <strong>Expensify</strong> working on systems serving{" "}
                  <u>15M+ users</u>. Based in San Francisco and sometimes in
                  Japan.
                </p>

                <p>
                  At Expensify, I led critical projects and managed engineering
                  teams. Now, I&apos;m building
                  <strong> Eisuke</strong>, a language learning platform that
                  combines web and mobile applications to help people master
                  English vocabulary.
                </p>

                <p>
                  I focus on identifying common patterns that can be solved
                  through existing solutions, letting teams ship faster by
                  focusing purely on business logic. My recent interest is in{" "}
                  <u>natural language processing</u> and its applications in the
                  EdTech space.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* GitHub Contributions */}
        <section className="mx-auto max-w-4xl py-32">
          <GitHubCharts username="hayata-suenaga" />
        </section>

        <ExperienceSection />

        <div className="max-w-4xl mx-auto py-32">
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

        {/* Education */}
        <section className="mx-auto max-w-2xl py-32">
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
