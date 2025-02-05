"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import ThemeButton from "./theme-button";

export default function Header() {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-4 z-40 mx-auto flex max-w-4xl items-center justify-between rounded-2xl px-8 saturate-100 backdrop-blur-md h-16 font-semibold text-sm text-foreground/60 bg-background/75 border border-border/50"
      )}
    >
      <Link href="/" className="flex items-center justify-center gap-1">
        hayata.io
      </Link>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <Link href="#who-am-i">Who am I?</Link>
          <Link href="#in-numbers">In numbers</Link>
          <Link href="#eisuke">Eisuke</Link>
          <Link href="#experience">Experience</Link>
          <Link href="#education">Education</Link>
        </div>
        <ThemeButton />
      </div>
    </header>
  );
}
