import React from 'react';
import { BrainCircuit, Layers, RefreshCw, Puzzle, LayoutTemplate, Wrench } from 'lucide-react';

const CurriculumSection = () => {
  const modules = [
    {
      icon: <BrainCircuit className="w-6 h-6 text-white" />,
      title: "What Product Management Really Is",
      description: "Beyond textbook definitions"
    },
    {
      icon: <Layers className="w-6 h-6 text-white" />,
      title: "How Products Are Built",
      description: "Real-world product development"
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-white" />,
      title: "Product Lifecycle & Thinking",
      description: "From idea to iteration"
    },
    {
      icon: <Puzzle className="w-6 h-6 text-white" />,
      title: "Problem Breakdown & Solutions",
      description: "Structured analytical thinking"
    },
    {
      icon: <LayoutTemplate className="w-6 h-6 text-white" />,
      title: "Core PM Responsibilities",
      description: "What PMs actually do day-to-day"
    },
    {
      icon: <Wrench className="w-6 h-6 text-white" />,
      title: "Product Tools & Workflows",
      description: "Essential tools introduction"
    }
  ];

  return (
    <section className="bg-[#FAF5FF] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
            What You'll Learn Inside <span className="text-[#6D28D9]">PPAP</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            A strong foundation to help you understand Product Management and think like a Product Manager.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {modules.map((module, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#6D28D9] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                {module.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">
                {module.title}
              </h3>
              <p className="text-gray-500 text-[15px]">
                {module.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
