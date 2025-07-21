import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';
import { AuthResponse, CreateUserData } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    await dbConnect();
    const userData: CreateUserData = await request.json();
    
    // Validate required fields
    if (!userData.email || !userData.username || !userData.password) {
      return NextResponse.json(
        { success: false, error: 'Email, username, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: userData.email.toLowerCase() },
        { username: userData.username }
      ]
    });

    if (existingUser) {
      const field = existingUser.email === userData.email.toLowerCase() ? 'email' : 'username';
      return NextResponse.json(
        { success: false, error: `User with this ${field} already exists` },
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create(userData);
    const token = generateToken(user);

    // Return user without password
    const userResponse = {
      _id: user._id.toString(),
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json(
      { success: true, user: userResponse, token },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Registration failed';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}