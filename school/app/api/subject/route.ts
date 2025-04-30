import connectMongoDB from '@/lib/mongodb';
import Subject from '@/models/subject';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  try {
    const { subject, teacherName } = await request.json();
    await connectMongoDB();
    const data = await Subject.create({ subject, teacherName });
    return NextResponse.json(
      { data, message: 'Subject Added Successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
};

export const GET = async () => {
  try {
    await connectMongoDB();
    const data = await Subject.find();
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
    const deleteSubject = await Subject.findByIdAndDelete(id);
    if (!deleteSubject) {
      return NextResponse.json(
        { message: 'Subject Not Found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Deleted Subject Sucessfully', deleteSubject },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
};
