'use client'

import { LazyMotion, m, domAnimation } from "framer-motion"
import { useTranslations } from "next-intl"
import { useTheme } from "@/hooks/useTheme"

const pathVariants = {
  hidden: {
    pathLength: 0,
    opacity: 0
  },
  visible : (i: number) => {
    const delay = i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0},
        opacity: { delay, duration: 0.01 }
      }
    }
  }
}

const AnimatedNoFavouriteMessage = () => {

  const t = useTranslations('DashboardFavouritesPage');

  const {themeState} = useTheme();

  return (
    <div className="w-full flex flex-col justify-center items-center lg:mt-6 lg:mb-10">
      <div 
        className="relative"
      >
        <LazyMotion features={domAnimation}>
          <div className="h-10 md:h-20">
            <m.svg 
              className="w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 absolute top-4 left-14 md:top-10 md:left-5 lg:top-6 lg:-left-2"
              viewBox="0 0 150 124" 
              fill={themeState.theme === "light" ? "#1d4ed8" : "#ffffff"}
              initial="hidden"
              whileInView="visible"
              viewport={{once: true, amount: 'all'}}
            >
              <g>
                <m.path variants={pathVariants} custom={0.25} d="M8.5,121.3c-1.2-0.2-2.2-1.1-2.7-2.3c-0.7-1.8,0.3-3.9,2.1-4.6l9.5-3.5c1.8-0.7,3.9,0.3,4.6,2.1
            c0.7,1.8-0.3,3.9-2.1,4.6l-9.5,3.5C9.8,121.4,9.1,121.4,8.5,121.3z"/>
              </g>
                <g>
                  <m.path variants={pathVariants} custom={0.5} d="M4.6,77.4c-1.9-0.4-3.2-2.2-2.8-4.1c0.3-1.9,2.2-3.2,4.1-2.9l10,1.7c1.9,0.3,3.2,2.2,2.9,4.1
                    c-0.3,1.9-2.2,3.2-4.1,2.9L4.6,77.4C4.6,77.4,4.6,77.4,4.6,77.4z"/>
                </g>
                <g>
                  <m.path variants={pathVariants} custom={0.75} d="M30.9,43.9c-0.6-0.1-1.1-0.4-1.6-0.8l-7.8-6.5c-1.5-1.3-1.7-3.5-0.5-5c1.3-1.5,3.5-1.7,5-0.5l7.8,6.5
                    c1.5,1.3,1.7,3.5,0.5,5C33.5,43.7,32.2,44.1,30.9,43.9z"/>
                </g>
                <g >
                  <m.path variants={pathVariants} custom={1} d="M62.7,21.6c-1.2-0.2-2.2-1.1-2.7-2.3l-3.5-9.5c-0.7-1.8,0.3-3.9,2.1-4.6c1.8-0.7,3.9,0.3,4.6,2.1l3.5,9.5
                    c0.7,1.8-0.3,3.9-2.1,4.6C64,21.7,63.3,21.7,62.7,21.6z"/>
                </g>
                <g>
                  <m.path variants={pathVariants} custom={1.25} d="M101.4,18.1c-1.9-0.4-3.2-2.2-2.8-4.1l1.7-10c0.3-1.9,2.2-3.2,4.1-2.9c1.9,0.3,3.2,2.2,2.9,4.1l-1.7,10
                    C105.2,17.2,103.4,18.5,101.4,18.1C101.4,18.1,101.4,18.1,101.4,18.1z"/>
                </g>
                <g>
                  <m.path variants={pathVariants} custom={1.5} d="M136.6,34.5c-0.6-0.1-1.1-0.4-1.6-0.8c-1.5-1.3-1.7-3.5-0.5-5l6.5-7.8c1.3-1.5,3.5-1.7,5-0.5
                    c1.5,1.3,1.7,3.5,0.5,5l-6.5,7.8C139.1,34.3,137.8,34.7,136.6,34.5z"/>
                </g>
            </m.svg>
          </div>
        </LazyMotion>
        <LazyMotion features={domAnimation}>
          <div className="flex justify-center items-center mb-4 md:mb-8">
            <m.svg 
              className="h-20 w-20 md:w-32 md:h-32 lg:w-40 lg:h-40" 
              viewBox="0 0 24 24" 
              initial={{fillOpacity: 0}}
              whileInView={{fillOpacity: 1}}
              viewport={{once: true, amount: 0.8}}
              transition={{delay: 0.25, duration: 1.5}}
              fill="#facc15" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="StarIcon_bgCarrier" strokeWidth="0"></g><g id="StarIcon_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="StarIcon_iconCarrier"> 
                <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" stroke={themeState.theme === "light" ? "#1d4ed8" : "#ffffff"} strokeWidth="2"></path> 
              </g>
            </m.svg>
          </div>
        </LazyMotion>
        <p className="w-full text-center text-2xl font-black mb-2">{t('no_favourites.start')}</p>
        <p className="w-full text-center text-sm mb-8 md:mb-16">{t('no_favourites.end')}</p>
      </div>
    </div>
  )
}

export default AnimatedNoFavouriteMessage;