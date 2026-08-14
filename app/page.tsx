"use client";

import { useState } from "react";
import { GreetingLoader } from "@/components/greeting-loader";
import { Hero } from "@/components/hero";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main>
      {loading && <GreetingLoader onComplete={() => setLoading(false)} />}
      <Hero />
    </main>
  );
}
