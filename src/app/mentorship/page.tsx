"use client"
import React, {useState} from 'react';
import {
  Menu,
  X,
  Brain,
  Search,
  BarChart,
  Users,
  Award,
  StarHalf,
  CheckCircle,
  Check,
  CheckIcon, // For testimonials
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/hero-section';
import MentorshipTracks from '@/components/mentorship-tracks';
import MentorsCard from '@/components/mentors-card';
import TestimonyCard from '@/components/mentorship-success-cards';

// --- Header Component (Monolithic) ---
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = ['Pricing', 'About', 'Programs', 'Testimonials', 'Community', 'Contact'];

  // Button styles inlined for Sign Up (outlineDark/white bg)
  const signUpBaseStyle = '';
  const signUpStyle = `bg-[#5C1CC5] text-[#fff] border-2 border-white font-extralight rounded-lg transition-transform duration-200 hover:scale-105 px-8 py-2`;

  // Button styles inlined for Log In (outlineDark/purple hover)
  const loginBaseStyle = '';
  const loginStyle = `bg-transparent border-[#5C1CC5] border-1 text-[#5C1CC5] font-extralight rounded-lg transition-transform duration-200 hover:scale-105 px-8 py-2`;


  return (
    <nav className="z-50 w-full text-white bg-white" >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">


          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={'/'}>
                <Image src={"/ProductPointer_logo.png"} alt={`pointer pointer's logo`} height={500} width={500} className='w-15 h-15' />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link}
                href="#"
                className="text-sm font-light text-zinc-600 hover:text-[#6A35FF] transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons (inlined) */}
          <div className="hidden lg:flex items-center space-x-4">
             <button className="bg-[#5C1CC5] text-[#fff] border-2 border-white font-extralight rounded-lg transition-transform duration-200 hover:scale-105 px-8 py-2">Sign Up</button>
             <button className="bg-transparent border-[#5C1CC5] border-1 text-[#5C1CC5] font-extralight rounded-lg transition-transform duration-200 hover:scale-105 px-8 py-2">Log In</button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full z-20" style={{ backgroundColor: '#1A0B2E' }}>
          <div className="flex flex-col items-center space-y-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link}
                href="#"
                className="text-lg font-medium hover:text-gray-300 transition-colors"
              >
                {link}
              </Link>
            ))}
            <div className='flex flex-col space-y-4 w-full px-8'>
                <button className={`${signUpBaseStyle} ${signUpStyle} w-full !px-6 !py-3`}>Sign Up</button>
                <button className={`${loginBaseStyle} ${loginStyle} w-full !px-6 !py-3`}>Log In</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};




// --- Guidance Section (Monolithic) ---
const GuidanceSection = () => (
  <section className="py-20 bg-[#FCF1FF]">
    <div className="container mx-auto max-w-7xl px-12 sm:px-20 md:px-12 lg:px-0">
      <div className="flex flex-col md:flex-row justify-around items-center md:items-start">
        {/* Text Content */}
        <div className="flex flex-col space-y-2 md:max-w-lg px-0 sm:px-5 md:px-5 lg:px-0 text-justify md:text-left">
          <h2 className=" text-3xl lg:text-2xl font-bold text-[#1E1E1E] w-full pr-0 md:pr-40 text-center md:text-left">
            {`One-On-One Guidance From PMs Who've Been There`}
          </h2>
          <p className="text-sm line-clamp-6 text-zinc-700" style={{ lineHeight: '35px'}}>
            {`The ProductPointers Mentorship Program connects you with experienced product managers. These aren't just advisors they're active practitioners who understand the challenges you're facing because they've lived them.`}
          </p>
          <p className="text-sm line-clamp-6 text-zinc-700 pt-6" style={{ lineHeight: '35px'}}>
            {`Whether you're transitioning into product management, looking to level up your skills, or aiming for that senior role, your mentor becomes your personal guide, advocate, and accountability partner on your journey.`}
          </p>
          
          <div className='flex flex-row items-center justify-start'>
            <StarHalf size={20} className="ml-1 text-[#5c1cc5]" />
           <Link
              href="#"
              className=" py-3 items-center text-lg text-[#5C1CC5] text-[13px] font-extralight" >
              Personalized, transformative, and career-changing
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <Image
            src={"/one-on-one-guidance.png"}
            alt="Mentorship session with two men"
            height={900} width={900} 
            className="rounded-3xl shadow-2xl object-cover lg:max-w-xl h-96"
          />
        </div>
      </div>
    </div>
  </section>
);

// --- Tracks Section ---
const TracksSection = () => {

  interface MembershipData {
   icon?: React.ReactNode | string,
   title: string,
   description: string,
   bullets: string[],
   goal: string,
   imageUrl: string,
   imagePosition: string
}

  const tracks: MembershipData[]  = [
    {
      icon: <Brain />,
      title: "AI & No-Code Tools for Product Managers",
      description: "Master the next generation of product development tools. Learn how AI and no-code platforms are transforming how modern PMs build, test, and iterate on products faster than ever before.",
      bullets: [
        "Understanding AI tools that enhance product workflows",
        "Building and automating MVPs using No-Code platforms",
        "Leveraging AI for user research, data insights, and productivity",
        "Staying ahead in the evolving AI-product ecosystem"
      ],
      goal: "Harness AI and no-code to accelerate product innovation and delivery",
      imageUrl: "/tech-support-oversees-ai-neural-network1.png",
      imagePosition: 'left'
    },
    {
      icon: <Search />,
      title: "QA for Product Managers",
      description: "Bridge the gap between product vision and quality delivery. Gain hands-on QA knowledge that empowers you to work seamlessly with engineering teams and ship reliable products.",
      bullets: [
        "Understanding the QA process and its role in product quality",
        "How to use Postman to test APIs and validate product features",
        "Setting quality acceptance criteria and collaborating with QA engineers",
        "Building test plans and feedback loops within Agile teams"
      ],
      goal: "Equip PMs with hands-on QA knowledge to ensure product reliability",
      imageUrl: "/qa_for_product_managers.png",
      imagePosition: 'right'
    },
    {
        icon: <BarChart />,
        title: "Data-Driven Product Management",
        description: "Transform from intuition-based to evidence-based decision making. Learn to leverage analytics, metrics, and experimentation to build products users love and businesses need.",
        bullets: [
          "Using data to drive product decisions and feature prioritization",
          "Understanding product analytics, metrics, and dashboards",
          "Collaborating with data teams for experimentation and insights",
          "Translating data into actionable strategies for business growth"
        ],
        goal: "Help PMs make informed, measurable, and impactful product decisions",
        imageUrl: "/data-driven_product_management.png",
        imagePosition: 'left'
    },
    {
        icon: <Users />,
        title: "Stakeholder Management & Communication",
        description: "Master the art of influence without authority. Develop communication skills that build trust, manage conflicts, and align diverse teams around a shared product vision.",
        bullets: [
          "Building trust and alignment across teams",
          "Managing difficult conversations and conflicting priorities",
          "Communicating vision, roadmap, and progress effectively",
          "Presenting product updates with clarity and influence"
        ],
        goal: "Strengthen leadership communication for better collaboration",
        imageUrl: "/stakeholder_management_and_communication.png",
        imagePosition: 'right'
    },
    {
        icon: <Award />,
        title: "Product Leadership & Ownership",
        description: "Step into senior PM roles with confidence. Build the leadership mindset and skills to own product outcomes, inspire teams, and drive organizational impact.",
        bullets: [
          "Leading product teams with confidence and empathy",
          "Taking ownership of product vision and outcomes",
          "Executing successful product launches",
          "Mentoring junior PMs and shaping team culture"
        ],
        goal: "Develop senior-level leadership capabilities and ownership mindset",
        imageUrl: "/product_leadership_and_ownership.png",
        imagePosition: 'left'
    },
    {
        icon: <Award />,
        title: "Technical Product Management (TPM Mastery)",
        description: "Master the bridge between business strategy and technical execution. This track helps PMs gain the technical fluency needed to collaborate confidently with engineering teams and make informed product decisions.",
        bullets: [
          "Bridging the gap between business and engineering teams with technical fluency",
          "Understanding system architecture, APIs, and data flow at a high level",
          "Writing effective technical requirements and user stories",
          "Collaborating with developers to prioritize technical debt and scalability needs",
          "Using tools like Postman, Swagger, and GitHub for better technical communication"
        ],
        goal: "Empower PMs to make informed technical decisions, communicate effectively with engineers, and lead products with both strategic and technical confidence.",
        imageUrl: "/technical_product_management.png",
        imagePosition: 'right'
    },
    {
        icon: <Award />,
        title: "Growth Product Management",
        description: "Drive sustainable business growth through product-led strategies. Master the frameworks, metrics, and experimentation techniques that power high-growth companies.",
        bullets: [
          "Understanding growth loops, funnels, and key product metrics (activation, retention, churn, LTV, CAC)",
          "Designing and running growth experiments (A/B testing, onboarding optimization, referral systems)",
          "Collaborating with marketing and data teams to identify scalable growth opportunities",
          "Using tools like Mixpanel, Amplitude, or Hotjar to analyze user behavior and growth trends",
          "Building growth roadmaps that balance acquisition, engagement, and monetization"
        ],
        goal: "Equip PMs with the mindset and skills to drive sustainable product growth through data-driven experimentation and user-centered optimization",
        imageUrl: "/growth_product_management.png",
        imagePosition: 'left'
    },
  ];

  return (
    <section className="py-14 bg-gradient-to-b from-[#FAE1FF] to-[#FCF1FF]">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-5 flex flex-col items-center justify-start">
           <span className="inline-block px-4 py-2 text-[11px] font-extralight rounded-full text-[#FCF1FF] bg-[#5C1CC5]">
            Premium Learning Journey
           </span>
           <h2 className="text-3xl lg:text-3xl font-extrabold mt-4 text-[#1E1E1E] " >
            Specialized Mentorship Tracks
           </h2>
           <p className="text-md mt-1 px-12 text-zinc-600">
            Master critical product management domains through exprt-led, personalized learning paths
           </p>
        </div>

        <div className="mt-16 border-none space-y-12 md:space-y-8 pb-8">
            {tracks.map((track, index) => {
                return (
                    <div key={index} className="flex flex-row md:flex-col space-x-0 justify-center items-center py-2 md:py-6">
                        <MentorshipTracks membershiptracks={track} />
                    </div>
                )
            })}
        </div>
      </div>
    </section>
  );
};



// --- How It Works Section (Monolithic) ---
const HowItWorksNew = () => {
    const steps = [
        {
            number: '01',
            title: 'Apply',
            description: 'Share your background, goals, and what you\'re looking for in a mentor'
        },
        {
            number: '02',
            title: 'Get access',
            description: 'You get access with a mentor whose experience aligns with your aspirations'
        },
        {
            number: '03',
            title: 'Start Sessions',
            description: 'Begin your journey with bi-weekly 1-on-1 sessions tailored to your needs'
        },
    ];

    return (
        <section className="relative overflow-hidden h-auto md:h-[729px] flex items-center justify-center py-12 md:py-0" style={{ background: `linear-gradient(135deg, #5C1CC5B2 0%, #4A1D9A 20%)` }}>
            {/* Background Image/Overlay */}
            <Image
                src='/people-gathering.jpg'
                alt='people talking'
                className="absolute inset-0 bg-cover bg-bottom opacity-20 mr-30 lg:mr-0 max-w-9/4 md:w-full h-7/5 bottom-72 -top-30"
                width={1000}
                height={1000}
            />

            <div className="container mx-auto max-w-6xl px-4 md:px-0 relative z-10 text-white text-center flex flex-col items-center justify-between">
                <h2 className="text-4xl lg:text-4xl font-extrabold md:font-bold mb-4">How It Works</h2>
                <p className="text-lg lg:text-md mb-12" style={{ color: '#DCD0FF' }}>
                    Getting started is simple and straightforward
                </p>

                <div className="flex flex-row flex-wrap items-end justify-end gap-3 md:gap-4">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-white rounded-4xl shadow-lg px-8 py-8 md:py-5 pt-8 h-86 md:h-64 w-full md:w-72 flex flex-col items-start justify-between text-left max-w-sm mx-auto mb-4">
                            <div className="text-8xl md:text-6xl font-extrabold mb-5 md:mb-4" style={{ color: '#FAE1FF' }}>
                                {step.number}
                            </div>
                            <div className='w-72 md:w-50'>
                              <h3 className="text-2xl md:text-xl font-semibold md:mb-2 mb-5" style={{ color: '#1E1E1E' }}>
                                  {step.title}
                              </h3>
                              <p className=" text-xl text-black text-[#5B5B5B] md:text-sm font-light md:font-normal">
                                  {step.description}
                              </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
  );
};

// --- Mentors Section (Monolithic) ---
const MentorsNew = () => {
    const mentors = [
        { 
          name: 'Timileyin Falae', 
          title: 'Senior Product Manager at Parkway', 
          img: '/timileyin_falae.png', 
          linkedin: '#' },
        { 
          name: 'Frank Anwana, MBA', 
          title: 'Lead Technical Product Manager at Translayte', 
          img: '/frank_anwana.png', 
          linkedin: '#' },
        { 
          name: 'Segun Sobodo', 
          title: 'Lead Product Quality Assurance Manager at Opera', 
          img: '/segun_sobodo.png', 
          linkedin: '#' },
        { 
          name: 'G. Olajumoke Ajala', 
          title: 'Data Analyst at Smile Communications Ltd', 
          img: '/olajumoke_ajala.png', 
          linkedin: '#' },
        { 
          name: 'Prince Ekpenyong', 
          title: 'Senior Technical Product Manager at Sellyticshq', 
          img: '/prince_ekpenyong.png', 
          linkedin: '#' },
        { 
          name: 'Michael Kayode', 
          title: 'AI - No Code Product Management Mentor', 
          img: '/michael_kayode.png', 
          linkedin: '#' },
        { 
          name: 'Seyifunmi Olafioye', 
          title: 'Senior Product Manager at SeedFi', 
          img: '/seyifunmi_olafioye.png', 
          linkedin: '#' },
        { 
          name: 'Lydia Nwobodo', 
          title: 'Product Manager at Miva University', 
          img: '/lydia_nwobodo.png', 
          linkedin: '#' },
    ];

    return (
      <>
          {/* Background Image/Overlay */}
          <section className="-z-50 overflow-hidden sm:bg-none" style={{ background: `linear-gradient(180deg, #FAE1FF 60%, #FCF1FF 70%)` }}>



            <div className='py-20 relative  flex items-start inset-0'>

              <Image
                  src='/background_particles.png'
                  alt='particles'
                  className="absolute inset-0 bg-cover opacity-50 mr-30 lg:mr-0 max-w-full md:w-full h-7/5 z-40 "
                  width={1000}
                  height={1000}
              />
            
              <div className="z-50 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-4xl font-bold text-center mb-8 md:mb-4" style={{ color: '#1E1E1E' }}>
                      Meet The Mentors Behind Your Growth
                  </h2>
                  <p className="text-sm md:text-sm text-center mb-16" style={{ color: '#5B5B5B' }}>
                      Experienced mentors guiding you through every phase of your product journey
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                      {mentors.map((mentor, index) => (
                        <MentorsCard key={index} mentors={mentor}  />
                      ))}
                  </div>
              </div>
            </div>
          </section>
      </>
  );
};




// --- Commitment Section (New, Monolithic) ---
const CommitmentSection = () => {
    return (
        <section className="py-20" style={{ backgroundColor: '#FCF1FF' }}>
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: '#1E1E1E' }}>
                    Commitment
                </h2>
                <p className="text-lg mb-12 mt-5 font-light text-black" >
                    A small price for transformative career guidance
                </p>

                <div
                    className="mx-auto max-w-md p-6 sm:py-10 rounded-2xl shadow-xl border-[1px] border-[#EAE0FF]">
                    <div className="text-6xl font-extrabold mb-8" style={{ color: '#1E1E1E' }}>
                        <span className="text-6xl mr-3 font-normal">₦</span>
                        70,000
                    </div>

                    <ul className="w-full text-left space-y-3 px-5 mb-10">
                        {[
                            "Weekly 1-on-1 mentorship with personalized guidance",
                            "Clear career roadmap tailored to your goals",
                            "Real-time feedback and portfolio reviews",
                            "Access to a supportive PM community",
                            "Continued support even after sessions"
                        ].map(item => (
                            <li key={item} className="flex items-start text-lg" style={{ color: '#1E1E1E' }}>
                                <CheckIcon size={24} className="flex-shrink-0 mr-3 mt-1" style={{ color: '#6A35FF' }} />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    
                    <button className="w-full px-8 py-1 text-md rounded-md font-normal transition-transform duration-200 hover:scale-[1.01] bg-[#5C1CC5] text-[#FFFFFF] hover:bg-opacity-90">
                        Join the Mentorship
                    </button>

                    <p className="text-[10px] mt-4" style={{ color: '#5B5B5B' }}>
                        Join the next cohort today, only 10 mentees accepted per cohort.
                    </p>
                </div>
            </div>
        </section>
    );
};


// --- Success Stories Section (Monolithic, includes TestimonialCard & StarRating logic) ---
const SuccessStories = () => {
  const testimonials = [
    {
      name: 'Oluwaseun Fiki',
      title: 'Product Manager',
      img: '/Oluwaseun_fiki.png',
      text: [
            "I'm thrilled to share my experience with ProductPointers!\n\n",

            "The program exceeded my expectations, as it provided me with hands-on training, mentorship, and networking opportunities that have significantly enhanced my skills and knowledge in product management.",
            
            "Through the cohort, I gained a deeper understanding of product development, market analysis, and stakeholder management. The interactive sessions, presentations and case studies helped me apply theoretical concepts to real-world scenarios.",
            
            "The Coach Mrs Blessing is a really wonderful and vast PM, she gave us full attention despite her busy schedule and I appreciate her for that. It is a privilege to learn through her.\n\n",
      ],
      linkText: "From learner to leader.",
    },

    {
      name: 'Adaobi Comfort',
      title: 'Product Manager Intern',
      img: '/adaobi_comfort.png',
      text: "Joining ProductPointers was a game-changer for me. The hands-on, practical approach made every session impactful and relatable. From idea conception to product delivery, I gained deep insights and real-world strategies that transformed how I think and work. These weren't just taught - we practiced, implemented, and received feedback that accelerated our growth. Heartfelt thanks to our exceptional mentor for the guidance and patience, and to my brilliant colleagues whose collaboration enriched the learning. This was more than a class; it was a stepping stone to becoming a confident and resourceful Product Manager.",
      linkText: "From concept to confidence.",
    },

    {
      name: 'Olajumoke Bakere',
      title: 'Product Manager',
      img: '/olajumoke_bakere.png',
      text: "Completing the ProductPointers mentorship programme has been a defining moment in my product management journey. It wasn't just theory - it was hands-on, real, and deeply practical. The structure made it easy to apply learning to real-life scenarios, and having an experienced mentor who wants the best for you made all the difference. I always felt supported, guided, and challenged to think more critically and strategically. More than anything, the community stands out - a space where people genuinely want each other to grow. Everyone brings something valuable, and that energy is contagious. You don't just learn, you thrive.  This isn't goodbye; it's just the beginning.",
      linkText: "From concept to confidence.",
    },
    {
      name: 'Funmilayo',
      title: 'Product Manager',
      img: '/funmilayo.png',
      text: "The journey was nothing short of impactful. From day one, the support, feedback, and real-world product challenges pushed me to think deeper and grow more confident in my PM skills. It wasn't just another course filled with theory. We worked on real product challenges, received feedback from experienced PMs, and had access to a supportive community that made learning less lonely.  I've gained so much clarity on how to think like a product manager, ask the right questions, and approach problems with a user-first mindset. Beyond the skills, it helped me build confidence in my journey and reassured me that I'm on the right path. Thank you for creating a space that's as challenging as it is supportive",
      linkText: "From unsure to unstoppable.",
    },
    {
      name: 'Abisola Paul',
      title: 'Product Manager',
      img: '/abisola_paul.png',
      text: [
            "Oh, mine!!!",
            "Product Pointer has been very instrumental in my PM journey so far, the program is robust, intense and enlightening.\n\n Every session is an eye opener, there's no way someone will go through this session and his/her mindsets will not be changed.\n\n God bless the Product Pointer, God bless Coach Blessing."
      ],
      linkText: "From curious to confident.",
    },
    {
      name: 'Adegbenro Toluwalase',
      title: 'Product Manager',
      img: '/adegbenro_toluwalase.png',
      text:[
         "Before joining the ProductPointers Cohort 2 Mentorship Program, I had a basic understanding of product management but lacked structure and clarity, especially around documentation, roadmapping, and communicating product decisions.\n\n Through the program, I gained hands-on experience, practical knowledge, and the confidence to approach product management strategically. The mentorship, accountability sessions, and real-world projects helped me connect the dots between theory and execution.",

         "One major transformation for me was learning to showcase my growth and projects on LinkedIn. Before ProductPointers, I was barely visible online, but now I’ve been able to share my product journey consistently and gain meaningful traction.\n\n        Most importantly, I learned to leverage my customer service background to derive user insights, communicate value, and make better product decisions.",

         "ProductPointers truly gave me direction, structure, and the confidence to build and grow in my product management career and I’m deeply grateful for the experience. "
      ],
      linkText: "ProductPointers gave my growth a map.",
    },
  ];

  return (
    <section className="py-20 pt-6" style={{ backgroundColor: '#FCF1FF' }}>
      <div className="container mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4 text-black md:text-[#1E1E1E]">
          Success Stories
        </h2>
        <p className="text-lg text-center mb-16 text-black md:text-[#5B5B5B]">
          Real transformations from mentees who took the leap
        </p>

        <div className="space-y-8 md:space-y-12">
          {testimonials.map((item, index) => (
            // Inlined TestimonialCard logic
            <TestimonyCard key={index} testimony={item} />
          ))}
        </div>
      </div>
    </section>
  );
};


// --- Footer Component (Monolithic) ---
const Footer = () => (
    <footer className="py-16" style={{ backgroundColor: '#1A0B2E', color: '#DCD0FF' }}>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; {new Date().getFullYear()} ProductPainters. All rights reserved.</p>
        </div>
    </footer>
)

// --- Main App Component ---
export default function App() {
  return (
    <div className="font-sans" style={{ backgroundColor: '#F9F6FF' }}>
      <div className='z-50 relative'>
        <Header />
      </div>
      <main>

        {/* // --- Hero Section (Monolithic) --- */}
        <div className='relative h-[711px]'>
          <Image src={'/hero-gradient.png'} alt='Nothing' width={400} height={400} className="w-full absolute inset-0 z-30 h-[711px]"/>
          <Hero backgroundImage='/upscalemedia-transformed.png'/>
        </div>

        <GuidanceSection />

        <TracksSection />
        
        <HowItWorksNew />
        <MentorsNew />
        <CommitmentSection />
        <SuccessStories />
      </main>
      <Footer />
    </div>
  );
}



