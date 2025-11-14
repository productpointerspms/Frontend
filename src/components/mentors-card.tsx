import { Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


interface MentorsData{
   name: string
   title: string
   img: string
   linkedin: string
}

interface MentorsProps{
   mentors : MentorsData
}
export default function MentorsCard({ mentors }: MentorsProps) {
   return(
      <>
         <div key={mentors.name} className="overflow-hidden text-center relative flex flex-col items-center md:items-center w-full">
               <Image src={mentors.img} alt={mentors.name} 
               width={400}
               height={400}
               className="object-cover w-full md:w-[405px] h-[402px]" />


               <div className="w-full py-6 pt-4 flex items-start justify-between flex-col"> {/* Adjusted padding */}

               <div className='flex flex-row w-full justify-between'>
                  <h3 className="text-xl font-semibold text-black">{mentors.name}
                  </h3>

                  <Link href={mentors.linkedin} target="_blank" rel="noopener noreferrer" className="text-white p-2 rounded-md bg-[#323898]">
                     <Linkedin size={20} color='white'/>
                  </Link>
               </div>
                  
               <p className=" text-left flex self-start w-68 text-sm font-extralight mt-1 text-[#5C1CC5]" >
                  {mentors.title}
               </p>
               </div>
         </div>
      </>
   )
}