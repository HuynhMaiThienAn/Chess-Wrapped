'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import type { generateWrappedStats } from '@/lib/chess';
export type WrappedData = Awaited<ReturnType<typeof generateWrappedStats>>;

interface ChessContextType {
    stats: WrappedData | null;
}

const ChessContext = createContext<ChessContextType | null>(null);

export const ChessProvider: React.FC<{ children: ReactNode; stats: WrappedData }> = ({children, stats}) => {
    return (
        <ChessContext.Provider value={{ stats }}>
            {children}
        </ChessContext.Provider>
    );
};

export const useChessStats = () => {
    const context = useContext(ChessContext);
    if (!context) throw new Error("useChessStats should be used within ChessProvider"); // it should be
    return context;
};