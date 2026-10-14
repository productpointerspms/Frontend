"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SuccessModal, { type ProgramKey } from "./SuccessModal";

type FormConfig = {
  key: ProgramKey;
  title: string;
  description: string;
  program: string;
  course: string;
  remaining: string;
  contributionPrompt: string;
  commitmentOptions: string[];
  scholarshipCovered: string;
  tuitionTotal: string;
  educationExtra?: boolean;
  journey: string[];
  section4: { label: string; placeholder: string; help?: string; type?: "text" | "textarea" }[];
  declarations: string[];
};

const configs: Record<ProgramKey, FormConfig> = {
  ppmp: {
    key:"ppmp",title:"Product Management Mastery Program",description:"Tell us a little about yourself and your career journey to apply for the Product Management Mastery Program. Complete all sections on this single form below.",program:"10-week Product Management Mastery Program",course:"PRODUCT MANAGEMENT MASTERY",remaining:"N155,000",contributionPrompt:"Can you commit to the full 10-weeks Product Management Mastery Program and pay the remaining N30,000,000 tuition contribution if selected?",commitmentOptions:["Yes, I can commit to the full program schedule and pay the N155,000 tuition contribution.","No, I am unable to make this financial or time commitment at this time."],scholarshipCovered:"N655,000",tuitionTotal:"N810,000",
    journey:["I've completed a PM course","I've worked on personal product projects","I have 6-12 months product experience","I have 1+ year product experience","Others"],
    section4:[
      {label:"Tell us briefly about your Product Management experience.",placeholder:"Your experience...",help:"Recommended Length: 100 To 150 Words."},
      {label:"What is your biggest challenge as a Product Manager right now?",placeholder:"Training/Institution",type:"text"},
    ],
    declarations:["I confirm that the information and documents provided in this application are accurate, complete, and truthful.","I understand that submitting this application does not automatically guarantee selection for a scholarship slot.","I understand that only 20 applicants will be selected for this cohort of the PPMP Scholarship.","I understand that selected scholars will be required to pay the remaining N155,000 tuition contribution to secure their place in the program."]
  },
  ppfm: {
    key:"ppfm",title:"Fintech Product Management Program",description:"Tell us a little about yourself and your career journey to apply for the Fintech Product Management Program. Complete all sections on this single form below.",program:"10-week Fintech Product Management Program",course:"FINTECH PRODUCT MANAGEMENT",remaining:"N150,000",contributionPrompt:"Can you commit to the full 10-weeks Fintech Product Management Program and pay the remaining N30,000,000 tuition contribution if selected?",commitmentOptions:["Yes, I can commit to the full program schedule and pay the N150,000 tuition contribution.","Yes, I will like to use the minimum 3-installment option","No, I am unable to make this financial or time commitment at this time."],scholarshipCovered:"N150,000",tuitionTotal:"N300,000",
    journey:["Product Manager","Associate/Junior Product Manager","Product Analyst","Product designer working closely with Product","Product Operations","Others"],
    section4:[
      {label:"Tell us briefly about your Product Management experience.",placeholder:"Your experience...",help:"Recommended Length: 100 To 150 Words."},
      {label:"Where did you complete your foundational Product Management training?",placeholder:"Training Institution",type:"text"},
      {label:"Share at least 2 products you have built or worked on.",placeholder:"Product name and your contribution...",help:"Minimum: 200 Words."},
      {label:"Why do you want to transition into Fintech Product Management?",placeholder:"What specifically interests you about building financial products, and what are you hoping to achieve through this program?",help:"Maximum: 200 Words."},
      {label:"Why should you be selected for the Chisom Scholarship?",placeholder:"Tell us why this opportunity matters to you right now.",help:"Maximum: 200 Words."},
    ],
    declarations:["I confirm that the information and documents provided in this application are accurate, complete, and truthful.","I understand that submitting this application does not automatically guarantee selection for a scholarship slot.","I understand that only 20 applicants will be selected for this cohort of the PPFP Scholarship.","I understand that selected scholars will be required to pay the remaining N150,000 tuition contribution to secure their place in the program."]
  },
  ppip: {
    key:"ppip",title:"Product Management Apprenticeship/Internship Program",description:"Tell us a little about yourself and your career journey to apply for the Product Management Apprenticeship/Internship Program. Complete all sections on this single form below.",program:"12-week Product Management Apprenticeship/Internship Program",course:"PRODUCT MANAGEMENT APPRENTICESHIP/INTERNSHIP",remaining:"N30,000",contributionPrompt:"Can you commit to the full 12-week Apprenticeship/Internship Program and pay the remaining N30,000,000 tuition contribution if selected?",commitmentOptions:["Yes, I can commit to the full program schedule and pay the N30,000 tuition contribution.","No, I am unable to make this financial or time commitment at this time."],scholarshipCovered:"N45,000",tuitionTotal:"N75,000",
    journey:["Aspiring Product Manager - Beginner","Aspiring Product Manager - Currently learning Product Management","Entry - Level / Associate Product Manager","Product Manager","Career switcher exploring Product Management","Others"],
    section4:[
      {label:"Why do you want to join the Product Management Apprenticeship/Internship Program?",placeholder:"Share your motivation...",help:"Recommended Length: 100 To 150 Words."},
      {label:"Describe a problem you've noticed in the real world that you'd love to solve.",placeholder:"e.g. A problem in Finance, Healthcare......",help:"Maximum: 200 Words."},
    ],
    declarations:["I confirm that the information and documents provided in this application are accurate, complete, and truthful.","I understand that submitting this application does not automatically guarantee selection for a scholarship slot.","I understand that only 20 applicants will be selected for this cohort of the PPIP Scholarship.","I understand that selected scholars will be required to pay the remaining N30,000 tuition contribution to secure their place in the apprenticeship program."]
  },
  ppap: {
    key:"ppap",title:"Product Management Accelerator Program",description:"Tell us a little about yourself and your career journey to apply for the Product Management Accelerator Program. Complete all sections on this single form below.",program:"12-week Product Management Accelerator Program",course:"PRODUCT MANAGEMENT ACCELERATOR",remaining:"N75,000",contributionPrompt:"Can you commit to the full 12-week Accelerator Program and pay the remaining N75,000 tuition contribution if selected?",commitmentOptions:["Yes, I can commit to the full program schedule and pay the N75,000 tuition contribution.","No, I am unable to make this financial or time commitment at this time."],scholarshipCovered:"N210,000",tuitionTotal:"N285,000",educationExtra:true,
    journey:["I am currently new to product management","I have started learning product management independently","I have completed a product management course or training","I am currently transitioning from another career into product management","I am already working in product/tech and want to grow my skills","Others"],
    section4:[
      {label:"Why do you want to pursue a career in Product Management?",placeholder:"Share what drives your interest in Product Management, what problems you want to solve, and where you see yourself five years from now.",help:"Recommended Length: 100 To 150 Words."},
      {label:"Why should you be considered for the Onome Scholarship?",placeholder:"Highlight your dedication, potential impact, financial need, or why this opportunity will transform your career trajectory.",help:"Minimum: 200 Words."},
    ],
    declarations:["I confirm that the information and documents provided in this application are accurate, complete, and truthful.","I understand that submitting this application does not automatically guarantee selection for a scholarship slot.","I understand that only 20 applicants will be selected for this cohort of the Onome Scholarship.","I understand that selected scholars will be required to pay the remaining N75,000 tuition contribution to secure their place in the accelerator program."]
  },
};

function SectionTitle({n,title,subtitle,required}:{n:number;title:string;subtitle:string;required?:boolean}) {
  return <div className="section-heading"><span className="section-num">{n}</span><div><h2>{title}</h2><p>{subtitle}</p></div>{required&&<span className="section-required">*Required</span>}</div>;
}
function TextField({label,required=true,placeholder="",type="text",help=""}:{label:string;required?:boolean;placeholder?:string;type?:string;help?:string}) {
  const id=label.toLowerCase().replace(/[^a-z0-9]+/g,"-");
  return <div className="field"><label htmlFor={id}>{label}{required&&<> <em>*</em></>}</label><input id={id} name={id} required={required} type={type} placeholder={placeholder}/>{help&&<div className="field-help">{help}</div>}</div>;
}
function ChoiceList({name,choices,type="radio",required=true}:{name:string;choices:string[];type?:"radio"|"checkbox";required?:boolean}) {
  return <div className="journey-options">{choices.map((choice,i)=><label className="option-row" key={choice}><input type={type} name={name} value={choice} required={required&&(type==="checkbox"||i===0)}/><span>{choice}</span></label>)}</div>;
}

export default function ApplicationForm({programKey}:{programKey:ProgramKey}) {
 const c=configs[programKey];
  const [modal,setModal]=useState(false);
 return <><div className="application-top"><h1>Scholarship Application</h1><p>{c.description}</p></div><main className="application-shell">
   <form className="application-form" onSubmit={e=>{e.preventDefault();if(e.currentTarget.reportValidity())setModal(true)}}>
   <section className="application-section"><SectionTitle n={1} title="Personal Information" subtitle="Provide your official contact details for candidate tracking." required/>
    <div className="fields-two"><TextField label="First Name" placeholder="John"/><TextField label="Last Name" placeholder="Jack"/><TextField label="Email Address" type="email" placeholder="Enter your full name"/><div className="field"><label htmlFor="whatsapp">WhatsApp Phone Number <em>*</em></label><div className="fields-two" style={{gridTemplateColumns:"1fr 1.3fr",gap:8}}><select aria-label="Country code" defaultValue="NG +234"><option>NG +234</option><option>GH +233</option><option>US +1</option><option>GB +44</option></select><input id="whatsapp" name="whatsapp" required type="tel" placeholder="081 234 5678"/></div></div></div>
     <div className="field"><label htmlFor="location">Where are you currently based? <em>*</em></label><select id="location" required defaultValue="Lagos, Nigeria">{["Lagos, Nigeria","Abuja, Nigeria","Port Harcourt, Nigeria","Accra, Ghana","Other"].map(x=><option key={x}>{x}</option>)}</select></div>
   </section>
   <section className="application-section"><SectionTitle n={2} title="Education & Eligibility Verification" subtitle="Provide academic status and upload verification proof as applicable." required/>
    <div className="field"><label htmlFor="education">Highest Level of Education <em>*</em></label><select id="education" required defaultValue=""><option value="" disabled>Select highest education completed or ongoing</option>{["Secondary school","OND / NCE","Bachelor's degree","Master's degree","Doctorate","Other"].map(x=><option key={x}>{x}</option>)}</select></div>
    {c.educationExtra&&<div className="field"><label htmlFor="nysc">What is your current NYSC status? <em>*</em></label><select id="nysc" required defaultValue=""><option value="" disabled>Select your NYSC status</option>{["Not applicable","Awaiting call-up","Currently serving","Completed","Exempted"].map(x=><option key={x}>{x}</option>)}</select></div>}
   </section>
   <section className="application-section"><SectionTitle n={3} title="Your Product Journey & Profile" subtitle="Help us understand your current background and experience level." required/>
    <div className="field"><span className="field-label">Which best describes where you are today in your Product journey? <em>*</em></span><ChoiceList name="journey" choices={c.journey}/></div>
    <TextField label="LinkedIn Profile" required={false} placeholder="https://www.linkedin.com/in/yourprofile"/>
   </section>
   <section className="application-section"><SectionTitle n={4} title="Motivation & Program Commitment" subtitle="Your answers help our selection committee evaluate your readiness and passion." required/>
     {c.section4.map(item=><div className="field" key={item.label}><label htmlFor={item.label.replace(/\W/g,"")}>{item.label} <em>*</em></label>{item.help&&<div className="field-help">{item.help}</div>}{item.type==="text"?<input id={item.label.replace(/\W/g,"")} name={item.label.replace(/\W/g,"")} required placeholder={item.placeholder}/>:<textarea id={item.label.replace(/\W/g,"")} name={item.label.replace(/\W/g,"")} required placeholder={item.placeholder}/>}</div>)}
     <div className="commitment-panel"><p>{c.contributionPrompt} <em>*</em></p><ChoiceList name="commitment" choices={c.commitmentOptions} required/><div className="financial-note"><strong>Important Financial Note:</strong> Selecting “Yes” confirms that you understand the scholarship covers {c.scholarshipCovered} of the total {c.tuitionTotal} tuition value, and that selected scholars are responsible for paying the remaining {c.remaining} contribution to secure their slot.</div></div>
   </section>
   <section className="application-section"><SectionTitle n={5} title="Application Declaration" subtitle="Please confirm your application terms before submitting." required/>
    <div className="field"><span className="field-label">Please check all boxes to confirm your submission: <em>*</em></span><ChoiceList name="declarations" choices={c.declarations} type="checkbox"/></div>
   </section>
   <div className="submit-row"><button className="primary-button transition-colors hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700">Submit Application <ArrowRight size={16}/></button></div>
   </form>
  </main>{modal&&<SuccessModal program={programKey} onClose={()=>setModal(false)}/>}</>
}
