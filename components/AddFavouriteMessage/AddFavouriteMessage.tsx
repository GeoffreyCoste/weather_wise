'use client'


import { useTranslations } from "next-intl"
import { useModal } from "@/hooks/useModal"
import { AnimatedStarsCircle } from "../AnimatedStarsCircle/AnimatedStarsCircle"



const AddFavouriteMessage = () => {

  const t = useTranslations('DashboardMainPage');

  const {open} = useModal();

  return (
    <div className="h-full flex flex-col">
        <div className="w-full mt-24 mb-2">
          <p className="text-center text-sm">{t('favouritesCard.favouritesList.add_favourites.start')}</p>
        </div>
        <div className="w-full mb-8 md:mb-12">
          <p className="w-full text-center text-2xl font-black">{t('favouritesCard.favouritesList.add_favourites.end')}</p>
        </div>
        <div className="w-full flex justify-center mb-8 md:mb-12">
          <button 
            className="font-bold text-white dark:text-[#0F1A3E] bg-blue-700 lg:hover:bg-blue-800 dark:bg-sky-400 lg:dark:hover:bg-sky-500 border border-2 border-blue-700 lg:hover:border-blue-800 dark:border-sky-400 lg:dark:hover:border-sky-500 rounded-full px-4 py-2"
            type="button" 
            tabIndex={0} 
            role="button" 
            aria-label="button-show-modal"
            onClick={open}
          >
            {t('favouritesCard.favouritesList.add_favourites.button')}
          </button>
        </div>
        <div className="basis-full h-4/6">
          <div className="w-full h-full flex items-center">
            <AnimatedStarsCircle />
          </div>
        </div>
    </div>
  )
}

export default AddFavouriteMessage;