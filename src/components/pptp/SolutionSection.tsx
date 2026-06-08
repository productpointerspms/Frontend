import React from 'react';
import { BarChart2, Award, TrendingUp as GrowthIcon } from 'lucide-react';
import img from "@/assets/images/pptpimg5.png"

export const SolutionSection = () => {
    return (
        <section className="bg-[#6024D0] py-24 px-6 md:px-20 font-montserrat text-white rounded-[40px] m-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-8">
                        Most Product Managers Stay Stuck Because They Stay General.
                    </h2>
                    <p className="text-white/80 text-lg mb-12">PPTP exists to help you:</p>
                    <div className="flex flex-wrap gap-4">
                        <div className="bg-white text-black px-6 py-4 rounded-xl flex items-center gap-3 font-bold shadow-lg">
                            <BarChart2 className="text-[#6024D0]" /> Increase your value in the market
                        </div>
                        <div className="bg-white text-black px-6 py-4 rounded-xl flex items-center gap-3 font-bold shadow-lg">
                            <Award className="text-[#6024D0]" /> Differentiate yourself
                        </div>
                        <div className="bg-white text-black px-6 py-4 rounded-xl flex items-center gap-3 font-bold shadow-lg">
                            <GrowthIcon className="text-[#6024D0]" /> Grow faster
                        </div>
                    </div>
                </div>
                <div className="relative">

                    <img src={img.src} alt="Team meeting" className="w-full h-[450px] object-cover" />

                </div>
            </div>
        </section>
    );
};