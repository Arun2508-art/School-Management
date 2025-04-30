import connectMongoDB from '@/lib/mongodb';
import Teacher from '@/models/teacher';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  try {
    const value = await request.json();
    await connectMongoDB();
    const newTeacher = await Teacher.create(value);
    return NextResponse.json(
      { newTeacher, message: 'Teacher Added Successfully', status: 201 },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const GET = async () => {
  try {
    await connectMongoDB();
    const data = await Teacher.find();
    return NextResponse.json(
      { data, message: 'Successfully fecth' },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
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
    const deletedTeacher = await Teacher.findByIdAndDelete(id);
    if (!deletedTeacher) {
      return NextResponse.json(
        { message: 'Teacher Not Found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Deleted Teacher Sucessfully', deletedTeacher },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
};

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*', // or your domain
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
