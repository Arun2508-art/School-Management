import connectMongoDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  try {
    await connectMongoDB();

    const { email, password, name, role } = await request.json();

    if (!name) {
      return NextResponse.json(
        { message: 'Please enter name' },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { message: 'Please enter email' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'email already registered' },
        { status: 409 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { message: 'Please enter password' },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const NewUser = await User.create({
      name,
      email,
      password: hashPassword,
      role
    });

    return NextResponse.json({ NewUser }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
};
