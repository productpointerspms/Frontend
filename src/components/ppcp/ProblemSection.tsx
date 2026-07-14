import React from 'react';
import { XCircle } from 'lucide-react';
import img from "@/assets/images/ppcpim.png"

const PainPoints = () => {
  const points = [
    "They don't know what to focus on",
    "They lack structure and direction",
    "They get overwhelmed by too many resources",
    "They don't have someone guiding them"
  ];

  return (
    <section className="py-24 px-6 bg-[#FAF7FD]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="order-2 lg:order-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">
            Most People Don't Fail Because <br /> They're Not Capable.
          </h2>
          
          <p className="text-gray-400 mb-8 text-base">They struggle because:</p>
          
          <div className="space-y-4 mb-10">
            {points.map((point, i) => (
              <div 
                key={i} 
                className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-purple-50/50"
              >
                <div className="flex-shrink-0">
                  <XCircle className="text-[#FF4D4D] w-5 h-5" />
                </div>
                <p className="text-gray-700 font-medium">{point}</p>
              </div>
            ))}
          </div>

          <div className="w-full h-[1px] bg-gray-200 mb-8"></div>

          <div className="space-y-2">
            <p className="text-[#6219D1] text-lg font-bold italic">
              So They Stay Stuck.
            </p>
            <p className="text-[#6219D1] text-lg font-bold italic opacity-80">
              Not Because They Can't... But Because They're Doing It Alone.
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl w-full max-w-lg aspect-[4/5]">
            <img 
              src={img.src} 
              alt="Professional looking stressed at desk" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;