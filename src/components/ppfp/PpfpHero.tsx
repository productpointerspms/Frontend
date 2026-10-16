import Image from "next/image";
import Link from "next/link";

const details = [
  { label: "Next Batch:", value: "October 15th – December 24th, 2027" },
  { label: "Duration:", value: "10 weeks" },
  {
    label: "Format:",
    value: "100% Online | Live Sessions | Practical Learning",
  },
  { label: "Cohort Size:", value: "20 participants" },
];

const stats = [
  "10 WEEKS",
  "LIVE & PRACTICAL",
  "NO PRIOR FINTECH EXPERIENCE REQUIRED",
];

export default function PpfpHero() {
  return (
    <>
      <section className="relative flex min-h-190 items-center justify-center overflow-hidden px-4 text-center">
        <Image
          src="/images/ppfp/ppfpherobg.png"
          alt=""
          fill
          priority
          className="hidden object-cover md:block"
        />
        <Image
          src="/images/ppfp/ppfpherobgmo.png"
          alt=""
          fill
          priority
          className="object-cover md:hidden"
        />

        <Image
          src="/images/homepage/Rectangle.png"
          alt=""
          fill
          className="hidden object-cover md:block"
        />
        <Image
          src="/images/homepage/RectangleMo.png"
          alt=""
          fill
          className="block object-cover md:hidden"
        />

        <div className="relative z-10 mx-auto mt-20  ">
          <span className="mb-4 inline-block rounded-full border border-white px-4 py-2 font-bricolage text-[10px] font-bold uppercase leading-[17.28px] tracking-[1.613px] text-white md:text-[14px]">
            Fintech Product Management Program
          </span>

          <h1 className="font-bricolage text-[24px] font-extrabold leading-normal md:tracking-[-2.464px] tracking-[-1.5px] text-white  md:text-[56px] lg:w-259 md:leading-[74.624px]">
            Build the Product Skills to Shape{" "}
            <span className="text-[#FFBB1D]">the Future of Fintech.</span>
          </h1>

          <p className="mx-auto mt-6 md:max-w-190 max-w-90 font-montserrat text-[12px] md:font-semibold text-[#FFF] md:text-[18px] md:leading-7 font-medium">
            A practical program for those who want to understand how financial
            products work across markets. Learn the systems, payment rails,
            regulatory considerations and product decisions that shape financial
            products across Nigeria, Africa and global markets.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#pricing"
              className="rounded-md bg-[#5818D0] w-59.75 md:w-56 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0A0718] cursor-pointer"
            >
              Apply Now
            </Link>
            <Link
              href="#program-details"
              className="rounded-md border w-59.75 border-white bg-white/10 px-8 py-3 text-sm font-semibold leading-[21.12px] text-white transition-colors hover:bg-white/30"
            >
              See program details
            </Link>
          </div>

          <ul className="mt-10 space-y-1 font-montserrat ">
            {details.map((item) => (
              <li key={item.label}>
                <span className="md:font-semibold pr-2 font-medium text-[#FFBB1D] text-[12px] md:text-[16px] tracking-[0.282px] leading-[21.12px]">
                  {item.label}
                </span>{" "}
                <span className="md:font-semibold font-medium text-[#FFBB1D]  md:text-[14px] text-[11px] tracking-[0.282px] leading-[21.12px]">
                  {item.value}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 md:flex flex-col items-center hidden justify-center gap-3 font-montserrat text-[10px] leading-[17.28px] font-semibold tracking-[1.152px] text-[#FFF] md:flex-row md:gap-20 md:text-[12px]">
            {stats.map((stat) => (
              <span key={stat}>{stat}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
