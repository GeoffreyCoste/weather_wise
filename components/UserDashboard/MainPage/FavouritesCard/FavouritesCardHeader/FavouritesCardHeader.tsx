import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import CardTitle from '../CardTitle/CardTitle'
import LinkNavigateForward from "@/components/LinkNavigateForward/LinkNavigateForward"
import { getCitiesByUserId } from "@/actions/cityActions"
import { DashboardMainPageProps } from "@/app/[locale]/user/dashboard/page"

const FavouritesCardHeader = async (props: DashboardMainPageProps) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const locale = props.params.locale;

  let favourites;

  if (user) {
    favourites = await getCitiesByUserId({id: user?.id, locale});
  }

  return (
    <div className="flex flex-wrap">
      <div className="basis-full flex justify-between items-center">
        <CardTitle />
        {favourites && favourites.length > 0 && <LinkNavigateForward href="/user/dashboard/favourites" />}
      </div>
    </div>
  )
}

export default FavouritesCardHeader;