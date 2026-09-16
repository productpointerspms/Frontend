import Image from "next/image";

interface CareerCTAProps {
  imageSrc?: string;
  imageAlt?: string;
}

export default function CareerCTA({
  imageSrc = "/images/homepage/ble.png",
  imageAlt = "ProductPointers graduate wearing a Learn, Build, Grow, Standout t-shirt",
}: CareerCTAProps) {
  return (
    <section className="bg-white  lg:py-20 md:pt-20 pt-20 pb-0">
      <div className=" w-full md:block lg:hidden bg-[#5818D0] px-4 py-10 text-white">
        <p className="mb-4 text-[10px] text-center font-semibold uppercase tracking-[1.613px] leading-[17.28px] text-[#FF00D2]">
          TAKE THE NEXT STEP
        </p>

        <h2 className="mb-2 text-[24px] font-extrabold tracking-[-1.458px] text-center">
          Ready to Build Your Product
          <br />
          Management Career?
        </h2>

        <p className="mb-8 text-[12px] leading-5.5 text-center text-[rgba(255,255,255,0.72)]">
          Whether you&apos;re starting your journey, switching careers, or
          looking to sharpen your product skills, there&apos;s a path for you at
          ProductPointers.
        </p>

        <div className="flex items-center flex-col gap-5">
          <button
            type="button"
            className="rounded-md bg-[#FF00D2] px-8 py-3 text-[14px] w-73.25 cursor-pointer font-semibold leading-[21.12px] tracking-[0.282px] text-white hover:bg-[#e600a6]"
          >
            Explore Programs
          </button>

          <button
            type="button"
            className="rounded-md border bg-[rgba(255,255,255,0.10)] border-white w-73.25 px-8 py-3 text-[14px] font-semibold text-white leading-[21.12px] cursor-pointer tracking-[0.282px] hover:bg-white/40"
          >
            Apply for a Scholarship
          </button>
        </div>
      </div>
      <div className="relative flex justify-end">
        {/* IMAGE */}
        <div className="relative h-119.25 w-203 hidden lg:block overflow-hidden rounded-l-[16px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            className="object-cover object-top"
          />
        </div>

        {/* PURPLE CARD for large screen */}
        <div className="lg:absolute relative left-27 hidden md:hidden lg:block top-[53%] z-10 w-176.25 h-96.75 -translate-y-1/2 rounded-xl  bg-[#5818D0] p-14 text-white">
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[1.613px] text-[#FF00D2] leading-[17.28px]">
            TAKE THE NEXT STEP
          </p>

          <h2 className="mb-2 text-[36px] font-extrabold leading-[53.46px] tracking-[-1.458px]">
            Ready to Build Your Product
            <br />
            Management Career?
          </h2>

          <p className="mb-6  text-[14px] leading-5.5 text-[rgba(255,255,255,0.72)]">
            Whether you&apos;re starting your journey, switching careers, or
            looking to sharpen your product skills, there&apos;s a path for you
            at ProductPointers.
          </p>

          <div className="flex items-center gap-8">
            <button
              type="button"
              className="rounded-md bg-[#FF00D2] px-8 py-3 text-[14px] cursor-pointer font-semibold leading-[21.12px] tracking-[0.282px] text-white hover:bg-[#e600a6]"
            >
              Explore Programs
            </button>

            <button
              type="button"
              className="rounded-md border bg-[rgba(255,255,255,0.10)] border-white px-8 py-3 text-[14px] font-semibold text-white leading-[21.12px] cursor-pointer tracking-[0.282px] hover:bg-white/40"
            >
              Apply for a Scholarship
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
