"use client";
import { useEffect, useState } from "react";

const API_URL = "https://api.alienclaw.net";

export default function HeroStats() {
  const [genomes, setGenomes] = useState<string>("—");

  useEffect(() => {
    fetch(`${API_URL}/v1/genomes/top?martian_type=search_text_alone&limit=1`)
      .then((r) => r.json())
      .then((data) => setGenomes(String(data.total_for_type ?? "—")))
      .catch(() => {});
  }, []);

  return (
    <div className="flex gap-6 text-sm text-muted-brand">
      <span>
        <strong className="text-ink font-semibold">{genomes}</strong> genomes submitted
      </span>
      <span>
        <strong className="text-ink font-semibold">—</strong> operators
      </span>
      <span>
        <strong className="text-ink font-semibold">—</strong> generations evolved
      </span>
    </div>
  );
}
