"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
//import initialsLogo from "../initials(1).svg";

interface NavItem {
  name: string;
}

interface MorphicNavbarProps {
  items?: Record<string, NavItem>;
  defaultPath?: string;
  className?: string;
}

const DEFAULT_NAV_ITEMS: Record<string, NavItem> = {
  "#hero": { name: "home" },
  "#me": { name: "about" },
  "#projects": { name: "projects" },
  "#skills": { name: "skills" },
  "#activities": { name: "activities" },
  "#contact": { name: "contact" },
};

export function MorphicNavbar({
  items = DEFAULT_NAV_ITEMS,
  defaultPath = "#hero",
  className,
}: MorphicNavbarProps) {
  const [activePath, setActivePath] = useState(defaultPath);

  const isActiveLink = (path: string) => {
    return activePath === path;
  };

  const handleClick = (path: string) => {
    setActivePath(path);
    if (path.startsWith("#")) {
      const el = document.querySelector(path);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const sections = Object.keys(items).filter((path) => path.startsWith("#"));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActivePath(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      },
    );

    sections.forEach((path) => {
      const el = document.querySelector(path);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      className={clsx("fixed top-0 left-0 right-0 z-50 px-6 py-5", className)}
    >
      <div className="mx-auto flex max-w-[100rem] items-center">
        {/* Left: Logo */}
        <div className="flex w-24 items-center justify-start">
          <Link
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleClick("#hero");
            }}
            className="-ml-6"
          >
            {/* <Image
              src={initialsLogo}
              alt="Initials"
              priority
              className="size-30"
            /> */}
          </Link>
        </div>

        {/* Center: Nav pill (stays centered) */}
        <div className="flex flex-1 justify-center">
          <div
            className={clsx(
              "flex items-center gap-1 rounded-2xl border border-white/10",
              "bg-black/30 backdrop-blur-xl",
              "px-2 py-2 shadow-2xl shadow-black/20",
            )}
          >
            {Object.entries(items).map(([path, { name }]) => {
              const isActive = isActiveLink(path);

              return (
                <Link
                  key={path}
                  href={path}
                  onClick={(e) => {
                    if (path.startsWith("#")) {
                      e.preventDefault();
                    }
                    handleClick(path);
                  }}
                  className={clsx(
                    "relative rounded-xl px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300",
                    isActive
                      ? "bg-white text-black shadow-lg shadow-white/10"
                      : "text-white/70 hover:bg-white/10 hover:text-white",
                  )}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right: Invisible spacer (same width as left) */}
        <div className="w-24" />
      </div>
    </nav>
  );
}

export default MorphicNavbar;
