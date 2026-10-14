"use client";
import Link from "next/link";
import { useState } from "react";
import { Instagram, Linkedin, MessageCircle, Youtube } from "lucide-react";
export default function Footer(){
 const [sent,setSent]=useState(false);
 return <footer className="footer"><div className="footer-inner">
  <div><h3>ProductPointers</h3><p>Build the skills, gain the experience, and create the evidence to grow your Product career.</p></div>
  <div><h3>EXPLORE</h3><Link href="/ppmp">Our Programs</Link><Link href="/">Scholarships</Link><Link href="/">Free Resources</Link><Link href="/">Community</Link><Link href="/">Upcoming Programs</Link></div>
   <div><h3>CONNECT WITH US</h3><div className="social-links" aria-label="Social media"><span aria-label="Instagram"><Instagram size={18}/></span><span aria-label="LinkedIn"><Linkedin size={18}/></span><span aria-label="YouTube"><Youtube size={18}/></span><span aria-label="WhatsApp"><MessageCircle size={18}/></span></div></div>
  <div><h3>STAY IN THE LOOP</h3><p>Get practical Product insights, career opportunities, program updates and resources delivered to your inbox.</p>{sent?<p>Thanks for subscribing.</p>:<form className="subscribe" onSubmit={e=>{e.preventDefault();setSent(true)}}><input aria-label="Email for newsletter" required type="email" placeholder="Enter your email"/><button>Subscribe</button></form>}</div>
 </div><div className="footer-bottom">© 2026 ProductPointers. All rights reserved.</div></footer>
}
