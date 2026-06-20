import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import Mascot from "./Mascot";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-canvas pt-16">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, #C8E73108 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full py-20 md:py-28">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-8">
          {/* Left: Text */}
          <div className="flex-1 max-w-2xl animate-hero-text">
            <p className="text-xs font-semibold tracking-widest text-muted-brand uppercase mb-4">
              Open Source · Evolutionary AI · MIT
            </p>

            <h1
              className="font-display font-bold text-ink leading-[1.05] mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.25rem)" }}
            >
              Three governing AIs.
              <br />
              One evolving swarm.
              <br />
              <span className="text-slime">Less compute</span>,{" "}
              every generation.
            </h1>

            <p className="text-lg md:text-xl text-muted-brand leading-relaxed mb-8 max-w-xl">
              AlienClaw is open-source infrastructure for AI agent swarms whose
              tools evolve to do more with fewer calls. Submit a genome to the
              community leaderboard and watch yours compete worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/leaderboard/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-slime text-ink font-semibold text-sm hover:bg-slime-dark transition-all duration-200 hover:scale-[1.02] hover:rotate-[0.5deg] shadow-sm"
              >
                Submit a genome <ArrowRight size={16} />
              </Link>
              <a
                href="https://github.com/bugsyhewitt/AlienClaw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-ink/15 text-ink font-semibold text-sm hover:border-ink/30 hover:bg-black/3 transition-all duration-200"
              >
                <Star size={16} /> Star on GitHub ↗
              </a>
            </div>

            <HeroStats />
          </div>

          {/* Right: Mascot */}
          <div className="flex-shrink-0 animate-hero-mascot">
            <Mascot size={460} animate={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
