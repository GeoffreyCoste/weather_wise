import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    const lat = request.nextUrl.searchParams.get('lat');
    const lon = request.nextUrl.searchParams.get('lon');
    

    const url = new URL(`${process.env.TELEPORT_API_URL}/locations/${lat}%2C${lon}/`);

    const response = await fetch(url);
    const data = await response.json();
    
    return NextResponse.json(data);
};