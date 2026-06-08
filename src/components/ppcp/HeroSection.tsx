import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import img from "@/assets/images/ppcphero.png"
import avatar1 from "@/assets/images/prod.png"
import avatar2 from "@/assets/images/prod1.png"
import avatar3 from "@/assets/images/prod2.png"

const Hero = () => {
  return (
    <div className="bg-[#FCF1FF] min-h-screen font-sans">
      {/* Hero Content */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <div className="inline-block border border-purple-200 bg-purple-50 px-4 py-1 rounded-full mb-6">
            <span className="text-[#6219D1] text-xs font-semibold">Personalized 1:1 Coaching</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-[1.1] mb-8">
            Stop Trying To <br /> Figure It Out Alone
          </h1>
          
          <p className="text-gray-500 text-base md:text-base max-w-xl leading-relaxed mb-10">
            The ProductPointers Coaching Program (PPCP) is a personalized 1:1 mentorship experience 
            designed to take you from beginner to a confident, job-ready Product Manager, 
            with direct guidance every step of the way.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/ppcp/apply" className="bg-[#6219D1] text-white text-xs px-8 py-2 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#4f14a8] transition-all">
              Apply for 1:1 Coaching <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="border-2 border-gray-900 text-gray-900 text-xs px-10 py-2 rounded-2xl font-bold hover:bg-gray-50 transition-all">
              Book a Session
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[avatar1, avatar2, avatar3].map((avatar, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 overflow-hidden shadow-sm">
                  <img src={avatar.src} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs">
              Join <span className="font-bold text-gray-900">300+</span> ambitious Product Managers getting personalized guidance through ProductPointers.
            </p>
          </div>
        </div>

        {/* Right Side: Graphic Section */}
        <div className="relative">
          <img src={img.src} alt="Coaching Hero" className="w-full h-auto" />
        </div>
      </section>
    </div>
  );
};

export default Hero;