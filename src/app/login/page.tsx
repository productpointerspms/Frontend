"use client";
import dynamic from 'next/dynamic';
import Image from 'next/image';
import loginImage from '../../assets/images/login.png'; // Placeholder for the lady with glasses

const LoginForm = dynamic(() => import('../../components/LoginForm'), { ssr: false });

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-white font-montserrat">
      {/* Left Side - Image/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#FDF4FF] relative overflow-hidden items-end justify-center">
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-[#FDF4FF]"></div>

        <div className="relative z-10 w-full max-w-lg">
          {/* Using aspect ratio similar to Sign Up page */}
          <div className="relative w-full aspect-[2/3] max-h-[100vh]">
            <Image
              src={loginImage}
              alt="Login Hero"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16 overflow-y-auto">
        <LoginForm />
      </div>
    </div>
  );
}
