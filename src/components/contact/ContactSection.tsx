"use client";

import React from "react";
import {
  Mail,
  Phone,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
} from "lucide-react";
import { Montserrat, Bricolage_Grotesque } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Headings share the PPAP display face — variable weight covers 200-800.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

const ContactSection = () => {
  return (
    <section
      id="contact-section"
      className={`${montserrat.className} scroll-mt-24 bg-white px-6 py-10 md:px-10 lg:px-20`}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* =========================
              DIRECT EMAIL
          ========================== */}
          <div className="flex min-h-[308px] flex-col rounded-[12px] border border-[#C9C9C9] bg-white px-6 py-6">
            {/* Icon */}
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-[11px] bg-[#F0E8FF]">
              <Mail
                size={30}
                strokeWidth={1.7}
                className="text-[#6024D0]"
              />
            </div>

            {/* Content */}
            <div className="mt-8">
              <h3 className={`${bricolage.className} text-[22px] font-bold tracking-[-0.03em] text-[#17131F]`}>
                Direct Email
              </h3>

              <p className="mt-4 max-w-[360px] text-[13px] leading-[1.6] text-[#6E6A72]">
                Send us a direct email for general questions, admissions
                inquiries, or partnership discussions
              </p>
            </div>

            {/* Bottom */}
            <div className="mt-auto pt-7">
              <div className="mb-5 h-px w-full bg-[#D0CDD2]" />

              <a
                href="mailto:support@productpointer.com"
                className="text-[20px] font-medium text-[#6024D0] transition-opacity hover:opacity-70"
              >
                support@productpointer.com
              </a>
            </div>
          </div>

          {/* =========================
              PHONE
          ========================== */}
          <div className="flex min-h-[308px] flex-col rounded-[12px] border border-[#C9C9C9] bg-white px-6 py-6">
            {/* Icon */}
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-[11px] bg-[#F0E8FF]">
              <Phone
                size={28}
                strokeWidth={1.5}
                className="text-[#6024D0]"
              />
            </div>

            {/* Content */}
            <div className="mt-8">
              <h3 className={`${bricolage.className} text-[22px] font-bold tracking-[-0.03em] text-[#17131F]`}>
                Phone
              </h3>

              <p className="mt-4 max-w-[360px] text-[13px] leading-[1.6] text-[#6E6A72]">
                Send us a direct email for general questions, admissions
                inquiries, or partnership discussions
              </p>
            </div>

            {/* Bottom */}
            <div className="mt-auto pt-7">
              <div className="mb-5 h-px w-full bg-[#D0CDD2]" />

              <a
                href="tel:+2348001293456"
                className="text-[20px] font-medium text-[#6024D0] transition-opacity hover:opacity-70"
              >
                +234 800 129 3456
              </a>
            </div>
          </div>

          {/* =========================
              STAY CONNECTED
          ========================== */}
          <div className="flex min-h-[308px] flex-col rounded-[12px] border border-[#C9C9C9] bg-white px-6 py-6">
            {/* Icon */}
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-[11px] bg-[#F0E8FF]">
              <Phone
                size={28}
                strokeWidth={1.5}
                className="text-[#6024D0]"
              />
            </div>

            {/* Content */}
            <div className="mt-8">
              <h3 className={`${bricolage.className} text-[22px] font-bold tracking-[-0.03em] text-[#17131F]`}>
                Stay Connected
              </h3>

              <p className="mt-4 max-w-[370px] text-[13px] leading-[1.6] text-[#6E6A72]">
                Follow ProductPointers for product management insights,
                learning opportunities, program updates and community news.
              </p>
            </div>

            {/* Socials */}
            <div className="mt-auto flex items-center gap-14 pt-7">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-[36px] w-[36px] items-center justify-center rounded-[8px] bg-gradient-to-br from-[#FFB347] via-[#F72585] to-[#5B2EFF] text-white shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <Instagram size={22} strokeWidth={2.2} />
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-[36px] w-[36px] items-center justify-center rounded-[8px] bg-[#0A66C2] text-white shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <Linkedin size={22} strokeWidth={2.2} />
              </a>

              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="flex h-[36px] w-[36px] items-center justify-center rounded-[8px] bg-[#FF0000] text-white shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <Youtube size={23} strokeWidth={2.2} />
              </a>

              {/* WhatsApp */}
              <a
                href="#"
                aria-label="WhatsApp"
                className="flex h-[36px] w-[36px] items-center justify-center rounded-[8px] bg-[#17C936] text-white shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle size={23} strokeWidth={2.2} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;