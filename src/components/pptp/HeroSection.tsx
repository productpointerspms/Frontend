import React from 'react';
import Link from 'next/link';
import { Send, ChevronRight } from 'lucide-react';
import heroImage from "@/assets/images/pptpimg.png";
import avat from "@/assets/images/prod.png"
import ava2 from "@/assets/images/prod1.png"
import ava3 from "@/assets/images/prod2.png"

const HeroSection = () => {
    return (
        <section className="bg-[#FDF2FF] min-h-[80vh] flex items-center px-6 py-12 md:px-20 font-montserrat">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <span className="inline-block bg-[#F4EBFF] text-[#6024D0] px-4 py-1 rounded-full text-xs font-medium mb-6 border border-[#E9D7FE]">
                        Advanced PM Specialization
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-[#101828] leading-[1.1] mb-6">
                        You’re Already A Product Manager... <br />
                        <span className="text-[#6024D0]">But You’re Still Not Standing Out</span>
                    </h1>
                    <p className="text-[#475467] text-base md:text-lg mb-10 max-w-xl">
                        The ProductPointers Track Program (PPTP) helps you specialize, deepen your expertise, and position yourself as a high-impact Product Manager in a competitive market.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/pptp/apply" className="bg-[#6024D0] text-white text-xs px-5 py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#4d1ba8] transition-all">
                            Apply for the Next Cohort <ChevronRight size={20} />
                        </Link>
                        <button className="bg-white border border-[#101828] text-[#101828] text-xs px-5 py-2 rounded-xl font-bold hover:bg-gray-50 transition-all">
                            Choose Your Specialization
                        </button>
                    </div>
                    <div className="mt-8 flex items-center gap-3">
                        <div className="flex -space-x-2">
                            {/* Placeholder for alumni avatars */}
                            <img src={avat.src} alt="" className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" />
                            <img src={ava2.src} alt="" className="w-10 h-10 rounded-full border-2 border-white bg-gray-300" />
                            <img src={ava3.src} alt="" className="w-10 h-10 rounded-full border-2 border-white bg-gray-400" />
                        </div>
                        <p className="text-xs text-[#475467]">Join ambitious Product Managers standing out through ProductPointers.</p>
                    </div>
                </div>
                <div className="relative flex justify-center lg:justify-end">
                    <img src={heroImage.src} alt="Hero Image" className="w-full h-full object-cover rounded-[40px]" />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;