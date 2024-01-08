import {NextResponse} from 'next/server';

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export const POST = async (request: Request) => {
    const {windspeed} = await request.json();

    return NextResponse.json(
        {windspeed: windspeed},
        {
            headers : {
                "Set-Cookie": `windspeed=${windspeed}; Max-Age=${ONE_YEAR_IN_SECONDS}; Path=/`
            }
        }
    )
};