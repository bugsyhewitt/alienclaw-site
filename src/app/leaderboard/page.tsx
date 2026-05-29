import Nav from "../components/Nav";
import LeaderboardFull from "../components/LeaderboardFull";
import Footer from "../components/Footer";

export const metadata = {
  title: "Leaderboard — AlienClaw",
  description: "Top-performing Martian genomes from the AlienClaw community. See which tool compositions are winning the evolutionary race.",
};

export default function LeaderboardPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 pb-16 min-h-screen bg-canvas">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-widest text-muted-brand uppercase mb-3">
              Community
            </p>
            <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-4">
              Leaderboard
            </h1>
            <p className="text-muted-brand text-lg max-w-xl">
              Top-performing Martian genomes from operators worldwide. Tournament selection finds the best tool compositions — these made it to the top.
            </p>
          </div>
          <LeaderboardFull />
        </div>
      </main>
      <Footer />
    </>
  );
}
