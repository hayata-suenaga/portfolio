import { Badge } from "@/components/ui/badge";

export default function ExperienceSection() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-4xl mt-20 space-y-20 md:mt-40 md:space-y-32">
        <div className="relative flex flex-col gap-5 md:flex-row md:gap-20">
          <div className="top-28 flex h-min shrink-0 items-center gap-5 md:sticky">
            <Badge variant="secondary">Version 1.2.1</Badge>
            <span className="text-xs font-medium text-muted-foreground">
              23 September 2024
            </span>
          </div>
          <div>
            <h2 className="mb-4 text-lg font-semibold md:text-2xl md:leading-5">
              New features and improvements
            </h2>
            <p className="text-muted-foreground md:text-lg">
              Here are the latest updates and improvements to our platform. We
              are always working to improve our platform and your experience.
            </p>
            <ul className="ml-4 mt-5 space-y-2 text-muted-foreground md:text-lg">
              <li className="list-disc">Added new feature to export data</li>
              <li className="list-disc">Improved performance and speed</li>
              <li className="list-disc">Fixed minor bugs and issues</li>
              <li className="list-disc">Added new feature to import data</li>
            </ul>
            <img
              src="https://shadcnblocks.com/images/block/placeholder-aspect-video-1.svg"
              alt="placeholder"
              className="mt-10 w-full rounded-lg object-cover"
            />
          </div>
        </div>
        <div className="relative flex flex-col gap-5 md:flex-row md:gap-20">
          <div className="top-28 flex h-min shrink-0 items-center gap-5 md:sticky">
            <Badge variant="secondary">Version 1.0.0</Badge>
            <span className="text-xs font-medium text-muted-foreground">
              31 August 2024
            </span>
          </div>
          <div>
            <h2 className="mb-4 text-lg font-semibold md:text-2xl md:leading-5">
              First version of our platform
            </h2>
            <p className="text-muted-foreground md:text-lg">
              Introducing a new platform to help you manage your projects and
              tasks. We are excited to launch our platform and help you get
              started. We are always working to improve our platform and your
              experience.
            </p>

            <img
              src="https://shadcnblocks.com/images/block/placeholder-aspect-video-1.svg"
              alt="placeholder"
              className="mt-10 w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
