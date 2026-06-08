import Image from "next/image";

export default function AcceleratorPage() {
  return (
    <div>
      <div className="relative w-full flex items-center justify-center text-white h-[600px] sm:h-[763px] min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/accelerator-hero-img.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(92,28,197,0.1)] to-[#14010D]">
          <div className=" flex flex-col items-center justify-center text-center">
            <div className="inline-flex mt-[149px] px-1 py-2 justify-center items-center gap-2 rounded-full bg-[rgba(255,255,255,0.10)] text-[rgba(255,255,255,0.9)] text-center font-[Montserrat] text-[11px] font-normal leading-[20px]">
              12-Week Intensive Program
            </div>
            <h1 className="text-white text-center font-[Montserrat] font-bold leading-normal text-[21px] sm:text-[32px] md:text-[42px] lg:text-[56px] mt-8">
              ProductPointers Accelerator Program (PPAP)
            </h1>
            <p className="text-white/90 text-center mt-[24px] font-arial text-xl font-normal leading-8 mb-6">
              For aspiring PMs transitioning into product management
            </p>
            <a
              href="#"
              className="flex h-[44px] px-[28px] py-[10px] mt-[32px] justify-center items-center gap-[10px] rounded-md bg-[#5C1CC5] text-white text-center font-[Montserrat] text-[16px] font-medium leading-normal hover:bg-[#4b18a3] transition duration-300"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
      <div className="  bg-[#FCF1FF] pt-[0px] pr-[81px] pb-[11px] pl-[80px] w-full h-[796px]">
        <div className="flex items-center   gap-[46px]">
          <Image src="/images/unsplash.png" alt="unsplash Image" width={604} height={608} className="mb-[10px]" />
          <div className="max-w-[600px] pt-[116px]">
            <h2 className="text-[#15010D] font-[Montserrat] text-[35px] leading-[44px] font-bold capitalize ">
              Why the Accelerator Program?
            </h2>
            <p className="text-[#15010D] font-[Montserrat] text-[14px] font-normal leading-[32px] tracking-normal mt-[16px]">
              Breaking into product management can feel confusing when you’re just starting out. The Accelerator Program was designed for beginners who need clarity, structure, and practical guidance not just theory.
              <br /> You’ll learn the core foundations of product and project management, understand how digital teams work, and build the confidence to deliver real results. Through hands-on training, mentorship, and practical exercises, you’ll gain the skills to transition smoothly into your first PM role.
              <br /> At ProductPointers, we don’t just teach theory — we help you become a confident, job-ready product manager with a strong foundation to grow.
            </p>
            <div className="grid grid-cols-2 gap-7 mt-[44px]">
              <div className="flex items-center gap-8">
                <div className="w-[45px] h-[45px] rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
                  <img src="/images/icon1.svg" alt="Clear Learning Path" width={24} height={24} />
                </div>
                <p className="text-[#15010D] font-[Montserrat] text-[14px] font-normal leading-[24px]">Clear learning path</p>
              </div>

              <div className="flex items-center gap-8">
                <div className="w-[45px] h-[45px] rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
                  <img src="/images/icon2.svg" alt="Clear Learning Path" width={24} height={24} />
                </div>
                <p className="text-[#15010D] font-[Montserrat] text-[14px] font-normal leading-[24px] whitespace-nowrap">Portfolio projects</p>
              </div>

              <div className="flex items-center gap-8">
                <div className="w-[45px] h-[45px] rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
                  <img src="/images/icon3.svg" alt="Clear Learning Path" width={24} height={24} />
                </div>
                <p className="text-[#15010D] font-[Montserrat] text-[14px] font-normal leading-[24px]">Expert mentorship</p>
              </div>

              <div className="flex items-center gap-8">
                <div className="w-[45px] h-[45px] rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
                  <img src="/images/icon4.svg" alt="Clear Learning Path" width={24} height={24} />
                </div>
                <p className="text-[#15010D] font-[Montserrat] text-[14px] font-normal leading-[24px]">Global community</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-[886px] bg-gradient-to-b from-[#FAE1FF] to-[#FCF1FF]">
        <div className="text-center pt-[108px]">
          <h2 className="text-[#15010D] text-center font-[Montserrat] text-[42px] font-bold leading-[60px]">What You&apos;ll Learn</h2>
          <p className="text-[#15010D] text-center font-[Montserrat]  text-[18px] font-normal leading-[28px] mt-[30px]">A comprehensive curriculum designed to take you from PM fundamentals to advanced <br /> product leadership skills</p>
        </div>
        <div className="flex  items-center justify-center gap-[40px] pl-[80px]  pt-[106px]">
          <div>
            <div className="w-[45px] h-[45px] rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
              <img src="/images/icon9.svg" alt="book" width={24} height={24} />
            </div>
            <h4 className="mt-[24px] text-[#15010D] font-[Montserrat] text-[21px] font-semibold leading-[28px]">Product/project fundamentals</h4>
            <p className="mt-[10px] text-[#666666] font-[Montserrat] text-[14px] font-normal leading-[26px]">Master the core principles of product management and strategy</p>
          </div>
          <div >
            <div className="w-[45px] h-[45px] rounded-[16px] bg-[#5C1CC5] ml-[17px] flex items-center justify-center">
              <img src="/images/icon7.svg" alt="spiral icon " width={24} height={24} />
            </div>
            <h4 className="mt-[24px] text-[#15010D] font-[Montserrat] text-[21px] font-semibold leading-[28px] ml-[17px]">User Research & Analytics</h4>
            <p className="mt-[10px] text-[#666666] font-[Montserrat] text-[14px] font-normal leading-[26px] ml-[17px]">Learn to gather insights and make data-driven decisions</p>
          </div>
          <div className="ml-[50px]">
            <div className="w-[45px] h-[45px] rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
              <img src="/images/icon10.svg" alt="save icon" width={24} height={24} />
            </div>
            <h4 className="mt-[24px] text-[#15010D] font-[Montserrat] text-[21px] font-semibold leading-[28px]">Product Roadmapping</h4>
            <p className="mt-[10px] text-[#666666] font-[Montserrat] text-[14px] font-normal leading-[26px]">Create compelling roadmaps that align  teams and  stakeholders</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-[30px] pl-[80px] pr-[80px] pt-[48px]">
          <div>
            <div className="w-[45px] h-[45px] rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
              <img src="/images/icon6.svg" alt="spaceship" width={24} height={24} />
            </div>
            <h4 className="mt-[24px] text-[#15010D] font-[Montserrat] text-[21px] font-semibold leading-[28px]">Agile & Sprint Planning</h4>
            <p className="mt-[10px] text-[#666666] font-[Montserrat] text-[14px] font-normal leading-[26px]">Execute efficiently using modern product development frameworks</p>
          </div>
          <div>
            <div className="w-[45px] h-[45px] rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
              <img src="/images/icon8.svg" alt="user icon" />
            </div>
            <h4 className="mt-[24px] text-[#15010D] font-[Montserrat] text-[21px] font-semibold leading-[35px]">Stakeholder Management</h4>
            <p className="mt-[10px] text-[#666666] font-[Montserrat] text-[14px] font-normal leading-[26px] w-[400px]">Build influence and communicate  effectively across  organizations</p>
          </div>
          <div>
            <div className="w-[45px] h-[45px] rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
              <img src="/images/icon5.svg" alt="graph icon" width={24} height={24} />
            </div>
            <h4 className="mt-[24px] text-[#15010D] font-[Montserrat] text-[21px] font-semibold leading-[28px]">Go-to-Market Strategy</h4>
            <p className="mt-[10px] text-[#666666] font-[Montserrat] text-[14px] font-normal leading-[26px]">Launch products successfully and drive adoption</p>
          </div>
        </div>
      </div>
      <div
        className="h-[729px] w-full pr-[80px] pl-[80px] bg-[url('/images/hero.jpg')] bg-cover bg-center bg-[rgba(92,28,197,0.7)] bg-blend-overlay"
      >
        <div className="flex  flex-col items-center gap-[30px] shrink-0 pt-[89px]">
          <h2 className="text-white text-center font-[Montserrat] text-[42px] not-italic font-bold leading-[60px]">How It Works</h2>
          <p className="text-white text-center font-[Montserrat] text-[18px] not-italic font-normal leading-[28px]">A proven framework combining live learning, personal mentorship, and hands-on practice</p>
        </div>
        <div className="flex items-center gap-[32px] mt-[74px]">
          <div className="flex w-[305px] h-[376px]  flex-col items-start gap-[32px] p-[24px_32px] rounded-[16px] bg-white shadow-[0_4px_8px_0_rgba(0,0,0,0.25)]">
            <div>
              <h2 className="text-[#FAE1FF] font-[Montserrat] text-[56px] not-italic font-bold leading-normal">01</h2>
            </div>
            <div>
              <div className="w-[45px] h-[45px]  rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
                <img src="/images/icon11.svg" alt="book" width={24} height={24} />
              </div>
              <div className="pt-[20px]">
                <h4 className="text-[#14010D] font-[Montserrat] text-[18px] not-italic font-semibold leading-[28px]">Live Interactive Sessions</h4>
                <p className="text-[#15010D] font-[Montserrat] text-[13px] not-italic font-normal leading-[22px]">Join weekly workshops led by experienced product leaders from top tech companies</p>
              </div>
            </div>
          </div>
          <div className="flex w-[305px] h-[376px]  flex-col items-start gap-[32px] p-[24px_32px] rounded-[16px] bg-white shadow-[0_4px_8px_0_rgba(0,0,0,0.25)]">
            <div>
              <h2 className="text-[#FAE1FF] font-[Montserrat] text-[56px] not-italic font-bold leading-normal">02</h2>
            </div>
            <div>
              <div className="w-[45px] h-[45px]  rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
                <img src="/images/icon8.svg" alt="book" width={24} height={24} />
              </div>
              <div className="pt-[20px]" >
                <h4 className="text-[#14010D] font-[Montserrat] text-[18px] not-italic font-semibold leading-[28px]">1-on-1 Mentorship</h4>
                <p className="text-[#15010D] font-[Montserrat] text-[13px] not-italic font-normal leading-[22px]">Get personalized guidance from industry mentors who understand your journey</p>
              </div>
            </div>
          </div>
          <div className="flex w-[305px] h-[376px]  flex-col items-start gap-[32px] p-[24px_32px] rounded-[16px] bg-white shadow-[0_4px_8px_0_rgba(0,0,0,0.25)]">
            <div>
              <h2 className="text-[#FAE1FF] font-[Montserrat] text-[56px] not-italic font-bold leading-normal">03</h2>
            </div>
            <div>
              <div className="w-[45px] h-[45px]  rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
                <img src="/images/icon10.svg" alt="book" width={24} height={24} />
              </div>
              <div className="pt-[20px]">
                <h4 className="text-[#14010D] font-[Montserrat] text-[18px] not-italic font-semibold leading-[28px]">Practical Templates & Tools</h4>
                <p className="text-[#15010D] font-[Montserrat] text-[13px] not-italic font-normal leading-[22px]">Access battle-tested frameworks and resources used by leading PMs worldwide</p>
              </div>
            </div>
          </div>
          <div className="flex w-[305px] h-[376px]  flex-col items-start gap-[32px] p-[24px_32px] rounded-[16px] bg-white shadow-[0_4px_8px_0_rgba(0,0,0,0.25)]">
            <div>
              <h2 className="text-[#FAE1FF] font-[Montserrat] text-[56px] not-italic font-bold leading-normal">04</h2>
            </div>
            <div>
              <div className="w-[45px] h-[45px]  rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
                <img src="/images/icon4.svg" alt="book" width={24} height={24} />
              </div>
              <div className="pt-[20px]">
                <h4 className="text-[#14010D] font-[Montserrat] text-[18px] not-italic font-semibold leading-[28px]">Global Networking</h4>
                <p className="text-[#15010D] font-[Montserrat] text-[13px] not-italic font-normal leading-[22px]">Connect with a vibrant community of product professionals across 20+ countries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full h-[644px] px-[83px] pb-[20px]  bg-[linear-gradient(180deg,#FCF1FF_0%,#FAE1FF_34.13%,#FAE1FF_49.52%,#FAE1FF_65.38%,#FCF1FF_100%)]">
        <div className="flex pt-[106px]  flex-col  gap-[30px]">
          <h2 className="text-[#15010D] text-center font-[Montserrat] text-[42px] not-italic font-bold leading-[60px]">What You&apos;ll Gain</h2>
          <p className="text-[#15010D] text-center font-[Montserrat] text-[18px] not-italic font-normal leading-[28px]">More than just knowledge walk away with tangible assets that accelerate your career</p>
        </div>
        <div className="flex pt-[50px] justify-between items-start self-stretch">
          <div className="flex w-[252px] h-[252px] flex-col items-center gap-[16px] px-[24px] py-[16px] rounded-[16px] bg-[linear-gradient(180deg,#FAE1FF_0%,#FFF_100%)] shadow-[0_4px_8px_0_rgba(0,0,0,0.25)]">
            <div className="w-[45px] h-[45px]  rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
              <img src="/images/icon13.svg" alt="book" width={24} height={24} />
            </div>
            <div className="flex flex-col gap-[16px]">
              <h4 className="text-[#101828] text-center font-[Montserrat] text-xl font-bold leading-8">Professional Certificate</h4>
              <p className="text-[#4A5565] text-center font-[Montserrat] text-[11px] font-normal leading-[20px]">Industry-recognized certification to showcase your expertise</p>
            </div>
          </div>
          <div className="flex w-[252px] h-[252px] flex-col items-center gap-[16px] px-[24px] py-[16px] rounded-[16px] bg-[linear-gradient(180deg,#FAE1FF_0%,#FFF_100%)] shadow-[0_4px_8px_0_rgba(0,0,0,0.25)]">
            <div className="w-[45px] h-[45px]  rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
              <img src="/images/icon2.svg" alt="book" width={24} height={24} />
            </div>
            <div className="flex flex-col gap-[16px]">
              <h4 className="text-[#101828] text-center font-[Montserrat] text-xl font-bold leading-8">Portfolio Projects</h4>
              <p className="text-[#4A5565] text-center font-[Montserrat] text-[11px] font-normal leading-[20px]">Build real product case studies to demonstrate your skills</p>
            </div>
          </div>
          <div className="flex w-[252px] h-[252px] flex-col items-center gap-[16px] px-[24px] py-[16px] rounded-[16px] bg-[linear-gradient(180deg,#FAE1FF_0%,#FFF_100%)] shadow-[0_4px_8px_0_rgba(0,0,0,0.25)]">
            <div className="w-[45px] h-[45px]  rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
              <img src="/images/icon12.svg" alt="book" width={24} height={24} />
            </div>
            <div className="flex flex-col gap-[16px]">
              <h4 className="text-[#101828] text-center font-[Montserrat] text-xl font-bold leading-8">PM Toolkit Access</h4>
              <p className="text-[#4A5565] text-center font-[Montserrat] text-[11px] font-normal leading-[20px]">Lifetime access to templates, frameworks, and resources</p>
            </div>
          </div>
          <div className="flex w-[252px] h-[252px] flex-col items-center gap-[16px] px-[24px] py-[16px] rounded-[16px] bg-[linear-gradient(180deg,#FAE1FF_0%,#FFF_100%)] shadow-[0_4px_8px_0_rgba(0,0,0,0.25)]">
            <div className="w-[45px] h-[45px]  rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
              <img src="/images/icon4.svg" alt="book" width={24} height={24} />
            </div>
            <div className="flex flex-col gap-[16px]">
              <h4 className="text-[#101828] text-center font-[Montserrat] text-xl font-bold leading-8">Alumni Network</h4>
              <p className="text-[#4A5565] text-center font-[Montserrat] text-[11px] font-normal leading-[20px]">Join an exclusive community with ongoing learning and opportunities</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full h-[986px] px-[175px] py-[100px]">
        <div className=" z-2 absolute inset-0 bg-[url('/images/hero2.png')] bg-cover bg-center"></div>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, #FCF1FF 0%, #FAE1FF 34.13%, #FAE1FF 49.52%, #FAE1FF 65.38%, #FCF1FF 100%)'
        }}></div>
        <div className="relative z-9999">
          <div className="flex flex-col items-center gap-[30px]">
            <h2 className="text-[#15010D] text-center font-[Montserrat] text-3xl font-bold leading-[60px]">Learn from the Best</h2>
            <p className="text-[#15010D] text-center font-[Montserrat] text-[18px] font-normal leading-[28px]">Our coaches are seasoned product leaders from world-class companies who are passionate about mentoring the next generation</p>
          </div>
          <div className="flex items-center gap-12">
            <div className="flex flex-col pt-[70px] ">
              <img src="/images/blessing.png" alt="blessing okomor" className="w-[521px] h-[402px] object-cover" />
              <div className="flex items-center gap-[190px] mt-[32px]">
                <h2 className="text-[#15010D] whitespace-nowrap font-[Montserrat] text-[28px] font-semibold leading-[28px]">Blessing Okomor</h2>
                <a href="https://www.linkedin.com/in/blessing-okomor" target="blank"><img src="/images/linkedin.svg" alt="linkedin icon" className="w-[32px] h-[32px] object-cover" /></a>
              </div>
              <p className="text-[#5C1CC5] mt-[16px] font-[Montserrat] text-[18px] font-normal leading-[28px]">Product Manager at Mainstack</p>
              <p className="text-[#15010D] font-[Montserrat] text-[18px] font-normal leading-[28px]">7+ years solving business problems and leading products</p>
            </div>
            <div className="flex flex-col pt-[43px]">
              <img src="/images/mercy.png" alt="mercy adeniyi" className="w-[521px] h-[402px] object-cover" />
              <div className="flex items-center gap-[190px] mt-[32px]">
                <h2 className="text-[#15010D] whitespace-nowrap font-[Montserrat] text-[28px] font-semibold leading-[28px]">Mercy Adeniyi</h2>
                <a href="https://www.linkedin.com/in/blessing-okomor" target="blank"><img src="/images/linkedin.svg" alt="linkedin icon" className="w-[32px] h-[32px] object-cover" /></a>
              </div>
              <p className="text-[#5C1CC5] mt-[16px] font-[Montserrat] text-[18px] font-normal leading-[28px]">Product Manager at SimpliRide</p>
              <p className="text-[#15010D] font-[Montserrat] text-[18px] font-normal leading-[28px]">3+ years of leading impactful products</p>
            </div>
          </div>
        </div>
      </div>
      <div className="inline-flex w-full h-[994px] flex-col  items-center gap-[72px] px-[177px] py-[151px] pb-[129px] bg-[linear-gradient(180deg,#FCF1FF_0%,#FAE1FF_100%)]">
        <div className="flex flex-col items-center gap-[30px] w-full">
          <h2 className="text-[#15010D] text-center font-[Montserrat] text-[42px] font-bold leading-[60px]">Your Career Path Awaits</h2>
          <p className="text-[#15010D] text-center font-[Montserrat] whitespace-nowrap text-[18px] font-normal leading-[28px]">Our alumni have gone on to pursue diverse and exciting roles across the product management spectrum</p>
        </div>
        <div className="flex flex-col gap-[48px] pt-[70px]" >
          <div className="flex  items-start gap-[56px]">
            <div className="flex items-center gap-[24px] w-[452px] px-[32px] py-[24px] rounded-[16px] bg-[#FCF1FF] shadow-[0_2px_2px_0_rgba(0,0,0,0.25)]">
              <div className="w-[45px] h-[45px]  rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
                <img src="/images/icon14.svg" alt="book" width={24} height={24} />
              </div>
              <p className="text-[#15010D] font-[Montserrat] text-[14px] font-normal leading-[24px]">Associate Product Manager</p>
            </div>
            <div className="flex items-center gap-[24px] w-[452px] px-[32px] py-[24px] rounded-[16px] bg-[#FCF1FF] shadow-[0_2px_2px_0_rgba(0,0,0,0.25)]">
              <div className="w-[45px] h-[45px]  rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
                <img src="/images/icon14.svg" alt="book" width={24} height={24} />
              </div>
              <p className="text-[#15010D] font-[Montserrat] text-[14px] font-normal leading-[24px]">Product Manager</p>
            </div>
          </div>
          <div className="flex  items-start gap-[56px]">
            <div className="flex items-center gap-[24px] w-[452px] px-[32px] py-[24px] rounded-[16px] bg-[#FCF1FF] shadow-[0_2px_2px_0_rgba(0,0,0,0.25)]">
              <div className="w-[45px] h-[45px]  rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
                <img src="/images/icon14.svg" alt="book" width={24} height={24} />
              </div>
              <p className="text-[#15010D] font-[Montserrat] text-[14px] font-normal leading-[24px]">Senior Product Manager</p>
            </div>
            <div className="flex items-center gap-[24px] w-[452px] px-[32px] py-[24px] rounded-[16px] bg-[#FCF1FF] shadow-[0_2px_2px_0_rgba(0,0,0,0.25)]">
              <div className="w-[45px] h-[45px]  rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
                <img src="/images/icon14.svg" alt="book" width={24} height={24} />
              </div>
              <p className="text-[#15010D] font-[Montserrat] text-[14px] font-normal leading-[24px]">Product Lead / Group PM</p>
            </div>
          </div>
          <div className="flex  items-start gap-[56px]">
            <div className="flex items-center gap-[24px] w-[452px] px-[32px] py-[24px] rounded-[16px] bg-[#FCF1FF] shadow-[0_2px_2px_0_rgba(0,0,0,0.25)]">
              <div className="w-[45px] h-[45px]  rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
                <img src="/images/icon14.svg" alt="book" width={24} height={24} />
              </div>
              <p className="text-[#15010D] font-[Montserrat] text-[14px] font-normal leading-[24px]">Director of Product</p>
            </div>
            <div className="flex items-center gap-[24px] w-[452px] px-[32px] py-[24px] rounded-[16px] bg-[#FCF1FF] shadow-[0_2px_2px_0_rgba(0,0,0,0.25)]">
              <div className="w-[45px] h-[45px]  rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
                <img src="/images/icon14.svg" alt="book" width={24} height={24} />
              </div>
              <p className="text-[#15010D] font-[Montserrat] text-[14px] font-normal leading-[24px]">VP of Product</p>
            </div>
          </div>
          <div className="flex  items-start gap-[56px]">
            <div className="flex items-center gap-[24px] w-[452px] px-[32px] py-[24px] rounded-[16px] bg-[#FCF1FF] shadow-[0_2px_2px_0_rgba(0,0,0,0.25)]">
              <div className="w-[45px] h-[45px]  rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
                <img src="/images/icon14.svg" alt="book" width={24} height={24} />
              </div>
              <p className="text-[#15010D] font-[Montserrat] text-[14px] font-normal leading-[24px]">Chief Product Officer</p>
            </div>
            <div className="flex items-center gap-[24px] w-[452px] px-[32px] py-[24px] rounded-[16px] bg-[#FCF1FF] shadow-[0_2px_2px_0_rgba(0,0,0,0.25)]">
              <div className="w-[45px] h-[45px]  rounded-[16px] bg-[#5C1CC5] flex items-center justify-center">
                <img src="/images/icon14.svg" alt="book" width={24} height={24} />
              </div>
              <p className="text-[#15010D] font-[Montserrat] text-[14px] font-normal leading-[24px]">Product Consultant</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1148px] bg-[#FCF1FF] flex flex-col items-center ">
        <div className="flex flex-col items-center gap-[30px] mt-[72px]  ">
          <h2 className="text-[#15010D] text-center font-[Montserrat] text-[42px] font-bold leading-[60px]">Investment in Your Future</h2>
          <p className="text-[#15010D] text-center font-[Montserrat] text-[18px] font-normal leading-[28px]">Join hundreds of successful product managers who&apos;ve transformed their careers</p>
        </div>
        <div>
          <div className="flex mt-[56px] w-[744px] h-[118px] justify-center items-center self-stretch pt-[29.787px] pb-[29.787px] pl-[225.505px] pr-[227.049px] rounded-t-[24.713px] bg-[#5C1CC5]">
            <div className="flex flex-col items-center gap-[9.267px] w-[291.921px]">
              <h2 className="text-white text-center font-[Montserrat] text-[24px] font-medium leading-[27.802px]">Accelerator Program</h2>
              <p className="text-white text-center font-[Montserrat] text-[14px] font-normal leading-[18.535px]">12-Week Intensive Cohort</p>
            </div>
          </div>
          <div className=" rounded-b-[12.356px] border border-[1px] shadow-[0_3.089px_3.089px_0_rgba(0,0,0,0.25)] flex pt-[19px]  w-[744px] h-[720px] flex-col items-center self-stretch px-[24.713px] py-[18.535px] gap-[24.713px] rounded-b-[24.713px] bg-[#FCF1FF]">
            <div className="flex items-center gap-[6px]">
              <p><img src="/images/icon16.svg" alt="naira logo" /></p>
              <p className="text-[#15010D] text-center font-[Montserrat] text-[65px] font-semibold leading-[normal]">150,000</p>
            </div>
            <p className="text-[#15010D] text-center font-[Montserrat] text-[22px] font-medium leading-[normal]">One-time payment or flexible installments</p>
            <div className="flex flex-col items-start gap-[19px] pt-[52px]">
              <div className="flex items-center gap-[12px] self-stretch">
                <img src="/images/icon15.svg" alt="tick icon" />
                <p className="text-[#15010D] font-[Montserrat] text-[16px] font-normal leading-[18.535px]">12 weeks of live interactive sessions</p>
              </div>
              <div className="flex items-center gap-[12px] self-stretch">
                <img src="/images/icon15.svg" alt="tick icon" />
                <p className="text-[#15010D] font-[Montserrat] text-[16px] font-normal leading-[18.535px]">1-on-1 mentorship with industry leaders</p>
              </div>
              <div className="flex items-center gap-[12px] self-stretch">
                <img src="/images/icon15.svg" alt="tick icon" />
                <p className="text-[#15010D] font-[Montserrat] text-[16px] font-normal leading-[18.535px]">Hands-on portfolio projects</p>
              </div>
              <div className="flex items-center gap-[12px] self-stretch">
                <img src="/images/icon15.svg" alt="tick icon" />
                <p className="text-[#15010D] font-[Montserrat] text-[16px] font-normal leading-[18.535px]">Professional certificate upon completion</p>
              </div>
              <div className="flex items-center gap-[12px] self-stretch">
                <img src="/images/icon15.svg" alt="tick icon" />
                <p className="text-[#15010D] font-[Montserrat] text-[16px] font-normal leading-[18.535px]">Lifetime access to alumni network</p>
              </div>
              <div className="flex items-center gap-[12px] self-stretch">
                <img src="/images/icon15.svg" alt="tick icon" />
                <p className="text-[#15010D] font-[Montserrat] text-[16px] font-normal leading-[18.535px]">PM toolkit & resource library</p>
              </div>
              <div className="flex items-center gap-[12px] self-stretch">
                <img src="/images/icon15.svg" alt="tick icon" />
                <p className="text-[#15010D] font-[Montserrat] text-[16px] font-normal leading-[18.535px]">Career support & job placement assistance</p>
              </div>
              <div className="flex items-center gap-[12px] self-stretch">
                <img src="/images/icon15.svg" alt="tick icon" />
                <p className="text-[#15010D] font-[Montserrat] text-[16px] font-normal leading-[18.535px]">Monthly check-ins after graduation</p>
              </div>
            </div>
            <a href="" className=" text-white text-center font-[Montserrat] text-[16px] font-medium leading-[normal] flex justify-center items-center w-[695.049px] h-[43.248px] px-[21.624px] py-[7.723px] gap-[7.723px] mt-[43px] rounded-[6.178px] bg-[#5C1CC5]">Enroll Now</a>
            <p className="text-[#15010D] text-center font-[Montserrat] text-[9px] font-normal leading-[15.446px]">Limited spots available per cohort. Next cohort starts November 2025.</p>
          </div>
        </div>
      </div>
      <div className="relative w-full h-[1211px]">
        <img
          src="/images/hero3.jpg"
          alt="hero"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute w-full h-full bg-[#5C1CC5] opacity-70"></div>
        <div className="relative z-10 flex flex-col items-center  h-full">
          <div className="flex flex-col items-center gap-[24px] mt-[134px]">
            <h2 className="text-white text-center font-[Montserrat] text-[42px] font-bold leading-[48px]">Success Stories</h2>
            <p className="text-white text-center font-[Montserrat] text-[18px] font-normal leading-[28px]">Don&apos;t just take our word for it hear from PMs who&apos;ve transformed their <br /> careers</p>
          </div>
          <div className="flex flex-wrap mt-[72px] justify-center items-center content-center gap-[80px] px-[10px]">
            <div className="flex flex-col items-start w-[600px] h-[332px] p-[32px] gap-[18px] rounded-[14px] bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),_0_8px_10px_-6px_rgba(0,0,0,0.10)] flex-shrink-0">
              <div className="flex">
                <img src="/images/icon17.svg" alt="" />
                <img src="/images/icon17.svg" alt="" />
                <img src="/images/icon17.svg" alt="" />
                <img src="/images/icon17.svg" alt="" />
                <img src="/images/icon17.svg" alt="" />
              </div>
              <p className="text-[#6D6D6D] font-[Montserrat] text-[11px] italic font-normal leading-[20px]">Before joining the program, I had a lot of questions about who a Product Manager is and what they do exactly as I was seeking to transition and had no prior knowledge or experience. The program has helped me bridge the knowledge gap and I feel confident to practice what I&apos;ve learnt. I&apos;m grateful that I signed up for the program because the way I&apos;m getting answers to questions within and beyond the scope of Product and Project Management feels so good. The program has strengthened my decision to transition to Product Management. I&apos;ll really recommend this to anyone.</p>
              <div className="flex items-center gap-[16px] flex-shrink-0 self-stretch">
                <img src="/images/eniola.png" alt="eniola oyajoju" />
                <div>
                  <h4 className="text-[var(--text-dark,#15010D)] font-[Montserrat] text-[14px] not-italic font-bold leading-[24px]">Eniola Oyajoju</h4>
                  <p className="text-[var(--primary,#5C1CC5)] font-[Montserrat] text-[12px] not-italic font-normal leading-[20px]">Product Manager</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start w-[600px] h-[332px] p-[32px] gap-[18px] rounded-[14px] bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),_0_8px_10px_-6px_rgba(0,0,0,0.10)] flex-shrink-0">
              <div className="flex gap-[3px]">
                <img src="/images/icon17.svg" alt="" />
                <img src="/images/icon17.svg" alt="" />
                <img src="/images/icon17.svg" alt="" />
                <img src="/images/icon17.svg" alt="" />
                <img src="/images/icon17.svg" alt="" />
              </div>
              <p className="text-[#6D6D6D] font-[Montserrat] text-[11px] italic font-normal leading-[20px]">The PPAP program gave me the clarity I was missing. I now understand what product management truly means and how it connects with project management. The lessons, assignments, and supportive community have helped me build a strong foundation and start my product management journey with direction and purpose. This program has helped me to grow in confidence and take real steps forward in my PM journey.</p>
              <div className="flex items-center gap-[16px] pt-[20px] flex-shrink-0 self-stretch">
                <img src="/images/success.png" alt="Udochukwu Success" />
                <div>
                  <h4 className="text-[var(--text-dark,#15010D)] font-[Montserrat] text-[14px] not-italic font-bold leading-[24px]">Udochukwu Success</h4>
                  <p className="text-[var(--primary,#5C1CC5)] font-[Montserrat] text-[12px] not-italic font-normal leading-[20px]">Product Manager</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start w-[600px] h-[332px] p-[32px] gap-[18px] rounded-[14px] bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),_0_8px_10px_-6px_rgba(0,0,0,0.10)] flex-shrink-0">
              <div className="flex">
                <img src="/images/icon17.svg" alt="" />
                <img src="/images/icon17.svg" alt="" />
                <img src="/images/icon17.svg" alt="" />
                <img src="/images/icon17.svg" alt="" />
                <img src="/images/icon17.svg" alt="" />
              </div>
              <p className="text-[#6D6D6D] font-[Montserrat] text-[11px] italic font-normal leading-[20px]">Before PPAP, I was a timid, confused, and frustrated certified PM. The program, and especially Coach B&apos;s foundational storytelling lessons, changed everything. I am now a confident PM with great insights on how to manage projects and products effortlessly. The individual presentations were another huge confidence booster. Coach B is a truly great mentor.</p>
              <div className="flex items-center gap-[16px] pt-[65px] flex-shrink-0 self-stretch">
                <img src="/images/okpara.png" alt="Mercy Okpara" />
                <div>
                  <h4 className="text-[var(--text-dark,#15010D)] font-[Montserrat] text-[14px] not-italic font-bold leading-[24px]">Mercy Okpara</h4>
                  <p className="text-[var(--primary,#5C1CC5)] font-[Montserrat] text-[12px] not-italic font-normal leading-[20px]">Product Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full h-[1018px] px-[176px] py-[140px] flex-col items-center  gap-[72px] bg-[#FCF1FF]">
        <div className="flex flex-col items-center gap-[30px] ">
          <h2 className="text-[#15010D] text-center font-[Montserrat] text-[42px] font-bold leading-[60px]">Frequently Asked Questions</h2>
          <p className="text-[#15010D] text-center font-[Montserrat] text-[18px] font-normal leading-[28px]">Everything you need to know about the Accelerator Program</p>
        </div>
        <div className="flex flex-col items-center gap-[32px] mt-[72px]">
          <div className="relative">
            <select name="" id="" className="text-[#14010D] font-[Montserrat] text-[16px] font-bold leading-[28px] appearance-none outline-none focus:ring-0 flex flex-col items-center justify-center  w-[996px] h-[60px]  px-[24px] py-[16px] rounded-[32px] bg-[#FAE1FF]">
              <option value="">Who is the Accelerator program designed for?</option>
            </select>
            <img src="/images/icon18.svg" className="absolute right-5 top-1/2 -translate-y-1/2 w-[20px] h-[20px] pointer-events-none" alt="drop down icon" />
          </div>
          <div className="relative">
            <select name="" id="" className="text-[#14010D] font-[Montserrat] text-[16px] font-bold leading-[28px] appearance-none outline-none focus:ring-0 flex flex-col items-start self-stretch w-[996px] h-[60px] px-[24px] py-[16px] rounded-[32px] bg-[#FAE1FF]">
              <option value="">How long is the program?</option>
            </select>
            <img src="/images/icon18.svg" className="absolute right-5 top-1/2 -translate-y-1/2 w-[20px] h-[20px] pointer-events-none" alt="drop down icon" />
          </div>
          <div className="relative">
            <select name="" id="" className="text-[#14010D] font-[Montserrat] text-[16px] font-bold leading-[28px] appearance-none outline-none focus:ring-0 flex flex-col items-start self-stretch w-[996px] h-[60px] px-[24px] py-[16px] rounded-[32px] bg-[#FAE1FF]">
              <option value="">Will I get a certificate upon completion?</option>
            </select>
            <img src="/images/icon18.svg" className="absolute right-5 top-1/2 -translate-y-1/2 w-[20px] h-[20px] pointer-events-none" alt="drop down icon" />
          </div>
          <div className="relative">
            <select name="" id="" className="text-[#14010D] font-[Montserrat] text-[16px] font-bold leading-[28px] appearance-none outline-none focus:ring-0 flex flex-col items-start self-stretch w-[996px] h-[60px] px-[24px] py-[16px] rounded-[32px] bg-[#FAE1FF]">
              <option value="">What&apos;s included in the program fee?</option>
            </select>
            <img src="/images/icon18.svg" className="absolute right-5 top-1/2 -translate-y-1/2 w-[20px] h-[20px] pointer-events-none" alt="drop down icon" />
          </div>
          <div className="relative">
            <select name="" id="" className="text-[#14010D] font-[Montserrat] text-[16px] font-bold leading-[28px] appearance-none outline-none focus:ring-0 flex flex-col items-start self-stretch w-[996px] h-[60px] px-[24px] py-[16px] rounded-[32px] bg-[#FAE1FF]">
              <option value="">Do you offer payment plans?</option>
            </select>
            <img src="/images/icon18.svg" className="absolute right-5 top-1/2 -translate-y-1/2 w-[20px] h-[20px] pointer-events-none" alt="drop down icon" />
          </div>
          <div className="relative">
            <select name="" id="" className="text-[#14010D] font-[Montserrat] text-[16px] font-bold leading-[28px] appearance-none outline-none focus:ring-0 flex flex-col items-start self-stretch w-[996px] h-[60px] px-[24px] py-[16px] rounded-[32px] bg-[#FAE1FF]">
              <option value="">What if I can&apos;t attend a live session?</option>
            </select>
            <img src="/images/icon18.svg" className="absolute right-5 top-1/2 -translate-y-1/2 w-[20px] h-[20px] pointer-events-none" alt="drop down icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
