import React from "react";
import { Montserrat, Bricolage_Grotesque } from "next/font/google";
import img1 from "@/assets/images/ppiptest1.jpg";
import img2 from "@/assets/images/ppiptest2.jpg";
import img3 from "@/assets/images/ppiptest3.jpg";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Variable font — covers the full 200–800 weight range used by the header.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  /**
   * Focal point for the circular crop. Second value is vertical: "0%" pins the
   * top of the photo, "50%" (the default) centres it, "100%" pins the bottom.
   */
  avatarPosition?: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Comfort Kehinde Olowookere",
    role: "Product Manager",
    avatar: img1.src,
    quote:
      "My experience during the 6-week internship at ProductPointers was both insightful and transformative.\nThe program provided me with practical, hands-on exposure to Product Management, helping me move beyond theory into real-world application. I gained a deeper understanding of the importance of building products based on validated user needs, rather than assumptions. Through user research, surveys, and direct engagement with target users, I learned how to identify pain points and uncover meaningful opportunities. I also developed the ability to translate product ideas into a working MVP using AI tools and made significant progress in building a structured and professional product portfolio.\nOne of the most valuable outcomes of this experience is the confidence I have gained in my product thinking and execution.",
  },
  {
    name: "Kosarachi Promise Ogboo",
    role: "Product Manager",
    avatar: img2.src,
    quote:
      "My experience with the ProductPointers Internship Program has been outstanding. The practicality really stood out to me. I was involved in every phase, from problem discovery to validation, user research, MVP scoping, PRD, building, and roadmap planning and documentation. I worked on two live platforms, HabitaLink and Guidely, and improved my presentation skills significantly. What stood out most was the clarity. You don't just learn product management, you understand how to think and execute.\nAnd working with a real team took the experience over the roof for me. I went from confusion to confidently building functional products in a short time. I'd recommend the internship to any early-stage or transitioning product manager. It's worth it.",
  },
  {
    name: "Awusinu Oluwaseun Iretiola",
    role: "Product Manager",
    avatar: img3.src,
    // Her head sits high in the frame — pull the crop up so it isn't clipped.
    avatarPosition: "center 10%",
    quote:
      "I've done several internships before, but ProductPointers was far more intensive and hands-on. With the support of seasoned Product Managers who were always available to guide us, the weekly check-in, the experience stood out. It felt like more than an internship, it was my first real on-site job experience, pushing me to grow and gain practical, confidence-building skills.",
  },
];

/** Avatar + name + role, shown under the divider on every card. */
const Attribution: React.FC<{
  testimonial: Testimonial;
  variant: "purple" | "light";
}> = ({ testimonial, variant }) => {
  const isPurple = variant === "purple";
  return (
    <div className="flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        style={{ objectPosition: testimonial.avatarPosition ?? "center" }}
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <span
          className={`${bricolage.className} text-[14px] font-bold leading-tight ${
            isPurple ? "text-white" : "text-[#10091A]"
          }`}
        >
          {testimonial.name}
        </span>
        <span
          className={`mt-[3px] text-[12px] font-medium ${
            isPurple ? "text-[#FDB913]" : "text-[#6024D0]"
          }`}
        >
          {testimonial.role}
        </span>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const [featured, ...rest] = testimonials;

  return (
    <section
      className={`${montserrat.className} bg-white px-6 py-[80px] text-[#10091A] sm:px-10 lg:px-[80px]`}
    >
      <div className="mx-auto max-w-[1280px]">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <p
          className={`${bricolage.className}
            mb-5
            text-[11px]
            font-bold
            uppercase
            tracking-[0.15em]
            text-[#6424E8]
          `}
        >
          FROM THE PEOPLE WHO DID THE WORK
        </p>

        <h2
          className={`${bricolage.className}
            text-[22px]
            font-extrabold
            leading-[1.15]
            tracking-[-0.04em]
            text-[#10091A]
            sm:text-[32px]
            lg:text-[30px]
          `}
        >
          See What the Experience Was Like From the Inside.
        </h2>

        {/* =====================================================
            TESTIMONIALS
        ====================================================== */}
        <div className="mt-[52px] grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Featured — purple */}
          <div className="flex flex-col rounded-[10px] bg-[#5A17D6] p-10 text-white sm:p-12">
            {/* Short rule, as in the design */}
            <span aria-hidden="true" className="mb-8 block h-[2px] w-10 bg-white/80" />

            <p className="whitespace-pre-line text-[14px] leading-[2] text-white/95">
              {featured.quote}
            </p>

            <div className="mt-auto border-t border-white/30 pt-6">
              <div className="pt-1">
                <Attribution testimonial={featured} variant="purple" />
              </div>
            </div>
          </div>

          {/* The rest — light */}
          <div className="flex flex-col gap-6">
            {rest.map((testimonial) => (
              <div
                key={testimonial.name}
                className="flex flex-col rounded-[12px] border border-gray-200 bg-white p-8"
              >
                <p className="whitespace-pre-line text-[14px] leading-[1.75] text-[#10091A]">
                  {testimonial.quote}
                </p>

                <div className="mt-auto border-t border-gray-200 pt-6">
                  <div className="pt-1">
                    <Attribution testimonial={testimonial} variant="light" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
