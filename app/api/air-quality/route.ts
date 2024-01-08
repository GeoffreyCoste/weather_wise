import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
    try {
        const lat = request.nextUrl.searchParams.get('lat');
        const lon = request.nextUrl.searchParams.get('lon');
        const tz = request.nextUrl.searchParams.get('tz');

        const url = new URL(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&timezone=${tz}&current=european_aqi,pm10,pm2_5&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,dust,ammonia,alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen,european_aqi&forecast_days=7`);

        const response = await fetch(url);
        const data = await response.json();

        if (data) {
            return NextResponse.json(data);
        } else {
            throw ({message: 'Air quality data not available'});
        }
    } catch(err) {
        return NextResponse.json({err}, {status: 404});
    }
};