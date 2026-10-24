"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, X, Menu } from "lucide-react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import logo from "@/assets/images/logo.png";

const Navbar = () => {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobileDialogRef = useRef<HTMLDialogElement>(null);
  const reduceMotion = useReducedMotion();

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(false);
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const dialog = mobileDialogRef.current;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktopQuery.matches) {
        setMobileMenuOpen(false);
        setMobileDropdownOpen(false);
      }
    };
    desktopQuery.addEventListener("change", closeOnDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      desktopQuery.removeEventListener("change", closeOnDesktop);
    };
  }, [mobileMenuOpen]);

  const menuItems = [
    { name: "Home", href: "/" },
    {
      name: "Programs",
      href: "#",
      dropdown: [
        { name: "Product Management Accelerator Program", href: "/ppap" },
        { name: "Product Management Apprenticeship/Internship Program", href: "/ppip" },
        { name: "Product Management Mastery Program", href: "/ppmp" },
        { name: "Fintech Product Management Program", href: "/ppfp" },
      ],
    },
    { name: "Courses", href: "/courses" },
    { name: "Scholarships", href: "/scholarships" },
    { name: "Community", href: "/community" },
    { name: "Contact", href: "/contact" },
  ];

  // Routes whose hero is dark — the overlaying bar needs light text there,
  // until the bar turns white once the hero has scrolled away.
  const DARK_HERO_ROUTES = ["/", "/ppfp", "/ppip", "/ppap", "/ppcp", "/community", "/courses", "/scholarships"];
  const onDarkHero = DARK_HERO_ROUTES.includes(pathname) && !pastHero;

  // The bar is fixed and transparent over the hero; once the hero's bottom edge
  // passes under the bar it switches to a white background. The hero is the
  // page's first block: walk down first children past nested <main>s and any
  // wrapper too tall to be a hero (form pages wrap everything in one div).
  useEffect(() => {
    const findHero = () => {
      const homeHero = document.querySelector('[data-home-section="Hero"]');
      if (homeHero) return homeHero;
      let el = document.querySelector("main")?.firstElementChild ?? null;
      while (
        el?.firstElementChild &&
        (el.tagName === "MAIN" || el.getBoundingClientRect().height > window.innerHeight * 1.5)
      ) {
        el = el.firstElementChild;
      }
      return el;
    };

    const onScroll = () => {
      const hero = findHero();
      const barHeight = navRef.current?.offsetHeight ?? 0;
      setPastHero(
        hero
          ? hero.getBoundingClientRect().bottom <= barHeight
          : window.scrollY > barHeight
      );
    };

    onScroll();
    const main = document.querySelector("main");
    const layoutObserver = new ResizeObserver(onScroll);
    if (main) layoutObserver.observe(main);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      layoutObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const active =
    menuItems.find((item) => {
      if (item.dropdown) {
        return item.dropdown.some((sub) => pathname === sub.href || pathname.startsWith(sub.href + "/"));
      }
      if (item.href === "/") return pathname === "/";
      return pathname === item.href || pathname.startsWith(item.href + "/");
    })?.name ?? "";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-12 py-5 z-[100] transition-colors duration-300 ${
        pastHero ? "bg-white shadow-[0_1px_12px_rgba(16,9,26,0.08)]" : "bg-transparent"
      } ${["/scholarships", "/community", "/contact", "/courses", "/ppap", "/ppip", "/ppcp"].includes(pathname) ? `max-md:bg-white ${["/courses", "/ppap", "/ppip", "/ppcp"].includes(pathname) ? "max-md:h-[70px]" : "max-md:h-[89px]"} max-md:px-4` : ""}`}
    >
      {/* Logo Section matching Hero.jpg */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className=" p-1.5 rounded-lg">
          
            <Image
              src={logo}
              alt="logo"
              width={150}
              height={50}
              className={onDarkHero ? `brightness-0 invert ${["/scholarships", "/community", "/contact", "/courses", "/ppap", "/ppip", "/ppcp"].includes(pathname) ? "max-md:brightness-100 max-md:invert-0" : ""}` : ""}
            />
       
        </div>
       
      </div>

      {/* Desktop Menu */}
      <ul
        className={`hidden md:flex items-center gap-10 text-[13px] font-medium ${
          onDarkHero ? "text-white" : "text-[#15010D]"
        }`}
      >
        {menuItems.map((item) => (
          <li key={item.name} className="relative">
            {item.dropdown ? (
              <div
                className="relative"
                ref={dropdownRef}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
                onKeyDown={event => {
                  if (event.key === "Escape") {
                    setDropdownOpen(false);
                    event.currentTarget.querySelector("button")?.focus();
                  }
                }}
                onBlur={event => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDropdownOpen(false);
                }}
              >
                <button
                  type="button"
                  aria-expanded={dropdownOpen}
                  aria-controls="desktop-programs-dropdown"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-1 transition cursor-pointer ${
                    active === item.name ? "text-[#6024D0]" : "hover:text-[#6024D0]"
                  }`}
                >
                  {item.name}
                  <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
                    <ul id="desktop-programs-dropdown" className="w-[min(540px,calc(100vw-32px))] bg-white py-2 text-[#10091A] shadow-lg">
                      {item.dropdown.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            href={sub.href}
                            onClick={() => setDropdownOpen(false)}
                            className="flex min-h-[46px] items-center px-4 py-3 text-[14px] font-medium leading-[1.4] tracking-normal text-[#10091A] transition-colors hover:bg-purple-50 focus-visible:bg-purple-50 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#6024D0]"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href}
                className={`transition relative pb-1 ${
                  active === item.name
                  ? "text-[#6024D0] border-b-2 border-[#6024D0]"
                  : "hover:text-[#6024D0]"
                }`}
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Desktop Buttons matching Hero.jpg styles */}
      <div className="hidden md:flex items-center gap-4">
        <Link href="/scholarships/sponsor?tier=Champion" className="bg-[#6024D0] text-white px-7 py-2.5 rounded-lg font-bold hover:bg-[#4c1da3] transition shadow-sm">
          Apply Now
        </Link>
        {/* <Link href="/login" className="border border-[#6024D0] text-[#6024D0] px-7 py-2.5 rounded-lg font-bold hover:bg-purple-50 transition">
          Log In
        </Link> */}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-navigation"
        className={`md:hidden cursor-pointer ${onDarkHero ? "text-white" : "text-[#15010D]"} ${["/scholarships", "/community", "/contact", "/courses", "/ppap", "/ppip", "/ppcp"].includes(pathname) ? "max-md:text-[#15010D]" : ""}`}
        onClick={() => setMobileMenuOpen(true)}
      >
        <Menu size={28} />
      </button>

      <dialog
        ref={mobileDialogRef}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        onCancel={(event) => {
          event.preventDefault();
          closeMobileMenu();
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 text-[#10091A] backdrop:bg-transparent"
      >
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: mobileMenuOpen ? "0%" : "-100%" }}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => {
            if (!mobileMenuOpen) mobileDialogRef.current?.close();
          }}
          className="flex h-full w-full flex-col overflow-y-auto bg-white px-4 pb-[max(24px,env(safe-area-inset-bottom))] pt-[max(32px,env(safe-area-inset-top))]"
        >
          <div className="flex h-11 shrink-0 items-center justify-end">
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMobileMenu}
              className="flex h-11 w-11 translate-x-2 cursor-pointer items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5815D5]"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          <ul className="-mt-2 flex w-full flex-col gap-2 text-[14px] font-medium leading-5">
            {menuItems.map((item) => (
              <li key={item.name}>
                {item.dropdown ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={mobileDropdownOpen}
                      aria-controls="mobile-programs"
                      onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                      className="flex min-h-11 cursor-pointer items-center gap-4 text-left focus-visible:outline-[#5815D5]"
                    >
                      {item.name}
                      <ChevronDown
                        size={18}
                        strokeWidth={1.7}
                        className={`transition-transform motion-reduce:transition-none ${mobileDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <ul id="mobile-programs" hidden={!mobileDropdownOpen} className="space-y-1 border-l border-[#E9DFF9] pl-4">
                      {item.dropdown.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            onClick={closeMobileMenu}
                            aria-current={pathname === sub.href ? "page" : undefined}
                            className="flex min-h-11 items-center py-2 text-[13px] text-[#10091A]/75 hover:text-[#5815D5]"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    aria-current={active === item.name ? "page" : undefined}
                    className="flex min-h-11 items-center hover:text-[#5815D5] focus-visible:outline-[#5815D5]"
                  >
                    {item.name === "Scholarships" ? "Scholarship" : item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <Link
            href="/scholarships/sponsor?tier=Champion"
            onClick={closeMobileMenu}
            className="mt-7 flex min-h-9 w-full shrink-0 items-center justify-center rounded-md bg-[#5815D5] px-3 py-2 text-center text-[14px] font-semibold leading-5 text-white transition-colors hover:bg-[#4810B3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5815D5]"
          >
            Apply Now
          </Link>
        </motion.div>
      </dialog>
    </nav>
  );
};

export default Navbar;
