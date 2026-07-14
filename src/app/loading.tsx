import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col pt-24 px-6 md:px-12 max-w-[1280px] mx-auto animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="flex flex-col items-center justify-center text-center space-y-6 mt-10 md:mt-20 mb-20">
        <div className="h-6 w-32 bg-gray-200 rounded-full"></div>
        <div className="h-12 md:h-16 w-3/4 md:w-1/2 bg-gray-200 rounded-2xl"></div>
        <div className="h-4 w-full max-w-lg bg-gray-200 rounded-full mt-4"></div>
        <div className="h-4 w-2/3 max-w-md bg-gray-200 rounded-full mt-2"></div>
        
        <div className="flex gap-4 mt-8">
          <div className="h-12 w-32 bg-gray-200 rounded-xl"></div>
          <div className="h-12 w-32 bg-gray-200 rounded-xl"></div>
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="w-full space-y-12">
        <div className="flex flex-col gap-4">
          <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
          <div className="h-4 w-full max-w-2xl bg-gray-200 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-4 p-6 border border-gray-100 rounded-[24px] shadow-sm">
              <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
              <div className="h-6 w-3/4 bg-gray-200 rounded-lg"></div>
              <div className="space-y-2 mt-2">
                <div className="h-3 w-full bg-gray-200 rounded-full"></div>
                <div className="h-3 w-full bg-gray-200 rounded-full"></div>
                <div className="h-3 w-4/5 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
