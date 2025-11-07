import Image from "next/image";
import img from "../assets/images/choose.png";
import img1 from "../assets/images/choose1.png";
import img2 from "../assets/images/choose2.png";
import Card from "./Card";

const WhyChooseProductPointers = () => {
  const cards = [
    {
      image: img1,
      title: "Mentorship that gives you clarity & confidence",
      description: "Learn directly from experts who guide your every step.",
      link: "#",
    },
    {
      image: img2,
      title: "Hands-on training that gets you job-ready",
      description:
        "Hands-on workshops and real-world projects that prepare you for immediate impact in your role.",
      link: "#",
    },
    {
      image: img,
      title: "A global community to keep you growing",
      description: "Connect, share, and grow with product minds worldwide.",
      link: "#",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center px-6 md:px-20 pt-24 pb-14 mx-auto bg-gradient-to-b from-[#FAE1FF] to-[#FCF1FF]">
      <div className="text-center max-w-3xl mb-14">
        <h2
          className="
    text-center font-montserrat text-[#15010D] font-bold capitalize
    text-[24px] 
    md:text-4xl
    mb-4
  "
        >
          Why Choose ProductPointers
        </h2>

        <p
          className="
    text-center font-montserrat text-[#15010D] font-normal
    text-[12px] leading-[20px]
    md:text-[20px] md:leading-[36px]
  "
        >
          We're not just another training program. We're a transformative
          experience that shapes the future of product management.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
        {cards.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
            link={card.link}
          />
        ))}
      </div>
    </section>
  );
};

export default WhyChooseProductPointers;
