import React, { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    isLoading?: boolean;
    fullWidth?: boolean;
}

export default function Button({
                                   children,
                                   className = '',
                                   variant = 'primary',
                                   isLoading = false,
                                   fullWidth = false,
                                   disabled,
                                   ...props
                               }: ButtonProps) {

    const baseStyles = "inline-flex items-center justify-center rounded-lg font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
        primary: "bg-[#81b64c] text-white hover:bg-[#a3d160] focus:ring-[#81b64c]",
        secondary: "bg-[#4b4845] text-white hover:bg-[#605d5a] focus:ring-[#4b4845]",
        outline: "border-2 border-[#81b64c] text-[#81b64c] hover:bg-[#81b64c] hover:text-white",
        ghost: "bg-transparent text-zinc-400 hover:text-white hover:bg-white/10"
    };

    const widthClass = fullWidth ? 'w-full py-3 text-lg' : 'px-6 py-2';

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {children}
        </button>
    );
}