'use client'

import { useState, useEffect, MouseEventHandler } from "react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { CityData } from "@/@types/api-datas"
import { City } from "@prisma/client";
import { addCityFavourite, deleteCityFavourite } from "@/utils/handleData";

type Props = {
  city: CityData;
  favourites: City[];
}

const ButtonToggleFavourite = ({ city, favourites}: Props) => {
  const [checked, setChecked] = useState(false);
  const [animate, setAnimate] = useState(false);

  const {data} = useSession();

  const {geonameId} = city;

  const router = useRouter();

  const handleChange: MouseEventHandler<HTMLLabelElement> = () => {
    if (data?.user) {
      if (!checked) {
        addCityFavourite(data.user.id, city);
        setAnimate(true);
        setChecked(checked => !checked);
        router.refresh();
      } else {
        deleteCityFavourite(data.user.id, geonameId);
        setAnimate(true);
        setChecked(checked => !checked);
        router.refresh();
      }
    }
  };

  useEffect(() => {
    // If user's favourites array includes city geonameId, 
    // 'checked' property shall be true so that the 'Star Icon' is filled
    if (favourites?.some(favourite => favourite.geonameId === geonameId)) {
      setChecked(true);
    }
  }, [favourites]);

  return (
    <div id="button-favourite-toggle" className="absolute -top-10 right-2 md:top-0 md:right-4">
      <label
        role="button"
        tabIndex={0}
        htmlFor="checkbox-favourite-toggle"
        className= "relative z-40 flex justify-center items-center h-8 w-8 md:h-11 md:w-11 border-2 py-2 border-white bg-white lg:hover:bg-gray-200 dark:border-blue-900 dark:bg-[#0F1A3E] lg:dark:border-blue-900 lg:dark:bg-blue-950 lg:dark:hover:bg-blue-900 cursor-pointer rounded-full shadow"
        onChange={handleChange}
      >
        <input
          type="checkbox"
          id="checkbox-favourite-toggle"
          className="absolute top-1/2 hidden translate-y-[-50%]"
          checked={checked}
          aria-checked={checked}
          onChange={() => console.log("Toggle favourite")}
        />
        <i
          id="star"
          className={`absolute ${animate && "animate-click-star"}`}
          onAnimationEnd={() => setAnimate(false)}
        >
          <svg className="h-4 w-4 md:h-6 md:w-6" viewBox="0 0 24 24" fill={checked ? "#facc15" : "none"} xmlns="http://www.w3.org/2000/svg"><g id="StarBtn_bgCarrier" strokeWidth="0"></g><g id="StarBtn_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="StarBtn_iconCarrier"> <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" stroke="#facc15" strokeWidth="2"></path> </g></svg>
        </i>
      </label>
    </div>
  )
}

export default ButtonToggleFavourite;