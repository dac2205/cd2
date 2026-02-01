export const ADMIN_EMAIL = 'dac2205@gmail.com';

/**
 * Check if a user has access to a protected section
 * @param userEmail - The email of the current user
 * @param section - The section being accessed (jtbd, audience, insights, quiz)
 * @returns true if user has access, false otherwise
 */
export function canAccessProtectedSection(
    userEmail: string | undefined,
    section: string
): boolean {
    const protectedSections = ['audience'];

    // Public sections are always accessible
    if (!protectedSections.includes(section)) {
        return true;
    }

    // Protected sections require admin email
    return userEmail === ADMIN_EMAIL;
}
