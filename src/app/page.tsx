import HeroSection from "@/app/_sections/hero";
import ExperienceSection from "@/app/_sections/experience";
import SocialLinks from "@/app/_components/social-links";
import WhoAmISection from "@/app/_sections/who-am-i";
import GitHubContributionSection from "@/app/_sections/github-contribution";
import EisukeSection from "@/app/_sections/eisuke";
import EducationSection from "@/app/_sections/education";
import Cta from "@/app/_components/cta";
import VerticalNav from "@/app/_components/vertical-nav";
import { NAV_ITEMS } from "@/lib/nav-items";
import Header from "@/app/_components/nav-bar";
import Footer from "@/app/_components/footer";

const VIEW__TIMELINE_NAMES = NAV_ITEMS.map((item) => `--${item.href}`).join(
  ","
);

export default function PortfolioPage() {
  return (
    <div
      className="min-h-screen bg-background"
      style={{
        timelineScope: VIEW__TIMELINE_NAMES,
      }}
    >
      <Header />

      <HeroSection />
      <div className="px-6">
        <main className="space-y-24">
          <WhoAmISection />

          <GitHubContributionSection />

          <EisukeSection />

          <ExperienceSection />

          <EducationSection />
        </main>

        <Cta />
        <Footer />
      </div>

      <SocialLinks />
      <VerticalNav />
    </div>
  );
}
