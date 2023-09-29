import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

export async function POST(request: Request) {
  // get passwords from payload
  const body = await request.json();
  const { newPassword, newPasswordConfirm } = body;


  const userId = cookies().get('user_id')?.value;

  if (userId && newPassword && newPasswordConfirm && (newPassword === newPasswordConfirm)) {
    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            password: await bcrypt.hash(body.password, 10),
        }
    });
    return NextResponse.json({
        redirect: '/login',
        message: 'success_reset_password'
    });
  }

  // get user_id from session
  /* const user_id = getSession(request, 'user_id')
  // update the user
  if (user_id && newPassword && newPasswordConfirm && (newPassword === newPasswordConfirm)) {
    await updatePassword(user_id, newPassword)
    return NextResponse.json({
      redirect: '/',
      message: 'Your password has been reset 👍'
    })
  }
  else {
    // password don't match
    return NextResponse.json({
      error: 'Your passwords must match'
    })
  } */
}