'use client';

import { useState, useEffect, useLayoutEffect, MouseEventHandler } from "react";
import {useTheme} from '@/hooks/useTheme';
import {setLight, setDark, initTheme} from '@/reducers/themeReducer';


const themes = ['light', 'dark'] as const; // 'const assertion' protecting the reference and elements of the array

type Theme = (typeof themes)[number];

type Props = {
  checkboxId: string;
  themeCookie: string;
  buttonIdPrefix?: string;
  styleVariations?: string;
};

const isTheme = (value: unknown): value is Theme => themes.includes(value as Theme);


const ButtonToggleTheme = ({buttonIdPrefix, checkboxId, themeCookie, styleVariations}: Props) => {
    
  const [theme, setTheme] = useState(
    isTheme(themeCookie) ? themeCookie : ''
);

  const {themeState, dispatch} = useTheme();
    
  useLayoutEffect(() => {
    if (!isTheme(themeCookie)) {
      let preference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(preference);
      dispatch(initTheme(preference as Theme));
    } else {
      dispatch(initTheme(themeCookie as Theme));
    }
  }, []);

  const setNextTheme = (currentTheme: string) => {
    switch (currentTheme) {
      case 'light':
        return 'dark';
        break;
      case 'dark':
        return 'light';
        break;
      default:
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
    }
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const handleChange: MouseEventHandler<HTMLLabelElement> = async () => {
    const nextTheme = setNextTheme(themeState.theme);
    setTheme(nextTheme);
    if (themeState.theme === 'light') {
      dispatch(setDark('dark'));
    } else {
      dispatch(setLight('light'));
    }
    await fetch('http://localhost:3000/api/theme', {
        method: 'POST',
        body: JSON.stringify({theme: nextTheme}),
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    });
  };

  return (
    <div id={`${buttonIdPrefix ?? ""}button-theme-toggle`} className={`items-center justify-center ${styleVariations ?? ""}`}>
      <label
        role="button"
        tabIndex={0}
        htmlFor={checkboxId}
        className= "relative z-40 inline-block h-11 w-20 border-2 py-2 border-white bg-white text-blue-700 lg:hover:bg-gray-200 dark:border-blue-900 dark:bg-[#0F1A3E] lg:dark:border-blue-900 lg:dark:bg-blue-950 lg:dark:hover:bg-blue-900 cursor-pointer rounded-full shadow"
        onChange={handleChange}
      >
        <input
          type="checkbox"
          id={checkboxId}
          className="absolute top-1/2 hidden translate-y-[-50%]"
          checked={themeState.theme === 'light' ? false : true}
          aria-checked={themeState.theme === 'light' ? false : true}
          onChange={() => console.log('theme: ', themeState.theme)}
        />
        <span
          id="ball"
          className="absolute left-[10px] top-1/2 z-10 inline-block h-7 w-7 translate-y-[-50%] bg-yellow-400 dark:translate-x-8 dark:bg-sky-400 rounded-full transition-transform"
        ></span>
        <i
          id="sun"
          className="absolute left-[10px] top-1/2 translate-y-[-50%] hidden dark:block"
        >
          <svg
            className="h-5 w-5"
            fill="#facc15"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Sun_SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="Sun_SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="Sun_SVGRepo_iconCarrier">
              <path d="M12,18a6,6,0,1,0-6-6A6.006,6.006,0,0,0,12,18ZM12,8a4,4,0,1,1-4,4A4,4,0,0,1,12,8ZM11,3V2a1,1,0,0,1,2,0V3a1,1,0,0,1-2,0Zm1,17a1,1,0,0,1,1,1v1a1,1,0,0,1-2,0V21A1,1,0,0,1,12,20ZM17.657,6.343a1,1,0,0,1,0-1.414l.707-.707a1,1,0,0,1,1.414,1.414l-.707.707a1,1,0,0,1-1.414,0ZM6.343,17.657a1,1,0,0,1,0,1.414l-.707.707a1,1,0,0,1-1.414-1.414l.707-.707A1,1,0,0,1,6.343,17.657ZM23,12a1,1,0,0,1-1,1H21a1,1,0,0,1,0-2h1A1,1,0,0,1,23,12ZM1,12a1,1,0,0,1,1-1H3a1,1,0,0,1,0,2H2A1,1,0,0,1,1,12Zm18.071,5.657.707.707a1,1,0,1,1-1.414,1.414l-.707-.707a1,1,0,0,1,1.414-1.414ZM4.222,5.636A1,1,0,0,1,5.636,4.222l.707.707A1,1,0,1,1,4.929,6.343Z"></path>
            </g>
          </svg>
        </i>
        <i
          id="moon"
          className="absolute right-[10px] top-1/2 translate-y-[-50%] block dark:hidden"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#1d4ed8"
          >
            <g id="Moon_SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="Moon_SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="Moon_SVGRepo_iconCarrier">
              {' '}
              <title>moon [#114]</title> <desc>Created with Sketch.</desc>{' '}
              <defs> </defs>{' '}
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                {' '}
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-220.000000, -7719.000000)"
                  fill="#1d4ed8"
                >
                  {' '}
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    {' '}
                    <path
                      d="M173.99029,7576.998 C171.388688,7576.998 169.058358,7575.74775 167.591892,7573.8028 C174.222522,7575.15916 180.17047,7569.27528 178.803103,7562.59159 C180.748048,7564.05806 181.998298,7566.38839 181.998298,7568.98999 C181.998298,7573.40541 178.405705,7576.998 173.99029,7576.998 M174.610911,7559 C176.076376,7560.36937 176.993293,7562.32032 176.993293,7564.48549 C176.993293,7571.32432 168.608909,7574.54254 164.0003,7569.60961 C164.32062,7574.84985 168.66997,7579 173.99029,7579 C179.518819,7579 184.0003,7574.51852 184.0003,7568.98999 C184.0003,7563.66967 179.85015,7559.32032 174.610911,7559"
                      id="moon-[#114]"
                    >
                      {' '}
                    </path>{' '}
                  </g>{' '}
                </g>{' '}
              </g>{' '}
            </g>
          </svg>
        </i>
      </label>
    </div>
  );
};

export default ButtonToggleTheme;