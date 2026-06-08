"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import React from "react";

export default function TheNewFuture(): React.ReactElement {
  const float: Variants = {
    animate: {
      y: [0, -20],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      className="
        relative flex flex-col items-center justify-center text-center w-full overflow-hidden px-4 py-24 md:py-32
        bg-[linear-gradient(176.85deg,#FCF1FF_2.61%,#5C1CC5_66.02%,#2C0E5F_120.81%)] 
        font-[Montserrat]
      "
    >
      {/* Floating Images */}
      <motion.img
        src="/images/Futone.png"
        alt=""
        variants={float}
        animate="animate"
        className="absolute rounded-full object-cover w-20 md:w-32 top-[12%] left-[6%]"
      />

      <motion.img
        src="/images/Futtwo.png"
        alt=""
        variants={float}
        animate="animate"
        transition={{ delay: 1 }}
        className="absolute rounded-full object-cover w-14 md:w-20 bottom-[12%] left-[10%]"
      />

      <motion.img
        src="/images/Futtwo.png"
        alt=""
        variants={float}
        animate="animate"
        transition={{ delay: 2 }}
        className="absolute rounded-full object-cover w-14 md:w-20 bottom-[12%] right-[10%]"
      />

      {/* Title */}
      <h1 className="text-white font-bold text-[37px] sm:text-[49px] md:text-[60px] leading-[1.15] max-w-4xl">
        Shape the future with us
      </h1>

      {/* Description */}
      <p className="text-white/90 text-[14px] sm:text-[16px] md:text-[18px] leading-[30px] max-w-2xl mt-6">
        Join a community of ambitious product professionals who are building the
        future, one product at a time. Whether you&apos;re just starting out or ready
        to level up, your journey to product management excellence starts here.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        <Link href="/apply">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full sm:w-auto px-7 py-3 bg-[#FAE1FF] border border-[#5B1CC5] 
                       rounded text-[#2C0E5F] font-semibold shadow-sm"
          >
            Apply Now
          </motion.button>
        </Link>

        <Link href="/community">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full sm:w-auto px-7 py-3 border border-white text-white rounded font-semibold"
          >
            Join Community
          </motion.button>
        </Link>
      </div>

      {/* Additional text */}
      <p className="mt-6 text-white/80 text-xs flex items-center gap-2 tracking-wide">
        🔒 Application review within 48 hours • 💰 Payment plans available
      </p>
    </section>
  );
}
