"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Trophy, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface Genome {
  rank?: number;
  genome_id: string;
  martian_type: string;
  fitness_score: number;
  generation: number;
  submitted_at: string;
}

const API_URL = "https://api.alienclaw.net";

export default function LeaderboardWidget() {
  const [genomes, setGenomes] = useState<Genome[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/v1/genomes/top?martian_type=search_text_alone&limit=5`)
      .then((r) => r.json())
      .then((data) => {
        const rows = (data.genomes ?? []).map(
          (g: Genome, i: number) => ({ ...g, rank: i + 1 })
        );
        setGenomes(rows);
        setLoading(false);
      })
      .catch(() => {
        setGenomes([]);
        setLoading(false);
      });
  }, []);

  return (
    <section className="bg-canvas py-24 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-start justify-between mb-10 gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-muted-brand uppercase mb-2">
              Community
            </p>
            <h2 className="font-display font-bold text-ink text-3xl md:text-4xl">
              Live Leaderboard
            </h2>
          </div>
          <Link
            href="/leaderboard/"
            className="flex-shrink-0 flex items-center gap-1 text-sm font-medium text-slime-dark hover:text-slime transition-colors mt-2"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-black/8 overflow-hidden shadow-sm">
          {/* Table header */}
          <div className="grid grid-cols-[2rem_1fr_auto_auto] gap-4 px-6 py-3 border-b border-black/5 text-xs font-semibold text-muted-brand uppercase tracking-wide">
            <span>#</span>
            <span>Genome ID</span>
            <span>Fitness</span>
            <span className="hidden sm:block">Gen</span>
          </div>

          {loading ? (
            // Skeleton rows
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-[2rem_1fr_auto_auto] gap-4 px-6 py-4 border-b border-black/4 last:border-0"
              >
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-4 w-12 rounded" />
                <Skeleton className="h-4 w-8 rounded hidden sm:block" />
              </div>
            ))
          ) : genomes && genomes.length > 0 ? (
            genomes.map((g, i) => (
              <div
                key={g.genome_id}
                className="grid grid-cols-[2rem_1fr_auto_auto] gap-4 px-6 py-4 border-b border-black/4 last:border-0 hover:bg-slime/4 transition-colors"
                style={{
                  opacity: 0,
                  animation: `fadeInUp 0.4s ease-out ${i * 60}ms forwards`,
                }}
              >
                <span className="text-sm font-semibold text-muted-brand flex items-center">
                  {g.rank === 1 ? (
                    <Trophy size={14} className="text-yellow-500" />
                  ) : (
                    g.rank
                  )}
                </span>
                <span className="font-mono text-sm text-ink truncate">{g.genome_id.slice(0, 12)}…</span>
                <Badge
                  variant="outline"
                  className="text-xs border-slime/40 text-slime-dark font-mono"
                >
                  {g.fitness_score.toFixed(3)}
                </Badge>
                <span className="text-sm text-muted-brand hidden sm:block">
                  G{g.generation}
                </span>
              </div>
            ))
          ) : (
            // Empty state
            <div className="px-6 py-12 text-center">
              <p className="text-muted-brand text-sm mb-3">
                No genomes yet — be the first!
              </p>
              <Link
                href="/leaderboard/"
                className="inline-flex items-center gap-1 text-sm font-medium text-slime-dark hover:text-slime transition-colors"
              >
                Submit a genome <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
