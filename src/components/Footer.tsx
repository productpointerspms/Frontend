"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

type FooterLink = { name: string; href: string };

// TODO: confirm destinations — "Scholarships" and "Free Resources" have no
// page of their own yet, so they point at the closest existing route.
const exploreLinks: FooterLink[] = [
  { name: "Our Programs", href: "/#upcoming-programs" },
  { name: "Scholarships", href: "/ppip" },
  { name: "Free Resources", href: "/community" },
  { name: "Community", href: "/community" },
  { name: "Upcoming Programs", href: "/#upcoming-programs" },
];

// TODO: add the real Instagram and YouTube URLs.
const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/productpointers/",
    icon: Instagram,
    className: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/productpointers/",
    icon: Linkedin,
    className: "bg-[#0A66C2]",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@productpointers",
    icon: Youtube,
    className: "bg-[#FF0000]",
  },
];

const WHATSAPP_URL = "https://wa.me/+2348102567773";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={`${inter.className} bg-black text-white`}>
      <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* ================= BRAND ================= */}
          <div>
            <h2 className="text-[22px] font-semibold text-white">
              ProductPointers
            </h2>
            <p className="mt-6 max-w-[260px] text-[14px] leading-[1.7] text-white">
              Build the skills, gain the experience, and create the evidence to
              grow your Product career.
            </p>
          </div>

          {/* ================= EXPLORE ================= */}
          <div>
            <h3 className="text-[20px] font-bold uppercase text-white">
              Explore
            </h3>
            <ul className="mt-7 space-y-4">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white transition-opacity hover:opacity-70"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= SOCIAL ================= */}
          <div>
            <h3 className="text-[20px] font-bold uppercase text-white">
              Connect With Us
            </h3>
            <div className="mt-7 flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`flex h-[18px] w-[18px] items-center justify-center rounded-[4px] transition-opacity hover:opacity-80 ${social.className}`}
                  >
                    <Icon className="h-[11px] w-[11px] text-white" />
                  </a>
                );
              })}

              {/* WhatsApp has no lucide icon — keep the brand glyph. */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-[18px] w-[18px] items-center justify-center rounded-[4px] bg-[#25D366] transition-opacity hover:opacity-80"
              >
                <svg
                  className="h-[11px] w-[11px] text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ================= NEWSLETTER ================= */}
          <div>
            <h3 className="text-[20px] font-bold uppercase text-white">
              Stay in the Loop
            </h3>
            <p className="mt-7 max-w-[365px] text-[14px] leading-[1.7] text-white">
              Get practical Product insights, career opportunities, program
              updates and resources delivered to your inbox.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-3">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Enter your email"
                className="h-11 w-full rounded-[6px] border border-[#6B7280] bg-transparent px-4 text-[14px] text-white placeholder:text-[#9CA3AF] transition-colors focus:border-purple-500 focus:outline-none sm:w-[175px]"
              />
              <button
                type="button"
                className="h-11 cursor-pointer rounded-[6px] bg-[#5C1CC5] px-7 text-[14px] font-medium text-white transition-colors hover:bg-[#4a179e] sm:w-[170px]"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="mt-16 border-t border-[#3A3A3A] pt-8">
          <p className="text-center text-[13px] text-[#B4B4B4]">
            &copy; {year} ProductPointers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
