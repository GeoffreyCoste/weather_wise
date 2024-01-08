import { NextResponse } from "next/server"
import { createCity } from "@/actions/cityActions"

export const POST = async (request: Request, {params}: {params: {userId: string}}) => {
  try {
    const body = await request.json();
    const userId = params.userId;
    const city = {
      geonameId: body.geonameId,
      nameFr: body.nameFr,
      nameEn: body.nameEn,
      countryId: body.countryId,
      countryCode: body.countryCode,
      countryIndexFr: body.countryIndexFr,
      countryIndexEn: body.countryIndexEn,
      continentCode: body.continentCode,
      continentIndexFr: body.continentIndexFr,
      continentIndexEn: body.continentIndexEn,
      timezone: body.timezone,
      latitude: body.latitude,
      longitude: body.longitude,
      userId: userId,
    }

    if (userId) {
      await createCity(userId, city);
      return NextResponse.json({status: 200, message: 'City added to favourites'});
      
    } else {
      throw ({message: 'Add city to favourites failed'});
    };

  } catch(err) {
    return NextResponse.json({err}, {status: 400});
  }
}