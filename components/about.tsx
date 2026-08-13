"use client";

import { useEffect, useRef } from "react";
import { animate, createTimeline } from "animejs";

const CYCLE_WORDS = ["developer", "builder", "learner"];

function RotatingWord() {
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wordRef.current;
    if (!el) return;

    let index = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const cycle = () => {
      animate(el, {
        translateY: [0, -14],
        opacity: [1, 0],
        duration: 280,
        ease: "inQuad",
        onComplete: () => {
          index = (index + 1) % CYCLE_WORDS.length;
          el.textContent = CYCLE_WORDS[index];
          animate(el, {
            translateY: [14, 0],
            opacity: [0, 1],
            duration: 280,
            ease: "outQuad",
            onComplete: () => {
              timeoutId = setTimeout(cycle, 1800);
            },
          });
        },
      });
    };

    timeoutId = setTimeout(cycle, 1800);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <span className="relative inline-block h-[1.4em] w-28 overflow-hidden align-bottom">
      <span ref={wordRef} className="inline-block font-medium text-primary">
        {CYCLE_WORDS[0]}
      </span>
    </span>
  );
}

export function About() {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = createTimeline({ defaults: { ease: "outQuad" } });
    tl.add(".about-eyebrow", {
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 400,
    })
      .add(
        ".about-heading",
        { opacity: [0, 1], translateY: [16, 0], duration: 600 },
        "-=150",
      )
      .add(
        ".about-body",
        { opacity: [0, 1], translateY: [16, 0], duration: 500 },
        "-=300",
      )
      .add(
        ".about-tag",
        { opacity: [0, 1], translateY: [10, 0], duration: 400 },
        "-=200",
      );
  }, []);

  return (
    <section id="me" ref={scope} className="mx-auto max-w-2xl px-6 py-24">
      <p className="about-eyebrow mb-6 font-mono text-sm text-muted-foreground opacity-0">
        ~/arya/me
      </p>

      <h2 className="about-heading mb-6 font-display text-3xl font-semibold tracking-tight opacity-0 sm:text-4xl">
        a little about me
      </h2>

      <p className="about-body mb-6 text-[15.5px] leading-relaxed text-muted-foreground opacity-0">
        I&apos;m a second-year Computer Science student specializing in AI/ML at
        MIET, Meerut. Alongside coursework, I lead design as Graphics Head at
        GDG and help organize MLSA, including running national-level hackathons.
        I like taking projects the full distance — from Contract Guard, an
        AI-driven contract analysis platform, to TARANG, a crowdsourced
        disaster-response app — and I care as much about how a tool feels to use
        as how correctly it runs underneath.
      </p>

      <p className="about-tag flex flex-wrap items-center gap-1.5 text-[15.5px] text-muted-foreground opacity-0">
        I am a <RotatingWord />, and someone who doesn&apos;t like to think that
        there are any stupid projects.
      </p>
    </section>
  );
}
