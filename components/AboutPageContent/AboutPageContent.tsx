import { AboutTitleBlock } from "./AboutTitleBlock/AboutTitleBlock";
import { AboutContentBlock } from "./AboutContentBlock/AboutContentBlock";


export const AboutPageContent = () => {
  
    return (
        <>
          <div
            className="relative flex w-full flex-col rounded-lg px-4 py-14 sm:w-10/12 sm:py-24 md:w-3/4 md:py-32 lg:w-3/4 2xl:w-3/5 bg-white dark:bg-blue-950"
          >
            <AboutTitleBlock />
            <AboutContentBlock />
          </div>
        </>
  )
}
