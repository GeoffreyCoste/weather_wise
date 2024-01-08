import { NextResponse } from "next/server"
import { deleteCity } from "@/actions/cityActions"

export const DELETE = async (request: Request, {params}: {params: {userId: string, geonameId: string}}) => {
  try {
    
    const userId = params.userId;
    const geonameId = params.geonameId;

    if (userId && geonameId) {
      await deleteCity(userId, geonameId);
      return NextResponse.json({status: 200, message: "City successfully deleted from favourites"});
    } else {
      throw ({message: 'Delete city from favourites failed'});
    };

  } catch(err) {
    return NextResponse.json({err}, {status: 400});
  }
}