import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="bg-white py-24 px-6 text-center font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          You Don't Need More Courses.
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold italic text-[#6219D1] mb-10">
          You need a coach who gets it.
        </h3>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/ppcp/apply" className="bg-[#6219D1] hover:bg-[#4f14a8] text-white font-bold px-8 py-4 rounded-xl flex items-center gap-2 transition-all w-full md:w-auto">
            Apply for Coaching <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-8 py-4 rounded-xl transition-all w-full md:w-auto">
            See How It Works
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-100 mb-16"></div>

        {/* Bottom Tagline */}
        <p className="text-xl md:text-2xl font-bold text-gray-900 leading-relaxed">
          PPCP Is Where Product Managers Stop{' '}
          <span className="text-[#FBBF24]">Guessing</span>...{' '}
          And Start{' '}
          <span className="text-[#10B981]">Growing With Purpose.</span>
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
