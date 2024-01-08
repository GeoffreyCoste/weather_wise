import { HomeTitleBlock } from "./HomeTitleBlock/HomeTitleBlock"
import { HomeContentBlock } from "./HomeContentBlock/HomeContentBlock"
import { AnimatedSun } from "../AnimatedSun/AnimatedSun"

export const HomePageContent = () => {
  
    return (
        <>
          <div
            className="relative flex w-full flex-col rounded-lg px-4 py-14 sm:w-10/12 sm:pt-24 sm:pb-10 md:w-3/4 md:pt-32 md:pb:10 lg:w-3/4 2xl:w-3/5 bg-white dark:bg-blue-950"
          >
            <div className="absolute left-1/2 -translate-x-1/2 w-36 h-36 -top-[72px] md:w-48 md:h-48 md:-top-24 lg:w-60 lg:h-60 lg:-top-[120px]">
              <AnimatedSun />
            </div>
            <HomeTitleBlock />
            <HomeContentBlock/>
          </div>
        </>
  )
}
