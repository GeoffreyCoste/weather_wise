import Image from "next/image";
import Horizon from '@/public/horizon.svg'
import { HomeTitleBlock } from "./HomeTitleBlock/HomeTitleBlock";
import { HomeContentBlock } from "./HomeContentBlock/HomeContentBlock";

export const HomePageContent = () => {
  
    return (
        <>
          <div
            className="relative flex w-full flex-col rounded-lg px-4 pt-14 sm:w-10/12 sm:pt-24 md:w-3/4 md:pt-32 lg:w-3/4 2xl:w-3/5 bg-white dark:bg-blue-950"
          >
            <div className="absolute w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 md:-top-20 -top-10 left-1/2 mx-auto origin-center -translate-x-1/2 sm:-top-16 lg:-top-24">
              <Image
                  className="object-cover"
                  src={Horizon}
                  sizes="100%"
                  alt="Sun on the horizon"
                  fill
              />
            </div>
            <HomeTitleBlock />
            <HomeContentBlock/>
          </div>
        </>
  )
}
