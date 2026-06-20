import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t-2 border-slime/30 bg-canvas">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Col 1: Mascot + tagline */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Image src="/logo.webp" alt="AlienClaw" width={32} height={32} />
              <span className="font-display font-bold text-ink text-base tracking-tight">
                AlienClaw
              </span>
            </div>
            <p className="text-muted-brand text-sm leading-relaxed max-w-xs">
              Evolutionary AI agent infrastructure. Three governing AIs, one evolving swarm.
            </p>
            <p className="text-muted-brand text-xs mt-2">
              © 2026 AlienClaw
            </p>
          </div>

          {/* Col 2: Links */}
          <div>
            <p className="text-xs font-semibold text-muted-brand uppercase tracking-widest mb-4">
              Navigate
            </p>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/leaderboard/", label: "Leaderboard" },
                { href: "/docs/", label: "Docs" },
                {
                  href: "https://github.com/bugsyhewitt/AlienClaw",
                  label: "GitHub",
                  external: true,
                },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-brand hover:text-ink transition-colors"
                  >
                    {l.label}
                    {l.external && " ↗"}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Credits */}
          <div>
            <p className="text-xs font-semibold text-muted-brand uppercase tracking-widest mb-4">
              About
            </p>
            <p className="text-sm text-muted-brand leading-relaxed">
              Open source under{" "}
              <a
                href="https://github.com/bugsyhewitt/AlienClaw/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-slime-dark transition-colors"
              >
                MIT
              </a>
              . Built by Bugsy Hewitt.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
