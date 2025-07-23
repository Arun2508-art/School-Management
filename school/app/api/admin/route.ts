import connectMongoDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (request: NextRequest) => {
  try {
    const id = request.nextUrl.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }
    await connectMongoDB();
    const deletedAdmin = await Admin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    return NextResponse.json({ Message: 'Admin deleted' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
