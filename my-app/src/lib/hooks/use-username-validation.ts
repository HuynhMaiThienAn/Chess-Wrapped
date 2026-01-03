'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChessValidationService } from '@/lib/services/chess-validation-service';
import { useRateLimit } from './use-rate-limit';

interface UseUsernameValidationReturn {
    username: string;
    setUsername: (username: string) => void;
    isLoading: boolean;
    error: string | null;
    handleSubmit: () => Promise<void>;
    clearError: () => void;
}

export function useUsernameValidation(): UseUsernameValidationReturn {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Rate-limited validation (2 second cooldown, max 5 attempts)
    const rateLimitedValidate = useRateLimit(
        ChessValidationService.validateComplete,
        { delayMs: 2000, maxAttempts: 5 }
    );

    const handleSubmit = async () => {
        if (!username.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            const result = await rateLimitedValidate(username.trim());

            if (result.valid) {
                // Navigate to wrapped page
                router.push(`/wrapped/${encodeURIComponent(result.username!)}`);
            } else {
                // Show error
                setIsLoading(false);
                setError(result.error || 'Something went wrong');
            }
        } catch (error) {
            // Handle rate limit errors
            setIsLoading(false);
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Please wait before trying again');
            }
        }
    };

    const clearError = () => setError(null);

    return {
        username,
        setUsername,
        isLoading,
        error,
        handleSubmit,
        clearError,
    };
}
