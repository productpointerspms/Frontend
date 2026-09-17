import Image from "next/image";
import { ArrowRight } from "lucide-react"; // npm install lucide-react (or swap for your own icon/svg)

export default function SponsorshipSection() {
  return (
    <section className="w-full bg-white px-4 py-10 md:px-20 md:py-30">
      {/* Outer rounded panel — light pink background, clips the decorative circle */}
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl md:bg-[rgba(255,0,210,0.10)] bg-white px-6 py-10 sm:px-10 md:px-12 md:py-16">
        {/* Decorative half-circle, sits behind the image, clipped by the section's overflow-hidden */}
        <div
          aria-hidden="true"
          className="absolute -bottom-24 left-[36%] hidden md:block h-40 w-40 rounded-full bg-[rgba(255,0,210,0.10)] md:h-48 md:w-48"
        />

        <div className="relative grid grid-cols-1 items-stretch gap-10 md:grid-cols-2 md:gap-12">
          {/* Left column — copy. h-full + flex centers it to match the image's height */}
          <div className="flex h-full flex-col justify-center">
            <p className="mb-4 text-xs md:text-base md:font-semibold font-medium uppercase tracking-[1.613px] leading-[17.28px] text-[#FF00D2]">
              MAKING ACCESS POSSIBLE
            </p>

            <h2 className="md:text-[30.8px] text-[20px] md:font-bold font-semibold md:leading-[43.47px] leading-normal text-[#0E0A1A] tracking-[-1.134px]">
              Talent Is Everywhere. Access Isn&apos;t.
            </h2>

            <div className="mt-6 space-y-4 text-[12px] md:leading-6 leading-4 text-[#525252] md:text-base">
              <p>
                Many talented people have the potential to build great products
                and meaningful careers. Sometimes, what stands between them and
                the next step is simply access to quality opportunities they can
                afford.
              </p>
              <p>
                Through ProductPointers, individuals, organisations and partners
                can sponsor talented people and help give them access to
                structured learning, practical experience and mentorship.
              </p>
            </div>
            <button
              type="button"
              className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#FF00D2] px-8 py-3 text-sm font-semibold leading-[21.12px] tracking-[0.282px] cursor-pointer text-white transition-colors hover:bg-[#0E0A1A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC13A0] focus-visible:ring-offset-2 md:w-fit"
            >
              Become A Sponsor
              <ArrowRight className="h-6 w-6" strokeWidth={2.5} />
            </button>
          </div>

          <div className="relative z-10 mx-auto flex h-full items-center justify-center md:ml-4 md:justify-start">
            <div className="relative h-73.25 w-85.75 overflow-hidden rounded-xl md:h-110 md:w-109.25">
              <Image
                src="/images/homepage/sponsor.png"
                alt="A ProductPointers sponsor giving a thumbs up"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
