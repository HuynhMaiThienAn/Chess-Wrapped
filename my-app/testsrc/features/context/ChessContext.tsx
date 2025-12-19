'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { GameStats, User } from '../../types';

interface ChessContextValue {
    user: User;
    stats: GameStats;
}

const ChessContext = createContext<ChessContextValue | null>(null);

interface ChessProviderProps {
    children: ReactNode;
    user: User;
    stats: GameStats;
}

export function ChessProvider({ children, user, stats }: ChessProviderProps) {
    return (
        <ChessContext.Provider value={{ user, stats }}>
            {children}
        </ChessContext.Provider>
    );
}

export const useChessStats = () => {
    const context = useContext(ChessContext);
    if (!context) {
        throw new Error('useChessStats must be used within a ChessProvider');
    }
    return context;
};