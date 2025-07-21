import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';
import { AuthResponse, LoginData } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    await dbConnect();
    const loginData: LoginData = await request.json();
    
    // Validate required fields
    if (!loginData.email || !loginData.password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email: loginData.email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(loginData.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate token
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
      { success: true, user: userResponse, token }
    );
  } catch (error) {
    console.error('Login error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Login failed';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}
