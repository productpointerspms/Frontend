import React from 'react';
import { Users, ClipboardList, Compass, Globe, MessageSquare } from 'lucide-react';

const PracticalSupport = () => {
  const features = [
    {
      title: "Weekly Live Mentorship Sessions",
      description: "Direct guidance from experts who've built successful products. Get your questions answered in real-time.",
      icon: <Users className="w-4 h-4 text-[#6D28D9]" />,
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Practical Assignments",
      description: "No busywork. Every assignment builds toward your real product goals with clear outcomes.",
      icon: <ClipboardList className="w-4 h-4 text-[#6D28D9]" />,
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Guided Exercises",
      description: "Step-by-step exercises that ensure concepts stick and become second nature.",
      icon: <Compass className="w-4 h-4 text-[#6D28D9]" />,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Real-World Examples",
      description: "Not just theory. Study actual successful products, failed launches, and market strategies that shaped today's landscape.",
      icon: <Globe className="w-4 h-4 text-[#6D28D9]" />,
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Community Support & Accountability",
      description: "Join a network of ambitious product builders. Get feedback, share wins, and stay accountable with peers on the same journey.",
      icon: <MessageSquare className="w-4 h-4 text-[#6D28D9]" />,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <section className="bg-[#6D28D9] py-24 px-6 md:px-12 lg:px-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            This Is Not a Passive Course
          </h2>
          <p className="text-purple-100 max-w-2xl mx-auto text-lg leading-relaxed">
            You won't just watch videos. You'll actively learn, practice, and grow with guidance every step of the way.
          </p>
        </div>

        {/* 5 column grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
              <div className="h-40 w-full relative">
                <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-[#1a1a1a] mb-3 text-[15px] leading-snug">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Most courses <span className="text-[#FACC15]">teach.</span> We <span className="text-green-500 underline decoration-4 underline-offset-8">Guide</span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default PracticalSupport;
