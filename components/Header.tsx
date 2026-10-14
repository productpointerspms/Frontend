"use client";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
const links = [
  ["/ppmp", "Product Management Mastery"],
  ["/ppfm", "Fintech Product Management"],
  ["/ppip", "Product Management Apprenticeship"],
  ["/ppap", "Product Management Accelerator"],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header sticky top-0 z-40"><div className="header-inner">
    <Link href="/" className="brand"><span className="brand-mark">◖</span><span>ProductPointers</span></Link>
    <nav className="nav" aria-label="Main navigation">
      <Link href="/">Home</Link><div className="nav-programs"><button type="button">Programs <ChevronDown size={14}/></button><div className="program-menu">{links.map(([href,label])=><Link href={href} key={href}>{label}</Link>)}</div></div>
      <Link href="/">Courses</Link><Link href="/">Scholarship</Link><Link href="/">Community</Link><Link href="/">Contact</Link><Link href="/ppmp" className="apply-link">Apply Now</Link>
    </nav>
    <button className="mobile-nav-trigger rounded-md p-2 transition-colors hover:bg-purple-50" type="button" aria-label={open?"Close menu":"Open menu"} onClick={()=>setOpen(!open)}>{open?<X size={23}/>:<Menu size={23}/>}</button>
    {open&&<nav className="mobile-menu">{links.map(([href,label])=><Link href={href} key={href} onClick={()=>setOpen(false)}>{label}</Link>)}<Link href="/" onClick={()=>setOpen(false)}>Home / Sponsor a learner</Link></nav>}
  </div></header>;
}
