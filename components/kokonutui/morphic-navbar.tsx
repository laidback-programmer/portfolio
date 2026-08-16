"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import initialsLogo from "../initials(1).svg";

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
    <nav className={clsx("mx-auto max-w-4xl px-4 py-2", className)}>
      <div className="flex items-center justify-center">
        <div className="glass flex items-center justify-between overflow-hidden rounded-xl">
          {Object.entries(items).map(([path, { name }], index, array) => {
            const isActive = isActiveLink(path);
            const isFirst = index === 0;
            const isLast = index === array.length - 1;
            const prevPath = index > 0 ? array[index - 1][0] : null;
            const nextPath =
              index < array.length - 1 ? array[index + 1][0] : null;

            return (
              <Link
                className={clsx(
                  "flex items-center justify-center bg-black p-1.5 px-4 text-sm text-white transition-all duration-300 dark:bg-white dark:text-black",
                  isActive
                    ? "mx-2 rounded-xl font-semibold text-sm"
                    : clsx(
                        (isActiveLink(prevPath || "") || isFirst) &&
                          "rounded-l-xl",
                        (isActiveLink(nextPath || "") || isLast) &&
                          "rounded-r-xl"
                      )
                )}
                href="#"
                key={path}
                onClick={() => setActivePath(path)}
              >
                {name}
              </Link>
            );
          })}
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
