'use client'

import { useState, useEffect, useRef, useCallback, SyntheticEvent } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useTheme } from '@/hooks/useTheme'
import ToggleButton from '@/components/ToggleButton/ToggleButton'
import ToggleMenu from '@/components/ToggleMenu/ToggleMenu'
import { DropdownStacked } from '@/components/DropdownStacked/DropdownStacked'
import { CardFilterCheckbox } from '@/components/CardFilterCheckbox/CardFilterCheckbox'


export interface Filter {
    category: string;
    index: string;
    countries?: string[];
    continent?: string;
}

export type Filters = {
    disabled: boolean;
    continents: Filter[];
    countries: Filter[];
};


export const FavouritesDropdownFilters = (props: Filters) => {

    const {disabled, continents, countries} = props;

    const [checkedContinentsIndex, setCheckedContinentsIndex] = useState<string[]>([]);
    const [countChecked, setCountChecked] = useState<number>(checkedContinentsIndex.length);
    const [countriesFilters, setCountriesFilters] = useState(props.countries);

    const [continentsCheckboxesChecked, setContinentsCheckboxesChecked] = useState(
        new Array(continents.length).fill(false)
    );
    const [countriesCheckboxesChecked, setCountriesCheckboxesChecked] = useState(
        new Array(countries.length).fill(false)
    );

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const menuRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const t = useTranslations('DashboardFavouritesPage');

    const dropdowns = ['continents', 'countries'];
    
    const {themeState} = useTheme();

    const toggleCheckedContinentsIndex = (index: string) => {
        if(!checkedContinentsIndex.includes(index)) {
            setCheckedContinentsIndex([
                ...checkedContinentsIndex,
                index
            ]);
        } else {
            setCheckedContinentsIndex(
                checkedContinentsIndex.filter(item => item !== index)
            );
        }
    }

    const initCountriesFilters = () => {
        const filters = countries;
        setCountriesFilters(filters);
    };

    const updateCount = () => {
        const update = checkedContinentsIndex.length;
        setCountChecked(update);
    }

    const handleClick = () => {
        setIsOpen(isOpen => !isOpen);
    }

    const handleClickOutside = (event: MouseEvent) => {
        const filtersMenu = menuRef.current;
        if (
          isOpen &&
          filtersMenu &&
          !filtersMenu.contains(event.target as Element)
        ) {
            setIsOpen(false);
        }
    };

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
      (name: string, value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set(name, value)
        
        return params.toString()
      },
      [searchParams]
    )

    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
       
        let query = "";

        for (let [key, value] of formData.entries()) {
            const name = key.split('_')[1] === "continent" ? "c" : "co"
            const filter = `${name}${value}`;
            if (!query.length) {
                query += filter;
            } else {
                query+= `%${filter}`
            }
        }
        
        router.replace(pathname + '?' + createQueryString('filter', query));
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        handleClick;
    }, []);

    useEffect(() => {
        if (checkedContinentsIndex.length && countChecked === 0) {
            setCountriesFilters(current => 
                current.filter(el => {
                    if (checkedContinentsIndex.includes(el!.continent!)) {
                        return el;
                    }
                })
            );
            updateCount();
        } else if (checkedContinentsIndex.length && countChecked > 0 && checkedContinentsIndex.length > countChecked) {
            const update = countries.filter(el => {
                if (checkedContinentsIndex.includes(el!.continent!)) {
                    return el;
                }
            })
            setCountriesFilters(update);
            updateCount();
        } else if (checkedContinentsIndex.length && countChecked > 0 && checkedContinentsIndex.length < countChecked) {
            setCountriesFilters(current => 
                current.filter(el => {
                    if (checkedContinentsIndex.includes(el!.continent!)) {
                        return el;
                    }
                })
            );
            updateCount();
        } else if (!checkedContinentsIndex.length && countChecked === 1) {
            initCountriesFilters();
            updateCount();
        }
    }, [checkedContinentsIndex, countChecked]);

    return (
        <div className="basis-full md:basis-auto">
            <ToggleButton 
                tabIndex={4}
                onClick={handleClick}
                styles={`w-full lg:w-auto h-11 z-30 flex justify-center items-center gap-2 px-4 py-2 rounded-full bg-blue-700 cursor-pointer ${!disabled ? "lg:hover:bg-blue-800 dark:bg-sky-400 lg:dark:hover:bg-sky-600" : "disabled:bg-blue-700/25 disabled:dark:bg-sky-400/25 disabled:dark:text-gray-400 disabled:cursor-default"}`}
                isDisabled={disabled}
            >
                <span className="font-bold text-sm text-white dark:text-[#0F1A3E]">{t('settings_menu.dropdowns.filters.title')}</span>

                <span className={`transition ${isOpen && '-rotate-180'}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke={`${themeState.theme === "light" ? "#ffffff" : "#0F1A3E"}`}
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
            </ToggleButton>
            {isOpen && (
                <ToggleMenu 
                    ref={menuRef}
                    styles="z-20 absolute end-0 top-auto w-full max-w-xs mt-2"
                >
                    <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-2 p-4 bg-zinc-50 border-2 border-zinc-200 dark:bg-blue-950 dark:border-blue-900 rounded-lg shadow-lg">
                        {dropdowns.map((dropdown, index) => {
                            return (
                                <div key={`${index}279191b5-8f50-44fe-9789-49038aa3f530`}>
                                    {dropdown === "continents" ? (
                                        <DropdownStacked 
                                            key={`${index}-69b6d3c3-7806-46e0-948c-3dc536c65992`} 
                                            title={`settings_menu.cards.filter.dropdown_stacked.${dropdown}.title`} translationNamespace="DashboardFavouritesPage"
                                        >
                                            <CardFilterCheckbox 
                                                translationNamespace="GeoNames"
                                                filters={continents} 
                                                setCheckedContinentsIndex={setCheckedContinentsIndex}
                                                toggleCheckedContinentsIndex={toggleCheckedContinentsIndex} 
                                                checkboxesChecked={continentsCheckboxesChecked}
                                                setCheckboxesChecked={setContinentsCheckboxesChecked}
                                            />
                                        </DropdownStacked>
                                    ) : (
                                        <DropdownStacked 
                                            key={`${index}-69b6d3c3-7806-46e0-948c-3dc536c65992`} 
                                            title={`settings_menu.cards.filter.dropdown_stacked.${dropdown}.title`} translationNamespace="DashboardFavouritesPage"
                                        >
                                            <CardFilterCheckbox 
                                                translationNamespace="GeoNames"
                                                filters={countriesFilters}
                                                checkboxesChecked={countriesCheckboxesChecked}
                                                setCheckboxesChecked={setCountriesCheckboxesChecked}
                                            />
                                        </DropdownStacked>
                                    )}
                                </div>
                            )
                        })}
                        <div className="flex justify-end mt-4 px-4">
                            <input 
                                type="submit" 
                                value={t('settings_menu.button_submit')}
                                className="w-full lg:w-auto font-semibold text-sm text-white dark:text-[#172554] mt-4 px-4 py-2 bg-blue-700 lg:hover:bg-blue-800 dark:bg-sky-400 lg:dark:hover:bg-sky-600 rounded-full cursor-pointer"
                            />
                        </div>
                    </form>
                </ToggleMenu>
            )}
        </div>
    )
}