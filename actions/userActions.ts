'use server'

import { revalidatePath } from 'next/cache'
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { User } from "@prisma/client"
import { City } from '@prisma/client'
import { mapDataPropsToFilters } from '@/utils/mapDataPropsToFilters'

type GetUserCitiesFavourites = {
  userId: string;
  locale: string | string[] | undefined;
  take: number;
  skip: number;
  order: string | string[] | undefined;
  filter: string | undefined;
}

const PAGE_SIZE = 8;

export type GetUserCitiesFavouritesType = typeof getUserCitiesFavourites;

export const getUserCitiesFavourites = async ({userId, locale, take = PAGE_SIZE, skip = 0, order, filter = ''}: GetUserCitiesFavourites) => {
    let continents: any[] = [];
    let countries: any[] = [];

    if (filter.length) {
        const regex = /^co/;
        const filters = filter.split('%');

        filters.forEach(item => {
            if(regex.test(item)) {
                let key = `${locale === "fr" ? "countryIndexFr" : "countryIndexEn"}`;
                let value = item.split('co')[1];
                let obj = {[key]: value};
                countries.push(obj)
            } else {
                let key = `${locale === "fr" ? "continentIndexFr" : "continentIndexEn"}`;
                let value = item.split('c')[1];
                let obj = {[key]: value};
                continents.push(obj);
            }
        });
    }

    // Find all documents inside 'City' collection with 'userId'
    // Get only nth documents (i.e. represented by the 'take' param)
    // Sort by city 'nameFr' or 'nameEn' subject to current locale (i.e. default value: 'asc')
    // Filter by continent or country 'Fr' or 'En' index if need be
    const favourites: City[] = await prisma.city.findMany({
          take,
          skip,
          where: {
              userId: userId,
              OR: filter.length ? [...(countries.length ? countries : continents.length ? continents : [])] : undefined,
          },
          // Include also user infos 
          /* include: {
              user: true
          }, */
          orderBy: {
              ...(locale === "fr" ? {nameFr: order} : {nameEn: order})
          } as any
    });

    // Get total number of documents inside 'City' collection with 'userId'
    const total = await prisma.city.count({
        where: {
            userId: userId
        }
    });

    const favouritesFilters = await prisma.city.findMany({
        where: {
            userId: userId
        },
        select: {
            ...(locale === "fr" ? {continentIndexFr: true, countryIndexFr: true} : {continentIndexEn: true, countryIndexEn: true})
        }
    });

    revalidatePath(`/${locale}/user/dashboard/favourites`);

    return {
        favourites: favourites,
        filters: mapDataPropsToFilters({arr: favouritesFilters, prop: `${locale === "fr" ? 'countryIndexFr' : 'countryIndexEn'}`}),
        metadata: {
            hasNextPage: skip + take < total,
            totalPages: Math.ceil(total / take), // Round result to next higher integer value to reserve one extra page for remaining data
            order
        }
    };
};

export const getUserLocationId = async (email: string) => {

    try {
        const user: User | null = await prisma.user.findFirst({
        where: { email: email }
        });

        let locationId: string = "";

        if (user) {
        locationId = user.location;
        }

        return locationId;
    } catch (error) {
        console.log(error);
    }
};

export const findUserById = async (userId: string) => {

    try {
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        });

        return user;

    } catch (error) {
        console.log(error);
    }
}

export const updateUserImage = async (userId: string | undefined, imageUrl: string) => {

    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
              image: imageUrl
            }
        });

        return updatedUser.image;

    } catch(error) {
        throw ({message: 'User image update failed'})
    }
}

export const updateUserPassword = async (userId: string, newPassword: string) => {

    try {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: await bcrypt.hash(newPassword, 10)
            }
        });
    } catch (error) {
        throw ('User password update failed')
    }
};

export const deleteUserAccount = async (userId: string) => {
    
    try {
        await prisma.user.delete({
            where: {
                id: userId
            }
        });
    } catch (error) {
        throw ({message: 'User account deletion failed'})
    }
}