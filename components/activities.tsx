"use client";

import { useEffect, useRef, useState } from "react";
import { createTimeline, stagger } from "animejs";
import Image from "next/image";
import AccordionGallery, {
  type AccordionGalleryItem,
} from "@/components/ui/accordiangallery";

interface Activity extends AccordionGalleryItem {
  description: string;
  photos: string[];
}

const ACTIVITIES: Activity[] = [
  {
    label: "Samaarambh 2.0 2025",
    description:
      "Leading visual design for Google Developer Group event branding, campaigns, and community materials.",
    image: "/activities_assets/samarambh/samarambh.png",
    photos: [
      "/activities_assets/maadhyam2k26/view.jpg",
      "/gallery/samaarambh-2.jpg",
      "/gallery/samaarambh-3.jpg",
    ],
  },
  {
    label: "Devgathering 2025",
    description:
      "Organizing Microsoft Learn Student Ambassador initiatives and technical sessions on campus.",
    image: "/activities_assets/devgathering/devgatheringg.png",
    photos: [
      "/gallery/devgathering-1.jpg",
      "/gallery/devgathering-2.jpg",
      "/gallery/devgathering-3.jpg",
    ],
  },
  {
    label: "GDG Orientation 2025",
    description:
      "Leading visual design for Google Developer Group event branding, campaigns, and community materials.",
    image: "/gallery/gdg.jpg",
    photos: [
      "/gallery/orientation-1.jpg",
      "/gallery/orientation-2.jpg",
      "/gallery/orientation-3.jpg",
    ],
  },
  {
    label: "Maadhyam 2026",
    description:
      "Leading visual design for Google Developer Group event branding, campaigns, and community materials.",
    image: "/activities_assets/maadhyam2k26/schedule.png",
    photos: [
      "/activities_assets/maadhyam2k26/view.JPG",
      "/activities_assets/maadhyam2k26/outer_view.jpg",
      "/activities_assets/maadhyam2k26/myteam.jpg",
      "/activities_assets/maadhyam2k26/myteam2.jpg",
      "/activities_assets/maadhyam2k26/thankyounote.JPG",
    ],
  },
  {
    label: "Hack Heist 2025+26",
    description:
      "Running and mentoring at national-level hackathons, from problem statements to judging.",
    image: "/gallery/hackathons.jpg",
    photos: [
      "/gallery/hackheist-1.jpg",
      "/gallery/hackheist-2.jpg",
      "/gallery/hackheist-3.jpg",
    ],
  },
];

const DEFAULT_INDEX = 0;

export function Activities() {
  const scope = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(DEFAULT_INDEX);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const active = ACTIVITIES[activeIndex];
  const opened = openIndex !== null ? ACTIVITIES[openIndex] : null;

  useEffect(() => {
    if (!selectedPhoto) return;

    const container = document.getElementById("photo-viewer");

    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        container.scrollLeft += event.deltaY;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [selectedPhoto]);

  useEffect(() => {
    if (!selectedPhoto || !opened) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const currentIndex = opened.photos.indexOf(selectedPhoto);

      if (event.key === "Escape") {
        setSelectedPhoto(null);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        const nextIndex =
          currentIndex === opened.photos.length - 1 ? 0 : currentIndex + 1;

        setSelectedPhoto(opened.photos[nextIndex]);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        const previousIndex =
          currentIndex === 0 ? opened.photos.length - 1 : currentIndex - 1;

        setSelectedPhoto(opened.photos[previousIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhoto, opened]);

  useEffect(() => {
    const section = scope.current;
    if (!section) return;

    const headingEl = section.querySelector(".activities-heading");
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

    const cleanups: Array<() => void> = [];
    panelEls.forEach((el, i) => {
      const toggle = () => setOpenIndex((prev) => (prev === i ? null : i));

      const onClick = () => toggle();
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      };

      el.addEventListener("click", onClick);
      el.addEventListener("keydown", onKeyDown as EventListener);
      cleanups.push(() => {
        el.removeEventListener("click", onClick);
        el.removeEventListener("keydown", onKeyDown as EventListener);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section
      id="activities"
      ref={scope}
      className="mx-auto w-full max-w-6xl scroll-mt-40 px-6 pb-24 pt-40"
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
      <h2 className="activities-heading mb-24 text-center font-display text-3xl font-semibold tracking-tight opacity-0 sm:text-5xl">
        beyond the code~
      </h2>
      <AccordionGallery
        items={ACTIVITIES}
        defaultIndex={DEFAULT_INDEX}
        trigger="hover"
        height={320}
        radius={12}
        onActiveChange={setActiveIndex}
      />
      <div className="activities-caption mx-auto mt-7 max-w-2xl text-center opacity-0">
        <p className="mt-2 text-sm text-muted-foreground">
          {active?.description}
        </p>
        <p className="mt-10 font-mono text-xs text-white">
          click an event above to view photos
        </p>
      </div>
      <div
        className={`grid overflow-y-hidden transition-all duration-500 ease-in-out ${
          opened
            ? "mt-8 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          {opened && (
            <div className="relative left-1/2 w-[100vw] -translate-x-1/2">
              <div className="px-6 lg:px-10">
                <div className="mb-6">
                  <button
                    onClick={() => setOpenIndex(null)}
                    className="font-mono text-xs text-muted-foreground transition-colors duration-300 hover:text-white"
                  >
                    close
                  </button>
                </div>

                <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 hide-scrollbar">
                  {opened.photos.map((photo) => (
                    <button
                      key={photo}
                      type="button"
                      onClick={() => setSelectedPhoto(photo)}
                      className="group relative h-[300px] w-[450px] shrink-0 snap-start overflow-hidden rounded-xl text-left outline-none sm:h-[400px] sm:w-[600px] lg:h-[480px] lg:w-[720px]"
                    >
                      <Image
                        src={photo}
                        alt={`${opened.label} photo`}
                        fill
                        sizes="(max-width: 640px) 450px, (max-width: 1024px) 600px, 720px"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                        <span className="rounded-full bg-black/50 px-4 py-2 font-mono text-xs text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                          click to expand
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            className="absolute right-6 top-6 z-50 border-rounded font-mono text-xs text-muted-foreground transition-colors duration-300 hover:text-white"
          >
            close
          </button>

          <div
            className="relative flex h-full w-full items-center justify-center p-6 sm:p-10 lg:p-16"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[85vh] w-full max-w-7xl">
              <Image
                src={selectedPhoto}
                alt={`${opened?.label ?? "Activity"} photo`}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
