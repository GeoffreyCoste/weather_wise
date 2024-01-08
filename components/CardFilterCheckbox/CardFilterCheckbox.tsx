'use client'

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl"
import { Filter } from "../UserDashboard/FavouritesPage/FavouritesDropdownFilters"

type Props = {
    translationNamespace: string;
    filters: Filter[];
    setCheckedContinentsIndex?: ([]: string[]) => void;
    toggleCheckedContinentsIndex?: (index: string) => void;
    checkboxesChecked: boolean[];
    setCheckboxesChecked: (checkboxesChecked: boolean[]) => void;
}

export const CardFilterCheckbox = ({translationNamespace, filters, setCheckedContinentsIndex, toggleCheckedContinentsIndex, checkboxesChecked, setCheckboxesChecked}: Props) => {

    const [totalCheckboxesChecked, setTotalCheckboxesChecked] = useState(0);

    const handleChange = (position: number, filterIndex: string) => {
      const updateCheckboxesChecked = checkboxesChecked.map((item, index) =>
        index === position ? !item : item
      );

      setCheckboxesChecked(updateCheckboxesChecked);
      if (toggleCheckedContinentsIndex) toggleCheckedContinentsIndex(filterIndex);
    };

    const resetAllCheckboxes = () => {
      const initChexboxes = checkboxesChecked.map(() => false);
      if (setCheckedContinentsIndex) setCheckedContinentsIndex([]);
      setCheckboxesChecked(initChexboxes);

    };

    // Each item in the 'checkboxesChecked' array is passed to the Boolean constructor
    // The Boolean constructor coerces each item to true or false depending on whether it’s truthy or falsy
    // If the item is truthy, we keep it
    const countCheckedCheckboxes = () => {
      const total = checkboxesChecked.filter(Boolean).length;
      setTotalCheckboxesChecked(total);
    };

    const t = useTranslations(translationNamespace);
    const t1 = useTranslations("DashboardFavouritesPage")

    useEffect(() => {
      countCheckedCheckboxes();
    }, [checkboxesChecked, totalCheckboxesChecked]);

    return (
      <div className="w-full border-t border-blue-200 bg-white dark:bg-[#0F1A3E] dark:border-sky-400">
          <header className="flex flex-wrap items-center justify-between gap-x-4 p-4">
              <span className="text-sm text-blue-700 dark:text-gray-300"> {totalCheckboxesChecked} {t1('settings_menu.cards.filter.selected')}</span>
              <div className="basis-auto">
                <button
                  type="button"
                  className="text-sm font-bold text-blue-700 dark:text-gray-200 underline underline-offset-4"
                  onClick={resetAllCheckboxes}
                >
                  {t1('settings_menu.cards.filter.button_reset')}
                </button>
              </div>
          </header>
          <ul className="space-y-1 border-t border-blue-100 dark:border-sky-400 p-4">
          {filters.sort((a, b) => Number(a.index) - Number(b.index)).map((filter, index) => {
                return (
                  <li key={`${index}-d4a75313-fc07-49d2-a847-7b1c73bebdcc`}>
                      <label htmlFor={`filter_${filter.category}_${`filter.${filter.category === "continent" ? "continentIndex" : "countryIndex"}`}`} className="inline-flex items-center gap-2">
                          <input
                            type="checkbox"
                            name={`filter_${filter.category}_${filter.index}`}
                            value={filter.index}
                            id={`filter_${filter.category}_${filter.index}`}
                            className="h-5 w-5 relative appearance-none border-2 border-blue-700 dark:border-sky-400 checked:bg-blue-700 dark:checked:bg-sky-400 after:w-1.5 after:h-3 after:absolute after:top-1/3 after:left-1/2 after:rotate-45 after:scale-0 after:-translate-x-1/2 after:-translate-y-1/2 after:border-r-[3px] after:border-b-[3px] after:border-white dark:after:border-[#0F1A3E] after:opacity-0 checked:after:opacity-100 checked:after:rotate-50 checked:after:scale-100 rounded cursor-pointer transition-all"
                            checked={checkboxesChecked[index]}
                            onChange={() => handleChange(index, filter.index)}
                          />
                          <span className="text-sm font-medium text-blue-700 dark:text-white">
                              {t(`${filter.category}.${filter.index}`)}
                          </span>
                      </label>
                  </li>
                )
              })}
          </ul>
      </div>
    )
}