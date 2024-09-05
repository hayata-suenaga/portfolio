import { HydrateClient } from "~/trpc/server";
import Home from "./_components/home";

export const runtime = "edge";

export default function HomePage() {
  return (
    <HydrateClient>
      {/* <main className="container h-screen py-16"> */}
      <Home />
      {/* </main> */}
    </HydrateClient>
  );
}
