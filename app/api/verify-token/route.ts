import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
import prisma from "@/lib/prisma";
import moment from 'moment';

export async function POST(request: Request) {
  // get token from form payload
  const body = await request.json();
  const { token } = body;

  const userId = cookies().get('user_id')?.value;

  const user = await prisma.user.findFirst({
    where: {
      id: userId
    }
  });

  if (userId && token && (token === user?.passwordToken) && (moment() < moment(user?.passwordTokenExpiry))) {
    const response = NextResponse.json({
      redirect: '/new-password'
    });
    return response;
  } else {
    return NextResponse.json({
      error: 'error_invalid_token'
    });
  };
}