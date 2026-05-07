import React from "react";
import { Heart, Users, Lightbulb, Trophy } from "lucide-react";

interface Value {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const values: Value[] = [
  {
    icon: <Heart size={28} />,
    title: "Community First",
    description:
      "We put our community at the heart of everything we do, fostering genuine connections and mutual support.",
  },
  {
    icon: <Users size={28} />,
    title: "Inclusive Growth",
    description:
      "We believe in creating opportunities for everyone, regardless of background, to excel in product management.",
  },
  {
    icon: <Lightbulb size={28} />,
    title: "Continuous Learning",
    description:
      "We embrace a growth mindset, constantly evolving our programs based on industry trends and member feedback.",
  },
  {
    icon: <Trophy size={28} />,
    title: "Excellence",
    description:
      "We strive for excellence in everything we deliver, from our curriculum to our community experience.",
  },
];

const CoreValues: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-purple-50 w-full">
      <div className="w-full max-w-[1274px] mx-auto px-4 md:px-6 text-center">
        {/* Heading */}
        <h2
          className="mx-auto"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700,
            fontSize: "48px",
            lineHeight: "60px",
            letterSpacing: "0px",
            color: "#15010D",
          }}
        >
          Our Core Values
        </h2>

        {/* Short Description */}
        <p
          className="mt-4 mx-auto"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "28px",
            letterSpacing: "0px",
            color: "#15010D",
            maxWidth: "744px",
          }}
        >
          These values guide every decision we make and every program we create
        </p>

        {/* Cards */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-12">
          {values.map((value, i) => (
            <div
              key={i}
              className="w-full sm:w-[45%] md:w-[252px] h-[266px] pt-4 px-6 pb-4 rounded-[16px] border-2 border-[#F3E8FF] bg-gradient-to-b from-[#FAE1FF] to-white shadow-[0_8px_4px_0_rgba(0,0,0,0.25)] flex flex-col items-center justify-start text-center space-y-4"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#6C2BD9] text-white rounded-full">
                {value.icon}
              </div>

              {/* Card Heading */}
              <h3
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "32px",
                  textAlign: "center",
                  color: "#15010D",
                }}
              >
                {value.title}
              </h3>

              {/* Card Description */}
              <p
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "20px",
                  textAlign: "center",
                  color: "#4A5565",
                }}
              >
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
