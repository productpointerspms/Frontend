import React from 'react';
import { Mail, Phone, Linkedin, Instagram, Twitter } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const ContactSection = () => {
  return (
    <div id="contact-section" className={`${montserrat.className} scroll-mt-24 bg-[#F9F5FF] min-h-screen py-20 px-6 md:px-20`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">How Can We Help?</h2>
          <p className="text-gray-500 text-base max-w-3xl mx-auto leading-relaxed">
            Reach out to the ProductPointers team for guidance, questions, mentorship support, 
            partnerships, or community-related inquiries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-4 space-y-6">
            {/* Email Card */}
            <div className="bg-white p-8 rounded-[24px] shadow-sm">
              <div className="w-10 h-10 bg-[#5C1CC5] rounded-lg flex items-center justify-center mb-4">
                <Mail className="text-white w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-black mb-4">Email Support</h3>
              <p className="text-[#5C1CC5] font-medium">support@productpointers.com</p>
            </div>

            {/* Phone Card */}
            <div className="bg-white p-8 rounded-[24px] shadow-sm">
              <div className="w-10 h-10 bg-[#5C1CC5] rounded-lg flex items-center justify-center mb-4">
                <Phone className="text-white w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-black mb-4">Phone</h3>
              <p className="text-[#5C1CC5] font-medium">+234 800 129 3456</p>
            </div>

            {/* Socials Card */}
            <div className="bg-white p-8 rounded-[24px] shadow-sm">
              <div className="w-10 h-10 bg-[#5C1CC5] rounded-lg flex items-center justify-center mb-4">
                <Phone className="text-white w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-black mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[Linkedin, Instagram, Twitter].map((Icon, idx) => (
                  <div key={idx} className="w-10 h-10 bg-[#F4EBFF] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#E9D7FE] transition-colors">
                    <Icon className="text-[#5C1CC5] w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-8 bg-white p-10 md:p-12 rounded-[32px] shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold text-black mb-8">Send us a message</h3>
            
            <form className="space-y-6">
              <div>
                <label className="block text-black font-semibold mb-2">Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name" 
                  className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5C1CC5]/20 focus:border-[#5C1CC5] transition-all"
                />
              </div>

              <div>
                <label className="block text-black font-semibold mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="you@example.com" 
                  className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5C1CC5]/20 focus:border-[#5C1CC5] transition-all"
                />
              </div>

              <div>
                <label className="block text-black font-semibold mb-2">Message</label>
                <textarea 
                  rows={5}
                  placeholder="How can we help you?" 
                  className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5C1CC5]/20 focus:border-[#5C1CC5] transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#5C1CC5] text-white font-bold py-4 rounded-xl hover:bg-[#4a169e] transition-colors mt-4 cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactSection;