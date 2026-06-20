import React from "react";
import { Check } from "lucide-react";
import { Montserrat } from "next/font/google";
import img from "@/assets/images/another.png";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const items = [
  "Solve a real stakeholder problem",
  "Conduct real user research",
  "Build a real MVP",
  "Launch publicly",
  "Gather actual user feedback",
  "Receive mentor verification",
  "Build a ProductPointers Talent Profile",
  "Create evidence recruiters can inspect",
];

const NotAnotherInternship: React.FC = () => {
  return (
    <section
      className={`${montserrat.className} bg-[#FCF1FF] py-20 px-6 md:px-12 lg:px-24`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: heading + checklist */}
        <div className="order-1">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1a1a1a] mb-5 leading-tight">
            This Is Not Another PM <br className="hidden md:block" />
            Internship
          </h2>
          <p className="text-gray-500 text-sm md:text-base mb-8 max-w-md">
            Most programs teach Product Management. PPIP helps you prove Product
            Management. Instead of working on fictional projects, you&apos;ll:
          </p>

          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item}
                className="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4 flex items-center gap-3"
              >
                <Check className="w-5 h-5 text-green-500 shrink-0" strokeWidth={2.5} />
                <span className="text-[#1a1a1a] text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: image */}
        <div className="order-2 rounded-3xl overflow-hidden shadow-lg lg:sticky lg:top-24">
          <img
            src={img.src}
            alt="A product manager working on a laptop"
            className="w-full aspect-[4/3] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default NotAnotherInternship;
