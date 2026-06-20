import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { ArrowRight, BookOpen, Sigma } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Docs — AlienClaw",
  description: "AlienClaw documentation. Get started with the installation guide and explore the mathematical foundations.",
};

const docs = [
  {
    icon: BookOpen,
    title: "Installation Guide & README",
    description: "Get AlienClaw running in minutes. Covers prerequisites, install.sh, agent workspace setup, and your first BossBot session.",
    href: "https://github.com/bugsyhewitt/AlienClaw#readme",
    cta: "Read the README",
  },
  {
    icon: Sigma,
    title: "Mathematical Foundations",
    description: "The genome codec, tournament selection mathematics, Martian fitness functions, and the evolutionary algorithm specification.",
    href: "https://github.com/bugsyhewitt/AlienClaw/blob/main/docs/MATHEMATICAL_FOUNDATIONS.md",
    cta: "Read the spec",
  },
];

export default function DocsPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 pb-16 min-h-screen bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-widest text-muted-brand uppercase mb-3">
              Documentation
            </p>
            <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-4">
              Docs
            </h1>
            <p className="text-muted-brand text-lg max-w-xl">
              AlienClaw is documented on GitHub. Choose a starting point below.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {docs.map(({ icon: Icon, title, description, href, cta }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <Card className="border border-black/8 hover:-translate-y-1 hover:shadow-md transition-all duration-200 h-full">
                  <CardContent className="pt-6 flex flex-col h-full">
                    <div className="w-10 h-10 rounded-lg bg-slime/15 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-slime-dark" />
                    </div>
                    <h2 className="font-display font-semibold text-ink text-lg mb-2">
                      {title}
                    </h2>
                    <p className="text-muted-brand text-sm leading-relaxed mb-4 flex-1">
                      {description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-slime-dark group-hover:text-slime transition-colors">
                      {cta} <ArrowRight size={14} />
                    </span>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white rounded-xl border border-black/8">
            <p className="text-muted-brand text-sm">
              Missing something?{" "}
              <a
                href="https://github.com/bugsyhewitt/AlienClaw/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-slime-dark transition-colors font-medium"
              >
                Open an issue on GitHub ↗
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
