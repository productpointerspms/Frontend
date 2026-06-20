import React from 'react';
import { Star } from 'lucide-react';

// Import the user's testimony images
import eniolaImg from "@/assets/images/eniola.png";
import udochukwuImg from "@/assets/images/udochukwu.png";
import mercyImg from "@/assets/images/mercy.png";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Eniola Oyajoju",
      role: "Product Manager",
      image: eniolaImg.src,
      content: "Before joining the program, I had a lot of questions about who a Product Manager is and what they do exactly as I was seeking to transition and had no prior knowledge or experience. The program has helped me bridge the knowledge gap and I feel confident to practice what I've learnt. I'm grateful that I signed up for the program because the way I'm getting answers to questions within and beyond the scope of Product and Project Management feels so good. The program has strengthened my decision to transition to Product Management. I'll really recommend this to anyone."
    },
    {
      name: "Udochukwu Success",
      role: "Product Manager",
      image: mercyImg.src,
      content: "The PPAP program gave me the clarity I was missing. I now understand what product management truly means and how it connects with project management. The lessons, assignments, and supportive community have helped me build a strong foundation and start my product management journey with direction and purpose. This program has helped me to grow in confidence and take real steps forward in my PM journey."
    },
    {
      name: "Mercy Okpara",
      role: "Product Manager",
      image: udochukwuImg.src,
      content: "Before PPAP, I was a timid, confused, and frustrated certified PM. The program, and especially Coach B's foundational storytelling lessons, changed everything. I am now a confident PM with great insights on how to manage projects and products effortlessly. The individual presentations were another huge confidence booster. Coach B is a truly great mentor."
    }
  ];

  return (
    <section className="bg-white py-24 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center -space-x-4 mb-6">
            <img className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-sm z-30" src={testimonials[0].image} alt="Eniola" />
            <img className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-sm z-20" src={testimonials[1].image} alt="Udochukwu" />
            <img className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-sm z-10" src={testimonials[2].image} alt="Mercy" />
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-4">
            You're Not Starting Alone
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base mb-6 leading-relaxed">
            Join <span className="text-[#6D28D9] font-semibold">300+</span> aspiring Product Managers who've already started their journey with ProductPointers.
          </p>
          <p className="text-[#1a1a1a] text-base font-medium">
            See how others started where you are and gained clarity through PPAP.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#5B21B6] rounded-3xl p-8 lg:p-10 text-white shadow-xl flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-purple-400"
                />
                <div>
                  <h3 className="font-bold text-base">{testimonial.name}</h3>
                  <p className="text-purple-300 text-xs">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FACC15] text-[#FACC15]" />
                ))}
              </div>
              
              <p className="text-purple-100 italic leading-relaxed text-[13px] flex-1">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
