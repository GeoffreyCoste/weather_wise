'use server'

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { CityData } from "@/@types/api-datas"

type GetCitiesByUserId = {
    id: string | undefined;
    locale: string | string[] | undefined;
}

const order = 'asc';

export const getCitiesByUserId = async ({id, locale}: GetCitiesByUserId) => {
    try {
        const cities = await prisma.city.findMany({
            where: {
                userId: id
            },
            orderBy:  {
                ...(locale === "fr" ? {nameFr: order} : {nameEn: order})
            } as any
        });
        return cities;
    } catch (error) {
        throw ({message: 'No cities found with user id'});
    }
};

export const createCity = async (userId: string, city: CityData) => {
    try {

        const duplicate = await prisma.city.findFirst({
            where: {
                geonameId: city.geonameId,
                userId: userId
            }
        })
        
        if (!duplicate) {
            await prisma.city.create({
                data: {
                    geonameId: city.geonameId,
                    nameFr: city.nameFr,
                    nameEn: city.nameEn,
                    countryId: city.countryId,
                    countryCode: city.countryCode,
                    countryIndexFr: city.countryIndexFr,
                    countryIndexEn: city.countryIndexEn,
                    continentCode: city.continentCode,
                    continentIndexFr: city.continentIndexFr,
                    continentIndexEn: city.continentIndexEn,
                    timezone: city.timezone,
                    latitude: city.latitude,
                    longitude: city.longitude,
                    userId: userId,
                  }
            });
        }
    } catch(error) {
        throw ({message: 'Add city to favourites failed'});
    }
}

export const deleteCity = async (userId: string, geonameId: string) => {
    try {
        const city = await prisma.city.findFirst({
            where: {
                geonameId: geonameId,
                userId: userId
            }
        });
        
        if (city) {
            await prisma.city.delete({
              where: {
                id: city?.id,
                userId: userId
              }
            });
            revalidatePath('/user/dashboard/favourites');
        } 
    } catch (error) {
        throw ({message: 'Delete city from favourites failed'});
    }
}