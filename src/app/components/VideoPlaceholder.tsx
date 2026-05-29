"use client";
import { useState } from "react";
import { Play, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface VideoPlaceholderProps {
  videoUrl?: string;
}

export default function VideoPlaceholder({ videoUrl }: VideoPlaceholderProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold tracking-widest text-muted-brand uppercase mb-2">
            Watch it work
          </p>
          <h2 className="font-display font-bold text-ink text-3xl">
            AlienClaw in Action
          </h2>
        </div>

        {/* Video frame */}
        <div
          className="relative bg-ink rounded-xl overflow-hidden cursor-pointer group"
          style={{ aspectRatio: "16/9" }}
          onClick={() => setModalOpen(true)}
          role="button"
          tabIndex={0}
          aria-label="Play AlienClaw demo video"
          onKeyDown={(e) => e.key === "Enter" && setModalOpen(true)}
        >
          {/* Background */}
          <Image
            src="/logo.webp"
            alt="AlienClaw mascot background"
            fill
            style={{ objectFit: "contain", opacity: 0.12 }}
          />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-slime flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
              <Play size={32} className="text-ink ml-1" fill="currentColor" />
            </div>
          </div>

          {/* Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
              Coming soon
            </Badge>
          </div>
        </div>

        <p className="text-center text-muted-brand text-sm mt-4">
          AlienClaw — How It Works (Kickstarter Trailer)
        </p>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-muted-brand hover:text-ink"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <div className="w-16 h-16 rounded-full bg-slime/15 flex items-center justify-center mx-auto mb-4">
              <Play size={28} className="text-slime-dark ml-1" />
            </div>
            <h3 className="font-display font-bold text-ink text-xl mb-2">
              Trailer coming soon
            </h3>
            <p className="text-muted-brand text-sm leading-relaxed mb-4">
              The AlienClaw trailer launches with our Kickstarter campaign. Star the
              repo to be notified.
            </p>
            <a
              href="https://github.com/bugsyhewitt/AlienClaw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-slime text-ink font-semibold text-sm hover:bg-slime-dark transition-colors"
            >
              Star on GitHub ↗
            </a>
          </div>
        </div>
      )}

      {videoUrl && (
        <div className="hidden">
          {/* Real video renders here when videoUrl is set */}
          <video src={videoUrl} controls className="w-full rounded-xl" />
        </div>
      )}
    </section>
  );
}
