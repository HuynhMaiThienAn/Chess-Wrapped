/**
 * Normalizes an avatar URL, providing a default if none exists.
 */
export function normalizeAvatar(url: string | undefined): string {
    return url || 'https://www.chess.com/bundles/web/images/user-image.svg';
}
