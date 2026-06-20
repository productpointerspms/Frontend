import React from "react";
import { Montserrat } from "next/font/google";
import { Star } from "lucide-react";
import img1 from "@/assets/images/ppiptest1.jpg";
import img2 from "@/assets/images/ppiptest2.jpg";
import img3 from "@/assets/images/ppiptest3.jpg";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Comfort Kehinde Olowookere",
    role: "Product Manager",
    avatar:
      img1.src,
    quote:
      "My experience during the 6-week internship at ProductPointers was both insightful and transformative.\n\nThe program provided me with practical, hands-on exposure to Product Management, helping me move beyond theory into real-world application. I gained a deeper understanding of the importance of building products based on validated user needs, rather than assumptions. Through user research, surveys, and direct engagement with target users, I learned how to identify pain points and uncover meaningful opportunities. I also developed the ability to translate product ideas into a working MVP using AI tools and made significant progress in building a structured and professional product portfolio.\n\nOne of the most valuable outcomes of this experience is the confidence I have gained in my product thinking and execution.",
  },
  {
    name: "Kosarachi Promise Ogboo",
    role: "Product Manager",
    avatar:
      img2.src,
    quote:
      "My experience with the ProductPointers Internship Program has been outstanding. The practicality really stood out to me. I was involved in every phase, from problem discovery to validation, user research, MVP scoping, PRD, building, and roadmap planning and documentation. I worked on two live platforms, HabitaLink and Guidely, and improved my presentation skills significantly. What stood out most was the clarity. You don't just learn product management, you understand how to think and execute.\nAnd working with a real team took the experience over the roof for me. I went from confusion to confidently building functional products in a short time. I'd recommend the internship to any early-stage or transitioning product manager. It's worth it.",
  },
  {
    name: "Awusinu Oluwaseun Iretiola",
    role: "Product Manager",
    avatar:
      img3.src,
    quote:
      "I've done several internships before, but ProductPointers was far more intensive and hands-on. With the support of seasoned Product Managers who were always available to guide us, the weekly check-in, the experience stood out. It felt like more than an internship, it was my first real on-site job experience, pushing me to grow and gain practical, confidence-building skills.",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className={`${montserrat.className} bg-[#33438F] text-white py-20 px-6 md:px-12 lg:px-24`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            Evidence Speaks Louder Than Praise
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-4">
            Real products built. Real stakeholders served. Real careers launched.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white/[0.06] rounded-2xl p-6 border border-white/15 flex flex-col"
            >
              {/* Identity */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-11 h-11 rounded-full object-cover shrink-0"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-white text-base leading-tight">
                    {testimonial.name}
                  </span>
                  <span className="text-white/60 text-xs">{testimonial.role}</span>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/80 text-sm leading-relaxed italic whitespace-pre-line">
                {testimonial.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
