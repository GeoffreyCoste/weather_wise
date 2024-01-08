import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export const PATCH = async (request: Request, {params}: {params: {userId: string}}) => {
  try {
    
    const userId = params.userId;
    const body = await request.json();

    console.log(body);

    if (userId) {
      const user = await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          location: body.location,
        }
      })

      return NextResponse.json({status: 200, message: "User profile successfully updated"});
      
    } else {
      throw ({message: 'User profile update failed'});
    };
  } catch(err) {
    return NextResponse.json({err}, {status: 400});
  }
}