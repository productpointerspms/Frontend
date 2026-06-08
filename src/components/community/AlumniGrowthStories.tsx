import React from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { Users, TrendingUp, Check } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const AlumniGrowthStories = () => {
  const stats = [
    { label: "Alumni Connected", value: "300+", icon: <Users className="text-[#6024D0]" size={24} /> },
    { label: "Growth Sessions", value: "Monthly", icon: <TrendingUp className="text-[#6024D0]" size={24} /> },
    { label: "Alumni Access", value: "Lifetime", icon: <Check className="text-[#6024D0]" size={24} /> },
  ];

  const testimonials = [
    {
      name: "Mercy Adeniyi",
      role: "Product Manager",
      avatar: "/images/mercyA.png",
      text: "Before joining ProductPointers, I was just another person on LinkedIn, trying to find my way, connecting randomly, and hoping to grow. Then I met The GlobalPM, and that completely changed things for me. Joining ProductPointers gave me clarity, structure, and confidence. From optimizing my LinkedIn profile to learning how to truly show up as me, the transformation has been amazing. I've moved from just trying to connect with people to actually building a community that relates to my stories. One thing the GlobalPM said that stuck with me was, \"Don't play small.\" That line changed everything. I stopped hiding parts of myself and started owning my growth. Product Pointers has helped me redefine my personal brand, find my voice, and attract the right kind of opportunities. If you're thinking about joining, do it, but come ready to learn and grow. You'll be glad you did.",
    },
    {
      name: "Reuben Edosa",
      role: "Product Manager",
      avatar: "/images/reuben.png", // Ensure this path exists
      text: "Before joining the Community, I struggled to position myself as a product manager on LinkedIn. I wasn't fully aware of how to communicate my value, create engaging content or build a strong personal brand. But since joining, I've had a transformational experience! I've learned to optimize my profile, create impactful content, and craft a personal brand strategy. The book reading sessions helped me to develop a deeper understanding and practical application of product thinking. The community taught me I'm a brand and helped me gain clarity, confidence, and visibility in my product management journey. Thank you for building such an empowering and supportive community.",
    },
    {
      name: "Dum Vic Yorgbara",
      role: "Product Manager",
      avatar: "/images/dum.png",
      text: "Before joining the community, I had a basic understanding of product management and personal branding, but lacked structure and struggled with consistency. Since joining, I've grown remarkably - learning practical strategies, reviving my reading habit, and gaining clarity on positioning myself. The community solved my inconsistency challenge and provided invaluable benefits like a supportive network, practical learning, and accountability. It's enhanced my confidence, strengthened my knowledge, and positioned me for future opportunities.",
    },
  ];

  return (
    <div className={`${montserrat.className} bg-white py-20 px-6 md:px-12 lg:px-24`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Top Avatar Group */}
        <div className="flex justify-center -space-x-4 mb-8">
          {testimonials.map((t) => (
            <div key={t.name} className="w-16 h-16 rounded-full border-4 border-white overflow-hidden bg-gray-200 relative">
              <Image src={t.avatar} alt={t.name} fill className="object-cover" />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[28px] md:text-[35px] font-bold text-black mb-4">
            Alumni Growth Stories
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-3xl mx-auto">
            Hear how the ProductPointers Community continues helping alumni grow, 
            stay accountable, and evolve long after completing their programs.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center mb-6 bg-white border border-gray-50">
                {stat.icon}
              </div>
              <h3 className="text-[#6024D0] text-3xl md:text-4xl font-bold mb-2">{stat.value}</h3>
              <p className="text-black text-base font-medium">{stat.label}</p>
              <div className="w-12 h-[2px] bg-black mt-4"></div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-[#6024D0] rounded-[32px] p-8 text-white flex flex-col h-full">
              <div className="flex items-center gap-4 mb-6">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-white/20" />
                <div>
                  <h4 className="font-bold text-base leading-tight">{t.name}</h4>
                  <p className="text-white/70 text-xs">{t.role}</p>
                </div>
              </div>
              
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-base">★</span>
                ))}
              </div>

              <p className="text-white/90 text-xs leading-relaxed italic">
                {t.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AlumniGrowthStories;