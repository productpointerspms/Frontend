import React from 'react';
import Image from 'next/image';
import { PlayCircle, Users, BookOpen, Target, FolderOpen } from 'lucide-react';
import img1 from "@/assets/images/comm1.png"
import img2 from "@/assets/images/comm2.png"
import img3 from "@/assets/images/comm3.png"
import img4 from "@/assets/images/comm4.png"
import img5 from "@/assets/images/comm5.png"

const CommunityActivities = () => {
  const activities = [
    {
      title: "Monthly Product Sessions",
      description: "Learn through curated Product Management sessions, guest speakers, industry discussions, and growth-focused workshops designed to keep alumni continuously improving.",
      icon: <PlayCircle className="w-5 h-5 text-[#6024D0]" />,
      image: img1 // Replace with your actual image path
    },
    {
      title: "Accountability Partners & Groups",
      description: "Stay consistent with your goals through structured accountability systems, peer support, and monthly growth check-ins.",
      icon: <Users className="w-5 h-5 text-[#6024D0]" />,
      image: img2
    },
    {
      title: "Weekly Book Reading & Reviews",
      description: "Every quarter, the community selects a growth-focused book to read together, followed by collaborative discussions and review sessions every Tuesday.",
      icon: <BookOpen className="w-5 h-5 text-[#6024D0]" />,
      image: img3
    },
    {
      title: "Monthly Growth Rituals",
      description: "Set goals, review progress, receive recommendations, and improve intentionally every month through structured personal growth rituals.",
      icon: <Target className="w-5 h-5 text-[#6024D0]" />,
      image: img4
    },
    {
      title: "Free Resources & Learning Materials",
      description: "Access curated resources, templates, frameworks, recommendations, and learning materials shared within the community.",
      icon: <FolderOpen className="w-5 h-5 text-[#6024D0]" />,
      image: img5
    }
  ];

  return (
    <section className="bg-[#6024D0] py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        
        {/* Header Section */}
        <h2 className="text-white text-2xl md:text-4xl font-bold mb-6">
          What Happens Inside The Community
        </h2>
        <p className="text-white/80 text-base md:text-lg max-w-4xl mx-auto mb-20 leading-relaxed font-light">
          The ProductPointers Community is designed to help alumni continue learning, 
          growing, staying accountable, and building meaningful relationships long after 
          completing their programs.
        </p>

        {/* Cards Container with Connecting Line */}
        <div className="relative">
          {/* Horizontal Line - Hidden on mobile, visible on large screens */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-white/30 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {activities.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-[32px] overflow-hidden flex flex-col h-full shadow-xl transition-transform hover:scale-[1.02]"
              >
                {/* Image Section */}
                <div className="h-48 w-full relative">
                  <Image 
                    src={item.image} 
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col items-start text-left flex-grow">
                  {/* Icon Circle */}
                  <div className="bg-[#F3E8FF] p-2 rounded-lg mb-6">
                    {item.icon}
                  </div>

                  <h3 className="text-[#15010D] text-base font-bold mb-4 leading-snug min-h-[56px]">
                    {item.title}
                  </h3>

                  <p className="text-[#15010D]/60 text-xs md:text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityActivities;