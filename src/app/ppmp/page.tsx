import React from "react";
import { buildMetadata } from "@/lib/seo";
import ProgramHero from "@/components/PPMP/Herosection"
import ProblemSection from "@/components/PPMP/ProblemSection";


export const metadata = buildMetadata({
  title: "Product Management Mastery Program (PPMP)",
  path: "/ppmp",
});

const PPMPPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <ProgramHero />
      <ProblemSection />
    </main>
  );
};

export default PPMPPage;
