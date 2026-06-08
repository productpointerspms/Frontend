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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Programs",
      href: "#",
      dropdown: [
        { name: "PPAP Program", href: "/ppap" },
        { name: "PPMP Program", href: "/ppmp" },
        { name: "PPCP Program", href: "/ppcp" },
        { name: "PPTP Program", href: "/pptp" },
      ],
    },
    { name: "Community", href: "/community" },
    { name: "Contact", href: "/contact" },
  ];

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
    <nav className="w-full bg-[#FCF1FF] flex items-center justify-between px-6 md:px-12 py-5 relative z-[100]">
      {/* Logo Section matching Hero.jpg */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className=" p-1.5 rounded-lg">
          
            <Image src={logo} alt="logo" width={150} height={50} />
       
        </div>
       
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-10 text-[13px] text-[#15010D] font-medium">
        {menuItems.map((item) => (
          <li key={item.name} className="relative">
            {item.dropdown ? (
              <div className="relative" ref={dropdownRef}>
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
                  <ul className="absolute top-8 left-0 bg-white border border-purple-100 rounded-xl shadow-xl w-48 p-2 z-50">
                    {item.dropdown.map((sub) => (
                      <li key={sub.name}>
                        <Link
                          href={sub.href}
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2.5 text-xs text-gray-700 hover:text-[#6024D0] hover:bg-purple-50 rounded-lg transition"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
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
        <Link href="/" className="bg-[#6024D0] text-white px-7 py-2.5 rounded-lg font-bold hover:bg-[#4c1da3] transition shadow-sm">
          Apply Now
        </Link>
        {/* <Link href="/login" className="border border-[#6024D0] text-[#6024D0] px-7 py-2.5 rounded-lg font-bold hover:bg-purple-50 transition">
          Log In
        </Link> */}
      </div>

      {/* Mobile Menu Toggle */}
      <button className="md:hidden text-[#15010D] cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-1 text-base font-semibold text-[#15010D] cursor-pointer"
                  >
                    {item.name} <ChevronDown size={18} />
                  </button>
                  {dropdownOpen && (
                    <div className="flex flex-col items-center gap-3 mt-4 bg-white/50 w-full py-4">
                      {item.dropdown.map((sub) => (
                        <Link key={sub.name} href={sub.href} onClick={() => setMobileMenuOpen(false)} className="text-[#15010D]/70 hover:text-[#6024D0]">
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
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="w-full text-center bg-[#6024D0] text-white py-4 rounded-xl font-bold">
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;