"use client";
import React, { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";
import mv from "@/assets/images/mv.png";

const MentorshipVideo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isPlaying) {
          setIsPlaying(true);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the video is visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <section className="w-full bg-[#FCF1FF] py-20 px-6 font-montserrat">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        <h2 className="text-[#1A1A1A] text-[0.92rem] min-[375px]:text-[1.01rem] sm:text-2xl md:text-3xl font-bold mb-4 text-center whitespace-nowrap sm:whitespace-normal">
          See How ProductPointers Works In Action
        </h2>
        <p className="text-gray-500 text-sm md:text-[14px] text-center mb-12 max-w-3xl font-medium">
          Get a behind-the-scenes look at how we guide you from learning to real product experience.
        </p>

        <div 
          ref={videoRef}
          className="relative w-full max-w-4xl aspect-video overflow-hidden shadow-lg mb-10 bg-gray-900 group cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          {!isPlaying ? (
            <>
              {/* Thumbnail */}
              <img 
                src={mv.src} 
                alt="Mentorship Video" 
                className="absolute inset-0 w-full h-full object-cover transition-opacity group-hover:opacity-90"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform group-hover:scale-105">
                  <Play className="text-black ml-2 w-10 h-10 md:w-12 md:h-12 fill-black" />
                </div>
              </div>
            </>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/UmSQxjGADzU?autoplay=1&mute=1`}
              title="ProductPointer Mentorship"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          )}
        </div>

        <button className="bg-[#5C1CC5] hover:bg-[#4a15a0] text-white text-[13px] font-medium px-8 py-3.5 rounded-lg transition-all shadow-md cursor-pointer">
          Watch the Full Walkthrough
        </button>

      </div>
    </section>
  );
};

export default MentorshipVideo;
