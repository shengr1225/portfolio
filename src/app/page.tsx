"use client";

import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import GrowthPreview from "@/components/GrowthPreview";

const Page = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <main className="min-h-screen bg-[#0B1120] overflow-hidden relative">
      <Navigation />
      <Hero isMobile={isMobile} />
      <Projects />
      <GrowthPreview />
    </main>
  );
};

export default Page;
