import { RoughNotation } from "react-rough-notation";
import { Button } from "./ui/button";

export default function Cta() {
  return (
    <section className="mx-auto max-w-4xl py-44">
      <div className="flex justify-center mb-12">
        <RoughNotation
          type="underline"
          strokeWidth={2}
          order={1}
          color="hsl(47.9, 95.8%, 53.1%)"
          show
        >
          <h2 className="text-3xl font-bold">Contact me</h2>
        </RoughNotation>
      </div>

      <div className="mx-auto max-w-md text-center space-y-4 mb-8">
        <p className="font-bold text-lg">Let&apos;s connect</p>
        <p className="leading-loose">
          I&apos;m always looking for new opportunities and collaborations. If
          you have any questions, please don&apos;t hesitate to say hi 😆
        </p>
      </div>

      <div className="flex justify-center">
        <Button className="mx-auto">Get in touch!</Button>
      </div>
    </section>
  );
}
