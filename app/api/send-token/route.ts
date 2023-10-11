import { NextResponse } from 'next/server'
import { CourierClient } from '@trycourier/courier'
import prisma from "@/lib/prisma";
import moment from 'moment';

const courier = CourierClient();

export async function POST(request: Request) {
  // get phone number and email from form payload
  const body = await request.json();
  const {email, mobile} = body;
  
  let user;
  // look up the user based on phone or email
  if (email) {
    user = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
  } else if (mobile) {
    user = await prisma.user.findFirst({
        where: {
            mobile: mobile,
        },
    });
  }
  else {
    // neither an email nor phone number was submitted, re-direct and display error
    return NextResponse.json({
      error: 'You must provide an email or phone number'
    })
  }

  if (user) {
    const token = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const expiry = moment().add(5, 'minutes').toDate();
    const {id, firstName, preference } = user;

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordToken: token,
        passwordTokenExpiry: expiry,
      }
    });

    await courier.send({
      message: {
        to: {
          email
        },
        template: process.env.COURIER_TEMPLATE,
        data: {
          firstName,
          token
        }
      }
    });

    return NextResponse.json(
      {
        redirect: '/enter-token',
        preference
      }, 
      {
        headers: {
          "set-cookie": `user_id=${id}; Max-Age=300; Path=/`
        }
    });
  } else {
    // redirect and display error
    return NextResponse.json({
      error: 'error_invalid_value'
    });
  }
}