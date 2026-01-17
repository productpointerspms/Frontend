
import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface Story {
    id: string;
    name: string;
    role: string;
    image: string;
    rating: number;
    text: string[];
    buttonText: string;
}

const stories: Story[] = [
    {
        id: '1',
        name: 'Oluwaseun Fiki',
        role: 'Product Manager',
        image: '/images/testimony/img1.png',
        rating: 5,
        text: [
            "I'm thrilled to share my experience with ProductPointers!The program exceeded my expectations, as it provided me with hands-on training, mentorship, and networking opportunities that have significantly enhanced my skills and knowledge in product management.",
            "Through the cohort, I gained a deeper understanding of product development, market analysis, and stakeholder management. The interactive sessions, presentations and case studies helped me apply theoretical concepts to real-world scenarios.",
            "The Coach Mrs Blessing is a really wonderful and vast PM, she gave us full attention despite her busy schedule and I appreciate her for that. It is a privilege to learn through her.",
        ],
        buttonText: "From learner to leader"
    },
    {
        id: '2',
        name: 'Adaobi Comfort',
        role: 'Product Manager Intern',
        image: '/images/testimony/img2.png',
        rating: 5,
        text: [
            "Joining ProductPointers was a game-changer for me. The hands-on, practical approach made every session impactful and relatable. From idea conception to product delivery, I gained deep insights and real-world strategies that transformed how I think and work. These weren't just taught - we practiced, implemented, and received feedback that accelerated our growth. Heartfelt thanks to our exceptional mentor for the guidance and patience, and to my brilliant colleagues whose collaboration enriched the learning. This was more than a class; it was a stepping stone to becoming a confident and resourceful Product Manager.",
        ],
        buttonText: "From concept to confidence."
    },
    {
        id: '3',
        name: 'Olajumoke Bakere',
        role: 'Product Manager',
        image: '/images/testimony/img3.png',
        rating: 5,
        text: [
            "Completing the ProductPointers mentorship programme has been a defining moment in my product management journey. It wasn't just theory - it was hands-on, real, and deeply practical. The structure made it easy to apply learning to real-life scenarios, and having an experienced mentor who wants the best for you made all the difference. I always felt supported, guided, and challenged to think more critically and strategically. More than anything, the community stands out - a space where people genuinely want each other to grow. Everyone brings something valuable, and that energy is contagious. You don't just learn, you thrive.  This isn't goodbye; it's just the beginning.",
        ],
        buttonText: "From curious to confident."
    },
    {
        id: '4',
        name: 'Funmilayo',
        role: 'Product Manager',
        image: '/images/testimony/img4.png',
        rating: 5,
        text: [
            "The journey was nothing short of impactful. From day one, the support, feedback, and real-world product challenges pushed me to think deeper and grow more confident in my PM skills. It wasn't just another course filled with theory. We worked on real product challenges, received feedback from experienced PMs, and had access to a supportive community that made learning less lonely.  I've gained so much clarity on how to think like a product manager, ask the right questions, and approach problems with a user-first mindset. Beyond the skills, it helped me build confidence in my journey and reassured me that I'm on the right path. Thank you for creating a space that's as challenging as it is supportive ",
        ],
        buttonText: "From unsure to unstoppable."
    },
    {
        id: '5',
        name: 'Abisola Paul',
        role: 'Product Manager',
        image: '/images/testimony/img5.png',
        rating: 5,
        text: [
            "Oh, mine!!!",
            "Product Pointer has been very instrumental in my PM journey so far, the program is robust, intense and enlightening.Every session is an eye opener, there's no way someone will go through this session and his/her mindsets will not be changed",
            "God bless the Product Pointer, God bless Coach Blessing",
        ],
        buttonText: "From curious to confident."
    },
    {
        id: '6',
        name: 'Adegbenro Toluwalase',
        role: 'Product Manager',
        image: '/images/testimony/img6.png',
        rating: 5,
        text: [
            "Before joining the ProductPointers Cohort 2 Mentorship Program, I had a basic understanding of product management but lacked structure and clarity, especially around documentation, roadmapping, and communicating product decisions.Through the program, I gained hands-on experience, practical knowledge, and the confidence to approach product management strategically. The mentorship, accountability sessions, and real-world projects helped me connect the dots between theory and execution",
            "One major transformation for me was learning to showcase my growth and projects on LinkedIn. Before ProductPointers, I was barely visible online, but now I’ve been able to share my product journey consistently and gain meaningful traction.Most importantly, I learned to leverage my customer service background to derive user insights, communicate value, and make better product decisions.",
            "ProductPointers truly gave me direction, structure, and the confidence to build and grow in my product management career and I’m deeply grateful for the experience. ",
        ],
        buttonText: "ProductPointers gave my growth a map."
    }
];

export default function SuccessStories() {
    return (
        <section className="bg-white py-24">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-extrabold text-[#1A0A1E] md:text-5xl">
                        Success Stories
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-[#4A3A4F] md:text-lg">
                        Real transformations from mentees who took the leap
                    </p>
                </div>

                {/* Stories List */}
                <div className="mx-auto max-w-4xl space-y-8">
                    {stories.map((story) => (
                        <div
                            key={story.id}
                            className="rounded-3xl bg-[#FDF4FF] p-8 shadow-sm transition-shadow hover:shadow-md md:p-10"
                        >
                            {/* Top Row: Avatar + Name + Stars */}
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                {/* User Profile */}
                                <div className="flex items-center gap-4">
                                    <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white shadow-sm">
                                        <Image
                                            src={story.image}
                                            alt={story.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#1A0A1E]">
                                            {story.name}
                                        </h3>
                                        <p className="text-sm font-medium text-[#6D28D9]">
                                            {story.role}
                                        </p>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex gap-1">
                                    {[...Array(story.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-[#6D28D9] text-[#6D28D9]" />
                                    ))}
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="space-y-4 text-base leading-relaxed text-[#4A3A4F]">
                                {story.text.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>

                            {/* Button */}
                            <div className="mt-8">
                                <button className="rounded-full bg-[#6D28D9] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5b21b6]">
                                    {story.buttonText}
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
