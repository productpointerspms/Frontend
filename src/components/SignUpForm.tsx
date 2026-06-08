"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { Checkbox } from './ui/Checkbox';
import Image from 'next/image';
import logo from '@/assets/images/logo.png';

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        track: '',
        agreeToTerms: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Basic Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (!formData.agreeToTerms) {
            setError("You must agree to the terms and privacy policy");
            return;
        }

        setLoading(true);

        try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Form submitted:', formData);
            // Redirect or show success (Mock)
            alert("Account created successfully!");
            // window.location.href = '/login'; 
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const trackOptions = [
        { value: 'pm', label: 'Product Management' },
        { value: 'design', label: 'Product Design' },
        { value: 'data', label: 'Data Science' },
        { value: 'engineering', label: 'Software Engineering' }
    ];

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="mb-8">
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
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h1>
                <p className="text-gray-500 text-xs">Join our community of thriving product managers</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs text-center">
                        {error}
                    </div>
                )}

                <Input
                    label="Full Name"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Create Password"
                    name="password"
                    type="password"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="********"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <Select
                    label="Select Program Track"
                    name="track"
                    options={trackOptions}
                    value={formData.track}
                    onChange={handleChange}
                    required
                />

                <div className="pt-2">
                    <Checkbox
                        label="I agree to all terms and privacy policy"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        required
                    />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </Button>

                <p className="text-center text-xs text-gray-600 mt-6">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[#6b21a8] font-medium hover:underline">
                        Log in
                    </Link>
                </p>
            </form>
        </div>
    );
}
