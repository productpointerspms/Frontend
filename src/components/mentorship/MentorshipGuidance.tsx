import Image from 'next/image';

export default function MentorshipGuidance() {
  return (
    <section className="bg-[#FAF2FF] py-20">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <div>
            <h2 className="max-w-xl text-3xl font-extrabold leading-tight text-[#1A0A1E] md:text-[px]">
              One-On-One Guidance From
              <br />
              PMs Who&apos;ve Been There
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#3A2A3F] md:text-base ">
              The ProductPointers Mentorship Program connects you with experienced
              product managers. These aren&apos;t just advisors they&apos;re active
              practitioners who understand the challenges you&apos;re facing
              because they&apos;ve lived them.
            </p>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#3A2A3F] md:text-base">
              Whether you&apos;re transitioning into product management, looking
              to level up your skills, or aiming for that senior role, your mentor
              becomes your personal guide, advocate, and accountability partner on
              your journey.
            </p>

            {/* Highlight */}
            <div className="mt-8 flex items-center gap-3 text-[#6D28D9]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#6D28D9]/40">
                ✦
              </span>
              <span className="text-xs font-medium md:text-sm">
                Personalized, transformative, and career-changing
              </span>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
              <Image
                src="/mentorship-meeting.png"
                alt="Mentorship session"
                width={700}
                height={500}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
