import Image from "next/image";

import { BackgroundBeamsWithCollision } from "@acme/ui/background-beams-with-collision";
import { StarsBackground } from "@acme/ui/star-background";

import me from "../../../public/me.png";

export default function Hero() {
  return (
    <div className="relative flex h-screen items-center px-6">
      <BackgroundBeamsWithCollision>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 bg-gradient-to-b from-slate-500 to-white bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            Launch Your MVP
            <br />
            in 1 <span className="line-through decoration-slate-50">
              month
            </span>{" "}
            week
          </h1>
          <p className="mb-8 text-xl text-gray-400 sm:text-2xl md:text-3xl">
            with{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Hayata
            </span>
          </p>
        </div>
        <Image src={me} alt="Hayata" className="absolute bottom-0 h-80 w-80" />
      </BackgroundBeamsWithCollision>

      <StarsBackground />
    </div>
  );
}
