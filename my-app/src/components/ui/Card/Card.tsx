import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    noPadding?: boolean;
}

export default function Card({
                                 children,
                                 className = '',
                                 noPadding = false,
                                 ...props
                             }: CardProps) {
    return (
        <div
            className={`
                relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md shadow-xl
                ${noPadding ? '' : 'p-6'} 
                ${className}
            `}
            {...props}
        >
            {children}
        </div>
    );
}