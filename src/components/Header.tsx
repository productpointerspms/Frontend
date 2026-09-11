"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, X, Menu } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

const Navbar = () => {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { name: "Home", href: "/" },
    {
      name: "Programs",
      href: "#",
      dropdown: [
        { name: "ProductPointers Accelerator Program", href: "/ppap" },
        { name: "ProductPointers Internship Program", href: "/ppip" },
        { name: "ProductPointers Track Program", href: "/pptp" },
        { name: "101 Coaching", href: "/ppcp" },
      ],
    },
    // TODO: confirm destinations — neither has a page of its own yet.
    { name: "Courses", href: "/#upcoming-programs" },
    { name: "Scholarships", href: "/ppip" },
    { name: "Community", href: "/community" },
    { name: "Contact", href: "/contact" },
  ];

  // Routes whose hero is dark — the overlaying bar needs light text there.
  const onDarkHero = pathname === "/ppip";

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
    <nav className="absolute top-0 left-0 w-full bg-transparent flex items-center justify-between px-6 md:px-12 py-5 z-[100]">
      {/* Logo Section matching Hero.jpg */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className=" p-1.5 rounded-lg">
          
            <Image
              src={logo}
              alt="logo"
              width={150}
              height={50}
              className={onDarkHero ? "brightness-0 invert" : ""}
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
              >
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-1 transition cursor-pointer ${
                    active === item.name ? "text-[#6024D0]" : "hover:text-[#6024D0]"
                  }`}
                >
                  {item.name}
                  <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 top-full z-50 pt-3">
                    <ul className="bg-white border border-purple-100 rounded-xl shadow-xl w-[262px] p-2">
                      {item.dropdown.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            href={sub.href}
                            onClick={() => setDropdownOpen(false)}
                            className="block px-3.5 py-2 text-[12px] text-gray-700 hover:text-[#6024D0] hover:bg-purple-50 rounded-lg transition"
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
        <Link href="/#upcoming-programs" className="bg-[#6024D0] text-white px-7 py-2.5 rounded-lg font-bold hover:bg-[#4c1da3] transition shadow-sm">
          Apply Now
        </Link>
        {/* <Link href="/login" className="border border-[#6024D0] text-[#6024D0] px-7 py-2.5 rounded-lg font-bold hover:bg-purple-50 transition">
          Log In
        </Link> */}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className={`md:hidden cursor-pointer ${onDarkHero ? "text-white" : "text-[#15010D]"}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#FAF5FF] flex flex-col items-center py-10 gap-6 shadow-2xl z-50 border-t border-purple-100">
          {menuItems.map((item) => (
            <div key={item.name} className="flex flex-col items-center w-full">
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    className={`flex items-center gap-1 text-base font-semibold text-[#15010D] cursor-pointer ${
                      active === item.name ? "text-[#6024D0]" : ""
                    }`}
                  >
                    {item.name}{" "}
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${mobileDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {mobileDropdownOpen && (
                    <div className="flex flex-col items-center gap-3 mt-4 bg-white/50 w-full py-4">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => {
                            setMobileDropdownOpen(false);
                            setMobileMenuOpen(false);
                          }}
                          className="text-[#15010D]/70 hover:text-[#6024D0]"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-semibold transition ${active === item.name ? "text-[#6024D0]" : "text-[#15010D]"}`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          <div className="flex flex-col w-full px-10 gap-4 mt-4">
            <Link href="/#upcoming-programs" onClick={() => setMobileMenuOpen(false)} className="w-full text-center bg-[#6024D0] text-white py-4 rounded-xl font-bold">
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;