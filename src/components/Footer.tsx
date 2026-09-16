"use client";
import Image from "next/image";
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

      <div className="max-w-7xl mx-auto px-4 md:px-20 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-12 gap-8">
          {/* Brand Section */}
          <div>
            <h2 className="md:text-[24px] text-[20px] text-[#FFFFFF] font-semibold mb-6">
              ProductPointers
            </h2>
            <p className="text-[#F8F8F8] md:text-[14px] text-[12px] font-normal leading-5 w-full md:w-[256px]">
              Build the skills, gain the experience, and create the evidence to
              grow your Product career.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:ml-10 md:w-36.25">
            <h3 className="md:text-[24px] text-[20px] text-[#FFFFFF] font-semibold mb-4 uppercase">
              Explore
            </h3>
            <ul className="space-y-4 **: md:text-[14px] text-[12px]">
              <li>
                <Link
                  href="/#our-programs"
                  className="text-[#F8F8F8] hover:text-white transition-colors"
                >
                  Our Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/Scholarship"
                  className="text-[#F8F8F8] hover:text-white transition-colors"
                >
                  Scholarships
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-[#F8F8F8] hover:text-white transition-colors"
                >
                  Free Resources
                </Link>
              </li>

              <li>
                <Link
                  href="/community"
                  className="text-[#F8F8F8] hover:text-white transition-colors"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="/#whats-happening"
                  className="text-[#F8F8F8] hover:text-white transition-colors"
                >
                  Upcoming Programs
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="md:-ml-14">
            <h3 className="md:text-[24px] text-[20px] font-semibold mb-4">
              CONNECT WITH US
            </h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/productpointers?stkn=eWJma3FheXFpNjVi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="instagram"
              >
                <Image
                  src="/images/homepage/insta.png"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/productpointers/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="LinkedIn"
              >
                <Image
                  src="/images/homepage/lin.png"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </a>
              <a
                href="https://www.youtube.com/@ProductPointersPms"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="YouTube"
              >
                <Image
                  src="/images/homepage/you.png"
                  alt="Youtube"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </a>
              <a
                href="https://wa.me/+2348102567773"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="WhatsApp"
              >
                <Image
                  src="/images/homepage/what.png"
                  alt="WhatsApp"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:-ml-10">
            <h3 className="md:text-[24px] text-[20px] font-semibold mb-4">
              STAY IN THE LOOP
            </h3>
            <p className="text-[#F8F8F8]  md:text-[14px] text-[12px] mb-8 w-full  leading-5">
              Get practical Product insights, career opportunities, program
              updates and resources delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row md:gap-5 gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 w-full md:w-38 h-11 md:h-9 bg-transparent border leading-6  tracking-[0.5px] border-[#FCF1FF] rounded-md text-[14px] text-[#6A6B6C] transition-colors"
              />
              <button className="px-7 w-full md:w-36.75 group hover:bg-[#0A0718]  bg-[#5818D0] active:scale-100 active:text-[#5C1CC5] cursor-pointer rounded-lg md:rounded h-11 md:h-9 font-normal text-[14px] text-[#FFFFFF] transition-colors  duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-12 pt-8 border-t border-[#B4B4B4] md:w-287.5">
          <p className="text-center text-[#B4B4B4] text-[11px] font-semibold">
            © 2026 ProductPointers. All rights reserved.
          </p>
        </div>
      </div>

      {/* Purple bottom border */}
    </footer>
  );
}
