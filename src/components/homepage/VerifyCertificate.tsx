import React from "react";
import { ArrowRight } from "lucide-react";

const VerifyCertificate = () => {
  return (
    <div className="w-full bg-[#FCF1FF] py-24 px-6 flex flex-col items-center justify-center text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[#1E0F2B] mb-6">
        Verify ProductPointers Certificates
      </h2>
      <p className="text-gray-500 text-lg md:text-xl max-w-3xl mb-4 font-medium">
        Employers and organizations can verify ProductPointers program
        completion using a student verification ID.
      </p>
      <p className="text-gray-400 text-sm md:text-base mb-10">
        Every verified certificate confirms authentic program participation and completion.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Enter Verification ID"
          className="w-full sm:w-[350px] px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A25D2] text-gray-700 bg-white"
        />
        <button className="w-full sm:w-auto bg-[#6A25D2] hover:bg-[#5b1cb8] text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center transition-colors">
          Verify Certificate
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default VerifyCertificate;
