'use client'

import { MouseEventHandler, SetStateAction, Dispatch } from "react"
import { useTheme } from "@/hooks/useTheme";
import BlockDisplayIcon from "../SvgIcons/BlockDisplayIcon/BlockDisplayIcon";
import ListDisplayIcon from "../SvgIcons/ListDisplayIcon/ListDisplayIcon";

type Props = {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>
}

const ButtonToggleDisplay = ({checked, setChecked}: Props) => {

  const { themeState } = useTheme();

  return (
    <div 
      id="button-display-toggle" 
      className="absolute -top-1 right-2 md:right-4"
    >
      <label
        role="button"
        tabIndex={0}
        htmlFor="checkbox-display-toggle"
        className= "relative flex justify-center items-center h-8 w-8 md:h-11 md:w-11 border-2 py-2 border-white bg-white lg:hover:bg-gray-200 dark:border-blue-900 dark:bg-[#0F1A3E] lg:dark:border-blue-900 lg:dark:bg-blue-950 lg:dark:hover:bg-blue-900 cursor-pointer rounded-full shadow"
        onChange={() => setChecked((checked) => !checked)}
      >
        <input
          type="checkbox"
          id="checkbox-display-toggle"
          className="absolute top-1/2 hidden translate-y-[-50%]"
          checked={checked}
          aria-checked={checked}
          onChange={() => console.log('City added to favourites: ', checked)}
        />
        <i
          id="block"
          className={`absolute ${checked ? "hidden" : "block animate-click-scale"}`}
        >
          <BlockDisplayIcon classNames="h-4 w-4 md:h-6 md:w-6" />
        </i>
        <i
          id="list"
          className={`absolute ${checked ? "block animate-click-scale" : "hidden"}`}
        >
          <ListDisplayIcon classNames="h-4 w-4 md:h-6 md:w-6" />
        </i>
      </label>
    </div>
  )
}

export default ButtonToggleDisplay;