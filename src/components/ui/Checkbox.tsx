import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className = '', label, ...props }, ref) => {
        return (
            <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative flex items-center">
                    <input
                        type="checkbox"
                        ref={ref}
                        className="peer sr-only"
                        {...props}
                    />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded bg-white peer-checked:bg-purple-600 peer-checked:border-purple-600 transition-colors"></div>
                    <svg
                        className="absolute w-3.5 h-3.5 text-white left-0.5 top-0.5 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 select-none">
                    {label}
                </span>
            </label>
        );
    }
);

Checkbox.displayName = 'Checkbox';
