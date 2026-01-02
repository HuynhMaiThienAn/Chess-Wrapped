import React from 'react';
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
    size?: number;
    className?: string;
}

export default function Spinner({ size = 24, className = '' }: SpinnerProps) {
    return (
        <Loader2
            size={size}
            className={`animate-spin text-[#81b64c] ${className}`}
        />
    );
}