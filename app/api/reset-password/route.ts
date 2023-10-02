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
            password: await bcrypt.hash(body.newPassword, 10),
        }
    });
    return NextResponse.json({
        redirect: '/login',
        message: 'success_reset_password'
    });
  } else {
    return NextResponse.json({
      error: 'error_reset_password'
    });
  }
}