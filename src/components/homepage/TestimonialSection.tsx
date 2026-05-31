import React from "react";
import { Star } from "lucide-react";
import { Montserrat } from "next/font/google";
import img1 from "@/assets/images/favour.jpg"
import img2 from "@/assets/images/chino.png"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    text: "ProductPointers helped me pivot from healthcare into tech, rebuild my confidence, and land my first Project Manager role all within just a few months. It truly transformed my career and mindset.",
    author: {
      name: "Favour Osaro",
      role: "Product Manager",
      image:img1.src,
    },
  },
  {
    id: 2,
    rating: 5,
    text: "Before ProductPointers, I felt lost and unsure of my next steps. The hands-on projects and real user interviews changed how I work completely. Now, I’ve gained confidence and even landed two interviews, including one at Interswitch.",
    author: {
      name: "Chinonso Esther",
      role: "Product Manager",
      image:img2.src,
    },
  },
  {
    id: 3,
    rating: 5,
    text: "ProductPointers helped me go from uncertain to confident. I learned to position myself, build my brand, and communicate my value clearly. It’s been a powerful step in my product management journey.",
    author: {
      name: "Reuben Edosa",
      role: "Product Manager",
      image: "/images/reuben.png",
    },
  },
  {
    id: 4,
    rating: 5,
    text: "ProductPointers gave me the structure and accountability I lacked. I’ve built consistency, confidence, and clarity and it’s positioning me for exciting opportunities ahead.",
    author: {
      name: "Dum Vick Yorgbara",
      role: "Product Manager",
      image: "/images/dum.png",
    },
  },
];

export default function TestimonialSection() {
  return (
    <div
      className={`${montserrat.className} w-full bg-white py-16 px-4 md:px-10 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[1.1rem] min-[375px]:text-[1.3rem] sm:text-3xl md:text-4xl font-bold text-[#14010D] mb-4 whitespace-nowrap sm:whitespace-normal">
            Don’t Just Take Our Word For It
          </h2>
          <p className="text-[#6D6D6D] text-[12px] min-[375px]:text-[14px] sm:text-lg md:text-xl font-normal max-w-3xl mx-auto leading-relaxed">
            <span className="whitespace-nowrap sm:whitespace-normal">See how ProductPointers has helped aspiring Product</span><br className="block md:hidden" />
            <span className="whitespace-nowrap sm:whitespace-normal">Managers gain real experience and get job-ready</span>
          </p>
        </div>

        {/* Testimonials Horizontal Scroll Container */}
        <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#5C1CC5] min-w-[320px] md:min-w-[400px] rounded-[24px] p-8 snap-center flex flex-col justify-between"
            >
              <div>
                {/* Author Info at top */}
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.author.image}
                    alt={testimonial.author.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white/20"
                  />
                  <div>
                    <h4 className="font-bold text-white text-lg">
                      {testimonial.author.name}
                    </h4>
                    <p className="text-sm text-white/70 font-normal">
                      {testimonial.author.role}
                    </p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#FFB800] text-[#FFB800]"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-white text-[15px] leading-[24px] font-normal">
                  {testimonial.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}