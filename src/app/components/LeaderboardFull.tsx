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
  genome_string?: string;
}

const API_URL = "https://api.alienclaw.net";
const MARTIAN_TYPES = ["search_text_alone", "search_text_with_context", "full_synthesis"];

export default function LeaderboardFull() {
  const [activeType, setActiveType] = useState(MARTIAN_TYPES[0]);
  const [genomes, setGenomes] = useState<Genome[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState<{ id: string; text: string } | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/v1/genomes/top?martian_type=${activeType}&limit=50`)
      .then((r) => r.json())
      .then((data) => {
        setGenomes(
          (data.genomes ?? []).map((g: Genome, i: number) => ({ ...g, rank: i + 1 }))
        );
        setLoading(false);
      })
      .catch(() => {
        setGenomes([]);
        setLoading(false);
      });
  }, [activeType]);

  const typeLabel = (t: string) =>
    t.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div>
      {/* Type tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {MARTIAN_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
              activeType === t
                ? "bg-slime text-ink"
                : "bg-black/5 text-muted-brand hover:bg-black/10"
            }`}
          >
            {typeLabel(t)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-black/8 overflow-hidden shadow-sm relative">
        <div className="grid grid-cols-[2rem_1fr_auto_auto_auto] gap-4 px-6 py-3 border-b border-black/5 text-xs font-semibold text-muted-brand uppercase tracking-wide">
          <span>#</span>
          <span>Genome ID</span>
          <span>Fitness</span>
          <span className="hidden sm:block">Gen</span>
          <span className="hidden md:block">Submitted</span>
        </div>

        {loading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="grid grid-cols-[2rem_1fr_auto_auto_auto] gap-4 px-6 py-4 border-b border-black/4 last:border-0">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-36 rounded" />
              <Skeleton className="h-4 w-12 rounded" />
              <Skeleton className="h-4 w-8 rounded hidden sm:block" />
              <Skeleton className="h-4 w-20 rounded hidden md:block" />
            </div>
          ))
        ) : genomes && genomes.length > 0 ? (
          genomes.map((g, i) => (
            <div
              key={g.genome_id}
              className="grid grid-cols-[2rem_1fr_auto_auto_auto] gap-4 px-6 py-4 border-b border-black/4 last:border-0 hover:bg-slime/4 transition-colors relative cursor-default"
              style={{
                opacity: 0,
                animation: `fadeInUp 0.4s ease-out ${Math.min(i * 40, 400)}ms forwards`,
              }}
              onMouseEnter={() =>
                g.genome_string &&
                setTooltip({
                  id: g.genome_id,
                  text: g.genome_string.slice(0, 32) + "…",
                })
              }
              onMouseLeave={() => setTooltip(null)}
            >
              <span className="text-sm font-semibold text-muted-brand flex items-center">
                {g.rank === 1 ? <Trophy size={14} className="text-yellow-500" /> : g.rank}
              </span>
              <span className="font-mono text-sm text-ink truncate">{g.genome_id}</span>
              <Badge variant="outline" className="text-xs border-slime/40 text-slime-dark font-mono">
                {g.fitness_score.toFixed(3)}
              </Badge>
              <span className="text-sm text-muted-brand hidden sm:block">G{g.generation}</span>
              <span className="text-xs text-muted-brand hidden md:block">
                {new Date(g.submitted_at).toLocaleDateString()}
              </span>

              {tooltip?.id === g.genome_id && (
                <div className="absolute left-6 top-full mt-1 z-10 bg-ink text-slime font-mono text-xs px-3 py-2 rounded-md shadow-lg whitespace-nowrap">
                  {tooltip.text}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="px-6 py-16 text-center">
            <p className="text-muted-brand text-sm mb-4">
              No genomes submitted yet for this type.
            </p>
            <Link
              href="/docs/"
              className="inline-flex items-center gap-1 text-sm font-medium text-slime-dark hover:text-slime"
            >
              How to submit <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>

      {/* How to submit */}
      <div className="mt-16 bg-white rounded-xl border border-black/8 p-8">
        <h3 className="font-display font-semibold text-ink text-xl mb-3">
          How to submit a genome
        </h3>
        <p className="text-muted-brand text-sm leading-relaxed mb-4">
          Install AlienClaw, configure BossBot, then let it run. The governance engine
          automatically submits your best-performing Martian genomes to the community
          leaderboard after tournament selection.
        </p>
        <a
          href="https://github.com/bugsyhewitt/AlienClaw"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-slime-dark hover:text-slime transition-colors"
        >
          Read the installation guide on GitHub <ArrowRight size={14} />
        </a>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
