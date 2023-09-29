import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { CourierClient } from '@trycourier/courier'
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from 'uuid'
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
    /* const token = uuidv4(); */
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

    /* NextResponse.next().cookies.set('user_id', user.id); */

    // redirect to enter token page
    /* return NextResponse.json({
      redirect: '/enter-token',
      preference
    }); */
  } else {
    // redirect and display error
    return NextResponse.json({
      error: 'error_invalid_value'
    });
  }
  
  /* if (user) {
    const { id, preference } = user;
    // generate reset token
    const token = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
    const ex = 5 * 60 // expire this record in 5 minutes
    // store in KV cache
    await kv.set(`${id}:reset`, token, { ex })
    // send notification
    await courier.send({
      message: {
        to: {
          id
        },
        template: process.env.COURIER_TEMPLATE,
        data: {
          token
        }
      }
    })

    // redirect to enter token page
    return NextResponse.json({
      redirect: '/enter-token',
      preference
    })
  }
  else {
    // redirect and display error
    return NextResponse.json({
      error: 'We could not locate a user with that email address or phone number'
    })
  } */
}