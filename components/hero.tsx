"use client";

import { useEffect, useRef } from "react";
import { createTimeline, stagger } from "animejs";
import { Button } from "@/components/ui/button";

const TAGS = ["PyTorch", "Vision Transformers", "C++", "FastAPI"];

export function Hero() {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = createTimeline({ defaults: { ease: "outQuad" } });
    tl.add(
      ".hero-tag",
      {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 350,
        delay: stagger(60),
      },
      "-=250",
    ).add(
      ".hero-cta",
      { opacity: [0, 1], translateY: [10, 0], duration: 400 },
      "-=200",
    );
  }, []);

  return (
    <section
      ref={scope}
      className="relative flex min-h-screen items-center justify-center px-6 py-24"
    >
      <div className="relative w-full max-w-4xl p-12">
        <span className="absolute -left-px -top-px h-5 w-5 border-l-2 border-t-2 border-primary/70" />
        <span className="absolute -right-px -top-px h-5 w-5 border-r-2 border-t-2 border-primary/70" />
        <span className="absolute -left-px -bottom-px h-5 w-5 border-b-2 border-l-2 border-primary/70" />
        <span className="absolute -right-px -bottom-px h-5 w-5 border-b-2 border-r-2 border-primary/70" />

        <div className="mb-8 flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="hero-tag rounded-md border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground opacity-0"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="hero-cta mb-8 flex flex-wrap items-center gap-3 opacity-0">
          <Button>View projects</Button>
          <Button variant="outline">Resume</Button>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          open to opportunities
        </div>
      </div>
    </section>
  );
}
