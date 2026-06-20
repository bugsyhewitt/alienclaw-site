import Image from "next/image";
import { cn } from "@/lib/utils";

interface MascotProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function Mascot({ size = 480, className, animate = true }: MascotProps) {
  return (
    <div
      className={cn("relative select-none", className)}
      style={{ width: size, height: size, maxWidth: "100%" }}
    >
      {/* Radial glow behind mascot */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, #C8E73130 0%, transparent 70%)",
          filter: "blur(40px)",
          transform: "scale(1.2)",
        }}
      />
      <Image
        src="/logo.webp"
        alt="AlienClaw mascot — cartoon alien with slime"
        width={size}
        height={size}
        priority
        className={cn(
          "relative z-10 drop-shadow-xl",
          animate && "animate-ufo-bob"
        )}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
