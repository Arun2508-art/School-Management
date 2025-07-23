import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const cookiesData = cookies();
  const role = (await cookiesData).get('jwt');
  if (role) {
    (await cookiesData).delete('jwt');
  } else {
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true });
};
