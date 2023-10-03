'use client';

import React, {useState, useEffect, useCallback} from 'react';
import dynamic from 'next/dynamic';
import {useTheme} from '@/hooks/useTheme';
import {useTranslations} from 'next-intl';
const ListWeatherCards = dynamic(() => 
  import('../ListWeatherCards/ListWeatherCards').then((mod) => mod.ListWeatherCards)
);

interface PositionInterface extends GeolocationCoordinates {
  timestamp: number;
}

const GeolocatedWeather = (settings = {}) => {
  const [click, setClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGeolocation, setHasGeolocation] = useState(false);
  const [location, setLocation] = useState<Partial<GeolocationPosition>>({});
  const [position, setPosition] = useState<Partial<PositionInterface>>({});
  const [error, setError] = useState<any>(null);
  const [cityId, setCityId] = useState<string | null>(null);

  const {themeState} = useTheme();

  const t = useTranslations('HomePage');

  const handleClick = () => {
    setClick(!click);
  };

  const handleError = (err: GeolocationPositionError) => {
    if (err.code == 1) {
      const message =
        "You've decided not to share your position, but it's OK. We won't ask you again.";
      setError(message); // PERMISSION_DENIED
    } else if (err.code == 2) {
      setError(
        "The network is down or the positioning service can't be reached."
      ); // POSITION_UNAVAILABLE
    } else if (err.code == 3) {
      setError('The attempt timed out before it could get the location data.'); // TIMEOUT
    } else {
      setError('Geolocation failed due to unknown error.');
    }
  };

  const defaultOptions = {
    enableHighAccuracy: false,
    timeout: Infinity, // amount of time before error callback is invoked (if '0', callback never invoke)
    maximumAge: 0 // maximum cached position age
  };

  const options: PositionOptions = {
    ...defaultOptions,
    ...settings
  };

  const getCoords = (options: PositionOptions) => {
    return new Promise(
      (resolve: PositionCallback, reject: PositionErrorCallback) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    );
  };

  const fetchLocation = useCallback(async () => {
    try {
      if (!navigator || !navigator.geolocation) {
        setError('Geolocation is not supported');
        return;
      } else {
        const newLocation = await getCoords(options);
        setLocation(newLocation);
      }
    } catch (err: any) {
      console.log('catch err: ', err);
      handleError(err);
      console.log('catch error: ', error);
    }
  }, []);

  const getCityId = async (lat: number, lon: number): Promise<string | undefined> => {
    try {
        const response = await fetch(`http://localhost:3000/api/location?lat=${lat}&lon=${lon}`);
  
        const json = await response.json();

        const href = json._embedded["location:nearest-cities"][0]._links["location:nearest-city"].href;
        const hrefSegments = href.split('/');
        const splitGeonameSegment = hrefSegments[hrefSegments.length - 2].split(':');
        const cityId = splitGeonameSegment[1]
  
        setCityId(cityId);
        setIsLoading(false);
        return;
  
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {

    if (Object.keys(position).length == 0 && localStorage.getItem('position')) {
        const storage = localStorage.getItem('position');
        typeof storage === 'string' && setPosition(JSON.parse(storage));
        setHasGeolocation(true);
        setIsLoading(true);
    }

    if (click) {
        fetchLocation(); // set location
        setClick(false);
    }
    
    if (!location.coords && !localStorage.getItem('position')) {
        setHasGeolocation(false);
    }

    if (!click && location.coords) {
        let newPosition;
        
        if (Object.keys(position).length == 0) {
            newPosition = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                accuracy: location.coords.accuracy,
                speed: location.coords.speed,
                heading: location.coords.heading,
                timestamp: location.timestamp
            };
            setPosition(newPosition as PositionInterface);
            setIsLoading(true);
        }

        if (Object.keys(position).length !== 0 && location.coords.latitude !== position.latitude || location.coords.longitude !== position.longitude) {
            newPosition = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                accuracy: location.coords.accuracy,
                speed: location.coords.speed,
                heading: location.coords.heading,
                timestamp: location.timestamp
            };
            setPosition(newPosition as PositionInterface);
            setIsLoading(true);
        }
    }

    if (
        !click &&
        isLoading &&
        Object.keys(position).length !== 0 &&
        typeof position.latitude === 'number' &&
        typeof position.longitude === 'number'
      ) {
        localStorage.setItem('position', JSON.stringify(position));
        setHasGeolocation(true);
      }

    if (!click && hasGeolocation && isLoading && position.latitude && position.longitude && localStorage.getItem('position')) {
        getCityId(position.latitude, position.longitude);
    }

  }, [click, hasGeolocation, isLoading, location, position]);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {!hasGeolocation ? (
        <button 
            id="button-geolocation" 
            className="w-60 font-semibold rounded-full mx-auto my-12 px-6 py-2 text-blue-700 border border-2 border-blue-700 lg:hover:text-white lg:hover:bg-gradient-to-tr lg:hover:from-blue-700 lg:hover:to-blue-400 dark:text-sky-400 dark:border-sky-400 lg:dark:hover:dark:text-[#172554] lg:dark:hover:bg-gradient-to-tl lg:dark:hover:bg-gradient-to-tr lg:dark:hover:from-sky-400 lg:dark:hover:to-cyan-300 lg:hover:border-transparent z-50"
            type="button" 
            tabIndex={0} 
            role="button" 
            aria-label="geolocation"
            onClick={handleClick}
        >
            {t('button_geolocation')}
        </button>
      ) : (
        <button 
            id="button-geolocation-refresh" 
            className="w-60 font-semibold rounded-full mx-auto my-12 px-6 py-2 text-blue-700 border border-2 border-blue-700 lg:hover:text-white lg:hover:bg-gradient-to-tr lg:hover:from-blue-700 lg:hover:to-blue-400 lg:hover:border-white dark:text-sky-400 dark:border-sky-400 lg:dark:hover:dark:text-[#172554] lg:dark:hover:bg-gradient-to-tl lg:dark:hover:bg-gradient-to-tr lg:dark:hover:from-sky-400 lg:dark:hover:to-cyan-300 lg:dark:hover:border-[#172554]"
            type="button" 
            tabIndex={0} 
            role="button" 
            aria-label="geolocation-refresh"
            onClick={handleClick}
        >
            {t('button_geolocation_refresh')}
        </button>
      )}

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <div
          className={`mx-auto max-w-md rounded-lg border border-2 py-2 text-sm font-semibold lg:text-base ${
            themeState.theme === 'light'
              ? 'border-orange-600 text-orange-600'
              : 'border-orange-600 bg-orange-950 text-orange-200'
          }`}
        >
          <p className="text-center">{error.message}</p>
        </div>
      ) : (
        cityId && (
            <ListWeatherCards cityId={cityId} />
        )
      )}
    </div>
  );
};

export default GeolocatedWeather;