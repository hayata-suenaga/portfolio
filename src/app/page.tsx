import HeroSection from "@/components/hero";
import ExperienceSection from "@/components/experience";
import SocialLinks from "@/components/social-links";
import WhoAmISection from "@/components/who-am-i";
import GitHubContributionSection from "@/components/github-contribution";
import EisukeSection from "@/components/eisuke";
import EducationSection from "@/components/education";
import Cta from "@/components/cta";
import VerticalNav from "@/components/vertical-nav";
import { NAV_ITEMS } from "@/lib/nav-items";

const VIEW__TIMELINE_NAMES = NAV_ITEMS.map((item) => `--${item.href}`).join(
  ","
);

export default function PortfolioPage() {
  return (
    <div
      className="min-h-screen bg-background px-6"
      style={{
        timelineScope: VIEW__TIMELINE_NAMES,
      }}
    >
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
