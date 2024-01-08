import { NextResponse } from 'next/server'
import { deleteUserAccount } from '@/actions/userActions'

export async function DELETE(request: Request, {params}: {params: {userId: string}}) {

  try {

    const userId = params.userId;

    if (userId) {

      await deleteUserAccount(userId);

      return NextResponse.json({status: 200});

    } else {
      throw ({message: 'error_delete_account'})
    }
  } catch (error) {
    return NextResponse.json({status: 400, error});
  }
}