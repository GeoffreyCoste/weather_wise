type FilterObj = {
    [key: string]: string;
}

type MapFiltersProps = {
    arr: FilterObj[];
    prop: string;
}

type Continent = {
    category: string;
    index: string;
    countries: string[];
}

type Country = {
    category: string;
    index: string;
    continent: string;
}

export const mapDataPropsToFilters = ({arr, prop}: MapFiltersProps) => {
    // Use Map object to remove obj with duplicate 'prop' value
    const removeDuplicates = (arr: any[]) => {
        return [...new Map(arr.map(el => [el[prop], el])).values()];
    };

    const noDuplicate = removeDuplicates(arr);

    const countries: Country[] = noDuplicate.map(el => {
            return {category: 'country', index: el.countryIndexFr || el.countryIndexEn, continent: el.continentIndexFr || el.continentIndexEn}
        }
    );

    const continents = noDuplicate.reduce((acc: Continent[], curr) => {
        let found = acc.find(el => el.index === curr.continentIndexFr || el.index === curr.continentIndexEn);

        let country = curr.countryIndexFr || curr.countryIndexEn;
        
        if (!found) {
          acc.push({category: 'continent', index: curr.continentIndexFr || curr.continentIndexEn, countries: [country]})
        } else {
          found.countries.push(country);
        }
    
        return acc;
    }, []);

    return {continents, countries};
}