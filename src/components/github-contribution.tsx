import { RoughNotation } from "react-rough-notation";
import { GitHubCharts } from "./github-charts";

export default function GitHubContributionSection() {
  return (
    <section id="in-numbers" className="mx-auto max-w-4xl">
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
  );
}
