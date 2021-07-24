
const JWT_KEY = 'jwt';

export const getJwt = (): string | null => localStorage.getItem(JWT_KEY);
