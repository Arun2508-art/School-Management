import connectMongoDB from '@/lib/mongodb';
import Class from '@/models/classes';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    await connectMongoDB();
    const item = await Class.findByIdAndDelete(id);
    if (!item) {
      return NextResponse.json({ message: 'Not Found' }, { status: 404 });
    }
    return NextResponse.json(
      { message: 'Standard deleted', data: item },
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
