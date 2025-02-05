import { RoughNotation } from "react-rough-notation";
import Image from "next/image";

export default function EisukeSection() {
  return (
    <section id="eisuke" className="max-w-4xl mx-auto">
      <div className="flex justify-center mb-12">
        <RoughNotation
          type="underline"
          strokeWidth={2}
          order={1}
          color="hsl(47.9, 95.8%, 53.1%)"
          show
        >
          <h2 className="text-3xl font-bold">Eisuke</h2>
        </RoughNotation>
      </div>

      <p className="mb-12 max-w-lg mx-auto text-center">
        I&apos;m building
        <strong> Eisuke</strong>, a language learning platform that combines web
        and mobile applications to help people master English vocabulary.
      </p>

      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center group">
            <WebsitePreview url="eisuke.org" />
            <p className="text-sm font-medium mt-3 text-muted-foreground group-hover:text-foreground transition-colors">
              Main Website
            </p>
          </div>

          <div className="flex flex-col items-center group">
            <WebsitePreview url="app.eisuke.org" />
            <p className="text-sm font-medium mt-3 text-muted-foreground group-hover:text-foreground transition-colors">
              Student Portal
            </p>
          </div>

          <div className="flex flex-col items-center sm:col-span-2 lg:col-span-1 group">
            <WebsitePreview url="teacher.eisuke.org" />
            <p className="text-sm font-medium mt-3 text-muted-foreground group-hover:text-foreground transition-colors">
              Teacher Portal
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex gap-12 justify-center">
          <div className="flex flex-col items-center group">
            <div className="p-4 bg-background border rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/qr-ios.svg"
                alt="iOS Beta QR Code"
                width={100}
                height={100}
                className="dark:invert-[0.15]"
              />
            </div>
            <span className="text-sm font-medium mt-3 text-muted-foreground group-hover:text-foreground transition-colors">
              iOS Beta
            </span>
          </div>
          <div className="flex flex-col items-center group">
            <div className="p-4 bg-background border rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/qr-android.svg"
                alt="Android Beta QR Code"
                width={100}
                height={100}
                className="dark:invert-[0.15]"
              />
            </div>
            <span className="text-sm font-medium mt-3 text-muted-foreground group-hover:text-foreground transition-colors">
              Android Beta
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function WebsitePreview({ url }: { url: string }) {
  return (
    <a
      href={`https://${url}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block hover:scale-105 transition-transform duration-300"
    >
      <div className="w-[260px] h-[180px] overflow-hidden rounded-sm border border-border pointer-events-none">
        <iframe
          src={`https://${url}`}
          style={{
            width: "1300px",
            height: "900px",
            transform: "scale(0.2)",
            transformOrigin: "0 0",
          }}
        />
      </div>
    </a>
  );
}
