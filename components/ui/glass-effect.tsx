import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassSectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export function GlassSection({ id, children, className }: GlassSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate scroll-mt-24",
        "rounded-2xl sm:rounded-[1.75rem] lg:rounded-[2rem]",
        "border border-[var(--glass-border)]",
        "bg-[var(--glass-background)]",
        "backdrop-blur-md",
        "shadow-[0_18px_60px_-35px_rgba(135, 135, 135, 0.45)]",
        "px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14",
        className,
      )}
    >
      {/* top */}
      <div
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/85 to-transparent sm:inset-x-8 lg:inset-x-10"
        aria-hidden="true"
      />

      {/* left */}
      <div
        className="pointer-events-none absolute inset-y-14 left-0 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent sm:inset-y-10 lg:inset-y-12"
        aria-hidden="true"
      />

      {/* right */}
      <div
        className="pointer-events-none absolute inset-y-14 right-0 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent sm:inset-y-16 lg:inset-y-20"
        aria-hidden="true"
      />

      {/* bottom */}
      <div
        className="pointer-events-none absolute inset-x-20 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent sm:inset-x-24 lg:inset-x-28"
        aria-hidden="true"
      />

      {children}
    </section>
  );
}

export default GlassSection;
