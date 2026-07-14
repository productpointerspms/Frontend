import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import img from "@/assets/images/pptpimg2.png"

const OutcomeSection = () => {
  const transformations = [
    "Generalist → Specialist",
    "Contributor → Strategic thinker",
    "Participant → High-value Product Manager"
  ];

  return (
    <section className="bg-[#FDF2FF] py-20 px-6 md:px-20 font-montserrat">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-3xl font-extrabold text-[#101828] mb-8 leading-tight">
            Growth Doesn’t Come From <br /> Doing More. It Comes From <br /> <span className="text-[#6024D0]">Going Deeper.</span>
          </h2>
          <p className="text-[#475467] text-base mb-8 uppercase tracking-widest text-xs font-bold">PPTP helps you move from:</p>
          <div className="space-y-4">
            {transformations.map((text, i) => (
              <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-[#D1FADF] shadow-sm hover:translate-x-2 transition-transform">
                <CheckCircle2 className="text-green-500 flex-shrink-0" size={24} />
                <span className="text-[#101828] font-bold text-base">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="order-1 lg:order-2 rounded-[40px] overflow-hidden shadow-2xl h-[500px]">
          <img 
            src={img.src}
            alt="Confident Professional Handshake" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default OutcomeSection;