import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const duplicate = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    });

    if (!duplicate) {
      const user = await prisma.user.create({
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          password: await bcrypt.hash(body.password, 10),
        },
      });
    
      const { password, ...rest } = user;
      return NextResponse.json(rest);
    } else {
      throw ({message: 'form.input_email_errors.not_unique', field: "email"});
    }
  
  } catch(err) {
    return NextResponse.json({err}, {status: 400});
  }
}