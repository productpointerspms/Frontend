import React from 'react';
import { Star } from 'lucide-react';
import img from "@/assets/images/test.jpg"
import img1 from "@/assets/images/test1.jpg"
import img2 from "@/assets/images/test2.png"

const Testimonials = () => {
  const reviews = [
    {
      name: "Perpetua Ngozi Onwochei",
      role: "Product Manager",
      image: img.src,
      text: "Before I got in for the track program at ProductPointers, I had a rare knowledge of how to test APIs, and how to correctly prompt AI for vibe-coding, but the program really opened my eyes to APIs testing, and a well structured prompting using the CORE framework.\n\nNow my prompting makes better sense and I judge the prompting results better. Thanks to ProductPointers."
    },
    {
      name: "Deborah Phillips",
      role: "Product Manager",
      image: img1.src,
      text: "The Track Program was incredibly enlightening and informative, and it exceeded my expectations. I gained so much value throughout the sessions, and the mentor made Growth Product Management easy to understand.\n\nOne challenge I faced was not having prior experience in Product Management, so I had to put in extra effort to catch up. I'd recommend having at least one year of PM experience before joining the Track Program, as it helps you understand the concepts better.\n\nOverall, it was a valuable and impactful learning experience that gave me deeper clarity and practical insights into Growth Product Management."
    },
    {
      name: "Olajumoke Bakaee",
      role: "Product Manager",
      image: img2.src,
      text: "“What changed for me was the clarity around my specialization path. I now communicate my strengths better, contribute more strategically, and feel more valuable in my role.”"
    }
  ];

  return (
    <section className="bg-white py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto text-center">
        {/* Avatars Overlap Group */}
        <div className="flex justify-center -space-x-4 mb-8">
          {[img, img1, img2].map((avatar, i) => (
            <div key={i} className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-sm">
              <img src={avatar.src} alt="User avatar" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Hero Text */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          You’re Not Just Growing...<br />
          You’re Becoming Specialized
        </h2>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-16">
          Join Product Managers who moved beyond being generalists and started building deeper expertise through ProductPointers.
          <br /><br />
          See how experienced Product Managers deepened their expertise and positioned themselves for higher-impact opportunities through PPTP.
        </p>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-[#6219D1] rounded-[2.5rem] p-8 text-left text-white shadow-xl flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full border-2 border-white/20" />
                <div>
                  <h4 className="font-bold leading-tight">{review.name}</h4>
                  <p className="text-sm text-purple-200">{review.role}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-[15px] leading-relaxed italic opacity-90 whitespace-pre-line">
                {review.text}
              </p>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <h3 className="text-2xl md:text-3xl font-bold text-[#2D3E8B] max-w-4xl mx-auto leading-relaxed">
          High-Impact Mentorship Requires Focus. We Accept A Limited Number Of PMs Per Track.
        </h3>
      </div>
    </section>
  );
};

export default Testimonials;