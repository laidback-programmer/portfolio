"use client";

import { useEffect, useRef } from "react";
import { animate, createTimeline } from "animejs";

export function Projects() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = scope.current;
    if (!section) return;

    const headingEl = section.querySelector(".projects-heading");
    const bodyEl = section.querySelector(".projects-body");

    if (!headingEl || !bodyEl) return;

    const tl = createTimeline({ defaults: { ease: "outQuad" } });
    tl.add(headingEl, { opacity: [0, 1], translateY: [16, 0], duration: 600 })
      .add(
        bodyEl,
        { opacity: [0, 1], translateY: [12, 0], duration: 500 },
        "-=300",
      );
  }, []);

  return (
    <section
      ref={scope}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-10 text-center"
    >
      <h2 className="projects-heading mb-4 text-3xl font-bold text-primary">
        Projects
      </h2>
      <p className="projects-body max-w-xl text-lg text-secondary">
        Here are some of my recent projects:
      </p>
      <ul className="projects-list mt-6 grid grid-cols-1 gap-4 text-left text-secondary sm:grid-cols-2">
        <li>Project 1</li>
        <li>Project 2</li>
        <li>Project 3</li>
      </ul>
    </section>
  );
}
