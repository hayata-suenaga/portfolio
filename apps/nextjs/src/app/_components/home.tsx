import { Contact } from "./contact";
import Hero from "./hero";
import { WorkHistory } from "./work-history";

export default function Home() {
  return (
    <div>
      <Hero />
      <WorkHistory />
      <Contact />
    </div>
  );
}
