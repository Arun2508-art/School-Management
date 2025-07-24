import connectMongoDB from '@/lib/mongodb';
import Class from '@/models/Class';
import Student from '@/models/Student';
import Teacher from '@/models/Teacher';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, capacity, supervisor } = await request.json();
    await connectMongoDB();
    const newStandard = await Class.create({
      name,
      capacity,
      supervisor
    });
    return NextResponse.json(
      { message: 'Class Added', data: newStandard },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Server Error ' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const standard = await Class.find();
    return NextResponse.json({ standard });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Servar Error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing id parameter' },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const data = await Class.findByIdAndDelete(id);

    if (!data) {
      return NextResponse.json(
        { message: 'Class not found ' },
        { status: 404 }
      );
    }

    const objectId = new mongoose.Types.ObjectId(id);

    // Update all students assigned to this class and remove the reference
    await Student.updateMany(
      { class: objectId },
      { $unset: { class: '' } } // sets `class` field to undefined / removes it
    );

    await Teacher.updateMany(
      { classes: objectId },
      { $pull: { classes: objectId } }
    );

    return NextResponse.json(
      { message: 'Standard deleted', data },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Standard not deleted' },
      { status: 500 }
    );
  }
}
