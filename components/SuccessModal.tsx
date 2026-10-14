"use client";
import { Check, Flame, MessageCircle } from "lucide-react";
export type ProgramKey="ppmp"|"ppfm"|"ppip"|"ppap";
const content:Record<ProgramKey,{short:string;name:string;duration:string;balance:string;award?:string}>={
 ppmp:{short:"PPMP",name:"Product Management Mastery Program",duration:"10-week",balance:"N155,000"},
 ppfm:{short:"PPFP",name:"Fintech Product Management Program",duration:"10-week",balance:"N150,000"},
 ppip:{short:"PPIP",name:"Product Management Apprenticeship/Internship Program",duration:"12-week",balance:"N30,000"},
 ppap:{short:"Onome",name:"Product Management Accelerator Program",duration:"12-week",balance:"N75,000",award:"Onome Scholarship"},
};
export default function SuccessModal({program,onClose}:{program:ProgramKey;onClose:()=>void}){
 const p=content[program];
 return <div className="modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><section className="success-modal" role="dialog" aria-modal="true" aria-labelledby="success-title">
  <div className="modal-hero"><span className="check-badge"><Check size={28}/></span><h2 id="success-title">Application Received!</h2><p>Thank you for applying for the {p.short} Scholarship.</p></div>
  <div className="modal-body"><p className="modal-summary">We have received your application for the <strong>{p.name}</strong>. Your submission will be evaluated based on your eligibility, motivation, career goals, and commitment to the {p.duration} program.</p>
  <div className="slot-alert"><Flame size={24} fill="currentColor"/><span>There are <strong>20 scholarship slots</strong> available in total, and we have received applications from aspiring product managers ready to take the next step in their tech careers.</span></div>
  <h3>What happens next?</h3>
  <div className="next-step"><span className="step-n">1</span><span>Our admissions team will review your application and contact you within <strong>12 to 48 hours</strong> with an official update.</span></div>
  <div className="next-step"><span className="step-n">2</span><span>If selected, you will receive an official acceptance email containing instructions to secure your scholarship slot and complete the remaining <strong>{p.balance}</strong> tuition contribution.</span></div>
  <div className="next-step"><span className="step-n">3</span><span>Please check your email inbox (and spam folder) regularly for updates from our team.</span></div>
  <a className="waitlist-button transition-colors hover:bg-violet-800" href="https://wa.me/" target="_blank" rel="noreferrer"><MessageCircle size={23}/>Join Scholarship Waitlist Community</a><p className="modal-footnote">Join our candidate community to get firsthand information, status updates, and future opportunities.</p>
  </div>
 </section></div>
}
