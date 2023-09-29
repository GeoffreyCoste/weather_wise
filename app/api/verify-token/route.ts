import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
import prisma from "@/lib/prisma";
import moment from 'moment';
import { kv } from '@vercel/kv'
import User from '../../models/users'
import { getSession, setSession } from '../../session'

export async function POST(request: Request) {
  // get token from form payload
  const body = await request.json();
  const { token } = body;

  // TODO: How to compare token in request with user in database?
  const userId = NextResponse.next().cookies.get('user_id');

  /* const userId = cookies().get('user_id'); */

  const user = await prisma.user.findFirst({
    where: {
      id: userId
    }
  });

  console.log('user:', user);
  console.log('userId:', userId);
  console.log('token:', token);

  if (userId && token && user && (token === user?.passwordToken) && (moment() < moment(user?.passwordTokenExpiry))) {
    const response = NextResponse.json({
      redirect: '/new-password'
    });
    return response;
  } else {
    return NextResponse.json({
      error: 'error_invalid_token'
    });
  }




  // get user_id from session
  /* const userId = getSession(request, 'user_id');
  const storedToken = "" + await kv.get(`${userId}:reset`); // ensure the token is of type string
  if (userId && token && (token === storedToken)) {
    // redirect to reset password page
    const response = NextResponse.json({
      redirect: '/new-password'
    })
    setSession(response, 'authenticated', true)
    return response
  }
  else {
    // redirect and display error
    return NextResponse.json({
      error: 'Token did not match, please try again?'
    })
  } */
}