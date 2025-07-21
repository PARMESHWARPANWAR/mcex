import jwt from 'jsonwebtoken';
import { IUser } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

export const generateToken = (user: IUser): string => {
  return jwt.sign(
    { 
      userId: user._id, 
      email: user.email, 
      username: user.username 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};