import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { CourierClient } from '@trycourier/courier'
import { kv } from '@vercel/kv'
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
          email: body.email,
          password: await bcrypt.hash(body.password, 10),
        },
      });

      /* const key = `users:${user.id}:${user.email}:${user.mobile}`; */
      /* const ex = 5 * 60; // Expire this record in 5 minutes */
      /* await kv.set(key, {user_id: key, ...user }, {ex}); */

      // Create the courier profile for this user
      await courier.mergeProfile({
        /* recipientId: key, */
        recipientId: user.id,
        profile: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          // Courier supports storing custom JSON data for Profiles
          custom: {
            preference: user.preference
          }
        }
      })
    
      const { password, ...rest } = user;

      // TODO: Setting cookie at this step or when reset token is requested?
      return NextResponse.json(rest/* , {
        headers: {
          "set-cookie": `user_id=${user.id}; Max-Age=300; Path=/`
        }
      } */);
    } else {
      throw ({message: 'form.input_email_errors.not_unique', field: "email"});
    }
  
  } catch(err) {
    return NextResponse.json({err}, {status: 400});
  }
}