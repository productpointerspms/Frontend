"use client";
import React from "react";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"], // optional: define weights
});

export default function Footer() {
  return (
    <footer className={`${inter.className} bg-black text-white`}>
      {/* Purple top border */}

      <div className="max-w-7xl mx-auto px-4 md:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-12 gap-8">
          {/* Brand Section */}
          <div>
            <h2 className="text-[28px] text-[#FFFFFF] font-semibold mb-4">
              ProductPointers
            </h2>
            <p className="text-[#FFFFFF] text-[16px] font-normal leading-[27px] w-full md:w-[346px]">
              Build Visibility &amp; Become Job-Ready Through Our Structured
              Program Pathway
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:ml-30">
            <h3 className="text-[18px] text-[#FFFFFF] font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-[#FFFFFF] hover:text-white transition-colors text-xs"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/accelerator"
                  className="text-[#FFFFFF] hover:text-white transition-colors text-xs"
                >
                  Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-[#FFFFFF] hover:text-white transition-colors text-xs"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#FFFFFF] hover:text-white transition-colors text-xs"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-[#FFFFFF] hover:text-white transition-colors text-xs"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="md:ml-10">
            <h3 className="text-base font-semibold mb-4 ">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://wa.me/+2348102567773"
                target="_blank"
                rel="noopener noreferrer"
                className="w-4 h-4 bg-green-500 rounded flex items-center justify-center hover:bg-green-600 transition-colors"
                aria-label="WhatsApp"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/productpointers/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(
                    "https://www.linkedin.com/company/productpointers/",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
                className="w-4 h-4 hover:opacity-80 transition-opacity"
                aria-label="LinkedIn"
              >
                <img
                  src="images/linkedinIcon.png"
                  alt="LinkedIn"
                  className="w-full h-full object-contain"
                />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:-ml-16">
            <h3 className="text-[18px] font-semibold mb-4">Stay Updated</h3>
            <p className="text-[#FFFFFF] text-xs mb-8 w-full md:w-[220px] leading-5">
              Get Product Management insights, career opportunities, program
              updates, and practical resources designed to help you grow and
              become opportunity-ready.
            </p>
            <div className="flex flex-col sm:flex-row md:gap-2 gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-1 w-full md:w-[210px] h-11 md:h-9 bg-transparent border leading-6  tracking-[0.5px] border-[#6B7280] rounded-lg md:rounded-t-sm text-[14px] text-[#6B7280] focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button className="px-7 w-full md:w-[147px] group hover:bg-[#370589] hover:border  hover:scale-105 active:bg-[#FAE1FF] active:border active:border-[#5B1CC5] bg-[#5C1CC5] active:scale-100 active:text-[#5C1CC5] cursor-pointer rounded-lg md:rounded h-11 md:h-9 font-medium text-base text-[#FFFFFF] transition-colors  duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-12 pt-8 border-t border-[#B4B4B4] md:w-[1150px]">
          <p className="text-center text-[#B4B4B4] text-[11px] font-semibold">
            © 2025 ProductPointers. All rights reserved.
          </p>
        </div>
      </div>

      {/* Purple bottom border */}
    </footer>
  );
}