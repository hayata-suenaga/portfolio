import { Contact } from "./contact";
import Hero from "./hero";
import { SubHero } from "./sub-hero";
import { WorkHistory } from "./work-history";

export default function Home() {
  return (
    <div>
      <Hero />
      <SubHero />
      <WorkHistory />
      <Contact />
    </div>
  );
}
