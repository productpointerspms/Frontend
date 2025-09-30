"use client";
import dynamic from 'next/dynamic';
const LoginForm = dynamic(() => import('../../../src/components/LoginForm'), { ssr: false });

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
        <LoginForm />
      </div>
    </div>
  );
}
