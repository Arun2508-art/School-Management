import { generateToken } from '@/lib/jwt';
import connectMongoDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Please enter email' },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Invalid Password' },
        { status: 401 }
      );
    }

    const token = await generateToken(user._id.toString(), user.role);

    const res = NextResponse.json(
      {
        message: 'Login Successful',
        token,
        user
      },
      { status: 200 }
    );

    res.cookies.set({
      name: 'jwt',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60
    });

    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
