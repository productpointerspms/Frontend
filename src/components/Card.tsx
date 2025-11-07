import Image, { StaticImageData } from "next/image";
import React from "react";
import vector from "../assets/images/Vector.svg";

interface CardProps {
  image: StaticImageData;
  title: string;
  description: string;
  link?: string;
}

const Card: React.FC<CardProps> = ({ image, title, description, link = "#" }) => {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md justify-center transition-shadow max-w-sm">
      {/* Image Section */}
      <div className="relative w-full h-56 rounded-t-xl overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow bg-[#FCF1FF]">
        <h3 className="text-lg font-semibold font-montserrat text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 flex-grow font-montserrat">{description}</p>

        <a
          href={link}
          className="mt-4 text-[#5C1CC5] font-Inter font-medium hover:underline inline-flex items-center"
        >
          Learn more
          <Image
            src={vector}
            alt="Arrow icon"
            width={16}
            height={16}
            className="ml-2"
            priority
          />
        </a>
      </div>
    </div>
  );
};

export default Card;
