"use client";

import React, { useState } from "react";
import { ArrowRight, Zap, Users } from "lucide-react";
import { Montserrat, Bricolage_Grotesque } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Headings share the PPAP display face — variable weight covers 200-800.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

const HeroSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <section
      id="contact-hero"
      className={`${montserrat.className} relative min-h-screen overflow-hidden bg-[#5818D01A]`}
    >
      {/* =========================
          BACKGROUND GLOW
      ========================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Left purple glow */}
        <div className="absolute -left-[180px] top-[20px] h-[600px] w-[600px] rounded-full bg-[#7028F2]/50 blur-[130px]" />

        {/* Bottom right purple glow */}
        <div className="absolute -bottom-[300px] -right-[250px] h-[700px] w-[700px] rounded-full bg-[#4610B8]/60 blur-[140px]" />

        {/* Pink glow behind form */}
        <div className="absolute right-[2%] top-[-100px] h-[400px] w-[400px] rounded-full bg-[#D819FF]/20 blur-[120px]" />
      </div>

      {/* =========================
          MAIN CONTENT
      ========================== */}
      <div
        className="
          relative z-10 mx-auto grid min-h-screen max-w-[1440px]
          grid-cols-1 items-center
          gap-12
          px-6 py-14
          md:px-10
          lg:grid-cols-[0.9fr_1.1fr]
          lg:gap-[50px]
          lg:px-[80px]
          lg:py-0
        "
      >
        {/* =====================================================
            LEFT CONTENT
        ====================================================== */}
        <div className="flex flex-col justify-center lg:pr-0">
          {/* Badge */}
          <div
            className="
              mb-7 flex w-fit items-center
              rounded-full
              border border-[#5818D0]
              bg-white/[0.02]
              px-4 py-2
            "
          >
            <span
              className={`${bricolage.className}
                text-[15px]
                font-semibold
                uppercase
                tracking-[0.08em]
                text-[#5818D0]
              `}
            >
              Get In Touch
            </span>
          </div>

          {/* Heading */}
          <h1
            className={`${bricolage.className}
              max-w-[560px]
              text-[42px]
              font-extrabold
              leading-[1.03]
              tracking-[-0.055em]
              text-[#130024]
              sm:text-[48px]
              lg:text-[58px]
            `}
          >
            Let&apos;s Help You Find
            <span className="block text-[#621ED6]">
              Your Next Step
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-8
              max-w-[530px]
              text-[16px]
              font-semibold
              leading-[1.75]
              text-[#5D6725]
              lg:text-[18px]
            "
          >
            Whether you have questions about our programs,
            <br className="hidden xl:block" />
            mentorship, internships, or specialization tracks, the
            <br className="hidden xl:block" />
            ProductPointers team is here to help
          </p>

          {/* =========================
              INFO CARDS
          ========================== */}
          <div className="mt-7 flex max-w-[545px] flex-col gap-4">
            {/* Fast Response */}
            <div
              className="
                flex min-h-[90px]
                items-center
                rounded-[6px]
                bg-white
                px-4 py-4
                shadow-sm
              "
            >
              <div
                className="
                  mr-6 flex
                  h-[50px] w-[50px]
                  shrink-0
                  items-center justify-center
                  rounded-[11px]
                  bg-[#FFF0D0]
                "
              >
                <Zap
                  size={26}
                  strokeWidth={1.7}
                  className="text-[#6D4B00]"
                />
              </div>

              <div>
                <h3
                  className={`${bricolage.className}
                    text-[16px]
                    font-bold
                    leading-tight
                    text-[#1D1B28]
                  `}
                >
                  Fast Response Guarantee
                </h3>

                <p
                  className="
                    mt-2
                    text-[13px]
                    font-medium
                    text-[#626065]
                    sm:text-[14px]
                  "
                >
                  Typically within 24 hours (Monday – Friday)
                </p>
              </div>
            </div>

            {/* Advisory Access */}
            <div
              className="
                flex min-h-[90px]
                items-center
                rounded-[6px]
                bg-white
                px-4 py-4
                shadow-sm
              "
            >
              <div
                className="
                  mr-6 flex
                  h-[50px] w-[50px]
                  shrink-0
                  items-center justify-center
                  rounded-[11px]
                  bg-[#E8D7FF]
                "
              >
                <Users
                  size={28}
                  strokeWidth={2.2}
                  className="text-[#6524DC]"
                />
              </div>

              <div>
                <h3
                  className={`${bricolage.className}
                    text-[16px]
                    font-bold
                    leading-tight
                    text-[#1D1B28]
                  `}
                >
                  Direct Advisory Access
                </h3>

                <p
                  className="
                    mt-2
                    text-[13px]
                    font-medium
                    text-[#626065]
                    sm:text-[14px]
                  "
                >
                  Speak directly with experienced PM career advisors
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            RIGHT FORM
        ====================================================== */}
        <div className="relative w-full">
          {/* Pink top-right accent */}
          <div
            className="
              absolute
              right-0
              top-[-1px]
              z-0
              h-[32px]
              w-[45%]
              rounded-tr-[25px]
              bg-[#FA18C8]
              blur-[3px]
            "
          />

          {/* Form Card */}
          <div
            className="
              relative z-10
              rounded-[24px]
              bg-[#FDFDFD]
              px-6
              py-9
              shadow-[0_20px_50px_rgba(48,0,105,0.15)]
              sm:px-8
              md:px-10
              lg:min-h-[611px]
              lg:px-10
              lg:py-[36px]
            "
          >
            {/* Form Header */}
            <div className="mb-7">
              <h2
                className={`${bricolage.className}
                  text-[28px]
                  font-extrabold
                  leading-tight
                  tracking-[-0.035em]
                  text-[#181622]
                  sm:text-[30px]
                `}
              >
                Send us a message
              </h2>

              <p
                className="
                  mt-3
                  text-[13px]
                  font-medium
                  leading-[1.5]
                  text-[#77747B]
                  sm:text-[14px]
                "
              >
                Fill out the details below and we&apos;ll route your
                request to the right team.
              </p>
            </div>

            <form id="contact-message-form" onSubmit={handleSubmit}>
              {/* =========================
                  FULL NAME
              ========================== */}
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="
                    mb-2 block
                    text-[13px]
                    font-semibold
                    text-[#24212D]
                  "
                >
                  Full Name <span className="text-red-500">*</span>
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Amara Okafor"
                  className="
                    h-[49px]
                    w-full
                    rounded-[8px]
                    border border-[#C8C6CA]
                    bg-[#FAFAFA]
                    px-4
                    text-[13px]
                    text-[#24212D]
                    outline-none
                    transition
                    placeholder:text-[#BDBBC1]
                    focus:border-[#6024D0]
                    focus:ring-2
                    focus:ring-[#6024D0]/10
                  "
                />
              </div>

              {/* =========================
                  EMAIL
              ========================== */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="
                    mb-2 block
                    text-[13px]
                    font-semibold
                    text-[#24212D]
                  "
                >
                  Email Address <span className="text-red-500">*</span>
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. amara@example.com"
                  className="
                    h-[49px]
                    w-full
                    rounded-[8px]
                    border border-[#C8C6CA]
                    bg-[#FAFAFA]
                    px-4
                    text-[13px]
                    text-[#24212D]
                    outline-none
                    transition
                    placeholder:text-[#BDBBC1]
                    focus:border-[#6024D0]
                    focus:ring-2
                    focus:ring-[#6024D0]/10
                  "
                />
              </div>

              {/* =========================
                  MESSAGE
              ========================== */}
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="
                    mb-2 block
                    text-[13px]
                    font-semibold
                    text-[#24212D]
                  "
                >
                  Your Message <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you build your product career or partner with ProductPointers....."
                  className="
                    min-h-[104px]
                    w-full
                    resize-none
                    rounded-[8px]
                    border border-[#C8C6CA]
                    bg-[#FAFAFA]
                    px-4
                    py-3
                    text-[13px]
                    leading-[1.5]
                    text-[#24212D]
                    outline-none
                    transition
                    placeholder:text-[#BDBBC1]
                    focus:border-[#6024D0]
                    focus:ring-2
                    focus:ring-[#6024D0]/10
                  "
                />
              </div>

              {/* =========================
                  DISCLAIMER
              ========================== */}
              <p
                className="
                  mb-5
                  text-[11px]
                  font-medium
                  leading-[1.5]
                  text-[#7A777E]
                  sm:text-[12px]
                "
              >
                By submitting this form, you agree to allow ProductPointers
                to contact you regarding your inquiry.
              </p>

              {/* =========================
                  SUBMIT BUTTON
              ========================== */}
              <button
                type="submit"
                className="
                  group
                  flex
                  h-[48px]
                  w-full
                  items-center
                  justify-center
                  gap-4
                  rounded-[6px]
                  bg-[#5C1BD9]
                  text-[13px]
                  font-bold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#4C14BD]
                "
              >
                Send Message

                <ArrowRight
                  size={20}
                  strokeWidth={1.8}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;