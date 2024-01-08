'use client'

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import AsyncSelect from 'react-select/async';
import { FieldError } from 'react-hook-form';
import clsx from 'clsx';


type Props = {
    value: string;
    onChange: (...event: any[]) => void;
    error: FieldError | undefined;
}

const SelectInput = ({value, onChange, error}: Props) => {
  const [query, setQuery] = useState('');

  const t = useTranslations('SignupPage');

  const defaultOptionLabel = t('form.input_location_default_option_label');

  const defaultOptions = [
    {
      value: '',
      label: defaultOptionLabel
    }
  ];

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
      loadOptions={getOptions}
      placeholder={t('form.input_location_placeholder')}
      noOptionsMessage={() => t('form.input_location_errors.cityNotFound')}
      onInputChange={(value) => setQuery(value)}
      onChange={(val) => onChange(val?.value)}
      classNames={{
        control: ({ isFocused, isDisabled }) => 
            clsx(`
              w-full rounded-lg mb-1 p-3 text-sm font-medium placeholder:font-normal outline-none
              dark:text-white dark:bg-[#0F1A3E] border 
              ${isDisabled && 'bg-slate-50 text-slate-500 border-slate-200 shadow-none'}
              ${error && isFocused && 'border-rose-500 hover:border-rose-500 ring-1 ring-rose-500 dark:border-rose-500 dark:hover:border-rose-500 dark:ring-rose-500'}
              ${error && !isFocused && 'border-rose-500 hover:border-rose-500'}
              ${!error && value && isFocused && 'border-green-500 hover:border-green-500 ring-1 ring-green-500 dark:border-green-500 dark:hover:border-green-500 dark:ring-green-500'}
              ${!error && value && !isFocused && 'border-green-500 hover:border-green-500'}
              ${!error && !value && isFocused && 'border-blue-700 ring-1 ring-blue-700 dark:border-sky-400 dark:ring-sky-400'}
              ${!error && !value && !isFocused && 'border-gray-300 hover:border-gray-400 dark:border-gray-300 dark:hover:border-gray-400'}
            `),
        input: () => 'dark:text-white',
        singleValue: () => 'dark:text-white',
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
        option: (styles) => ({
          ...styles,
          cursor: 'pointer'
        }),
        
      }}
    />
  );
};

export default SelectInput;