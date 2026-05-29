"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/leaderboard/", label: "Leaderboard" },
  { href: "/docs/", label: "Docs" },
  {
    href: "https://github.com/bugsyhewitt/AlienClaw",
    label: "GitHub",
    external: true,
  },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-canvas/90 backdrop-blur-md border-b border-black/5 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo + wordmark */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.webp"
              alt="AlienClaw"
              width={36}
              height={36}
              className="rounded-sm group-hover:scale-105 transition-transform duration-200"
            />
            <span className="font-display font-bold text-ink text-lg tracking-tight">
              AlienClaw
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="text-sm font-medium text-muted-brand hover:text-ink transition-colors duration-150 flex items-center gap-1"
              >
                {l.label}
                {l.external && <ExternalLink size={12} className="opacity-60" />}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-muted-brand hover:text-ink"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-0 right-0 w-72 h-full bg-canvas shadow-xl flex flex-col pt-20 px-6 gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="text-lg font-medium text-ink py-2 border-b border-black/5"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
