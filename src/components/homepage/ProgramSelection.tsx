"use client";

import { useState } from "react";
import { X, Zap, Users, Target } from "lucide-react";

export default function ProgramSelection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const programs = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Accelerator Program",
      description:
        "12-week intensive bootcamp designed to fast-track your product management career with hands-on projects and expert mentorship.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Mentorship ",
      description:
        "Work 1-on-1 with experienced PMs from top companies. Get personalized guidance, portfolio reviews, and career coaching.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "1:1 Coaching",
      description:
        "Personalized product management coaching focused on your specific goals, challenges, and career advancement.",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div
              className="relative px-8 py-12 text-center rounded-t-3xl"
              style={{
                background:
                  "linear-gradient(180deg, #5C1CC5 0%, #2C0E5F 76.23%)",
              }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Choose Your Program
              </h2>
              <p className="text-lg md:text-xl text-white/90">
                Select the program that best fits your goals and career stage
              </p>
            </div>

            {/* Program Cards */}
            <div className="px-8 py-12 bg-gray-50">
              <div className="grid md:grid-cols-3 gap-6">
                {programs.map((program, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] transform"
                  >
                    <div className="bg-purple-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                      {program.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {program.title}
                    </h3>
                    <p className="text-gray-500 mb-6 leading-relaxed text-sm">
                      {program.description}
                    </p>
                    <button className="w-full bg-purple-600 text-white font-semibold py-3.5 rounded-xl hover:bg-purple-700 transition-colors duration-300">
                      Apply now
                    </button>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="text-center mt-10">
                <p className="text-gray-600 text-base">
                  Not sure which program is right for you?{" "}
                  <a
                    href="#"
                    className="text-purple-600 hover:text-purple-700 underline font-semibold"
                  >
                    Schedule a free consultation
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
