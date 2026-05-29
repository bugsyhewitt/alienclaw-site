"use client";
import dynamic from "next/dynamic";

const HowItWorks = dynamic(() => import("./HowItWorks"), { ssr: false });
const LeaderboardWidget = dynamic(() => import("./LeaderboardWidget"), { ssr: false });
const VideoPlaceholder = dynamic(() => import("./VideoPlaceholder"), { ssr: false });

export default function ClientSections() {
  return (
    <>
      <HowItWorks />
      <LeaderboardWidget />
      <VideoPlaceholder />
    </>
  );
}
