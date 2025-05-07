import { generateToken } from '@/lib/jwt';
import connectMongoDB from '@/lib/mongodb';
import Admin from '@/models/admin';
import Parent from '@/models/parent';
import Student from '@/models/student';
import Teacher from '@/models/teacher';
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

    let user = null;

    const collections = [
      { model: Admin, role: 'admin' },
      { model: Parent, role: 'parent' },
      { model: Teacher, role: 'teacher' },
      { model: Student, role: 'student' }
    ];

    for (const { model } of collections) {
      user = await model.findOne({ email });
      if (user) break;
    }

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Password Invalid' },
        { status: 401 }
      );
    }

    const token = await generateToken(user._id.toString(), user.role);

    const res = NextResponse.json({
      id: user._id,
      role: user.role,
      name: user.name
    });

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
