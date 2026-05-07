"use client"
import React from "react";
import Image from "next/image";
const Hero = () => {
  return (
    // <section className="w-full bg-[#FCF1FF] py-20 px-6 md:px-12 lg:px-20">
     <section className="w-full bg-[#FCF1FF] pt-1 pb-20 px-6 md:px-12 lg:px-20"> 
      <div className="max-w-7xl mx-auto grid md:grid-cols-2  gap-6 items-center">
        <div>
          <span className="inline-block bg-[#FAE1FF] text-purple-700 px-4 py-1 rounded-full text-sm font-medium">
            Beginner-Friendly Program
          </span>
          {/* <h1 className="mt-6 text-4xl text-[#0C1115] font-extrabold text-gray-600 leading-tight"> */}
           <h1 className="mt-6 text-4xl font-montserrat font-extrabold text-[#0C1115] leading-tight">
            Confused About Where <br />
            To Start In Product <br />
            Management?
          </h1>

          {/* Description */}
          <p className="mt-5 text-[#6A6B6C] font-montserrat text-lg max-w-lg">
            The ProductPointers Accelerator Program (PPAP) helps you go from zero
            knowledge to thinking like a Product Manager with structure,
            mentorship, and hands-on learning.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="bg-[#5C1CC5] text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition">
              Join the Next Cohort →
            </button>

            <button className="border border-gray-400 px-6 py-3 rounded-lg font-medium hover:bg-whine-100 transition">
              See Program Breakdown
            </button>
          </div>

          {/* Social proof */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-3">
              <img
                src="images/ppmp3.png"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <img
                src="images/ppmp2.png"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <img
                src="images/ppmp1.png"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            </div>

            <p className="text-sm text-[#4B4B4B]">
              Join <span className="text-black font-bold">300+</span> aspiring Product Managers who started here
            </p>
          </div>
        </div>


        {/* RIGHT IMAGE */}
        <div className="w-full flex justify-end">
          <img
            src="images/ppmp.png"
            alt="PPAP Foundation"
            className="w-[100%] md:w-full h-auto"
            
          />
        </div>
    </div>
    </section>
  );
};

export default Hero;
  