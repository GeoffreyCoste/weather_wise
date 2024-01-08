import FavouritesCardHeader from "./FavouritesCardHeader/FavouritesCardHeader"
import FavouritesCardBody from "../FavouritesCard/FavouritesCardBody/FavouritesCardBody"
import { DashboardMainPageProps } from "@/app/[locale]/user/dashboard/page";

const FavouritesCard = async (props: DashboardMainPageProps) => {

    return (
        <div className="w-full h-full px-4 py-8 mb-4 rounded-lg text-blue-700 bg-sky-100 dark:text-white dark:bg-[#0F1A3E]">
          <FavouritesCardHeader {...props} />
          <FavouritesCardBody {...props} />
        </div>
    )
}

export default FavouritesCard;