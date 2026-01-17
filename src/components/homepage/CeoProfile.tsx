import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Add the weights you need
});

export default function CeoProfile() {
  return (
    <div
      className={`${montserrat.className}  bg-[#FAE1FF] px-4 md:px-20 md:pt-[163px] pt-14 pb-[70px] `}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:gap-[58px] gap-0">
        <div className=" h-full w-full md:w-[582px] ">
          <Image
            src="/images/blessing.png"
            alt="Blessing Okomor"
            width={582}
            height={750}
            className="w-full h-auto object-cover"
          />
          <div className="mt-8">
            <h3 className="text-[32px] leading-7 text-[#5C1CC5] font-bold">
              Blessing Okomor
            </h3>
            <p className="text-[16px] font-medium text-[#15010D]  leading-5 pt-2">
              Founder, Product Pointers
            </p>
            <p className="text-[15px] font-normal text-[#6D6D6D] leading-5 pt-1">
              The-Global&apos;PM
            </p>
            <p className="text-[15px] font-normal text-[#6D6D6D] leading-5">
              Product Manager, Mainstack{" "}
            </p>
          </div>
        </div>
        <div className=" w-full md:w-[680px] h-full  pt-2.5">
          <h3 className="text-[60px] hidden md:block leading-[60px] text-[#15010D] font-bold">
            Meet Blessing Okomor
          </h3>
          <div className=" text-[#15010D] md:text-[18px] text-[14px] font-normal md:leading-9 leading-6">
            <p className="pt-6">
              Blessing’s journey into tech didn’t begin the conventional way.
              With a strong background in Auditing, she spent years analyzing
              systems, solving business problems, and understanding how
              structure drives success. Yet, her heart always leaned toward
              something more, helping people grow, build, and find purpose
              through Product Management.
            </p>

            <p className="pt-6">
              Her transition into Product Management came with curiosity,
              courage, and an unshakable desire to make meaningful impact. Since
              then, Blessing has led and contributed to impactful products at
              Evendy, Divaca Tech, and now serves as a Product Manager at
              Mainstack, where she continues to blend empathy with execution to
              deliver lasting value{" "}
              <span className="text-[#5C1CC5]">........</span>
            </p>
            <Link
              href="/About" // 👈 change this to your actual route
              className="flex items-center gap-1 mt-2 text-[#5C1CC5] font-normal hover:underline"
            >
              Read more <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
