import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Add the weights you need
});

interface Testimonial {
  id: number;
  rating: number;
  text: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    rating: 5,
    text: "ProductPointers gave me clarity, confidence, and direction. I've gone from random networking to building genuine connections and growing with purpose.",
    author: {
      name: "Mercy Adeniyi",
      role: "Product Manager",
      image: "/images/mercy.png",
    },
  },
  {
    id: 2,
    rating: 5,
    text: "ProductPointers gave me the structure and accountability I lacked. I've built consistency, confidence, and clarity and it's positioning me for exciting opportunities ahead.",
    author: {
      name: "Dum Vick Yorgbara",
      role: "Product Manager",
      image: "/images/dum.png",
    },
  },
  {
    id: 3,
    rating: 5,
    text: "I thought I was joining for career growth, but I soon saw God's hand in it. ProductPointers gave me a community that lifted me when I almost quit. I'm deeply thankful for the impact.",
    author: {
      name: "Olagunju Oluwanifesimi",
      role: "Product Manager",
      image: "/images/nife.png",
    },
  },
  {
    id: 4,
    rating: 5,
    text: "ProductPointers helped me go from uncertain to confident. I learned to position myself, build my brand, and communicate my value clearly. It's been a powerful step in my product management journey.",
    author: {
      name: "Reuben Edosa",
      role: "Product Manager",
      image: "/images/reuben.png",
    },
  },
];

export default function TestimonialSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(testimonials.length / 4);
  const startIndex = currentPage * 4;
  const visibleTestimonials = testimonials.slice(startIndex, startIndex + 4);

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <div
      className={`${montserrat.className} w-full min-h-screen bg-[#FCF1FF] py-20 px-4 md:px-20`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl  md:text-5xl leading-12 font-bold text-[#14010D] mb-6">
            What Our Community Says
          </h2>
          <p className="text-[#364153]  text-[20px] font-normal leading-7 pb-20 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from the product leaders
            who've transformed their careers through ProductPointers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {visibleTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/80 backdrop-blur-sm rounded-[14px] p-8 transition-shadow duration-300 hover:shadow-[0_2px_8px_4px_rgba(20,1,49,0.10)]"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#FFCC00] text-[#FFCC00]"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-[#6D6D6D] text-[16px] italic leading-[30px] font-normal mb-6">
                {testimonial.text}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-2">
                <img
                  src={testimonial.author.image}
                  alt={testimonial.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-[#15010D] text-[16px] leading-6">
                    {testimonial.author.name}
                  </h4>
                  <p className="text-sm text-[#5C1CC5] font-normal leading-5">
                    {testimonial.author.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
