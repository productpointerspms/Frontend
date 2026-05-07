import React from "react";
import { Star } from "lucide-react";
import { Montserrat } from "next/font/google";

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
    text: "“Before PPAP, I had learned the basics but still felt completely lost. This program gave me the structure and clarity I was missing, and for the first time, I truly understood how Product Managers think and work.”",
    author: {
      name: "Mercy Adeniyi",
      role: "Product Manager",
      image: "/images/mercy.png",
    },
  },
  {
    id: 2,
    rating: 5,
    text: "“PPMP helped me move from just understanding concepts to actually applying them. I became more confident in my decisions and finally felt like I could execute like a real Product Manager.”",
    author: {
      name: "Reuben Edosa",
      role: "Product Manager",
      image: "/images/reuben.png",
    },
  },
  {
    id: 3,
    rating: 5,
    text: "“PPCP helped me position myself properly and stand out. I went from feeling unsure to confidently applying for roles, and I started getting real opportunities.”",
    author: {
      name: "Dum Vick Yorgbara",
      role: "Product Manager",
      image: "/images/dum.png",
    },
  },
  {
    id: 4,
    rating: 5,
    text: "“ProductPointers gave me a community that lifted me when I almost quit. I'm deeply thankful for the impact it has had on my career growth and my confidence levels.”",
    author: {
      name: "Olagunju Oluwanifesimi",
      role: "Product Manager",
      image: "/images/nife.png",
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#14010D] mb-4">
            Don’t Just Take Our Word For It
          </h2>
          <p className="text-[#6D6D6D] text-lg md:text-xl font-normal max-w-3xl mx-auto leading-relaxed">
            See how ProductPointers has helped aspiring Product Managers gain
            real experience and get job-ready
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