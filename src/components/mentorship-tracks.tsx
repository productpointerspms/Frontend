import { DotIcon } from "lucide-react";
import Image from "next/image";

interface MembershipData {
   icon?: React.ReactNode,
   title: string,
   description: string,
   bullets: string[],
   goal: string,
   imageUrl: string,
   imagePosition: string
}

interface MembershipProps {
   membershiptracks : MembershipData
}

export default function MentorshipTracks({membershiptracks}: MembershipProps) {
   const Icon = membershiptracks.icon; // Renamed for clarity in this block
   const imagePosition = membershiptracks.imagePosition;
   
   return(
      <div className="px-0 md:px-12 w-full md:max-w-6xl flex flex-col items-center lg:items-start lg:flex-row justify-between py-1 md:py-1" >
         {/* Image (Inlined MentorshipTrack logic) */}
         <div className={`flex flex-nowrap justify-center rounded-3xl min-w-full w-full md:min-w-sm md:min-h-sm ${imagePosition === 'left' ? 'md:order-1 mr-0 md:mr-6' : 'md:order-2 ml-0 md:ml-6'}`} >
               <Image
                  src={membershiptracks.imageUrl }
                  alt={membershiptracks.title}
                  width={600}
                  height={600}
                  className="rounded-3xl object-center w-full md:w-md h-[358px]"
               />
         </div>

         {/* Text Content (Inlined MentorshipTrack logic) */}
         <div className={`flex flex-col items-center lg:items-start space-y-4 w-full md:w-lg pt-20 md:pt-12 lg:pt-0 pb- md:pb-7 ${imagePosition === 'left' ? 'md:order-2' : 'md:order-1'}`}>
               <div className="flex items-center space-x-4 self-start">
                  {/* TrackIcon logic inlined */}
                  <i className="flex-shrink-0 w-auto h-auto rounded-xl flex items-center justify-center bg-[#5c1cc5] text-white p-3">
                        {Icon}                       
                  </i>
                  <h3 className="text-2xl font-medium text-[#1E1E1E] py-2 md:pt-0 m-0 w-full md:w-96">
                     {membershiptracks.title}
                  </h3>
               </div>
               <p className="text-md font-normal text-justify text-zinc-700 p-0 m-0" style={{ lineHeight: '30px' }}>
                  {membershiptracks.description}
               </p>
               
               <div className="flex flex-col items-start">
                  <ul className="py-4 px-0">
                     {membershiptracks.bullets.map(item => (
                        <li key={item} className="flex flex-row items-center text-sm text-zinc-700">
                              <DotIcon size={22} className="flex-shrink-0 mr-1 mt-1 text-zinc-800"/>
                              <span>{item}</span>
                        </li>
                     ))}
                  </ul>
                  <span className="flex flex-row space-x-0 md:space-x-2 text-center md:text-left text-sm text-[#5C1CC5] font-light italic">
                     <p>
                        Goal:
                     </p>
                     <p className="w-full md:w-md italic">{membershiptracks.goal}</p>
                  </span>
               </div>
         </div>
      </div>
   )
}