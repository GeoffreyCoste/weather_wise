import { NextResponse } from "next/server";

export const GET = async (request: Request, {params}: {params: {id: string}}) => {
    try {
        const url = new URL(`${process.env.GEONAMES_API_URL}/getJSON?geonameId=${params.id}&lang=fr&username=${process.env.GEONAMES_API_TOKEN}`);
    
        const response = await fetch(url);
        const data = await response.json();

        if (data) {
            return NextResponse.json(data);
        } else {
            throw ({message: 'City data not available'});
        }
        
    } catch(err) {
        return NextResponse.json({err}, {status: 404});
    }

};