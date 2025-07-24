import connectMongoDB from '@/lib/mongodb';
import Subject from '@/models/Subject';
import Teacher from '@/models/Teacher';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  try {
    const { name, teacher } = await request.json();
    await connectMongoDB();
    const newSubject = await Subject.create({ name, teacher });
    return NextResponse.json(
      { newSubject, message: 'Subject Added Successfully' },
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

    const objectId = new mongoose.Types.ObjectId(id);

    await Teacher.updateMany(
      { subjects: objectId },
      { $pull: { subjects: objectId } }
    );

    return NextResponse.json(
      { message: 'Deleted Subject Sucessfully', deleteSubject },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
};
