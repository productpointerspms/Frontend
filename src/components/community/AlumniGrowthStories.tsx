import React from "react";
import Image from "next/image";
import { bricolage } from "@/lib/fonts";

// Headings share the PPIP/PPAP display face — variable weight covers 200-800.
const AlumniGrowthStories = () => {
  const testimonials = [
    {
      name: "Mercy Adeniyi",
      role: "Product Manager",
      avatar: "/images/mercyA.png",
      text: "Before joining ProductPointers, I was just another person on LinkedIn, trying to find my way, connecting randomly, and hoping to grow. Then I met The GlobalPM, and that completely changed things for me. Joining ProductPointers gave me clarity, structure, and confidence. From optimizing my LinkedIn profile to learning how to truly show up as me, the transformation has been amazing. I've moved from just trying to connect with people to actually building a community that relates to my stories. One thing the GlobalPM said that stuck with me was, \"Don't play small.\" That line changed everything. I stopped hiding parts of myself and started owning my growth. Product Pointers has helped me redefine my personal brand, find my voice, and attract the right kind of opportunities. If you're thinking about joining, do it, but come ready to learn and grow. You'll be glad you did.",
    },
    {
      name: "Reuben Edosa",
      role: "Product Manager",
      avatar: "/images/reuben.png",
      text: "Before joining the Community, I struggled to position myself as a product manager on LinkedIn. I wasn't fully aware of how to communicate my value, create engaging content or build a strong personal brand. But since joining, I've had a transformational experience! I've learned to optimize my profile, create impactful content, and craft a personal brand strategy. The book reading sessions helped me to develop a deeper understanding and practical application of product thinking. The community taught me I'm a brand and helped me gain clarity, confidence, and visibility in my product management journey. Thank you for building such an empowering and supportive community.",
    },
    {
      name: "Dum Vic Yorgbara",
      role: "Product Manager",
      avatar: "/images/dum.png",
      text: "Before joining the community, I had a basic understanding of product management and personal branding, but lacked structure and struggled with consistency. Since joining, I've grown remarkably - learning practical strategies, reviving my reading habit, and gaining clarity on positioning myself. The community solved my inconsistency challenge and provided invaluable benefits like a supportive network, practical learning, and accountability. It's enhanced my confidence, strengthened my knowledge, and positioned me for future opportunities.",
    },
  ];

  return (
    <section
      aria-labelledby="alumni-stories-heading"
      className="bg-white px-6 py-16 sm:px-10 md:px-14 lg:px-20 lg:py-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <p className="mb-4 text-[14px] font-bold uppercase tracking-[0.1em] text-[#5818D0]">
          Alumni Growth Stories
        </p>
        <h2
          id="alumni-stories-heading"
          className={`${bricolage.className} text-[#100B1A] text-[22px] font-extrabold leading-[1.15] tracking-[-0.04em] sm:text-[38px] lg:text-[38px] xl:text-[40px]`}
        >
          Hear From Alumni Who Kept Growing.
        </h2>

        <div className="mt-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          <figure className="rounded-2xl bg-[#5818D0] p-6 text-white sm:p-12">
            <div aria-hidden="true" className="mb-6 h-0.5 w-[42px] bg-white" />
            <blockquote className="text-[14px] leading-[2.38] text-white/95">
              {testimonials[0].text}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-6 border-t border-white/70 pt-8">
              <Image
                src={testimonials[0].avatar}
                alt={testimonials[0].name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-[14px] font-bold">{testimonials[0].name}</p>
                <p className="mt-1 text-[12px] font-semibold text-[#FFBB1D]">
                  {testimonials[0].role}
                </p>
              </div>
            </figcaption>
          </figure>

          <div className="grid gap-6">
            {testimonials.slice(1).map((testimonial) => (
              <figure
                key={testimonial.name}
                className="rounded-2xl border border-[#BDBDBD] p-6 text-[#100B1A] sm:px-8 sm:py-6"
              >
                <blockquote className="text-[14px] leading-[25px]">
                  {testimonial.text}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-6 border-t border-[#BDBDBD] pt-6">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-[14px] font-bold">{testimonial.name}</p>
                    <p className="mt-1 text-[12px] font-semibold text-[#5818D0]">
                      {testimonial.role}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlumniGrowthStories;
