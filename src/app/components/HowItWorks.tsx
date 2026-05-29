"use client";
import { useEffect, useRef, useState } from "react";
import { Dna, Sparkles, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const FINAL_GENOME =
  "3xK9mQ2pL7nR4vT8wY1uZ6bA0cF5hG3jI9eN2oP7qS4rU8kV1wX6yB0dE3fH5gJ9iM2lO7nQ4pR8sT1uW6vX0yZ3aB5cD7eF9gH1iJ4kL6mN8oP2qR5sT7uV0wX3yZ6aB9cD1eF4gH7iJ0kL3mN6oP9qR2sT5uV8wX1yZ4aB7cD0eF3gH6iJ9kL2mN5oP8qR1sT4uV7wX0yZ3aB6cD9eF";
const GENOME_LENGTH = FINAL_GENOME.length;

function randomChar() {
  return BASE62[Math.floor(Math.random() * 62)];
}

function randomStr(len: number) {
  let s = "";
  for (let i = 0; i < len; i++) s += randomChar();
  return s;
}

const steps = [
  {
    icon: Dna,
    title: "Compose",
    body: "CreatorBot assembles Martians — compositions of up to 4 tools — encoded in 256-character genomes.",
  },
  {
    icon: Sparkles,
    title: "Evolve",
    body: "Tournament selection rewards Martians that complete tasks with fewer tool calls. Mutation and crossover produce the next generation.",
  },
  {
    icon: Trophy,
    title: "Share",
    body: "Top genomes per tool-type sync to the community leaderboard so operators learn from each other's selection pressure.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);
  const fitnessRef = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const DURATION = 2000;
    const startTime = performance.now();
    let unlockedChars = randomStr(GENOME_LENGTH);
    let rafId: number;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      const locked = Math.floor(progress * GENOME_LENGTH);
      const fitness = progress * 0.872;

      // Scramble unlocked portion — mutate string in place
      let next = "";
      for (let i = locked; i < GENOME_LENGTH; i++) {
        next += Math.random() < 0.3 ? randomChar() : unlockedChars[i - locked];
      }
      unlockedChars = next;

      // Direct DOM update — zero React reconciliation
      if (preRef.current) {
        preRef.current.innerHTML =
          `<span style="color:#C8E731">${FINAL_GENOME.slice(0, locked)}</span>` +
          `<span style="color:#6B6B6B">${next}</span>`;
      }
      if (meterRef.current) {
        meterRef.current.style.width = `${(progress) * 100}%`;
      }
      if (fitnessRef.current) {
        fitnessRef.current.textContent = fitness.toFixed(3);
      }

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [started]);

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest text-muted-brand uppercase mb-3">
            Under the hood
          </p>
          <h2 className="font-display font-bold text-ink text-3xl md:text-4xl">
            How AlienClaw Works
          </h2>
        </div>

        {/* Genome unscramble */}
        <div
          ref={sectionRef}
          className="bg-ink rounded-xl p-6 md:p-8 mb-6 overflow-hidden"
        >
          <p className="text-muted-brand text-xs font-mono mb-3 uppercase tracking-widest">
            Martian genome · 256 chars · Base62
          </p>
          <pre
            ref={preRef}
            className="font-mono text-xs md:text-sm leading-relaxed break-all whitespace-pre-wrap"
            aria-label="Genome string animation"
          >
            <span style={{ color: "#6B6B6B" }}>{FINAL_GENOME}</span>
          </pre>

          {/* Fitness meter */}
          <div className="mt-6 flex items-center gap-4">
            <span className="text-muted-brand text-xs font-mono">fitness</span>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                ref={meterRef}
                className="h-full bg-slime rounded-full"
                style={{ width: "0%", transition: "width 0.05s linear" }}
              />
            </div>
            <span
              ref={fitnessRef}
              className="text-slime text-xs font-mono w-12 text-right"
            >
              0.000
            </span>
          </div>
          <p className="text-muted-brand text-xs mt-3">
            A Martian genome encoding 4 tool compositions. Watch a generation evolve.
          </p>
        </div>

        {/* 3-step cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {steps.map(({ icon: Icon, title, body }) => (
            <Card
              key={title}
              className="border border-black/8 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-default"
            >
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-lg bg-slime/15 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-slime-dark" />
                </div>
                <h3 className="font-display font-semibold text-ink text-lg mb-2">
                  {title}
                </h3>
                <p className="text-muted-brand text-sm leading-relaxed">{body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
