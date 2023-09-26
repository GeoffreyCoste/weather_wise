import { NextResponse } from "next/server";

export const GET = async (request: Request, {params}: {params: {id: string}}) => {

    const url = new URL(`${process.env.TELEPORT_API_URL}/cities/geonameid%3A${params.id}/`);

    const response = await fetch(url);
    const data = await response.json();
    
    return NextResponse.json(data);
};