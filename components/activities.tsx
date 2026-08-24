"use client";

import { useEffect, useRef, useState } from "react";
import { createTimeline, stagger } from "animejs";
// Adjust this path to wherever the shadcn CLI placed the component in your project
// (e.g. run `find . -iname "AccordionGallery*"` if you're not sure).
import AccordionGallery, {
  type AccordionGalleryItem,
} from "@/components/ui/accordiangallery";

interface Activity extends AccordionGalleryItem {
  description: string;
}

const ACTIVITIES: Activity[] = [
  {
    label: "GDG — Graphics Head",
    description:
      "Leading visual design for Google Developer Group event branding, campaigns, and community materials.",
    image: "/gallery/gdg.jpg", // replace with a real photo in /public/gallery
  },
  {
    label: "MLSA — Organizer",
    description:
      "Organizing Microsoft Learn Student Ambassador initiatives and technical sessions on campus.",
    image: "/gallery/mlsa.jpg",
  },
  {
    label: "National Hackathons",
    description:
      "Running and mentoring at national-level hackathons, from problem statements to judging.",
    image: "/gallery/hackathons.jpg",
  },
  {
    label: "Linux & Desktop Craft",
    description:
      "Tinkering with a Tokyonight-themed GNOME setup — down to compositor tweaks and terminal aesthetics.",
    image: "/gallery/linux.jpg",
  },
];

const DEFAULT_INDEX = 0;

export function Activities() {
  const scope = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(DEFAULT_INDEX);

  useEffect(() => {
    const section = scope.current;
    if (!section) return;

    const headingEl = section.querySelector(".activities-heading");
    // AccordionGallery renders each panel with role="listitem" — target those
    // directly for the same entrance stagger the old custom panels had.
    const panelEls = section.querySelectorAll('[role="listitem"]');
    const captionEl = section.querySelector(".activities-caption");

    if (!headingEl || panelEls.length === 0) return;

    const tl = createTimeline({ defaults: { ease: "outQuad" } });
    tl.add(headingEl, {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 600,
    }).add(
      panelEls,
      {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 500,
        delay: stagger(80),
      },
      "-=300",
    );

    if (captionEl) {
      tl.add(captionEl, { opacity: [0, 1], duration: 400 }, "-=200");
    }
  }, []);

  const active = ACTIVITIES[activeIndex];

  return (
    <section
      id="activities"
      ref={scope}
      className="mx-auto max-w-5xl scroll-mt-40 px-6 pb-24 pt-40"
    >
      <h2 className="activities-heading mb-16 text-center font-display text-3xl font-semibold tracking-tight opacity-0 sm:text-4xl">
        beyond the code!
      </h2>

      <AccordionGallery
        items={ACTIVITIES}
        defaultIndex={DEFAULT_INDEX}
        trigger="hover"
        showLabels
        grayscale
        height={320}
        radius={12}
        onActiveChange={setActiveIndex}
      />

      <div className="activities-caption mx-auto mt-6 max-w-xl text-center opacity-0">
        <p className="font-display text-base font-semibold text-foreground">
          {active?.label}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {active?.description}
        </p>
      </div>
    </section>
  );
}
