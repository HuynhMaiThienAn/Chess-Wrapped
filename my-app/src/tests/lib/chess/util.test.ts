import { describe, it, expect } from 'vitest';
import {
    parseUsernameFromUrl,
    getPgnTag,
    getOpeningFromPGN,
    normalizeAvatar,
    calculateWinRate
} from '@/lib/chess/util';

describe('Chess Utils', () => {

    describe('parseUsernameFromUrl', () => {
        it('should return username from valid URL', () => {
            expect(parseUsernameFromUrl('https://api.chess.com/pub/player/magnus', 'fallback')).toBe('magnus');
        });

        it('should return fallback if URL is empty', () => {
            expect(parseUsernameFromUrl(undefined, 'fallback')).toBe('fallback');
            expect(parseUsernameFromUrl('', 'fallback')).toBe('fallback');
        });
    });

    describe('getPgnTag', () => {
        const pgn = '[Event "Live Chess"][Site "Chess.com"][Date "2025.01.01"]';

        it('should return tag value if present', () => {
            expect(getPgnTag(pgn, 'Event')).toBe('Live Chess');
            expect(getPgnTag(pgn, 'Date')).toBe('2025.01.01');
        });

        it('should return null if not found', () => {
            expect(getPgnTag(pgn, 'White')).toBeNull();
        });

        it('should return null if PGN is empty', () => {
            expect(getPgnTag(undefined, 'Event')).toBeNull();
        });
    });

    describe('getOpeningFromPGN', () => {
        const pgnWithECOUrl = '[ECOUrl "https://www.chess.com/openings/Sicilian-Defense-Najdorf-Variation-6.Bg5-e6-7.f4-Be7-8.Qf3-Qc7-9.O-O-O-Nbd7"]';
        const pgnWithOpeningTag = '[Opening "Sicilian Defense: Najdorf Variation"]';
        const pgnComplex = '[Opening "Queen\'s Pawn Game: London System, 2...c5 3.e3 Nc6 4.Nf3"]';

        it('should extract from ECOUrl', () => {
            expect(getOpeningFromPGN(pgnWithECOUrl)).toBe('Sicilian Defense Najdorf');
        });

        it('should extract from Opening tag if ECOUrl missing', () => {
            expect(getOpeningFromPGN(pgnWithOpeningTag)).toBe('Sicilian Defense Najdorf'); // "Variation" is stripped by util
        });

        it('should clean up complex opening names', () => {
            expect(getOpeningFromPGN(pgnComplex)).toBe("Queen's Pawn Game London System");
        });

        it('should return Unknown if nothing found', () => {
            expect(getOpeningFromPGN('')).toBe('Unknown');
        });
    });

    describe('normalizeAvatar', () => {
        it('should return URL if provided', () => {
            expect(normalizeAvatar('http://example.com/pic.jpg')).toBe('http://example.com/pic.jpg');
        });

        it('should return default if undefined or empty', () => {
            expect(normalizeAvatar(undefined)).toContain('user-image.svg');
            expect(normalizeAvatar('')).toContain('user-image.svg'); // Assuming function handles empty string same as undefined, checking implementation
        });
    });

    describe('calculateWinRate', () => {
        it('should calculate correct percentage', () => {
            expect(calculateWinRate(5, 10)).toBe(50);
            expect(calculateWinRate(1, 4)).toBe(25);
        });

        it('should handle zero total', () => {
            expect(calculateWinRate(5, 0)).toBe(0);
        });

        it('should round correctly', () => {
            expect(calculateWinRate(1, 3)).toBe(33); // 33.333 -> 33
        });
    });

});
