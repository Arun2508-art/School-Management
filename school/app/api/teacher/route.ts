import connectMongoDB from '@/lib/mongodb';
import Class from '@/models/Class';
import Subject from '@/models/Subject';
import Teacher from '@/models/Teacher';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  try {
    const value = await request.json();
    await connectMongoDB();
    const newTeacher = await Teacher.create(value);
    return NextResponse.json(
      { newTeacher, message: 'Teacher Added Successfully' },
      {
        status: 201
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const GET = async () => {
  try {
    await connectMongoDB();
    console.log(Class, Subject);
    const data = await Teacher.find()
      .populate('user')
      .populate('classes')
      .populate('subjects');

    return NextResponse.json(
      { data, message: 'Successfully fecth' },
      {
        status: 200
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ message: 'ID should not be NULL' });
    }
    await connectMongoDB();

    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return NextResponse.json(
        { message: 'Teacher Not Found' },
        { status: 404 }
      );
    }

    if (teacher.user) {
      await User.findByIdAndDelete(teacher.user);
    }

    const deletedTeacher = await Teacher.findByIdAndDelete(id);

    return NextResponse.json(
      { message: 'Teacher Deleted Sucessfully', deletedTeacher },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
};
