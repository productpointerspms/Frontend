import React from 'react';
import SignUpForm from '../../components/SignUpForm';
import Image from 'next/image';
import ladyImage from '../../assets/images/sign.png';

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex bg-white font-montserrat">
            {/* Left Side - Image/Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#FDF4FF] relative overflow-hidden items-end justify-center">
                {/* Background Decoration if needed */}
                <div className="absolute inset-0 bg-[#FDF4FF]"></div>

                <div className="relative z-10 w-full max-w-lg">
                    {/* We use a collaborative/student image here. 'choose1.png' is a placeholder. 
                In a real scenario, we would match the exact image of the lady with tablet. 
                For now, we center the image available. 
            */}
                    <div className="relative w-full aspect-[2/3] max-h-[100vh]">
                        <Image
                            src={ladyImage}
                            alt="Sign Up Hero"
                            fill
                            className="object-contain object-bottom"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16 overflow-y-auto">
                <SignUpForm />
            </div>
        </div>
    );
}
