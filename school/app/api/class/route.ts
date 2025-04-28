import connectMongoDB from '@/lib/mongodb';
import Class from '@/models/classes';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { standard, capacity, grade, supervisor } = await request.json();
    await connectMongoDB();
    await Class.create({ standard, capacity, grade, supervisor });
    return NextResponse.json({ message: 'Class Added' }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Server Error ' }, { status: 500 });
  }
}

export async function GET() {
  await connectMongoDB();
  const students = await Class.find();
  return NextResponse.json({ students });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  await Class.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Topic deleted' }, { status: 200 });
}
