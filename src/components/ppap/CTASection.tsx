import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="bg-white py-24 px-6 md:px-12 text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1a1a1a] mb-3">
          Stop Guessing Your Way Into Product Management.
        </h2>
        
        <p className="text-gray-500 text-base md:text-lg mb-10">
          Start with the right foundation
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <Link href="/ppap/apply" className="bg-[#6D28D9] text-white px-8 py-3.5 rounded-xl font-medium hover:bg-[#5b21b6] transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
            Apply Now <ArrowRight className="w-4 h-4" />
          </Link>

          <Link href="/ppap/apply" className="bg-white text-[#1a1a1a] px-8 py-3.5 rounded-xl font-medium border border-gray-300 hover:bg-gray-50 transition-colors w-full sm:w-auto flex items-center justify-center">
            Join the Next Cohort
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
