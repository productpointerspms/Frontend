"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Programs",
    href: "/programs",
    dropdown: [
      {
        label: "ProductPointers Accelerator Program",
        href: "/programs/accelerator",
      },
      {
        label: "ProductPointers Internship Program",
        href: "/programs/internship",
      },
      { label: "ProductPointers Track Program", href: "/programs/track" },
      { label: "101 Coaching", href: "/programs/101-coaching" },
    ],
  },
  { label: "Courses", href: "/courses" },
  { label: "Scholarship", href: "/scholarship" },
  { label: "Community", href: "/community" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) return;

    const HEADER_HEIGHT = 80;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rootTop = entry.rootBounds?.top ?? 0;
        setIsScrolled(
          !entry.isIntersecting && entry.boundingClientRect.top < rootTop,
        );
      },
      { rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px`, threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  // lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-colors duration-300 ${
        isScrolled ? "shadow-sm" : "shadow-sm md:bg-transparent md:shadow-none"
      }`}
    >
      <nav className="flex max-w-7xl items-center px-6 py-4 lg:py-6 lg:px-18">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          {/* Mobile logo - always pp_logo2.png */}
          <Image
            src="/pp_logo2.png"
            alt="ProductPointers"
            width={160}
            height={32}
            priority
            className="h-8 w-auto md:hidden"
          />
          {/* Desktop logo - swaps on scroll */}
          <Image
            src={isScrolled ? "/pp_logo2.png" : "/pp_logo.png"}
            alt="ProductPointers"
            width={160}
            height={32}
            priority
            className="hidden h-8 w-auto md:block"
          />
        </Link>

        <ul className="ml-58 hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.dropdown ? (
              <li
                key={link.href}
                className="relative"
                onMouseEnter={() => setProgramsOpen(true)}
                onMouseLeave={() => setProgramsOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setProgramsOpen((open) => !open)}
                  aria-expanded={programsOpen}
                  className={`flex items-center gap-1 text-[13px] font-medium leading-5 tracking-[0.14px] transition-colors duration-300 ${
                    isScrolled ? "text-black" : "text-white"
                  } hover:text-[#5818D0]`}
                >
                  {link.label}
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className={`transition-transform duration-200 ${
                      programsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {programsOpen && (
                  <div className="absolute left-0 top-full w-72 bg-white p-2 shadow-xl">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setProgramsOpen(false)}
                        className="block rounded-md border border-transparent px-6 py-3 text-[12px] font-medium tracking-[-0.252px] text-[#0E0A1A] transition-colors duration-200 hover:border-(--primary,#5818D0) hover:bg-[rgba(88,24,208,0.10)] hover:text-(--primary,#5818D0)"
                        style={{
                          fontFamily: '"Bricolage Grotesque", sans-serif',
                          lineHeight: "25.2px",
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-[13px] font-medium leading-5 tracking-[0.14px] transition-colors duration-300 ${
                    isScrolled ? "text-black" : "text-white"
                  } hover:text-[#5818D0]`}
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="flex-1 ml-10" />

        {/* Sponsor button (desktop) */}
        <Link
          href="/program"
          className="hidden shrink-0 md:inline-flex items-center justify-center gap-2 rounded-md cursor-pointer bg-(--primary,#5818D0) px-6 py-2 text-sm font-semibold leading-5 tracking-[0.14px] text-white transition-colors hover:bg-[#0A0718] hover:text-white font-[Montserrat]"
        >
          Apply
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          className="relative z-50 ml-auto flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className="h-0.5 w-6 bg-black transition-all duration-300" />
          <span className="h-0.5 w-6 bg-black transition-all duration-300" />
          <span className="h-0.5 w-6 bg-black transition-all duration-300" />
        </button>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile drawer - slides in from the right, doesn't cover full width */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-[85%] max-w-sm overflow-y-auto bg-white px-6 py-6 shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <Image
            src="/pp_logo2.png"
            alt="ProductPointers"
            width={140}
            height={28}
            className="h-7 w-auto"
          />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center text-black"
          >
            <X size={22} strokeWidth={2} />
          </button>
        </div>

        <ul className="flex flex-col gap-5">
          {navLinks.map((link) =>
            link.dropdown ? (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => setMobileProgramsOpen((open) => !open)}
                  aria-expanded={mobileProgramsOpen}
                  className="flex items-center gap-2 text-[14px] tracking-[0.14px] leading-5 font-medium text-[#0E0A1A] hover:text-[#5818D0]"
                >
                  {link.label}
                  <ChevronDown
                    size={18}
                    strokeWidth={2}
                    className={`transition-transform duration-200 ${
                      mobileProgramsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileProgramsOpen && (
                  <ul className="mt-3 flex flex-col gap-3 pl-4">
                    {link.dropdown.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileProgramsOpen(false);
                          }}
                          className="block text-[12px] font-medium text-[#0E0A1A] leading-5 hover:text-[#5818D0]"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-[14px] tracking-[0.14px] leading-5 font-medium text-[#0E0A1A] hover:text-[#5818D0]"
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <Link
          href="/program"
          onClick={() => setMobileOpen(false)}
          className="mt-6 flex items-center justify-center gap-2 rounded-md bg-(--primary,#5818D0) px-6 py-2 text-sm font-semibold leading-5 tracking-[0.14px] text-white transition-colors hover:bg-[#0A0718] font-[Montserrat]"
        >
          Apply
        </Link>
      </div>
    </header>
  );
}
