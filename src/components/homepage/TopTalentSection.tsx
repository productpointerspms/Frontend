import Image from "next/image";

type Student = {
  id: string; // e.g. "01"
  name: string;
  role: string;
  company: string;
  accentColor: "purple" | "orange";
  // "top": caption sits above the image (name/role first, image below)
  // "bottom": caption sits below the image (image first, name/role below)
  captionPosition: "top" | "bottom";
};

const students: Student[] = [
  {
    id: "01",
    name: "Perpetua Ngozi Onwochei",
    role: "Product Manager",
    company: "LawPavilon",
    accentColor: "purple",
    captionPosition: "bottom",
  },
  {
    id: "02",
    name: "Oyajoju Eniola Adebinpe",
    role: "Product Manager",
    company: "Finclusion Technologies Inc",
    accentColor: "orange",
    captionPosition: "top",
  },
];

const accentClasses = {
  purple: {
    line: "bg-[#5818D0]",
    number: "text-[#5818D0]",
    role: "text-[#5818D0]",
  },
  orange: {
    line: "bg-[#FFBB1D]",
    number: "text-[#FFBB1D]",
    role: "text-[#5818D0]",
  },
} as const;

function Caption({ student }: { student: Student }) {
  const accent = accentClasses[student.accentColor];
  return (
    <div>
      <div className="md:mb-4 mb-1 -mt-2 md:mt-0 flex items-center gap-2">
        <span className={`md:h-0.75 md:w-6.5 h-0.5 w-4 ${accent.line}`} />
        <span
          className={`md:text-xs text-[10px] font-bold md:leading-[15.6px] leading-[9.241px] md:tracking-[1.456px] tracking-[0.863px] ${accent.number}`}
        >
          {student.id}
        </span>
      </div>
      <h3 className="md:text-[23px] text-sm font-extrabold text-[#0E0A1A] sm:text-xl md:leading-[27.324px] leading-[16.187px] md:tracking-[-0.713px] tracking-[-0.422px]">
        {student.name}
      </h3>
      <p className="md:text-[13.12px] text-[10px] text-[#5818D0] md:leading-[19.68px] leading-[11.658px] md:tracking-[0.131px] tracking-[0.078px]">
        <span className={`font-semibold ${accent.role}`}>{student.role}</span>
        <span className="mx-1.5 text-[#C5BFE8]">·</span>
        <span className="md:text-[13.12px] font-semibold text-[10px] text-[#5818D0] md:leading-[19.68px] leading-[11.658px] md:tracking-[0.131px] tracking-[0.078px]">
          {student.company}
        </span>
      </p>
    </div>
  );
}

export default function TopTalentSection() {
  return (
    <section className="w-full bg-white px-6 py-20 md:mb-20 md:mt-10 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="md:mb-15 mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-1 text-xs md:text-base md:font-semibold font-medium uppercase tracking-[1.613px] leading-[17.28px] text-[#5818D0]">
              TOP TALENT
            </p>
            <h2 className="md:w-auto w-80 md:text-[30.8px] text-[20px] md:font-bold font-semibold md:leading-[43.47px] leading-normal text-[#0E0A1A] tracking-[-1.134px]">
              Meet Some of our Best Graduating Students
            </h2>
          </div>

          <p className="md:w-80 w-86 md:text-[15px] text-[12px] leading-4 md:leading-[151.667%] text-[#525252] sm:text-right">
            ProductPointers develops people who go on to lead at Africa&rsquo;s
            most ambitious companies.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 md:gap-x-20">
          {/* Card 01 — Perpetua: image on top, caption below, at every
              breakpoint — no reordering needed here. */}
          <div className="flex flex-col gap-5">
            <div className="relative aspect-343/352 w-full max-w-85.75 overflow-hidden bg-[#E5E1DA] sm:aspect-579/597 sm:max-w-144.75">
              <Image
                src="/images/homepage/perpetual.png"
                alt="Perpetua Ngozi Onwochei holding a Best Graduating Student award"
                fill
                sizes="(min-width: 640px) 579px, 343px"
                className="object-cover object-top"
              />
            </div>
            <Caption student={students[0]} />
          </div>

          <div className="flex flex-col-reverse gap-5 sm:flex-col sm:pt-24">
            <Caption student={students[1]} />
            <div className="relative aspect-343/352 w-full max-w-85.75 overflow-hidden bg-[#E5E1DA] sm:aspect-579/487 sm:max-w-579px">
              <Image
                src="/images/homepage/eniola.png"
                alt="Oyajoju Eniola Adebinpe holding a Best Graduating Student award"
                fill
                sizes="(min-width: 640px) 579px, 343px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
