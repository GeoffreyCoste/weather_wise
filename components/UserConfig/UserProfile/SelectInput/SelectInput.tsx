'use client'

import {useState, Dispatch, SetStateAction} from 'react'
import {useTranslations} from 'next-intl'
import AsyncSelect from 'react-select/async'
import { SingleValue } from 'react-select'
import { FieldError } from 'react-hook-form'
import clsx from 'clsx'

export type OptionType =  {
  value: string;
  label: string;
};

type Props = {
  value: OptionType | SingleValue<OptionType>;
  /* setValue: Dispatch<SetStateAction<{ value: string; label: string; }>>; */
  setValue: Dispatch<SetStateAction<OptionType | SingleValue<OptionType>>>;
  defaultOptions: SingleValue<OptionType>[];
  isDisabled: boolean;
  error: FieldError | undefined;
}

/* type Props = {
    value: OptionType;
    setValue: Dispatch<SetStateAction<{ value: string; label: string; }>>;
    defaultOptions: OptionType[];
    isDisabled: boolean;
    error: FieldError | undefined;
} */

const SelectInput = ({value, setValue, defaultOptions, isDisabled, error}: Props) => {
  

  const [query, setQuery] = useState('');

  const t = useTranslations('UserProfilePage');

  const getOptions = async () => {
    try {

      const response = await fetch(
        `https://api.teleport.org/api/cities/?search=${query}`
      );

      const json = await response.json();

      let options: any[] = [];

      if (json) {
        // Push in 'options' all the objects inside the array property "city:search-results"
        // inside the data returned by the API
        json._embedded['city:search-results'].map((i: any) => options.push(i));

        // Transform the 'options' array to fit the pattern required by react-select
        return options.reduce((acc, current) => {
          const geonameid = current._links['city:item'].href
            .split('/')
            .filter((str: string) => str !== '')
            .slice(-1)
            .toString()
            .split(':')[1];
          acc.push({
            value: geonameid,
            label: current.matching_full_name,
          });
          return acc;
        }, []);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AsyncSelect
      unstyled
      cacheOptions
      defaultOptions={defaultOptions}
      value={value || defaultOptions[0]}
      loadOptions={getOptions}
      placeholder={t('form.input_location_placeholder')}
      noOptionsMessage={() => t('form.input_location_errors.cityNotFound')}
      onInputChange={(value) => setQuery(value)}
      onChange={(val) => setValue(val)}
      isDisabled={isDisabled}
      classNames={{
        control: ({ isFocused, isDisabled }) => 
            clsx(`
              w-full rounded-lg mb-1 p-3 text-sm font-medium placeholder:font-normal outline-none
              dark:bg-[#0F1A3E] border 
              ${isDisabled && 'bg-transparent text-blue-700 border-blue-700 dark:text-white dark:border-blue-900 shadow-none'}
              ${!isDisabled && error && isFocused && 'bg-white border-rose-500 hover:border-rose-500 ring-1 ring-rose-500 dark:border-rose-500 dark:hover:border-rose-500 dark:ring-rose-500'}
              ${!isDisabled && error && !isFocused && 'bg-white border-rose-500 hover:border-rose-500'}
              ${!isDisabled && !error && value && isFocused && 'bg-white border-green-500 hover:border-green-500 ring-1 ring-green-500 dark:border-green-500 dark:hover:border-green-500 dark:ring-green-500'}
              ${!isDisabled && !error && value && !isFocused && 'bg-white border-green-500 hover:border-green-500'}
              ${!isDisabled && !error && !value && isFocused && 'bg-white border-blue-700 ring-1 ring-blue-700 dark:border-sky-400 dark:ring-sky-400'}
              ${!isDisabled && !error && !value && !isFocused && 'bg-white border-gray-300 hover:border-gray-400 dark:border-gray-300 dark:hover:border-gray-400'}
            `),
        input: () => 'dark:text-white',
        singleValue: () => 'text-blue-700 dark:text-white',
        indicatorsContainer: () => `${isDisabled ? 'text-sky-100 dark:text-[#0f1a3e]' : ''}`,
        menu: () => 'w-full absolute top-[100%] z-[1] my-2 rounded-lg bg-white shadow box-border',
        menuList: () => 'relative max-h-[300px] overflow-y-auto py-2 box-border',
        option: () => 'w-full block text-sm hover:bg-blue-100 py-2 px-3 select-none box-border cursor-pointer'
      }}
      styles={{
        container: (base) => ({
          ...base,
          width: '100%',
        }),
        control: (styles) => ({
          ...styles,
          cursor: 'pointer',
        }),
        valueContainer: (styles) => ({
            ...styles,
            paddingTop: '0',
            paddingBottom: '0',
        }),
        placeholder: (styles) => ({
            ...styles,
            color: "#9ca3af",
            fontWeight: "400",
        }),
        input: (styles) => ({
          ...styles,
          visibility: 'visible'
        }),
        option: (styles) => ({
          ...styles,
          cursor: 'pointer'
        })
      }}
    />
  );
};

export default SelectInput;