import { NextResponse } from "next/server";

export const GET = async (request: Request, {params}: {params: {id: string}}) => {
    try {
        const url = new URL(`${process.env.TELEPORT_API_URL}/countries/iso_alpha2%3A${params.id}/`);
    
        const response = await fetch(url);
        const data = await response.json();

        if (data) {
            return NextResponse.json(data);
        } else {
            throw ({message: 'Country data not available'});
        }
        
    } catch(err) {
        return NextResponse.json({err}, {status: 404});
    }
};