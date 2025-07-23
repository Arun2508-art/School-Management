import connectMongoDB from '@/lib/mongodb';
import Parent from '@/models/Parent';
import { ParentsProps } from '@/store/Slices/ParentSlice';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const parent: ParentsProps = await request.json();
    await connectMongoDB();

    const newParent = await Parent.create(parent);
    return NextResponse.json(
      { message: 'Parent Added', newParent, status: 201 },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Server Error ' }, { status: 500 });
  }
}

export async function GET() {
  await connectMongoDB();
  const parents = await Parent.find().populate('user');
  return NextResponse.json({ parents }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  const deletedParent = await Parent.findByIdAndDelete(id);
  return NextResponse.json(
    { message: 'Parent deleted', deletedParent },
    { status: 200 }
  );
}
