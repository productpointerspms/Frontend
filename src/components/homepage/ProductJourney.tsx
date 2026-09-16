// components/ProductJourney.tsx
import {
  UserPlus,
  BookOpen,
  GraduationCap,
  Users,
  Star,
  LucideIcon,
} from "lucide-react";

interface JourneyStep {
  icon: LucideIcon;
  title: string;
  description: string;
  bgColor: string;
}

const steps: JourneyStep[] = [
  {
    icon: UserPlus,
    title: "New Member",
    description:
      "Start exploring Product Management and discover the right path for your career.",
    bgColor: "bg-[#5B21B6]", // purple
  },
  {
    icon: BookOpen,
    title: "Learner",
    description:
      "Build a strong foundation through structured, practical learning.",
    bgColor: "bg-[#C026D3]", // magenta
  },
  {
    icon: GraduationCap,
    title: "Graduate",
    description:
      "Complete your program with new skills, practical work and greater confidence.",
    bgColor: "bg-[#65A30D]", // green
  },
  {
    icon: Users,
    title: "Alumni",
    description:
      "Continue growing with access to opportunities, resources and the ProductPointers network.",
    bgColor: "bg-[#B91C1C]", // red/orange
  },
  {
    icon: Star,
    title: "Mentor",
    description:
      "Give back by supporting and guiding the next generation of Product talent.",
    bgColor: "bg-[#1D3A8A]", // navy blue
  },
];

export default function ProductJourney() {
  return (
    <section className="w-full bg-white px-6 py-20 md:px-10 md:my-10 ">
      <div className="mx-auto max-w-7xl">
        {/* Eyebrow + heading */}
        <p className="mb-4 text-xs md:text-base md:font-semibold font-medium uppercase tracking-[1.613px] leading-[17.28px] text-[#5818D0]">
          YOUR PRODUCTPOINTERS JOURNEY
        </p>
        <h2 className="md:w-130 md:mb-15.5 mb-8 w-full md:text-[30.8px] text-[20px] md:font-bold font-semibold md:leading-[43.47px] leading-normal text-[#0E0A1A] tracking-[-1.134px]">
          A Clear Path to Growing Your Product Career.
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full ${step.bgColor} shadow-md`}
                >
                  <Icon className="h-10 w-10 text-white " strokeWidth={2} />
                </div>
                <h3 className="mb-4 md:text-[20px] text-base leading-[28.508px] font-bold text-[#14010D]">
                  {step.title}
                </h3>
                <p className="text-[12px] md:w-55 w-60 md:text-[14px] leading-[23.163px] text-[#6D6D6D]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
