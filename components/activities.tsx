"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { createTimeline, stagger } from "animejs";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      "Organizing a technical talk event with 100+ attendees, including a workshops on Cloud and networking opportunities.",
    image: "/activities_assets/samarambh/samarambh.png",
    photos: [
      "/activities_assets/samarambh/samarambh3.webp",
      "/activities_assets/samarambh/audience.jpeg",
      "/activities_assets/samarambh/1735489959183.webp",
      "/activities_assets/samarambh/team.webp",
      "/activities_assets/samarambh/me.webp",
      "/activities_assets/samarambh/prize.webp",
    ],
  },
  {
    label: "Devgathering 2025",
    description:
      "Oraginizing a national-level hackathon with 200+ attendees,  ",
    image: "/activities_assets/devgathering/devgatheringg.png",
    photos: [
      "/activities_assets/devgathering/banner.webp",
      "/activities_assets/devgathering/audience.webp",
      "/activities_assets/devgathering/random.webp",
      "/activities_assets/devgathering/team.webp",
      "/activities_assets/devgathering/team2.webp",
      "/activities_assets/devgathering/us.webp",
    ],
  },
  {
    label: "Maadhyam 2026",
    description:
      "Organizing a technical talk event with 100+ attendees, including a panel discussion and networking opportunities.",
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
    image: "/activities_assets/hackheist/hackathons.jpg",
    photos: [
      "/activities_assets/hackheist/banner.jpeg",
      "/activities_assets/hackheist/snaps.png",
      "/activities_assets/hackheist/snap2.jpg",
      "/activities_assets/hackheist/hh26_banner.webp",
      "/activities_assets/hackheist/hh26_snap1.webp",
      "/activities_assets/hackheist/trophies_hh26.png",
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

  /*
   * Prevent background page scrolling while the fullscreen
   * photo viewer is open.
   */
  useEffect(() => {
    if (!selectedPhoto) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedPhoto]);

  /*
   * Keyboard navigation.
   */
  useEffect(() => {
    if (!selectedPhoto || !opened) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const currentIndex = opened.photos.indexOf(selectedPhoto);

      if (event.key === "Escape") {
        event.preventDefault();
        setSelectedPhoto(null);
        return;
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

  /*
   * Fullscreen photo navigation.
   */
  const goToPhoto = (direction: "previous" | "next") => {
    if (!selectedPhoto || !opened || opened.photos.length === 0) return;

    const currentIndex = opened.photos.indexOf(selectedPhoto);

    if (currentIndex === -1) return;

    const nextIndex =
      direction === "next"
        ? currentIndex === opened.photos.length - 1
          ? 0
          : currentIndex + 1
        : currentIndex === 0
          ? opened.photos.length - 1
          : currentIndex - 1;

    setSelectedPhoto(opened.photos[nextIndex]);
  };

  /*
   * Horizontal gallery navigation.
   */
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: "left" | "right") => {
    if (!galleryRef.current) return;

    const firstPhoto = galleryRef.current.querySelector<HTMLElement>("button");

    const amount = firstPhoto
      ? firstPhoto.offsetWidth + 16
      : galleryRef.current.clientWidth * 0.8;

    galleryRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  /*
   * Entrance animation + event interaction.
   */
  useEffect(() => {
    const section = scope.current;
    if (!section) return;

    const headingEl = section.querySelector(".activities-heading");
    const panelEls = section.querySelectorAll('[role="listitem"]');
    const captionEl = section.querySelector(".activities-caption");

    if (!headingEl || panelEls.length === 0) return;

    const tl = createTimeline({
      defaults: {
        ease: "outQuad",
      },
    });

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
      tl.add(
        captionEl,
        {
          opacity: [0, 1],
          duration: 400,
        },
        "-=200",
      );
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
      className="mx-auto w-full max-w-6xl scroll-mt-40 px-6 pb-18 pt-20"
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>

      {/* Heading */}
      <h2 className="activities-heading mb-24 text-center font-display text-3xl font-semibold tracking-tight opacity-0 sm:text-5xl">
        beyond the code~
      </h2>

      {/* Activity gallery */}
      <AccordionGallery
        items={ACTIVITIES}
        defaultIndex={DEFAULT_INDEX}
        trigger="hover"
        height={320}
        radius={12}
        onActiveChange={setActiveIndex}
      />

      {/* Activity caption */}
      <div className="activities-caption mx-auto mt-7 max-w-2xl text-center opacity-0">
        <p className="mt-2 text-sm text-muted-foreground">
          {active?.description}
        </p>

        <p className="mt-10 font-mono text-xs text-white">
          click an event above to view photos
        </p>
      </div>

      {/* Expanded photo strip */}
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
                {/* Close gallery */}
                <div className="mb-6">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(null)}
                    className="font-mono text-xs text-muted-foreground transition-colors duration-300 hover:text-white"
                  >
                    close
                  </button>
                </div>

                {/* Horizontal photo strip */}
                <div className="relative">
                  {/* Left strip arrow */}
                  <button
                    type="button"
                    aria-label="Previous photos"
                    onClick={() => scrollGallery("left")}
                    className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/60 hover:bg-white hover:text-black"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <div
                    ref={galleryRef}
                    className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 hide-scrollbar"
                  >
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

                  {/* Right strip arrow */}
                  <button
                    type="button"
                    aria-label="Next photos"
                    onClick={() => scrollGallery("right")}
                    className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/60 hover:bg-white hover:text-black"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen photo viewer */}
      {selectedPhoto &&
        opened &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Previous photo */}
            <button
              type="button"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                goToPhoto("previous");
              }}
              className="fixed left-4 top-1/2 z-[10000] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white hover:text-black sm:left-6 lg:left-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Next photo */}
            <button
              type="button"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                goToPhoto("next");
              }}
              className="fixed right-4 top-1/2 z-[10000] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white hover:text-black sm:right-6 lg:right-10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Main viewer */}
            <div
              className="flex h-full w-full items-center justify-center px-16 py-20 sm:px-20 lg:px-28"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[72vh] w-[min(78vw,1000px)]">
                {/* Close button */}
                <button
                  type="button"
                  aria-label="Close image viewer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhoto(null);
                  }}
                  className="absolute -top-8 right-0 z-[10000] font-mono text-xs text-muted-foreground transition-colors duration-300 hover:text-white sm:-top-9"
                >
                  close
                </button>

                {/* Photo */}
                <Image
                  src={selectedPhoto}
                  alt={`${opened.label} photo`}
                  fill
                  sizes="(max-width: 768px) 78vw, 1000px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}

export default Activities;
