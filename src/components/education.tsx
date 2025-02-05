import { RoughNotation } from "react-rough-notation";

export default function EducationSection() {
  return (
    <section id="education" className="mx-auto max-w-4xl py-16">
      <div className="flex justify-center mb-12">
        <RoughNotation
          type="underline"
          strokeWidth={2}
          order={1}
          color="hsl(47.9, 95.8%, 53.1%)"
          show
        >
          <h2 className="text-3xl font-bold">Education</h2>
        </RoughNotation>
      </div>

      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">Centre College</h3>
          <span className="text-sm text-muted-foreground">
            August 2019 - May 2022
          </span>
        </div>
        <p className="text-muted-foreground mb-2">
          Bachelor of Science in Computer Science
        </p>
        <ul className="list-disc pl-4 space-y-2 text-sm">
          <li>
            Founder&apos;s Scholarship recipient | Dean&apos;s List (4 terms) |
            President of Japanese Club
          </li>
          <li>
            Relevant Coursework: Data Structures (UC Berkeley CS 61B, A-),
            Statistics (MAT 130, A), Discrete Structures (CSC 200, A),
            Entrepreneurial Development & Finance (ECO 401, A)
          </li>
          <li>
            Developed comprehensive business plan that became foundation for
            current venture Eisuke L.L.C.
          </li>
        </ul>
      </div>
    </section>
  );
}
