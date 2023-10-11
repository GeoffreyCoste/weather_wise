import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { CourierClient } from '@trycourier/courier'
import * as bcrypt from "bcrypt"

const courier = CourierClient({ authorizationToken: process.env.COURIER_AUTH_TOKEN});

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
          location: body.location,
          email: body.email,
          password: await bcrypt.hash(body.password, 10),
        },
      });

      // Create the courier profile for this user
      await courier.mergeProfile({
        recipientId: user.id,
        profile: {
          firstName: user.firstName,
          lastName: user.lastName,
          location: user.location,
          email: user.email,
          // Courier supports storing custom JSON data for Profiles
          custom: {
            preference: user.preference
          }
        }
      })
    
      const { password, ...rest } = user;
      return NextResponse.json(rest);
    } else {
      throw ({message: 'form.input_email_errors.not_unique', field: "email"});
    }
  
  } catch(err) {
    return NextResponse.json({err}, {status: 400});
  }
}