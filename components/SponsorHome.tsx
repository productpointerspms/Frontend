"use client";
import { ArrowLeft, CheckCircle2, ChevronDown, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SuccessModal, { type ProgramKey } from "./SuccessModal";
const programs:{value:ProgramKey;label:string}[]=[
 {value:"ppmp",label:"Product Management Mastery Program (PPMP)"},
 {value:"ppfm",label:"Fintech Product Management Program (PPFP)"},
 {value:"ppip",label:"Product Management Apprenticeship/Internship Program (PPIP)"},
 {value:"ppap",label:"Product Management Accelerator Program (PPAP)"},
];
export default function SponsorHome(){
 const [modal,setModal]=useState<ProgramKey|null>(null);
 const [preferred,setPreferred]=useState<ProgramKey|"">("");
 const [error,setError]=useState(false);
  const [sent,setSent]=useState(false);
 return <main className="home-wrap mx-auto w-full">
  <Link href="/" className="back-link"><ArrowLeft size={14}/>Back to sponsorship tiers</Link>
  <div className="home-intro"><div className="eyebrow">Sponsor a learner</div><p>You’ve chosen Champion. Share a few details and our team will help you turn your contribution into an opportunity for one learner.</p><h1>Let’s make a scholarship happen.</h1></div>
  <div className="sponsor-layout">
   <aside><div className="tier-card"><div className="tier-kicker"><CheckCircle2 size={14}/> Your selected tier</div><div className="tier-title-row"><h2>Champion</h2><span className="popular">Most chosen</span></div><p>Fund a full scholarship place for one learner covering their entire program access and materials.</p><div className="tier-feature"><small>Coverage</small><span>Full program access</span></div><div className="tier-feature"><small>Recognition</small><span>Named on scholarship award + community recognition</span></div><a href="#sponsor-form" className="tier-change">Choose a different tier</a></div>
    <div className="next-card"><h3>What happens next?</h3><p>Our team will get in touch to discuss your contribution, confirm the program and explain how we select and support your scholar.</p><p className="purple-note"><ShieldCheck size={15}/> No payment or commitment at this stage.</p></div>
   </aside>
   <section id="sponsor-form" className="form-card"><div className="form-card-head"><div><h2>Tell us a little about yourself</h2><p>Sponsoring personally or through an organisation? We’d love to hear from you.</p></div><span className="required-caption"> Required fields</span></div>
     <form onSubmit={e=>{e.preventDefault();const form=e.currentTarget;if(!form.reportValidity()){setError(true);return}setError(false);if(preferred){setSent(false);setModal(preferred)}else{setSent(true)}}}>
     <div className="fields-two"><div className="field"><label htmlFor="sname">Full name <em>*</em></label><input id="sname" required placeholder="Enter your full name"/></div><div className="field"><label htmlFor="semail">Email address <em>*</em></label><input id="semail" type="email" required placeholder="you@example.com"/></div>
     <div className="field"><label htmlFor="org">Organisation (optional)</label><input id="org" placeholder="Your organisation’s name"/></div><div className="field"><label htmlFor="phone">Phone number (optional)</label><input id="phone" type="tel" placeholder="Include country code"/></div></div>
      <div className="field"><label htmlFor="program">Preferred program (optional)</label><div style={{position:"relative"}}><select id="program" value={preferred} onChange={e=>{setPreferred(e.target.value as ProgramKey|"");setSent(false)}}><option value="">I’d like help choosing a program</option>{programs.map(p=><option value={p.value} key={p.value}>{p.label}</option>)}</select><ChevronDown size={16} style={{position:"absolute",right:12,top:13,pointerEvents:"none"}}/></div></div>
     <div className="field"><label htmlFor="message">Anything you’d like us to know? <span style={{color:"#8d8995",fontWeight:400}}>(optional)</span></label><textarea id="message" placeholder="Tell us about your sponsorship goals, preferred timing or any questions you have."/></div>
     <label className="checkbox-line"><input type="checkbox" required/><span>I agree to be contacted about my sponsorship enquiry. I’ve read the <a href="#" style={{color:"#5616c9",textDecoration:"underline"}}>Privacy Policy</a>. <em>*</em></span></label>
     {error&&<p role="alert" className="field-help" style={{color:"#c53e44"}}>Please complete the required fields before continuing.</p>}
      <button className="primary-button full-button transition-colors hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700">Send sponsorship enquiry</button><p className="fineprint">This is an enquiry, not a payment. We’ll confirm the details with you first.</p>{sent&&<p role="status" className="fineprint">Thanks for your enquiry. Our team will help you choose the right program.</p>}
    </form>
   </section>
  </div>
  {modal&&<SuccessModal program={modal} onClose={()=>setModal(null)}/>}
 </main>
}
