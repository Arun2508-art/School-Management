import connectMongoDB from '@/lib/mongodb';
import Student from '@/models/student';
import { StudentsProps } from '@/store/Slices/StudentSlice';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const student: StudentsProps = await request.json();
    await connectMongoDB();
    console.log(student);
    const newStudent = await Student.create(student);
    return NextResponse.json(
      { message: 'Student Added', newStudent, status: 201 },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Server Error ' }, { status: 500 });
  }
}

export async function GET() {
  await connectMongoDB();
  const students = await Student.find();
  return NextResponse.json({ students });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  const deletedStudent = await Student.findByIdAndDelete(id);
  return NextResponse.json(
    { message: 'Student deleted', deletedStudent },
    { status: 200 }
  );
}
