import Admin from '@/models/admin';
import Parent from '@/models/parent';
import Student from '@/models/student';
import Teacher from '@/models/teacher';
import { NextRequest, NextResponse } from 'next/server';

export const Login = async (req: NextRequest) => {
  try {
    const { email } = await req.json();
    let admin = null;

    const collections = [
      { model: Admin, role: 'admin' },
      { model: Parent, role: 'parent' },
      { model: Teacher, role: 'teacher' },
      { model: Student, role: 'student' }
    ];

    for (const { model } of collections) {
      admin = await model.findOne({ email });
      if (admin) break;
    }

    if (!admin)
      return NextResponse.json({ error: 'User not found' }, { status: 401 });

    return NextResponse.json({
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
        name: admin.name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
