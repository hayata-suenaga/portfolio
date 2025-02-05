import HeroSection from "@/components/hero";
import ExperienceSection from "@/components/experience";
import SocialLinks from "@/components/social-links";
import WhoAmISection from "@/components/who-am-i";
import GitHubContributionSection from "@/components/github-contribution";
import EisukeSection from "@/components/eisuke";
import EducationSection from "@/components/education";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background px-6">
      <main className="space-y-16">
        <HeroSection />

        <WhoAmISection />

        <GitHubContributionSection />

        <ExperienceSection />

        <EisukeSection />

        <EducationSection />
      </main>

      <SocialLinks />
    </div>
  );
}
