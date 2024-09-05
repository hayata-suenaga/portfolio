import { FlipWords } from "@acme/ui/flip-words";

export function SubHero() {
  const words = [
    "beautiful UI",
    "well-architected API",
    "performant database",
    "authentication",
    "error monitoring",
    "event tracking",
    "email integration",
    "CMS",
  ];

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-16 px-6">
      <div className="max-w-3xl text-center text-xl font-normal text-neutral-600 dark:text-neutral-400">
        <p className="mb-8">You need</p>
        <FlipWords words={words} className="text-4xl" />
      </div>
      <p className="text-lxl">
        I bring them all together at the speed of an MVP
      </p>
    </div>
  );
}
