import { Bricolage_Grotesque } from "next/font/google";

// Headings share the PPIP/PPAP display face — variable weight covers 200-800.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

const commitments = [
  {
    title: "Respect",
    description:
      "Treat every fellow alumnus with respect and professionalism regardless of seniority or background.",
  },
  {
    title: "Contribute",
    description:
      "Share knowledge, ask thoughtful questions, and contribute meaningfully to alumni conversations.",
  },
  {
    title: "Stay Curious",
    description:
      "Stay open to different perspectives, constructive feedback, new experiences, and bold ideas from fellow alumni.",
  },
  {
    title: "Support Others",
    description:
      "Help create an alumni environment where graduates can continue to learn, grow, and succeed together.",
  },
];

const CommunityCommitment = () => {
  return (
    <section
      aria-labelledby="community-commitment-heading"
      className="bg-white px-6 py-16 sm:px-10 md:px-14 lg:px-20 lg:py-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <p className="mb-4 text-[14px] font-semibold uppercase tracking-[0.1em] text-[#5818D0]">
          Alumni Community Commitment
        </p>
        <h2
          id="community-commitment-heading"
          className={`${bricolage.className} max-w-[600px] text-[#100B1A] text-[22px] font-extrabold leading-[1.15] tracking-[-0.04em] sm:text-[38px] lg:text-[38px] xl:text-[40px]`}
        >
          How Alumni Show Up for Each Other.
        </h2>

        <ul className="mt-10 grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-y-0">
          {commitments.map((commitment, index) => (
            <li
              key={commitment.title}
              className={`px-6 py-6 lg:min-h-[184px] ${
                index > 0 ? "lg:border-l lg:border-[#D0D0D0]" : ""
              } ${index % 2 === 1 ? "sm:border-l sm:border-[#D0D0D0]" : ""}`}
            >
              <h3 className="mb-5 font-sans text-[26px] font-bold uppercase leading-9 text-[#5818D0]">
                {commitment.title}
              </h3>
              <p className="text-[16px] leading-5 text-[#595959]">
                {commitment.description}
              </p>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-6 max-w-[884px] rounded-lg border border-[#AE85FF] bg-[#F8F5FE] px-6 py-4 text-[14px] font-semibold leading-[18px] text-[#5818D0]">
          Members who lose access can rejoin through a yearly reactivation process,
          provided they remain committed to community standards and participation
          expectations moving forward.
        </p>
      </div>
    </section>
  );
};

export default CommunityCommitment;
