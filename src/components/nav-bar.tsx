"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeButton from "./theme-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NAV_ITEMS } from "@/lib/nav-items";

export default function Header() {
  return (
    <div className="fixed inset-x-0 md:top-4 top-0 mx-0 md:mx-4 z-40">
      <header
        className={cn(
          "max-w-6xl rounded-none mx-auto flex items-center justify-between md:rounded-2xl px-8 saturate-100 backdrop-blur-md h-16 bg-background/75 border border-border/50"
        )}
      >
        <Link href="/" className="font-bold text-lg">
          hayata.io
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 font-semibold text-sm text-foreground/60">
          <div className="flex items-center gap-3">
            {NAV_ITEMS.map((link) => (
              <Link
                key={link.href}
                href={`#${link.href}`}
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>
          <ThemeButton />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeButton />
          <DropdownMenu>
            <DropdownMenuTrigger aria-label="Navigation menu" className="p-2">
              <Menu className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {NAV_ITEMS.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href} className="flex items-center gap-2">
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
}
