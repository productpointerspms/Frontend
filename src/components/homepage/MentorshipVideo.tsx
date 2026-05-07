import React from "react";
import Image from "next/image";
import mentorImg from "@/assets/images/mv.png";

const MentorshipVideo: React.FC = () => {
  return (
    <section className="w-full px-6 md:px-16 py-16 max-w-7xl mx-auto bg-white font-montserrat">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-sm">
        <Image
          src={mentorImg}
          alt="Mentorship Program"
          fill
          className="object-cover"
        />
      </div>

      <div className="mt-6 text-center px-4">
        <p className="text-[#5C1CC5] text-base md:text-xl font-normal leading-relaxed">
          Watch how ProductPointer empowers learners to grow, connect, and build
          real-world experience.
        </p>
      </div>
    </section>
  );
};

export default MentorshipVideo;
