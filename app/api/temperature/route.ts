import {NextResponse} from 'next/server';

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export const POST = async (request: Request) => {
    const {temperature} = await request.json();

    return NextResponse.json(
        {temperature: temperature},
        {
            headers : {
                "Set-Cookie": `temperature=${temperature}; Max-Age=${ONE_YEAR_IN_SECONDS}; Path=/`
            }
        }
    )
};