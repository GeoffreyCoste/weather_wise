import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { FavouritesList } from './FavouritesList'
import { FavouritesPageProps } from '@/app/[locale]/user/dashboard/favourites/page' 
import { Pagination } from '@/components/Pagination/Pagination'
import { getUserCitiesFavourites } from '@/actions/userActions'
import { FavouritesDropdownSort } from './FavouritesDropdownSort'
import { FavouritesDropdownFilters } from './FavouritesDropdownFilters'
import { revalidatePath } from "next/cache"
import AnimatedNoFavouriteMessage from "@/components/AnimatedNoFavouriteMessage/AnimatedNoFavouriteMessage"

export const Favourites = async (props: FavouritesPageProps) => {

    const session = await getServerSession(authOptions);
    const user = session?.user;
    const userId = user?.id || '';

    // Get the page number. Default to 1 if not provided.
    const pageNumber = Number(props?.searchParams?.page || 1); 

    const PAGE_SIZE = 8;

    const take = PAGE_SIZE;
    // Calculate skip based on page number
    const skip = (pageNumber - 1) * take;

    const order = props.searchParams?.sort || 'asc';

    const filter = props.searchParams?.filter || '';

    const locale = props.params.locale;

    const sort: string[] = ['asc', 'desc'];

    const { favourites, filters, metadata } = await getUserCitiesFavourites({userId, locale, take, skip, order, filter});

    revalidatePath(`/${locale}/user/dashboard/favourites`);
    console.log('Favourites: ', favourites);

    return(
        <section id="section-favourites">
            <div className="relative flex justify-end gap-x-4 mb-4">
                <FavouritesDropdownSort sort={sort} order={order} disabled={favourites && favourites.length ? false : true} />
                <FavouritesDropdownFilters {...filters} disabled={favourites && favourites.length ? false : true} />
            </div>
            <div className="w-full mb-4 rounded-lg px-4 pb-8 pt-6 text-blue-700 dark:text-white bg-sky-100 dark:bg-[#0F1A3E]">
                {favourites && favourites.length ? (
                    <>
                        <FavouritesList items={favourites} />
                        <Pagination {...props.searchParams} {...metadata} />
                    </>
                ) : (
                    <AnimatedNoFavouriteMessage />
                )}
            </div>
        </section>
    )
}