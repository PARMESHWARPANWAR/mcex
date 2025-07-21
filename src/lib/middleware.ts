import { NextRequest } from 'next/server';
import { verifyToken } from './auth';

export const getUserFromToken = (request: NextRequest): string | null => {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    return decoded.userId;
  } catch (error) {
    return null;
  }
};