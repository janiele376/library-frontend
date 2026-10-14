export interface TokenPayload {
  sub: string;
  isAdmin: boolean;
  exp: number;
}

export function decodeToken(token: string): TokenPayload | null {
  try {
    const payload = token.split('.')[1];

    if (!payload) return null;

    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');

    const decoded = JSON.parse(atob(base64)) as TokenPayload;

    if (typeof decoded.isAdmin !== 'boolean' || typeof decoded.exp !== 'number') {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeToken(token);

  if (!payload) return true;

  return Date.now() >= payload.exp * 1000;
}
