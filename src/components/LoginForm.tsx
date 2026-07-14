"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import Image from 'next/image';
import logo from '@/assets/images/logo.png'; // Assuming logo exists here based on user's SignUpForm change, otherwise will need to fix path

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // TODO: replace with real auth call
      await new Promise((r) => setTimeout(r, 1000));
      // Mock successful login
      router.push('/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8">
        <div className="flex flex-col items-center mb-4">
          {/* Logo Placeholder - using same svg pattern if image fails or use the image if available */}
          {/* Note: In SignUpForm user used 'logo.png', trying to use that. If not available, fallback to svg */}
          <div className="flex flex-col items-center mb-6">
            <Image
              src={logo}
              alt="Logo"
              width={140}
              height={80}
              className="object-contain mb-4"
              priority
            />
            <p className="text-gray-500 text-xs text-center">
              Unlock your potential with premium mentorship and learning experiences designed for aspiring and entry-level Product managers.
            </p>
          </div>
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-1">Welcome Back</h1>
        <p className="text-gray-500 text-xs">Sign in to continue your learning journey</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <div className="text-red-600 text-xs text-center bg-red-50 p-2 rounded">{error}</div>}

        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div>
          <Input
            label="Password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex justify-end mt-1">
            <Link href="/forgot-password" className="text-xs text-[#6b21a8] hover:underline">
              Forget password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full mt-4"
          disabled={loading}
        >
          {loading ? 'Logging In...' : 'Log In'}
        </Button>

        <p className="text-center text-xs text-gray-900 mt-6">
          Dont have an account <Link href="/signup" className="text-[#6b21a8] font-medium hover:underline">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
