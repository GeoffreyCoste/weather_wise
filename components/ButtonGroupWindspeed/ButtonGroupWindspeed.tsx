'use client'

import { useState, useLayoutEffect, useTransition, MouseEventHandler } from "react"
import { useParams } from "next/navigation"
import { useWindspeed } from "@/hooks/useWindspeed"
import { initWindspeed, setKmph, setMps } from "@/reducers/windspeedReducer"


const windspeeds = ['kmph', 'mps'] as const; // 'const assertion' protecting the reference and elements of the array

type Windspeed = (typeof windspeeds)[number];

type Props = {
  windspeedCookie: string;
};

const isWindspeed = (value: unknown): value is Windspeed => windspeeds.includes(value as Windspeed);


const ButtonGroupWindspeeds = ({windspeedCookie}: Props) => {

  const [windspeed, setWindspeed] = useState(
    isWindspeed(windspeedCookie) ? windspeedCookie : ''
    );

  
  const [isPending, startTransition] = useTransition();
  
  const params = useParams();

  const {windspeedState, dispatch} = useWindspeed();
    
  useLayoutEffect(() => {
    if (!isWindspeed(windspeedCookie)) {
      let unit = params.locale === 'fr' ? 'kmph' : 'mps';
      startTransition(() => {
        setWindspeed(unit);
        dispatch(initWindspeed(unit as Windspeed));
      });
    } else {
      startTransition(() => {
        dispatch(initWindspeed(windspeedCookie as Windspeed));
      });
    };
  }, []);

  const setNextWindspeed = (currentWindspeed: string) => {
    switch (currentWindspeed) {
      case 'kmph':
        return 'mps';
        break;
      case 'mps':
        return 'kmph';
        break;
      default:
        return params.locale === 'fr' ? 'kmph' : 'mps';
    };
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
        const nextWindspeed = setNextWindspeed(windspeedState.windspeed);
        setWindspeed(nextWindspeed);
      if (windspeedState.windspeed === 'kmph') {
        dispatch(setMps('mps'));
      } else {
        dispatch(setKmph('kmph'));
      }
      await fetch('http://localhost:3000/api/windspeed', {
          method: 'POST',
          body: JSON.stringify({windspeed: nextWindspeed}),
          headers: new Headers({
              'Content-Type': 'application/json',
          })
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="button-group-windspeeds" className="relative mt-2 px-1.5 py-1.5 lg:px-2 lg:py-0 inline-flex justify-between w-full rounded-full border-2 border-zinc-50 bg-white lg:hover:bg-gray-200 dark:border-blue-900 dark:bg-blue-950 lg:dark:hover:bg-blue-900 shadow">
        <span
          id="background-selected-windspeed"
          className={`absolute top-1/2 z-20 inline-block h-7 w-[45%] lg:w-[42%] translate-y-[-50%] bg-blue-700 dark:bg-sky-400 dark:bg-sky-400 rounded-full transition-transform ${windspeedState.windspeed === "mps" && "translate-x-[110%] lg:translate-x-[120%]"}`}
        ></span>
        <button
          className={`w-[45%] flex justify-center items-center z-[21] mr-[5%] py-1 lg:py-2 text-sm ${isPending && 'transition-opacity [&:disabled]:opacity:30'} ${windspeedState.windspeed === "kmph" ? "font-semibold text-white dark:text-[#0F1A3E]" : "font-medium text-blue-700 lg:hover:text-blue-600/75 dark:font-medium dark:text-white/75 dark:hover:text-white"}`}
          type="button"
          tabIndex={0}
          role="button"
          aria-label="select-kmph"
          disabled={isPending}
          onClick={handleClick}
        >
          km/h
        </button>
        <button
          className={`w-[45%] flex justify-center items-center z-[21] ml-[5%] py-1 lg:py-2 text-sm ${isPending && 'transition-opacity [&:disabled]:opacity:30'} ${windspeedState.windspeed === "mps" ? "font-semibold text-white dark:text-[#0F1A3E]" : "font-medium text-blue-700 lg:hover:text-blue-600/75 dark:font-medium dark:text-white/75 dark:hover:text-white"}`}
          type="button"
          tabIndex={0}
          role="button"
          aria-label="select-mps"
          disabled={isPending}
          onClick={handleClick}
        >
          m/s
        </button>
    </div>
  );
};

export default ButtonGroupWindspeeds;