import jwt from 'jsonwebtoken'

export function decodeJwtTokenExp(token: string) {
  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload | null;

    if (!decoded) {
      throw new Error('Invalid token');
    }

    return decoded.exp;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}