"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, X, Menu } from "lucide-react";
import Image from "next/image";
import logo from "../assets/images/Image.png";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Programs",
      href: "#",
      dropdown: [
        { name: "Mentorship", href: "/programs/mentorship" },
        { name: "Leadership", href: "/programs/leadership" },
      ],
    },
    { name: "Network", href: "/network" },
    { name: "Community", href: "/community" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full bg-[#FCF1FF] flex items-center justify-between px-6 md:px-10 py-3 relative">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image
          src={logo}
          alt="ProductPointers Logo"
          width={70}
          height={70}
          className="object-contain"
        />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-8 text-sm text-gray-800 font-montserrat">
        {menuItems.map((item) => (
          <li key={item.name} className="relative">
            {item.dropdown ? (
              <div
                className="flex items-center gap-1 cursor-pointer"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <span
                  className={`${
                    active === item.name
                      ? "text-purple-600"
                      : "hover:text-purple-600"
                  } transition`}
                >
                  {item.name}
                </span>
                <ChevronDown size={16} className="text-gray-600" />
                {dropdownOpen && (
                  <ul className="absolute top-6 left-0 bg-white border font-montserrat rounded-lg shadow-md w-40 p-2 z-50">
                    {item.dropdown.map((sub) => (
                      <li key={sub.name}>
                        <Link
                          href={sub.href}
                          className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md"
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
                onClick={() => setActive(item.name)}
                className={`pb-1 transition relative ${
                  active === item.name
                    ? "text-purple-600"
                    : "hover:text-purple-600"
                }`}
              >
                {item.name}
                {active === item.name && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-600 rounded-full"></span>
                )}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-3">
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md font-montserrat hover:bg-purple-700 transition">
          Sign Up
        </button>
        <button className="border border-purple-600 text-purple-700 px-4 py-2 rounded-md font-montserrat hover:bg-purple-50 transition">
          Log In
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-gray-800"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#FCF1FF] flex flex-col items-center py-6 gap-4 font-montserrat shadow-lg z-50">
          {menuItems.map((item) => (
            <div key={item.name} className="flex flex-col items-center w-full">
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center justify-center gap-1 text-gray-800 font-medium hover:text-purple-600 relative"
                  >
                    {item.name}
                    <ChevronDown size={16} className="text-gray-600" />
                    {active === item.name && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[20px] h-[2px] bg-purple-600 rounded-full"></span>
                    )}
                  </button>

                  {dropdownOpen && (
                    <div className="flex flex-col items-center w-full mt-2 gap-2">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="text-gray-700 hover:text-purple-600"
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
                  onClick={() => {
                    setActive(item.name);
                    setMobileMenuOpen(false);
                  }}
                  className={`relative text-gray-800 text-base font-medium pb-1 ${
                    active === item.name
                      ? "text-purple-600"
                      : "hover:text-purple-600"
                  }`}
                >
                  {item.name}
                  {active === item.name && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-purple-600 rounded-full"></span>
                  )}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile Buttons */}
          <div className="flex flex-col items-center w-full mt-4 gap-3 px-6">
            <button className="w-full bg-purple-600 text-white py-2 rounded-md font-montserrat hover:bg-purple-700 transition">
              Sign Up
            </button>
            <button className="w-full border border-purple-600 text-purple-700 py-2 rounded-md font-montserrat hover:bg-purple-50 transition">
              Log In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
