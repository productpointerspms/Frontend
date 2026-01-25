"use client";

import Image from "next/image";
import FaqSection from "@/components/homepage/FaqSection";
import TheNewFuture from "@/components/TheNewFuture";

export default function ContactPage() {
    return (
        <div className="w-full min-h-screen">
            <div className="relative w-full h-[570px] sm:h-[690px] xs:w-[375px] xs:h-[837px] flex items-center justify-center text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/images/contact.jpg')",
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[rgba(92,28,197,0.4)] to-[#14010D] flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center text-center">
                        <h1 className="font-[Montserrat] font-bold text-[32px] sm:text-[64px] leading-[100%] tracking-[0px] text-center sm:text-center text-white">
                            Let's Connect with <br /> ProductPointers
                        </h1>
                        <p className="font-[Montserrat] font-normal mt-[25px] text-[12px] sm:text-[20px] leading-[100%] sm:leading-[28px] tracking-[0px] text-center text-white">
                            Have questions about our programs or platform? <br /> We'd love to hear from you.
                        </p>
                    </div>
                </div>

            </div>
            <div className="w-full bg-[#FCF1FF] h-[1250px] sm:h-[780px] pt-[30px] px-[10px] sm:px-[80px] pb-[11px] flex flex-col sm:flex-row items-center gap-[5px] sm:gap-[380px]">
                <div className="mb-[140px]">
                    <div className="flex flex-col  gap-[20px]">
                        <h4 className="font-[Montserrat] font-bold text-[24px] sm:text-[48px] leading-[46px] tracking-[0px] text-black align-middle">Contact Us</h4>
                        <p className="font-[Montserrat] font-medium text-[12px] sm:text-[20px] leading-[100%] tracking-[0px] text-[#15010D] whitespace-nowrap align-middle">Follow us or send a direct email for quick updates.</p>
                    </div>
                    <div className="mt-[40px] sm:mt-[80px]">
                        <div>
                            <h4 className="font-[Montserrat] font-medium text-[18px] sm:text-[20px] leading-[27px] tracking-[0px] uppercase text-[#6A6B6C] align-middle">
                                Email
                            </h4>
                            <div className="flex items-center gap-[7px] mt-[6px]">
                                <div>
                                    <Image src="/images/mail.png" alt="mail-icon" width={28} height={28} className="w-[24px] h-[24px] sm:w-[28px] sm:h-[28px]" />
                                </div>
                                <a
                                    href="mailto:support@productpointers.com"
                                    className="font-[Montserrat] font-semibold text-[15px] sm:text-[20px]  leading-[27px] tracking-[0px] text-black align-middle"
                                >
                                    support@productpointers.com
                                </a>
                            </div>
                        </div>
                        <div className="mt-[30px]">
                            <h4 className="font-[Montserrat] font-medium text-[18px] sm:text-[20px]  leading-[27px] tracking-[0px] uppercase text-[#6A6B6C] align-middle">
                                Phone
                            </h4>
                            <div className="flex items-center gap-[7px] mt-[6px]">
                                <div>
                                    <Image src="/images/phone.png" alt="phone-icon" width={28} height={28} className="w-[24px] h-[24px] sm:w-[28px] sm:h-[28px]" />
                                </div>
                                <a
                                    href="tel:+234800123456"
                                    className="font-[Montserrat] font-semibold text-[15px] sm:text-[20px]  leading-[27px] tracking-[0px] text-black align-middle"
                                >
                                    +234 800 123456
                                </a>
                            </div>
                        </div>
                        <div className="mt-[30px]">
                            <h4 className="font-[Montserrat] font-medium text-[18px] sm:text-[20px] leading-[27px] tracking-[0px] uppercase text-[#6A6B6C] align-middle">
                                Follow Us
                            </h4>
                            <div className="flex items-center gap-[20px] mt-[20px]">
                                <a href="mdi:linkedin" className="w-[50px] h-[50px] rounded-[50px] border border-[#5C1CC521] p-[16px] bg-[#CCB9ED29]">
                                    <Image src="/images/linkedin.png" alt="linkedin-icon" width={18} height={18} />
                                </a>
                                <a href="" className="w-[50px] h-[50px] rounded-[50px] border border-[#5C1CC521] p-[18px] bg-[#CCB9ED29]">
                                    <Image src="/images/inst.png" alt="linkedin-icon" width={18} height={18} />
                                </a>
                                <a href="" className="w-[50px] h-[50px] rounded-[50px] border border-[#5C1CC521] p-[18px] bg-[#CCB9ED29]">
                                    <Image src="/images/x.png" alt="linkedin-icon" width={18} height={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[325px] h-[550px] sm:w-[592px] sm:h-[600px] flex flex-col bg-white shadow-[0px_4px_8px_4px_rgba(19,9,36,0.12)] gap-[32px] rounded-[20px] pt-[30px] pr-[20px] pb-[50px] pl-[20px] sm:pt-[50px] sm:pr-[30px] sm:pb-[50px] sm:pl-[30px] ">
                    <div>
                        <h3 className="font-[Montserrat] font-semibold text-[24px] sm:text-[30px] leading-[39px] tracking-[0px] text-black align-middle">Send us a message</h3>
                    </div>
                    <div className="flex flex-col gap-[30px]">
                        <div className="flex flex-col gap-[10px]">
                            <label htmlFor="name" className="font-[Montserrat] font-medium text-[18px] leading-[100%] tracking-[0px] text-[#15010D]">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your full name"
                                className="w-[275px] h-[50px] sm:w-[532px] h-[50px] rounded-[12px] p-[16px_24px] gap-[8px] bg-[#FCF1FF] border border-[#ACACAC82] opacity-100 placeholder:font-[Montserrat] placeholder:font-normal placeholder:text-[14px] placeholder:leading-[24px] placeholder:tracking-[0px] placeholder:text-[#6D6D6D]"
                            />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <label htmlFor="name" className="font-[Montserrat] font-medium text-[18px] leading-[100%] tracking-[0px] text-[#15010D]">
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="you@example.com"
                                className="w-[275px] h-[50px] sm:w-[532px] h-[50px] rounded-[12px] p-[16px_24px] gap-[8px] bg-[#FCF1FF] border border-[#ACACAC82] opacity-100 placeholder:font-[Montserrat] placeholder:font-normal placeholder:text-[14px] placeholder:leading-[24px] placeholder:tracking-[0px] placeholder:text-[#6D6D6D]"
                            />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <label
                                htmlFor="message"
                                className="font-[Montserrat] font-medium text-[18px] leading-[100%] tracking-[0px] text-[#15010D]"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="How can we help you?"
                                rows={4}
                                className=" h-[72px] w-[275px] h-[50px] sm:w-[532px] h-[105px] rounded-[12px] p-[16px_24px] gap-[8px] bg-[#FCF1FF] border border-[#ACACAC82] opacity-100 placeholder:font-[Montserrat] placeholder:font-normal placeholder:text-[14px] placeholder:leading-[24px] placeholder:tracking-[0px] placeholder:text-[#6D6D6D]"
                            ></textarea>
                        </div>
                        <button className="w-full h-[44px] bg-[#5C1CC5] rounded-[8px] py-[10px] px-[28px] gap-[10px] opacity-100 flex items-center justify-center text-white font-montserrat font-semibold font-[Montserrat] font-medium text-[18px] leading-[100%] tracking-[0px] text-[#fff] cursor-pointer">
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <FaqSection />
            </div>
            <div>
                <TheNewFuture />
            </div>
        </div>
    );
}