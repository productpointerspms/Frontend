interface HeroData {
  backgroundImage?: string
}

export default function Hero ({backgroundImage}: HeroData) {
  return (
    <>
      <div className="h-[711px]"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage } )` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        >
      
          {/* <section className="border-4 border-blue-500 w-full h-full text-white z-50 relative inset-0 bg-gradient-to-b from-red-50 to-[#14010D] opacity-80" > */}
          {/* </section> */}

          {/* [#5C1CC580] */}
          {/* <div className=" bg-black/70 from-red-50 to-[#14010D] absolute inset-0 " /> */}
          {/* py-20 md:pb-24 md:pt-52 */}

        <div className="z-0 relative container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 md:pb-20 md:pt-72 text-center flex flex-col items-center justify-between space-y-5">

          <div className='bg-white/10 backdrop-blur-lg rounded-3xl  w-fit border-t-[.1px] border-zinc-400'>
          
            <h3 className='text-[12px] px-3 py-1 font-extralight text-zinc-300'>Level Up With Expert Guidance</h3>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
            ProductPainters Mentorship Program (PPMP)
          </h1>
          <p className="text-lg lg:text-lg font-extralight mt-1 text-white">
            For entry and track-level PMs who feel stuck and want to advance their career
          </p>
          <div className="mt-2">
            <button className="bg-[#5C1CC5] text-sm text-[#fff] font-extralight rounded-[2px] transition-transform duration-200 hover:scale-105 px-8 py-2">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
