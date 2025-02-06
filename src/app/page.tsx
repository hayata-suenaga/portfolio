import HeroSection from "@/components/hero";
import ExperienceSection from "@/components/experience";
import SocialLinks from "@/components/social-links";
import WhoAmISection from "@/components/who-am-i";
import GitHubContributionSection from "@/components/github-contribution";
import EisukeSection from "@/components/eisuke";
import EducationSection from "@/components/education";
import Cta from "@/components/cta";
import VerticalNav from "@/components/vertical-nav";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background px-6">
      <HeroSection />

      <main className="space-y-24">
        <WhoAmISection />

        <GitHubContributionSection />

        <EisukeSection />

        <ExperienceSection />

        <EducationSection />
      </main>

      <Cta />

      <SocialLinks />

      <VerticalNav />
    </div>
  );
}
