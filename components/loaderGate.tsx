// components/loader-gate.tsx
"use client";

import { useState } from "react";
import { GreetingLoader } from "@/components/greeting-loader";

export function LoaderGate({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(
    () => typeof window !== "undefined" && !sessionStorage.getItem("greeted"),
  );

  const handleComplete = () => {
    sessionStorage.setItem("greeted", "1");
    setLoading(false);
  };

  return (
    <>
      {loading && <GreetingLoader onComplete={handleComplete} />}
      {children}
    </>
  );
}
