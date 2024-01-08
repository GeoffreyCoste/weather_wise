'use client'

import { useTranslations } from 'next-intl'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { RemoveFavouriteIcon } from '../SvgIcons/RemoveFavouriteIcon/RemoveFavouriteIcon'
import { deleteCityFavourite } from '@/utils/handleData'

type Props = {
    geonameId: string;
    setMenuIsOpen: (isOpen: boolean) => void;
    setMenuIsClicked: (isClicked: boolean) => void;
}

const ButtonRemoveFavourite = ({geonameId, setMenuIsOpen, setMenuIsClicked}: Props) => {

    const {data} = useSession();

    const router = useRouter();

    const t = useTranslations('DashboardFavouritesPage');

    const handleClick = () => {
        if (data?.user) {
          deleteCityFavourite(data.user.id, geonameId);
          router.refresh();
          setMenuIsOpen(false);
          setMenuIsClicked(false);
        }
    }

    return (
      <button
        id="button-remove-favourite" 
        className= "group w-11/12 flex items-center gap-x-2 hover:bg-blue-50 dark:hover:bg-sky-400 px-4 py-2 rounded-lg"
        tabIndex={4}
        onClick={handleClick}
      >
        <RemoveFavouriteIcon />
        <span className="text-sm font-medium text-blue-300 group-hover:text-blue-700 dark:text-sky-500 group-hover:dark:text-blue-950">
            {t('favourites_list.button_remove_favourite')}
        </span>
      </button>
    )
}

export default ButtonRemoveFavourite;