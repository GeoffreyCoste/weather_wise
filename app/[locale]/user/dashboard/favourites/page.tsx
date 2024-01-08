import FavouritesPageTitle from '@/components/UserDashboard/FavouritesPage/FavouritesPageTitle'
import { Favourites } from '@/components/UserDashboard/FavouritesPage/Favourites'
import ButtonNavigateBackward from '@/components/ButtonNavigateBackward/ButtonNavigateBackward'

export type FavouritesPageProps = {
	params: { [key: string]: string | string[] | undefined };
	searchParams?: { [key: string]: string | undefined };
};

const DashboardFavouritesPage = async (props: FavouritesPageProps) => {

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <ButtonNavigateBackward />
      </div>
      <FavouritesPageTitle />
      <Favourites {...props} />
    </div>
  )
}

export default DashboardFavouritesPage; 