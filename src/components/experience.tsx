import { Badge } from "@/components/ui/badge";
import { RoughNotation } from "react-rough-notation";

export default function ExperienceSection() {
  return (
    <section className="py-32">
      <div className="flex justify-center mb-12">
        <RoughNotation
          type="underline"
          strokeWidth={2}
          order={1}
          color="hsl(47.9, 95.8%, 53.1%)"
          show
        >
          <h2 className="text-3xl font-bold">Experience</h2>
        </RoughNotation>
      </div>

      <div className="mx-auto max-w-4xl space-y-20">
        {EXPERIENCES.map((experience, index) => (
          <div
            key={index}
            className="relative flex flex-col gap-5 md:flex-row md:gap-16"
          >
            <div className="top-28 h-min shrink-0 md:sticky md:w-48 flex md:flex-col gap-5 w-auto md:items-start">
              <Badge variant="secondary">{experience.role}</Badge>
              <span className="text-xs font-medium text-muted-foreground">
                {experience.date}
              </span>
            </div>
            <div>
              <h2 className="mb-4 text-lg font-semibold md:leading-5">
                {experience.company}
              </h2>
              <ul className="ml-4 mt-5 space-y-2 text-muted-foreground text-sm">
                {experience.achievements.map(
                  (achievement, achievementIndex) => (
                    <li key={achievementIndex} className="list-disc">
                      {achievement}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const EXPERIENCES = [
  {
    company: "Eisuke L.L.C.",
    role: "Founder & CTO",
    date: "August 2024 - Present",
    achievements: [
      "Architect and launch complete learning management system from concept to deployment, including end-to-end technical decisions for authentication, data modeling, and infrastructure",
      "Build complete learning management system including web portals for teachers and students and cross-platform mobile apps (iOS/Android) using Turborepo, Vercel/Next.js, Expo/React Native, tRPC, PostgreSQL, Stripe and OpenAI/Anthropic APIs",
    ],
  },
  {
    company: "Expensify",
    role: "Software Engineer",
    date: "February 2023 - August 2024",
    achievements: [
      "Led engineering projects within lean 50-person team powering platform with $151M annual revenue (2023)",
      "Co-managed Expensify's strategic initiative to integrate new Expensify experience with classic platform, a key project highlighted in multiple earnings reports",
      "Spearheaded QuickBooks Online integration project for new Expensify platform, facilitating transition for 15M+ existing users",
      "Co-led TypeScript migration of 350,000+ lines of code across 750+ PRs with two teammates, reducing type-related bugs by nearly 100%",
      "Authored language and style guidelines for company's open-source project, now referenced by 600+ active contributors",
      "Optimized critical SQL queries achieving 30%+ performance improvement in key database operations",
      "Managed and mentored a team of 10 contract engineers, overseeing multiple concurrent projects",
    ],
  },
  {
    company: "JackBeNimble Inc",
    role: "Software Engineer",
    date: "October 2022 - January 2023",
    achievements: [
      "Independently designed and built complete mobile application from ground up, managing entire development lifecycle from requirements gathering to App Store deployment",
      "Implemented comprehensive glossary system using Sanity CMS for education terminology",
    ],
  },
  {
    company: "Dendron",
    role: "Software Engineer Intern",
    date: "June 2022 - October 2022",
    achievements: [
      "Implemented core features for document parsing engine and built custom VSCode extension components for previewing parsed notes using React and TypeScript",
      "Collaborated with CEO on product roadmap and feature prioritization for core Dendron offerings",
    ],
  },
  {
    company: "Centre College",
    role: "Research Assistant",
    date: "June 2021 - August 2021",
    achievements: [
      "Collaborated with biology department at Piedmont University to develop data visualization tool for analyzing operational taxonomic unit (OTU) occurrence in microbiome samples",
      "Co-authored peer-reviewed research paper in the Journal of Computational Science Education detailing the development of the visualization tool",
      "Worked on data preprocessing for molecular docking software analysis in collaboration with Centre College biology department",
    ],
  },
];
