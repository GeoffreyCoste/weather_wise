'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {useTranslations} from 'next-intl'
import AsyncSelect from 'react-select/async'
import {SingleValue} from 'react-select'

type Props = {
  closeModal: () => void;
};

type CityType = {
  name: string;
  geonameid: string;
};

type SelectedOptionType = {
  label: string;
  value: string;
};

const SelectAutocomplete = ({closeModal}: Props) => {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState<CityType[]>([]);

  const t = useTranslations('LocaleLayout');

  const router = useRouter();

  const defaultOptionLabel = t('modal.default_option_label');

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

        // Setting 'cities' equal to an array of objects,
        // the keys of which are the city name and geonameid properties returned by the API
        const results = options.reduce((acc, current) => {
          // Getting the last part of the url string value associated to the data object key "href" in order to keep it for Teleport API call 'city by id'
          const idString = current._links['city:item'].href
            .split('/')
            .filter((str: string) => str !== '')
            .slice(-1)
            .toString();
          acc.push({name: current.matching_full_name, geonameid: idString});
          return acc;
        }, []);
        setCities(results);

        // Transform the 'options' array to fit the pattern required by react-select
        return options.reduce((acc, current) => {
          acc.push({
            value: current.matching_full_name,
            label: current.matching_full_name
          });
          return acc;
        }, []);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const getCityPage = (optionSelected: SingleValue<SelectedOptionType>) => {
    let name: string = optionSelected!.value.split(',')[0].toLowerCase();
    // Remove whitespace if city name has any
    const hasWhiteSpace = /\s/g;
    if (hasWhiteSpace.test(name)) {
      name = name.split(' ').join('-');
    }
    // Remove accents or diacritics if city name has any
    name = name.normalize('NFD').replace(/\p{Diacritic}/gu, '');

    const city = cities.find((c) => c.name === optionSelected!.value);

    const id = city?.geonameid.split(':')[1];
    router.replace(`/city/${name}-${id}`);
    closeModal();
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={defaultOptions}
      loadOptions={getOptions}
      placeholder={t('modal.select_placeholder')}
      noOptionsMessage={() => t('modal.options_noOptionsMessage')}
      onChange={(value) => getCityPage(value)}
      onInputChange={(value) => setQuery(value)}
      styles={{
        container: (base) => ({
          ...base,
          width: '100%'
        }),
        option: (styles) => ({
          ...styles,
          cursor: 'pointer'
        }),
        control: (styles) => ({
          ...styles,
          cursor: 'pointer'
        })
      }}
    />
  );
};

export default SelectAutocomplete;