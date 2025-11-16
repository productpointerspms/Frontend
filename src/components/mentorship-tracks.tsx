import { DotIcon } from "lucide-react";
import Image from "next/image";

interface MembershipData {
   icon: string,
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
   const imagePosition = membershiptracks.imagePosition;
   
   return(
      <div className="px-0 mx-auto w-full md:max-w-5xl flex flex-col items-center lg:items-start md:flex-row justify-between self-center justify-self-center py-1 md:py-1" >
         {/* Image (Inlined MentorshipTrack logic) */}
         <div className={`rounded-3xl min-w-full w-full md:min-w-sm md:min-h-sm md:h-fit ${imagePosition === 'left' ? 'md:order-1 mr-0 md:mr-6 flex justify-start' : 'md:order-2 ml-0 md:ml-6 flex justify-end'}`} >
               <Image
                  src={membershiptracks.imageUrl }
                  alt={membershiptracks.title}
                  width={600}
                  height={600}
                  className="rounded-[40px] md:rounded-3xl object-center w-full md:w-lg"
               />
         </div>


         {/* Text Content (Inlined MentorshipTrack logic) */}
         <div className={`flex flex-col items-center lg:items-start space-y-4 w-full md:w-lg pt-12 md:pt-12 lg:pt-0 pb- md:pb-0 ${imagePosition === 'left' ? 'md:order-2' : 'md:order-1'}`}>
               <div className="flex items-center space-x-4 self-start">
                  {/* TrackIcon logic inlined */}
                  <i className="flex-shrink-0  rounded-xl flex items-center justify-center bg-[#5c1cc5] w-auto h-auto text-white p-3 md:p-3">
                     <Image
                        src={membershiptracks.icon }
                        alt={membershiptracks.title}
                        width={800}
                        height={800}
                        className="rounded-3xl object-center w-9 h-9 md:w-5 md:h-5"
                     />                 
                  </i>
                  <h3 className="text-3xl md:text-2xl font-medium text-[#1E1E1E] py-2 md:pt-0 m-0 w-full md:w-96">
                     {membershiptracks.title}
                  </h3>
               </div>
               <p className="text-[18px] md:text-md font-normal text-justify text-zinc-700 p-0 m-0" style={{ lineHeight: '30px' }}>
                  {membershiptracks.description}
               </p>
               
               <div className="flex flex-col items-start">
                  <ul className="py-8 md:py-4 px-0 md:pb-0">
                     {membershiptracks.bullets.map(item => (
                        <li key={item} className="flex flex-row items-center text-md md:text-sm space-y-2 md:space-y-0 text-zinc-700">
                              <DotIcon size={22} className="flex-shrink-0 mr-1 mt-1 text-zinc-800"/>
                              <span>{item}</span>
                        </li>
                     ))}
                  </ul>
                  <span className="flex flex-row space-x-2 md:space-x-2 text-center md:text-left text-lg md:text-sm text-[#5C1CC5] font-light italic">
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