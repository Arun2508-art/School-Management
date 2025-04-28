import connectMongoDB from '@/lib/mongodb';
import Admin from '@/models/admin';
import Parent from '@/models/parent';
import Student from '@/models/student';
import Teacher from '@/models/teacher';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();
    await connectMongoDB();

    let user = null;
    console.log(email);

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

    if (!user)
      return NextResponse.json({ error: 'User not found' }, { status: 401 });

    return NextResponse.json({
      id: user._id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
