import { NextResponse } from 'next/server'
import * as bcrypt from "bcrypt"
import { findUserById, updateUserPassword } from '@/actions/userActions'

export async function PATCH(request: Request, {params}: {params: {userId: string}}) {

  try {
    // get passwords from payload
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    const userId = params.userId;

    if (userId && currentPassword && newPassword) {

      const user = await findUserById(userId);

      if (user && (await bcrypt.compare(currentPassword, user.password))) {
        await updateUserPassword(userId, newPassword);
        return NextResponse.json({
          status: 200,
          message: 'success_change_password'
        });
      } else {
        throw ({message: 'error_change_password'})
      }
  } else {
    throw ({message: 'error_change_password'})
  }
  } catch (error) {
    return NextResponse.json({status: 400, error});
  }
}