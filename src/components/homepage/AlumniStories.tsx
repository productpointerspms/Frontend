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
  badge: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Favor Osaro",
    role: "Product Manager",
    badge: "From Healthcare to Tech in 3 Months",
    quote:
      "ProductPointers helped me pivot from healthcare into tech, rebuild my confidence, and land my first Project Manager role all within just a few months. It truly transformed my career and mindset.",
    image: "/images/favour.png", // Update with your actual filename
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "UX Designer",
    badge: "Career Switch in 4 Months",
    quote:
      "The program gave me the tools and confidence to transition from marketing to UX design. The mentorship and hands-on projects made all the difference in landing my dream role.",
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
      className={`${montserrat.className} md:bg-[#FCF1FF] bg-[#FAE1FF] px-4 md:px-0`}
    >
      <h3 className="text-center md:text-[#14010D] text-[#15010D] font-bold text-2xl pt-14 md:pt-0 md:text-5xl md:leading-12 leading-normal pb-4 md:pb-6">
        Alumni Success Stories
      </h3>
      <p className="text-[#364153] mx-auto text-center text-[12px] md:text-[20px] font-normal leading-5 md:leading-7 md:w-[750px] w-[340px] pb-[84px] ">
        Our alumni are now leading product teams at the world's most innovative
        companies. Here are just a few of their incredible journeys.
      </p>
      <div className="min-h-screen bg-[#FAE1FF] md:bg-linear-to-b from-[#FAE1FF] to-[#FCF1FF] flex items-center justify-center md:px-[30px] px-0">
        <div className="max-w-6xl w-full relative">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left side - Image */}
              <div className="relative h-96 md:h-auto bg-gray-200">
                <img
                  src={activeTestimonial.image}
                  alt={activeTestimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right side - Content */}
              <div className="p-12 flex flex-col justify-between">
                <div className="flex-1">
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">
                    {activeTestimonial.name}
                  </h2>
                  <p className="text-xl text-purple-600 font-semibold mb-4">
                    {activeTestimonial.role}
                  </p>

                  <div className="inline-block mb-6">
                    <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                      {activeTestimonial.badge}
                    </span>
                  </div>

                  <p className="text-gray-600 text-lg leading-relaxed italic">
                    {activeTestimonial.quote}
                  </p>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-center mt-8">
                  {/* Dots Indicator */}
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`transition-all duration-300 rounded-full ${
                          index === activeIndex
                            ? "w-4 h-4 bg-purple-600"
                            : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow Buttons - Positioned outside the card */}
          {/* Show Previous button only if not on first slide */}
          {activeIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-purple-600 hover:text-purple-600 transition-all duration-300 shadow-lg"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Show Next button only if not on last slide */}
          {activeIndex < testimonials.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 transition-all duration-300 shadow-lg"
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
