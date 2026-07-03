"use client";
import { useEffect, useState } from "react";

const API_URL = "https://api.alienclaw.net";

export default function HeroStats() {
  const [genomes, setGenomes] = useState<string>("—");
  const [operators, setOperators] = useState<string>("—");

  useEffect(() => {
    fetch(`${API_URL}/v1/stats`)
      .then((r) => r.json())
      .then((data) => {
        setGenomes(String(data.total_genomes ?? "—"));
        setOperators(String(data.total_installs ?? "—"));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex gap-6 text-sm text-muted-brand">
      <span>
        <strong className="text-ink font-semibold">{genomes}</strong> genomes submitted
      </span>
      <span>
        <strong className="text-ink font-semibold">{operators}</strong> operators
      </span>
      <span>
        <strong className="text-ink font-semibold">—</strong> generations evolved
      </span>
    </div>
  );
}
