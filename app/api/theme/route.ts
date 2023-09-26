import {NextResponse} from 'next/server';

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export const POST = async (request: Request) => {
    const {theme} = await request.json();

    return NextResponse.json(
        {theme: theme},
        {
            headers : {
                "Set-Cookie": `theme=${theme}; Max-Age=${ONE_YEAR_IN_SECONDS}; Path=/`
            }
        }
    )
};