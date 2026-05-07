"use client";

import Image from "next/image";
import FaqSection from "@/components/homepage/FaqSection";
import TheNewFuture from "@/components/TheNewFuture";

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {/* Hero Banner */}
      <div className="relative w-full h-[400px] sm:h-[570px] flex items-center justify-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/contact.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(92,28,197,0.4)] to-[#14010D]" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-montserrat font-bold text-[28px] sm:text-[48px] md:text-[64px] leading-tight text-white">
            Let&apos;s Connect with <br /> ProductPointers
          </h1>
          <p className="font-montserrat font-normal mt-6 text-[14px] sm:text-[18px] md:text-[20px] leading-relaxed text-white max-w-xl">
            Have questions about our programs or platform? <br className="hidden sm:block" />
            We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="w-full bg-[#FCF1FF] px-6 sm:px-12 md:px-20 py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-start">

          {/* Left: Contact Info */}
          <div className="w-full md:w-auto md:flex-1">
            <h4 className="font-montserrat font-bold text-[28px] sm:text-[40px] md:text-[48px] leading-tight text-black mb-3">
              Contact Us
            </h4>
            <p className="font-montserrat font-medium text-[14px] sm:text-[16px] md:text-[18px] text-[#15010D] mb-10">
              Follow us or send a direct email for quick updates.
            </p>

            <div className="flex flex-col gap-8">
              {/* Email */}
              <div>
                <h4 className="font-montserrat font-medium text-[14px] sm:text-[16px] uppercase text-[#6A6B6C] mb-2">
                  Email
                </h4>
                <div className="flex items-center gap-2">
                  <Image src="/images/mail.png" alt="mail-icon" width={24} height={24} />
                  <a
                    href="mailto:support@productpointers.com"
                    className="font-montserrat font-semibold text-[14px] sm:text-[18px] text-black hover:underline"
                  >
                    support@productpointers.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div>
                <h4 className="font-montserrat font-medium text-[14px] sm:text-[16px] uppercase text-[#6A6B6C] mb-2">
                  Phone
                </h4>
                <div className="flex items-center gap-2">
                  <Image src="/images/phone.png" alt="phone-icon" width={24} height={24} />
                  <a
                    href="tel:+234800123456"
                    className="font-montserrat font-semibold text-[14px] sm:text-[18px] text-black hover:underline"
                  >
                    +234 800 123456
                  </a>
                </div>
              </div>

              {/* Social */}
              <div>
                <h4 className="font-montserrat font-medium text-[14px] sm:text-[16px] uppercase text-[#6A6B6C] mb-4">
                  Follow Us
                </h4>
                <div className="flex items-center gap-4">
                  <a href="#" className="w-[50px] h-[50px] rounded-full border border-[#5C1CC521] bg-[#CCB9ED29] flex items-center justify-center hover:bg-[#CCB9ED60] transition-colors">
                    <Image src="/images/linkedin.png" alt="LinkedIn" width={18} height={18} />
                  </a>
                  <a href="#" className="w-[50px] h-[50px] rounded-full border border-[#5C1CC521] bg-[#CCB9ED29] flex items-center justify-center hover:bg-[#CCB9ED60] transition-colors">
                    <Image src="/images/inst.png" alt="Instagram" width={18} height={18} />
                  </a>
                  <a href="#" className="w-[50px] h-[50px] rounded-full border border-[#5C1CC521] bg-[#CCB9ED29] flex items-center justify-center hover:bg-[#CCB9ED60] transition-colors">
                    <Image src="/images/x.png" alt="X (Twitter)" width={18} height={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="w-full md:flex-1 bg-white shadow-[0px_4px_8px_4px_rgba(19,9,36,0.12)] rounded-[20px] p-6 sm:p-10">
            <h3 className="font-montserrat font-semibold text-[22px] sm:text-[28px] text-black mb-8">
              Send us a message
            </h3>

            <div className="flex flex-col gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-montserrat font-medium text-[15px] sm:text-[17px] text-[#15010D]">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  className="w-full h-[50px] rounded-[12px] px-6 bg-[#FCF1FF] border border-[#ACACAC82] outline-none focus:border-[#5C1CC5] transition-colors placeholder:font-montserrat placeholder:text-[14px] placeholder:text-[#6D6D6D]"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-montserrat font-medium text-[15px] sm:text-[17px] text-[#15010D]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full h-[50px] rounded-[12px] px-6 bg-[#FCF1FF] border border-[#ACACAC82] outline-none focus:border-[#5C1CC5] transition-colors placeholder:font-montserrat placeholder:text-[14px] placeholder:text-[#6D6D6D]"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-montserrat font-medium text-[15px] sm:text-[17px] text-[#15010D]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="How can we help you?"
                  rows={5}
                  className="w-full rounded-[12px] px-6 py-4 bg-[#FCF1FF] border border-[#ACACAC82] outline-none focus:border-[#5C1CC5] transition-colors resize-none placeholder:font-montserrat placeholder:text-[14px] placeholder:text-[#6D6D6D]"
                />
              </div>

              <button className="w-full h-[48px] bg-[#5C1CC5] hover:bg-[#4a15a0] transition-colors rounded-[8px] flex items-center justify-center text-white font-montserrat font-semibold text-[16px] cursor-pointer">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>

      <FaqSection />
      <TheNewFuture />
    </div>
  );
}