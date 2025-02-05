import { RoughNotation } from "react-rough-notation";

export default function WhoAmISection() {
  return (
    <section id="whoami">
      <div className="mx-auto max-w-4xl">
        <div className="flex justify-center mb-12">
          <RoughNotation
            type="underline"
            strokeWidth={2}
            order={1}
            color="hsl(47.9, 95.8%, 53.1%)"
            show
          >
            <h2 className="text-3xl font-bold">Who am I?</h2>
          </RoughNotation>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex md:flex-col flex-row justify-start md:justify-center items-start gap-8">
            <div className="p-4 border border-border rounded-md space-y-2">
              <p>Years of Experience</p>
              <p>+3 years</p>
            </div>
            <div className="p-4 border border-border rounded-md space-y-2">
              <p>Location</p>
              <p>San Francisco, CA / Tokyo, JP</p>
            </div>
          </div>

          <article className="prose dark:prose-invert">
            <p>
              Hi! I&apos;m Hayata, a software engineer with over three years of
              industry experience, much of which I spent at{" "}
              <strong>Expensify</strong> working on systems serving{" "}
              <u>15M+ users</u>. Based in San Francisco and sometimes in Japan.
            </p>

            <p>
              At Expensify, I led critical projects and managed engineering
              teams. Now, I&apos;m building
              <strong> Eisuke</strong>, a language learning platform that
              combines web and mobile applications to help people master English
              vocabulary.
            </p>

            <p>
              I focus on identifying common patterns that can be solved through
              existing solutions, letting teams ship faster by focusing purely
              on business logic. My recent interest is in{" "}
              <u>natural language processing</u> and its applications in the
              EdTech space.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
