import { HydrateClient } from "~/trpc/server";

export const runtime = "edge";

export default function HomePage() {
  return (
    <HydrateClient>
      <main className="container h-screen py-16">
        <p>Home</p>
      </main>
    </HydrateClient>
  );
}
