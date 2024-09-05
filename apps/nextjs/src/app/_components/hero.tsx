import { Button } from "@acme/ui/button";

export default function Hero() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 px-4 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-4 bg-gradient-to-b from-gray-100 to-gray-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
          Launch Your MVP
          <br />
          in 1 <span className="line-through decoration-slate-50">
            month
          </span>{" "}
          week
        </h1>
        <p className="mb-8 text-xl text-gray-400 sm:text-2xl md:text-3xl">
          with Hayata Suenaga
        </p>
        <Button className="rounded-md bg-white px-8 py-3 text-lg font-semibold text-black transition-colors duration-200 hover:bg-gray-200">
          Get Started
        </Button>
      </div>
    </div>
  );
}
