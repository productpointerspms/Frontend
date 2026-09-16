import Image from "next/image";

interface Transformation {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  name: string;
  role: string;
  quote: string;
}

const transformations: Transformation[] = [
  {
    beforeImage: "/images/homepage/before1.png",
    afterImage: "/images/homepage/after1.png",
    beforeLabel: "Manufacturing Engineer",
    afterLabel: "Product Manager",
    name: "Idrees Adekanmbi",
    role: "Product Manager",
    quote:
      "After years of working with physical products and services, transitioning into digital products felt uncertain. ProductPointers provided the structure, practical experience, and mentorship needed to confidently transition into product management.",
  },
  {
    beforeImage: "/images/homepage/before2.png",
    afterImage: "/images/homepage/after2.png",
    beforeLabel: "Radiographer",
    afterLabel: "Product Manager",
    name: "Favour Osaro",
    role: "Product Manager",
    quote:
      "After 9 years in healthcare, ProductPointers helped me transition into tech, build practical experience, and eventually return as a Project Manager. It became the bridge between my old career and the one I have today.",
  },
];

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BeforeAfterCard({
  image,
  label,
  roundedClassName,
}: {
  image: string;
  label: string;
  roundedClassName: string;
}) {
  return (
    <div
      className={`relative h-58.75 w-full overflow-hidden bg-[#F2EDFB] md:aspect-703/482 md:h-auto ${roundedClassName}`}
    >
      <Image
        src={image}
        alt={label}
        fill
        sizes="(min-width: 768px) 703px, 100vw"
        className="object-cover"
      />
    </div>
  );
}

function TransformationRow({ item }: { item: Transformation }) {
  return (
    <div>
      {/* Before / After image pair */}
      <div className="relative mx-auto flex  max-w-86 flex-col gap-0 md:max-w-361.5 md:grid md:grid-cols-[1fr_40px_1fr] md:items-stretch md:gap-0">
        <BeforeAfterCard
          image={item.beforeImage}
          label={item.beforeLabel}
          roundedClassName=""
        />

        {/* connector: horizontal bar on mobile (down arrow), vertical column on desktop (right arrow) */}
        <div className="flex h-8 w-full flex-row items-center bg-slate-950 md:hidden">
          <span className="h-px flex-1 bg-white" />
          <span className="mx-2 flex h-6 w-6 shrink-0 rotate-90 items-center justify-center rounded-full bg-violet-600 text-white shadow-md">
            <ArrowIcon />
          </span>
          <span className="h-px flex-1 bg-white" />
        </div>
        <div className="hidden w-10 flex-col items-center bg-slate-950 md:flex">
          <span className="w-px flex-1 bg-white" />
          <span className="my-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white shadow-md">
            <ArrowIcon />
          </span>
          <span className="w-px flex-1 bg-white" />
        </div>

        <BeforeAfterCard
          image={item.afterImage}
          label={item.afterLabel}
          roundedClassName=""
        />
      </div>

      {/* Name / role / quote */}
      <div className="mt-6 md:mx-auto md:flex md:max-w-361.5 md:justify-end">
        <div className="md:w-1/2 md:border-l md:border-[#525252] md:pl-6">
          <p className="md:text-[15.2px] text-[14px] font-bold leading-[18.24px] tracking-[-0.152px] text-[#0E0A1A]">
            {item.name}
          </p>

          <p className="md:text-[11.84px] text-[11px] font-semibold text-[#5818D0] leading-[17.76px]">
            {item.role}
          </p>
          <blockquote className="mt-6 border-l-2 border-[#5818D0] pl-4 md:text-[14.08px] text-[12px] italic leading-6 text-[#525252]">
            {item.quote}
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default function ImpactSection() {
  return (
    <section className="bg-[#F6F4FB] px-4 md:py-16 py-10 sm:px-6 lg:px-20">
      <div className="mx-auto ">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <p className="mb-1 text-xs md:text-base md:font-semibold font-medium uppercase tracking-[1.613px] leading-[17.28px] text-[#5818D0]">
              Our Impact
            </p>
            <h2 className="md:w-130 w-80 md:text-[30.8px] text-[20px] md:font-bold font-semibold md:leading-[43.47px] leading-normal text-[#0E0A1A] tracking-[-1.134px]">
              From Aspiring Professionals to Product Managers.
            </h2>
          </div>
          <p className="md:w-130 w-86 md:text-[15px] text-[12px] leading-4 md:leading-[151.667%] text-[#525252] sm:text-right">
            Everyone&apos;s journey into Product Management is different. At
            ProductPointers, we&apos;ve supported aspiring professionals and
            career transitioners as they build the skills, confidence and
            experience to take the next step in their careers.
          </p>
        </div>

        {/* Transformations */}
        <div className="mt-8  space-y-20">
          {transformations.map((item, index) => (
            <div key={item.name}>
              <TransformationRow item={item} />
              {index < transformations.length - 1 && (
                <div className="mt-20 hidden md:block h-px w-full bg-[#525252]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
