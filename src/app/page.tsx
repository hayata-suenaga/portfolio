import Image from "next/image";
import { GitHubCharts } from "@/components/github-charts";
import HeroSection from "@/components/hero";
import ExperienceSection from "@/components/experience";
import { RoughNotation } from "react-rough-notation";
import SocialLinks from "@/components/social-links";
import WhoAmISection from "@/components/who-am-i";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background px-6">
      <main>
        <HeroSection />

        <WhoAmISection />

        {/* GitHub Contributions */}
        <section className="mx-auto max-w-4xl py-16">
          <div className="flex justify-center mb-12">
            <RoughNotation
              type="underline"
              strokeWidth={2}
              order={1}
              color="hsl(47.9, 95.8%, 53.1%)"
              show
            >
              <h2 className="text-3xl font-bold">In numbers</h2>
            </RoughNotation>
          </div>

          <div className="mt-12">
            <GitHubCharts username="hayata-suenaga" />
          </div>
        </section>

        <ExperienceSection />

        <div className="max-w-4xl mx-auto py-16">
          <div className="flex justify-center mb-12">
            <RoughNotation
              type="underline"
              strokeWidth={2}
              order={1}
              color="hsl(47.9, 95.8%, 53.1%)"
              show
            >
              <h2 className="text-3xl font-bold">Eisuke</h2>
            </RoughNotation>
          </div>

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
        <section className="mx-auto max-w-4xl py-16">
          <div className="flex justify-center mb-12">
            <RoughNotation
              type="underline"
              strokeWidth={2}
              order={1}
              color="hsl(47.9, 95.8%, 53.1%)"
              show
            >
              <h2 className="text-3xl font-bold">Education</h2>
            </RoughNotation>
          </div>

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

      <SocialLinks />
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
