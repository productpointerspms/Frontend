import React from "react";
import ProgramHero from "@/components/PPMP/Herosection"
import ProblemSection from "@/components/PPMP/ProblemSection";


const PPMPPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <ProgramHero />
      <ProblemSection />
    </main>
  );
};

export default PPMPPage;
