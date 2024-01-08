import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    const lat = request.nextUrl.searchParams.get('lat');
    const lon = request.nextUrl.searchParams.get('lon');
    const tz = request.nextUrl.searchParams.get('tz');

    const url = new URL(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=${tz}&current=temperature_2m,apparent_temperature,is_day,weathercode,relativehumidity_2m,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,windspeed_10m_max,winddirection_10m_dominant&hourly=temperature_2m,apparent_temperature,windspeed_10m,precipitation,precipitation_probability,is_day,weathercode`);
    
    const response = await fetch(url);
    const data = await response.json();
    
    return NextResponse.json(data);
};