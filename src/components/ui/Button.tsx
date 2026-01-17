import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', children, ...props }, ref) => {
        const baseStyles = "w-full px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

        const variants = {
            primary: "bg-[#6b21a8] hover:bg-[#581c87] text-white focus:ring-purple-500", // Dark purple matching the "Sign Up" button
            secondary: "bg-purple-100 text-purple-900 hover:bg-purple-200 focus:ring-purple-500",
            outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700"
        };

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
