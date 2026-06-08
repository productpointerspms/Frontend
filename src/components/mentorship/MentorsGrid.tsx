
import React from 'react';
import Image from 'next/image';
import { FaLinkedin } from "react-icons/fa";

interface Mentor {
    id: string;
    name: string;
    role: string;
    company?: string;
    image: string;
}

const mentors: Mentor[] = [
    {
        id: '1',
        name: 'Timileyin Falae',
        role: 'Senior Product Manager at Parkway',
        image: '/images/mentors/pic1.png',
    },
    {
        id: '2',
        name: 'Frank Anwana, MBA',
        role: 'Lead Technical Product Manager at Translayte',
        image: '/images/mentors/pic2.png',
    },
    {
        id: '3',
        name: 'Segun Sobodo',
        role: 'Lead Product Quality Assurance Manager at Opera',
        image: '/images/mentors/pic3.png',
    },
    {
        id: '4',
        name: 'G. Olajumoke Ajala',
        role: 'Data Analyst at Smile Communications Ltd',
        image: '/images/mentors/pic4.png',
    },
    {
        id: '5',
        name: 'Prince Ekpenyong',
        role: 'Senior Technical Product Manager at Sellyticshq',
        image: '/images/mentors/pic5.png',
    },
    {
        id: '6',
        name: 'Michael Kayode',
        role: 'AI - No Code Product Management Mentor',
        image: '/images/mentors/pic6.png',
    },
    {
        id: '7',
        name: 'Seyifunmi Olafioye',
        role: 'Senior Product Manager at SeedFi',
        image: '/images/mentors/pic7.png',
    },
    {
        id: '8',
        name: 'Lydia Nwobodo',
        role: 'Product Manager at Miva University',
        image: '/images/mentors/pic8.png',
    },

]
export default function MentorsGrid() {
    return (
        <section className="bg-[#FAF5FF] py-24"> {/* Light purple background */}
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="text-2xl font-extrabold text-[#1A0A1E] md:text-4xl">
                        Meet The Minds Behind Your Growth
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-sm text-[#4A3A4F] md:text-base">
                        Experienced mentors guiding you through every phase of your product journey.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                    {mentors.map((mentor) => (
                        <div key={mentor.id} className="flex flex-col">
                            {/* Image Container */}
                            <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-200">
                                <div className="aspect-[4/5] w-full">
                                    <Image
                                        src={mentor.image}
                                        alt={mentor.name}
                                        fill
                                        className="object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="space-y-1">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="text-base font-bold text-[#1A0A1E]">
                                        {mentor.name}
                                    </h3>
                                    <a
                                        href="#"
                                        className="text-[#0A66C2] transition-colors hover:text-[#004182]"
                                        aria-label={`LinkedIn profile of ${mentor.name}`}
                                    >
                                        <FaLinkedin className="h-5 w-5" />
                                    </a>
                                </div>
                                <p className="text-xs font-medium leading-snug text-[#6D28D9]">
                                    {mentor.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
