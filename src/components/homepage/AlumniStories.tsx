import React, { useState } from "react";
import { Montserrat } from "next/font/google";

import { ChevronLeft, ChevronRight } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  badge: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Favor Osaro",
    role: "Product Manager",
    company: "",
    badge: "From Healthcare to Tech in 3 Months",
    quote:
      "ProductPointers helped me pivot from healthcare into tech, rebuild my confidence, and land my first Project Manager role all within just a few months. It truly transformed my career and mindset.",
    image: "/images/favour1.png",
  },
  {
    id: 2,
    name: "Chinonso Esther",
    role: "Product Manager",
    company: "Interswitch",
    badge: "From confusion to confidence in just 3 months.",
    quote:
      "Before ProductPointers, I felt lost and unsure of my next steps. The hands-on projects and real user interviews changed how I work completely. Now, I've gained confidence and even landed two interviews, including one at Interswitch.",
    image: "/images/esther.png", // Update with your actual filename
  },
];
export default function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <div
      className={`${montserrat.className} md:bg-[#FCF1FF] bg-linear-to-b from-[#FAE1FF] to-[#FCF1FF] px-4 md:px-0 overflow-hidden`}
    >
      <h3 className="text-center md:text-[#14010D] text-[#15010D] md:hidden block font-bold text-xl pt-14 md:pt-0 md:text-4xl md:leading-12 leading-normal pb-4 md:pb-6">
        Alumni Success Stories
      </h3>
      <p className="text-[#364153] mx-auto text-center md:hidden block text-[11px] md:text-[18px] font-normal leading-5 md:leading-7 md:w-[750px] w-[340px] pb-[84px] ">
        Our alumni are now leading product teams at the world's most innovative
        companies. Here are just a few of their incredible journeys.
      </p>
      <div className="min-h-screen bg-linear-to-b from-[#FAE1FF] pt-10 to-[#FCF1FF] flex items-center justify-center md:px-[30px] px-0">
        <div className="max-w-6xl w-full md:w-[1400px] relative md:px-[30px]">
          <div className="bg-white md:h-[415px] shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left side - Image */}
              <div className="relative h-[333px] md:h-[415px] ">
                <img
                  src={activeTestimonial.image}
                  alt={activeTestimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right side - Content */}
              <div className="px-6 py-4 flex flex-col justify-between">
                <div className="flex-1">
                  <h2 className="text-[21px] font-bold text-[#14010D] leading-8 md:pt-10 pt-0 mb-2">
                    {activeTestimonial.name}
                  </h2>
                  <p className=" text-[#5C1CC5] font-bold  text-[14px] leading-6 mb-[18px]">
                    {activeTestimonial.role}
                  </p>
                  <p className=" text-[#000000] font-normal  text-[14px] leading-6 mb-4">
                    {activeTestimonial.company}
                  </p>
                  <div className="inline-block mb-6">
                    <span className="rounded-[57384700px] bg-[rgba(92,28,197,0.30)] text-[#5C1CC5] px-3 py-2 text-xs font-normal leading-5">
                      {activeTestimonial.badge}
                    </span>
                  </div>

                  <p className="text-[#000000] text-[14px] font-light leading-[29.25px] italic">
                    {activeTestimonial.quote}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-8">
            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    index === activeIndex
                      ? "w-[13px] h-[13px] bg-[#5C1CC5]"
                      : "w-[13px] h-[13px] bg-[#FFFFFF] hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
          {/* Arrow Buttons - Positioned outside the card */}
          {/* Show Previous button only if not on first slide */}
          {activeIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-purple-600 hover:text-purple-600 transition-all duration-300 shadow-lg cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Show Next button only if not on last slide */}
          {activeIndex < testimonials.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute md:right-0 right-10 md:top-1/2 top-[260px] -translate-y-1/2 translate-x-6 w-[47px] h-[47px] rounded-full bg-white hover:text-white text-[#5C1CC5] flex items-center justify-center hover:bg-purple-700 transition-all duration-300 shadow-lg cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}