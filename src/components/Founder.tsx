import React from "react";
import Image from "next/image";

const Founder: React.FC = () => {
  return (
    <section className="w-full bg-white flex flex-col items-center justify-center py-20 px-4 md:px-10 text-[#15010D]">
      {/* ==== Title and Subtitle ==== */}
      <div className="text-center mb-16">
        <h2 className="text-[60px] md:text-[60px] font-bold font-[Montserrat] leading-[60px]">
          Founder’s Story
        </h2>
        <p className="text-[20px] font-[400] font-[Montserrat] leading-[28px] mt-3 max-w-[707px] mx-auto text-center text-[#4A5565]">
          The journey that led to creating ProductPointers
        </p>
      </div>

      {/* ==== Image + Text Section ==== */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-[84px] max-w-[1280px] w-full">
        {/* ==== Image Card with Purple Accent ==== */}
        <div className="relative w-full max-w-[555px] flex justify-center md:justify-start">
          {/* Purple accent layer behind image */}
          <div className="absolute -top-6 -left-6 w-full h-full bg-[#5C1CC5] rounded-[16px] z-0"></div>

          {/* Image */}
          <Image
            src="/images/Founder-Pic.png"
            alt="Founder Image"
            width={555}
            height={645}
            className="relative z-10 rounded-[16px] object-cover w-full h-auto"
            priority
          />
        </div>

        {/* ==== Text Area ==== */}
        <div className="max-w-[610px] w-full font-[Montserrat] text-[18px] leading-[28px] text-[#6D6D6D] space-y-5 mt-10 md:mt-0">
          <h3 className="text-[#15010D] text-[24px] font-semibold">
            <span className="text-[#6B00B3] text-[32px] align-middle">❝</span> Blessing Okomor
          </h3>
          <p className="text-[#6B00B3] font-[400] text-[18px] leading-[28px]">
            Founder, ProductPointers
          </p>

          <p>
            Blessing’s journey into tech didn’t begin the conventional way. With
            a strong background in Auditing, she spent years analyzing systems,
            solving business problems, and understanding how structure drives
            success. Yet, her heart always leaned toward something more, helping
            people grow, build, and find purpose through product.
          </p>

          <p>
            Her transition into Product Management came with curiosity, courage,
            and an unshakable desire to make meaningful impact. Since then,
            Blessing has led and contributed to impactful products at Evendy,
            Divaca Tech, and now serves as a Product Manager at Mainstack, where
            she continues to blend empathy with execution to deliver lasting
            value.
          </p>

          <p>
            Beyond her professional path, Blessing is known for her impact-first
            philosophy. She has guided and mentored numerous aspiring and
            entry-level Product Managers, helping them gain clarity, confidence,
            and direction in their careers. As a Product & Project Management
            Mentor at HGSC² Academy, she remains committed to shaping the next
            generation of tech leaders through mentorship, teaching, and
            practical learning.
          </p>

          <p>
            Her work with Product Pointers embodies her belief that success
            isn’t about the numbers, it’s about the lives transformed. Every
            mentee’s progress, every job secured, and every story of renewed
            confidence fuels her mission to build people and purpose-driven
            products.
          </p>

          <p className="text-[#6B00B3] italic font-[400] mt-6 text-[18px] leading-[28px]">
            “We may not reach everyone, but the few we touch must feel the
            impact deeply.”
          </p>
        </div>
      </div>
    </section>
  );
};

export default Founder;
