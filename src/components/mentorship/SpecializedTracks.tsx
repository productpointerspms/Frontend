
import React from 'react';
import Image from 'next/image';
import {
    Rocket,
    ShieldCheck,
    BarChart2,
    Users,
    Lightbulb,
    Cpu,
    TrendingUp
} from 'lucide-react';

interface Track {
    id: string;
    title: string;
    description: string;
    bullets: string[];
    goal: string;
    icon: React.ElementType;
    image: string;
    color: string;
}

const tracks: Track[] = [
    {
        id: 'ai-nocode',
        title: 'AI & No-Code Tools for Product Managers',
        description: 'Master the next generation of product tools. Learn how to leverage AI and No-code platforms to prototype fast, automate busywork, and build scalable solutions without code.',
        bullets: [
            'Understanding AI capabilities for product workflows',
            'Building rapid prototypes using tools like Bubble & Flutterflow',
            'Automating product ops (research, feedback analysis, reports)',
            'Staying ahead of the tech curve in the AI revolution'
        ],
        goal: 'Goal: Become an AI-native PM ready to build products faster and more efficiently',
        icon: Cpu,
        image: '/images/tracks/track-ai-nocode.png',
        color: 'bg-purple-600',
    },
    {
        id: 'qa-pm',
        title: 'QA for Product Managers',
        description: 'Bridge the gap between product vision and quality delivery. Learn how much QA knowledge a PM actually needs to ensure reliable releases without getting lost in testing weeds.',
        bullets: [
            'Understanding QA terminology & testing methodologies',
            'How to write clear acceptance criteria to avoid bugs',
            'Defining scope for regression testing in agile sprints',
            'Balancing speed vs. quality for deployment'
        ],
        goal: 'Goal: Ship bug-free products with confidence and reduce post-launch anxiety',
        icon: ShieldCheck,
        image: '/images/tracks/track-qa-data.png',
        color: 'bg-indigo-600',
    },
    {
        id: 'data-pm',
        title: 'Data-Driven Product Management',
        description: 'Transform from being "gut-feeling" driven to evidence-based looking to drive. Master the metrics that matter and impress stakeholders with data-backed decisions.',
        bullets: [
            'Using SQL to answer your own product questions',
            'Defining actionable success metrics (NSM, OKRs, KPIs)',
            'Cohort analysis and funnel optimization',
            'Interpreting data to avoid misleading conclusions'
        ],
        goal: 'Goal: Make informed, measurable, and impactful product decisions',
        icon: BarChart2,
        image: '/images/tracks/tracker.png', // Reusing appropriate image
        color: 'bg-violet-600',
    },
    {
        id: 'stakeholder',
        title: 'Stakeholder Management & Communication',
        description: 'Learn the soft skills that allow senior PMs to get buy-in effortlessly. Deal with difficult conversations, align diverse teams, and stand out as a leader.',
        bullets: [
            'Navigating office politics and conflicting priorities',
            'Strategic communication with Engineering & Sales',
            'Saying "No" persuasively without burning bridges',
            'Presenting roadmaps and strategy to executives'
        ],
        goal: 'Goal: Gain executive trust and become the go-to leader for key initiatives',
        icon: Users,
        image: '/images/tracks/tracker2.png',
        color: 'bg-fuchsia-600',
    },
    {
        id: 'leadership',
        title: 'Product Leadership & Ownership',
        description: 'Transition from "managing tickets" to leading products. Develop a true owner\'s mindset that fosters product success and organizational impact.',
        bullets: [
            'Leading product teams without direct authority',
            'Taking ownership of outcomes, not just outputs',
            'Developing a product vision & strategy',
            'Mentoring junior PMs and building team culture'
        ],
        goal: 'Goal: Step up as a true product leader ready for Senior/Group PM roles',
        icon: Lightbulb,
        image: '/images/tracks/tracker3.png', // Reusing appropriate image
        color: 'bg-purple-700',
    },
    {
        id: 'tech-pm',
        title: 'Technical Product Management (TPM Mastery)',
        description: 'Master the intersection of business strategy and technical execution. For PMs who want to gain technical fluency to work better with engineering teams.',
        bullets: [
            'Bridging the gap between business goals and engineering restraints',
            'Understanding API design, system architecture, and tech debt',
            'Writing effective specs for complex technical features',
            'Discussing trade-offs with engineers confidently'
        ],
        goal: 'Goal: Earn the respect of your engineering team and lead technical products effectively',
        icon: Rocket,
        image: '/images/tracks/tracker4.png', // Reusing tech image
        color: 'bg-indigo-700',
    },
    {
        id: 'growth-pm',
        title: 'Growth Product Management',
        description: 'The science of growing a product through rapid experimentation. Master the funnels, loops, and psychology that drive user acquisition and retention.',
        bullets: [
            'Optimizing acquisition, activation, and retention loops',
            'Designing & analyzing A/B tests properly',
            'Understanding viral loops and referral programs',
            'Using psychology to influence user behavior'
        ],
        goal: 'Goal: Become the growth engine that drives sustainable product scaling',
        icon: TrendingUp,
        image: '/images/tracks/tracker5.png',
        color: 'bg-violet-700',
    },
];

export default function SpecializedTracks() {
    return (
        <section className="bg-purple-50 py-24">
            <div className="container mx-auto px-6">

                {/* Section Header */}
                <div className="mb-20 text-center">
                    <div className="mb-6 flex justify-center">
                        <span className="rounded-full bg-[#6D28D9] px-5 py-2 text-xs font-medium text-white shadow-lg">
                            WHY A SPECIALIZED TRACK?
                        </span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-[#1A0A1E] md:text-4xl">
                        Specialized Mentorship Tracks
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-base text-[#3A2A3F]">
                        Master critical product management domains through expert-led,
                        personalized learning paths
                    </p>
                </div>

                {/* Tracks Loop */}
                <div className="space-y-24">
                    {tracks.map((track, index) => {
                        const isEven = index % 2 === 0;
                        const Icon = track.icon;

                        return (
                            <div
                                key={track.id}
                                className={`flex flex-col gap-12 lg:items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                    }`}
                            >

                                {/* Image Side */}
                                <div className="flex-1">
                                    <div className={`relative overflow-hidden rounded-3xl shadow-xl transition-transform duration-500 hover:scale-[1.02] ${isEven ? 'rotate-1' : '-rotate-1'}`}>
                                        <div className={`absolute inset-0 opacity-10 ${track.color}`} />
                                        <Image
                                            src={track.image}
                                            alt={track.title}
                                            width={800}
                                            height={500}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="flex-1 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg ${track.color}`}>
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1A0A1E] md:text-2xl">
                                            {track.title}
                                        </h3>
                                    </div>

                                    <p className="text-base leading-relaxed text-[#3A2A3F]">
                                        {track.description}
                                    </p>

                                    <ul className="space-y-3">
                                        {track.bullets.map((bullet, i) => (
                                            <li key={i} className="flex items-start gap-3 text-[#4A3A4F]">
                                                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[#6D28D9]" />
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="pt-4">
                                        <p className={`font-semibold ${track.color.replace('bg-', 'text-')}`}>
                                            {track.goal}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
