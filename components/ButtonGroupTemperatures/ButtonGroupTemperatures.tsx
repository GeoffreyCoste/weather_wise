'use client'

import { useState, useLayoutEffect, useTransition, MouseEventHandler } from "react"
import { useParams } from "next/navigation"
import { useTemperature } from "@/hooks/useTemperature"
import { initTemperature, setCelsius, setFahrenheit } from "@/reducers/temperatureReducer"


const temperatures = ['celsius', 'fahrenheit'] as const; // 'const assertion' protecting the reference and elements of the array

type Temperature = (typeof temperatures)[number];

type Props = {
  temperatureCookie: string;
};

const isTemperature = (value: unknown): value is Temperature => temperatures.includes(value as Temperature);


const ButtonGroupTemperatures = ({temperatureCookie}: Props) => {
    
  const [temperature, setTemperature] = useState(
    isTemperature(temperatureCookie) ? temperatureCookie : ''
    );
  
  const [isPending, startTransition] = useTransition();
  
  const params = useParams();

  const {temperatureState, dispatch} = useTemperature();
    
  useLayoutEffect(() => {
    if (!isTemperature(temperatureCookie)) {
      let unit = params.locale === 'fr' ? 'celsius' : 'fahrenheit';
      startTransition(() => {
        setTemperature(unit);
        dispatch(initTemperature(unit as Temperature));
      });
    } else {
      startTransition(() => {
        dispatch(initTemperature(temperatureCookie as Temperature));
      });
    };
  }, []);

  const setNextTemperature = (currentTemperature: string) => {
    switch (currentTemperature) {
      case 'celsius':
        return 'fahrenheit';
        break;
      case 'fahrenheit':
        return 'celsius';
        break;
      default:
        return params.locale === 'fr' ? 'celsius' : 'fahrenheit';
    };
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = async () => {

    const nextTemperature = setNextTemperature(temperatureState.temperature);
    setTemperature(nextTemperature);
    if (temperatureState.temperature === 'celsius') {
      dispatch(setFahrenheit('fahrenheit'));
    } else {
      dispatch(setCelsius('celsius'));
    }
    await fetch('http://localhost:3000/api/temperature', {
        method: 'POST',
        body: JSON.stringify({temperature: nextTemperature}),
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    });
  };

  return (
    <div id="button-group-temperatures" className="relative mt-2 px-1.5 py-1.5 lg:px-2 lg:py-0 inline-flex justify-between w-full rounded-full border-2 border-zinc-50 bg-white lg:hover:bg-gray-200 dark:border-blue-900 dark:bg-blue-950 lg:dark:hover:bg-blue-900 shadow">
        <span
          id="background-selected-temperature"
          className={`absolute top-1/2 z-20 inline-block h-7 w-[45%] lg:w-[42%] translate-y-[-50%] bg-blue-700 dark:bg-sky-400 dark:bg-sky-400 rounded-full transition-transform ${temperatureState.temperature === "fahrenheit" && "translate-x-[110%] lg:translate-x-[120%]"}`}
        ></span>
        <button
          className={`w-[45%] flex justify-center items-center z-[21] mr-[5%] py-1 lg:py-2 text-sm ${isPending && 'transition-opacity [&:disabled]:opacity:30'} ${temperatureState.temperature === "celsius" ? "font-semibold text-white dark:text-[#0F1A3E]" : "font-medium text-blue-700 lg:hover:text-blue-600/75 dark:font-medium dark:text-white/75 dark:hover:text-white"}`}
          type="button"
          tabIndex={0}
          role="button"
          aria-label="select-celsius"
          disabled={isPending}
          onClick={handleClick}
        >
          °C
        </button>
        <button
          className={`w-[45%] flex justify-center items-center z-[21] ml-[5%] py-1 lg:py-2 text-sm ${isPending && 'transition-opacity [&:disabled]:opacity:30'} ${temperatureState.temperature === "fahrenheit" ? "font-semibold text-white dark:text-[#0F1A3E]" : "font-medium text-blue-700 lg:hover:text-blue-600/75 dark:font-medium dark:text-white/75 dark:hover:text-white"}`}
          type="button"
          tabIndex={0}
          role="button"
          aria-label="select-fahrenheit"
          disabled={isPending}
          onClick={handleClick}
        >
          °F
        </button>
    </div>
  );
};

export default ButtonGroupTemperatures;