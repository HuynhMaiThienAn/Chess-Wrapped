import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

export default function Input({ className = '', error, ...props }: InputProps) {
    return (
        <input
            className={`
                w-full rounded-lg bg-[#262421] border-2 px-4 py-3 text-white placeholder-zinc-500 outline-none transition-all
                focus:border-[#81b64c] focus:ring-1 focus:ring-[#81b64c]
                ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-zinc-700'}
                ${className}
            `}
            {...props}
        />
    );
}