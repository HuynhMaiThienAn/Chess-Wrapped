'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { UserData } from '@/types'; // Use your shared type

interface ChessContextType {
    stats: UserData;
}

const ChessContext = createContext<ChessContextType | null>(null);

export const ChessProvider: React.FC<{ children: ReactNode; stats: UserData }> = ({ children, stats }) => {
    return (
        <ChessContext.Provider value={{ stats }}>
            {children}
        </ChessContext.Provider>
    );
};

export const useChessStats = () => {
    const context = useContext(ChessContext);
    if (!context) {
        throw new Error("useChessStats must be used within a ChessProvider");
    }
    return context;
};