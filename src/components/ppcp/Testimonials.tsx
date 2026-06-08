import React from 'react';
import { Star } from 'lucide-react';

import idreesImg from "@/assets/images/idrees.jpg";
import oghenemineImg from "@/assets/images/oghenemine.png";

const Testimonials = () => {
  const reviews = [
    {
      name: "Idrees Adekanbi",
      role: "Product Manager",
      image: idreesImg.src,
      text: "Despite having extensive experience working with physical products and services, I found myself at a crossroads when trying to transition into digital products. I lacked clear direction and a structured path forward.\n\n That changed when I had the opportunity to participate in the Product Management Mentorship Program at ProductPointers, an experience that proved to be both transformative and impactful.The program was exceptionally well-structured, practical, and insightful. It delivered a comprehensive, end-to-end understanding of the product lifecycle, from ideation to prototyping, development, launch, continuous improvement etc. Each session was grounded in real-world application, making the learning both relevant and immediately actionable.\n\n‎A key highlight was the depth of knowledge shared by Coach Blessing and the facilitators, combined with a strong hands-on approach. The mentorship not only strengthened my technical and strategic thinking but also enhanced my ability to make informed product decisions with confidence.\n\n ‎I highly recommend ProductPointers to anyone looking to build or advance their career in product management. It’s a transformative experience that truly adds value.",
    },
    {
      name: "Oghenemine N. Nosakhare",
      role: "Product Manager",
      image: oghenemineImg.src,
      text: "Before I joined, I was honestly scared to start this journey as a new mom. It felt like I had learned so much, yet I still doubted myself, classic imposter syndrome. I really wanted an internship to apply what I’d learned, but instead, I found myself craving clarity, encouragement, and mentorship.\n\n Then I came across Coach Blessing, and her story deeply resonated with me. We connected on LinkedIn, and she welcomed me so warmly, even shared her contact, encouraged me, and reminded me that while it might be tough, I could do it. I joined her flexible mentorship program, and just a few weeks in, I received an internship offer.\n\n The progress has helped me grow tremendously, both personally and professionally. Through Coach Blessing guidance, I gained the courage and strategy to become more visible and intentional on LinkedIn after years of being inactive. Her mentorship transformed how I show up, helped me gain clarity on my path as a Product Manager, and guided me toward securing an internship. I now understand how to use LinkedIn effectively, think strategically, and stay consistent in my growth. Most importantly, I’m still learning and evolving every day.",
    },
    
  ];

  return (
    <section className="bg-[#FAF7FD] py-24 px-6 font-sans">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Overlapping Avatars Group */}
        <div className="flex justify-center -space-x-4 mb-8">
          {reviews.map((r, i) => (
            <div key={i} className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-sm bg-gray-200">
              <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Headline Section */}
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-[1.1] mb-6">
          You're Not Starting Alone
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-4 mb-20">
          <p className="text-gray-600 text-base md:text-lg font-medium">
            Join aspiring Product Managers getting direct 1:1 mentorship, accountability, and personalized support through ProductPointers Coaching.
          </p>
          
          <p className="text-gray-400 text-sm md:text-base italic">
           See how others gained clarity, confidence, and direction through PPCP.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-20 max-w-5xl mx-auto">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-[#6219D1] rounded-[2.5rem] p-8 text-left text-white shadow-xl flex flex-col transition-transform hover:scale-[1.02]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full border-2 border-white/20 overflow-hidden bg-white/10 shrink-0">
                  <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-base leading-tight">{review.name}</h4>
                  <p className="text-xs text-purple-200 uppercase tracking-widest mt-1">{review.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-[13px] leading-relaxed opacity-90 whitespace-pre-line flex-grow">
                {review.text}
              </p>
            </div>
          ))}
        </div>

        {/* Disclaimer Footer */}
        <div className="max-w-4xl mx-auto border-t border-gray-100 pt-16">
          <h3 className="text-xl md:text-3xl font-black text-[#2D3E8B] leading-tight px-4">
            High-Impact Mentorship Requires Focus. <br className="hidden md:block" />
            We Accept A Limited Number Of PMs Per Track.
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;