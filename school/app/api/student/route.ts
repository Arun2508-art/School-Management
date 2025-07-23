import connectMongoDB from '@/lib/mongodb';
import Student from '@/models/Student';
import { StudentsProps } from '@/store/Slices/Student';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const student: StudentsProps = await request.json();
    await connectMongoDB();

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

export const GET = async () => {
  try {
    await connectMongoDB();
    const students = await Student.find()
      .populate({ path: 'user', select: 'name email' })
      .populate({
        path: 'class',
        select: 'name'
      });
    return NextResponse.json(
      { students, message: 'Successfully fecthed' },
      {
        status: 200
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
};

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  const deletedStudent = await Student.findByIdAndDelete(id);
  return NextResponse.json(
    { message: 'Student deleted', deletedStudent },
    { status: 200 }
  );
}
