"use client";

import Link from "next/link";
import {
  Menu,
  User,
  Calculator,
  Baby,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeButton from "./theme-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-4 z-40 mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-8 saturate-100 backdrop-blur-md h-16 font-semibold text-sm text-foreground/60 bg-background/75 border border-border/50"
      )}
    >
      <Link href="/" className="flex items-center justify-center gap-1">
        hayata.io
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center gap-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
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
            {NAV_LINKS.map((link) => (
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
  );
}

const NAV_LINKS = [
  { href: "#whoami", label: "Who am I?", icon: User },
  { href: "#in-numbers", label: "In numbers", icon: Calculator },
  { href: "#eisuke", label: "Eisuke", icon: Baby },
  { href: "#experience", label: "Experience", icon: Briefcase },
  { href: "#education", label: "Education", icon: GraduationCap },
];
