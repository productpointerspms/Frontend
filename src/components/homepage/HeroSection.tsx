import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <>
      <section className="relative flex h-190 items-center justify-center overflow-hidden px-6 text-center">
        <Image
          src="/images/homepage/heroBg.jpeg"
          alt=""
          fill
          priority
          className="object-cover hidden md:block"
        />
        <Image
          src="/images/homepage/herobgmo.jpeg"
          alt=""
          fill
          priority
          className="object-cover md:hidden blockh-177"
        />

        <Image
          src="/images/homepage/Rectangle.png"
          alt=""
          fill
          className="object-cover hidden md:block"
        />
        <Image
          src="/images/homepage/RectangleMo.png"
          alt=""
          fill
          className="object-cover block md:hidden h-177"
        />

        <div className="relative z-10 mx-auto max-[900px] mt-44">
          <span className="mb-6 inline-block rounded-full border font-bricolage border-white px-4 py-2 text-[10px] md:text-[14px] font-bold tracking-[1.613px] uppercase  leading-[ 17.28px] text-white">
            Raising world-class product talent
          </span>

          <h1 className="md:text-[64px] font-bricolage text-[24px] font-extrabold leading-normal md:leading-[65.34px] tracking-[-1.782px] text-white sm:text-5xl md:text-6xl">
            Become a Globally Competitive{" "}
            <span className="text-[#FFBB1D]">Product Manager.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-4xl text-[12px] md:w-4xl w-86.25 text-center font-medium md:font-semibold font-montserrat text-white/80 md:text-[18px] md:leading-7">
            Whether you&apos;re aspiring to break into Product Management,
            transitioning from another career, or growing in your early Product
            career, we give you the structured learning, practical experience
            and mentorship you need to build real skills, demonstrate what you
            can do and confidently pursue opportunities.
          </p>

          <div className="mt-10 md:mt-18 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/programs"
              className="rounded-md bg-[#5818D0] w-59.75 md:w-[197px]px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0A0718] cursor-pointer"
            >
              Explore Programs
            </Link>
            <Link
              href="/scholarship"
              className="rounded-md border w-59.75 border-white bg-white/10 px-8 py-3 text-sm font-semibold leading-[21.12px] text-white transition-colors hover:bg-white/30"
            >
              Apply for a Scholarship
            </Link>
          </div>

          <p className="mt-12 md:mt-12.5 md:block hidden md:text-[18px] text-[12px] leading-6 text-white/60">
            Quality Product Management education, made accessible and
            affordable.
          </p>
          <p className="mt-12 md:mt-12.5 block md:hidden md:text-[18px] text-[12px] leading-6 text-white/60">
            Quality Product Management education,
            <br /> made accessible and affordable.
          </p>
        </div>
      </section>

      <div id="hero-sentinel" className="h-px" aria-hidden />
    </>
  );
}
