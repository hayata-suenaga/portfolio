import { HydrateClient } from "~/trpc/server";
import Home from "./_components/home";

export const runtime = "edge";

export default function HomePage() {
  return (
    <HydrateClient>
      <main className="bg-slate-950 text-slate-50">
        <Home />
      </main>
    </HydrateClient>
  );
}
