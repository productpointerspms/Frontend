import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


interface TestimonyData {
   name: string;
   title: string;
   img: string;
   // Accept either a single string or an array of paragraph strings
   text: string | string[];
   linkText: string;
}

interface TestimonyProps {
   testimony : TestimonyData
}




export default function TestimonyCard({ testimony }: TestimonyProps) {
   return(
      <>
         <div key={testimony.name} className="mx-auto w-full md:max-w-6xl bg-white rounded-2xl shadow-lg p-5 md:p-12 relative flex flex-col md:flex-row items-center md:items-start md:space-x-20" 
         style={{ background: `linear-gradient(135deg, #FAE1FF 0%, #FCF1FF 50%, #FAE1FF 100%)`}}>
            {/* Avatar */}
            <div className="flex flex-col m-0 p-0 flex-shrink-0 w-full md:w-auto">
               <div className="flex flex-row flex-shrink-0 md:mb-0 text-center space-x-3">
                  <Image
                     src={testimony.img }
                     alt={testimony.title}
                     width={600}
                     height={600}
                     className="rounded-full object-center w-[80px] h-[76px] md:w-[56px] md:h-[56px]"
                  />

                  <div className="text-left pt-1 flex items-start flex-col justify-center">
                     <h3 className="text-xl font-normal md:font-extralight" style={{ color: '#1E1E1E' }}>{testimony.name}</h3>

                     <p className="text-[15px] md:text-[12px] font-extralight text-zinc-600 md:text-zinc-400">{testimony.title}</p>
                  </div>
               </div>

               <Image
                  src="/Line_9.png"
                  alt={testimony.title}
                  width={600}
                  height={600}
                  className="object-center rotate-0 pb-10 pt-7 w-full md:w-64"
               />
            </div>

            {/* Content */}
            <div className="flex-grow flex flex-col-reverse md:flex-col">
               <div className="flex flex-col space-y-2 my-5">
                  {/* Inlined StarRating logic (Hardcoded to 5 stars) */}
                  <div className="flex space-x-2">
                        {Array(5).fill(0).map((_, i) => (
                        <Star key={i} size={20} className="text-[#5C1CC5]" fill="#5C1CC5" />
                        ))}
                  </div>


                  <div className="h-auto mt-4 mb-0 md:mb-14 leading-relaxed italic text-zinc-400">
               
                     {Array.isArray(testimony.text) ? (
                        testimony.text.map((para, idx) => (
                           <p key={idx} className={`${idx === 0 ? 'text-xl mt-0' : 'mt-4'} text-xl font-extralight`}>
                              {para}
                           </p>
                        ))
                     ) : (
                        <p className="text-xl font-extralight">{testimony.text}</p>
                     )} 
                  </div>
               </div>

               {/* Button logic inlined (primary variant) */}
               <Link
                  href="#"
                  className="w-full md:w-fit px-1 md:px-6 py-3 rounded-2xl bg-[#5C1CC5] transition-transform duration-200 hover:scale-105 text-center">
                     <p 
                        className="text-md md:text-sm font-light text-white">
                        {testimony.linkText}
                     </p>
               </Link>
            </div>
         </div>
      </>
   )
}