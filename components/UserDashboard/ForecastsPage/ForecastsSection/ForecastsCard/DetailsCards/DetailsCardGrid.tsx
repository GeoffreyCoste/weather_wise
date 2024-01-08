'use client'

import { useState, useEffect } from "react"
import { OpenMeteoData } from "@/@types/openmeteo"
import { getWindDirection } from "@/utils/getWindInfos"
import { getAirQuality } from "@/utils/getAirQuality"
import { setRiskLevel } from "@/utils/setRiskLevel"
import CardWind from "./CardWind/CardWind"
import CardUV from "./CardUV/CardUV"
import CardAir from "./CardAir/CardAir"
import CardHumidity from "./CardHumidity/CardHumidity"
import VeryHappyFaceIcon from "@/components/SvgIcons/Emojis/VeryHappyFaceIcon/VeryHappyFaceIcon"
import HappyFaceIcon from "@/components/SvgIcons/Emojis/HappyFaceIcon/HappyFaceIcon"
import NormalFaceIcon from "@/components/SvgIcons/Emojis/NormalFaceIcon/NormalFaceIcon"
import ConfusedFaceIcon from "@/components/SvgIcons/Emojis/ConfusedFaceIcon/ConfusedFaceIcon"
import DisappointedFaceIcon from "@/components/SvgIcons/Emojis/DisappointedFaceIcon/DisappointedFaceIcon"
import AngryFaceIcon from "@/components/SvgIcons/Emojis/AngryFaceIcon/AngryFaceIcon"
import EyesIcon from "@/components/SvgIcons/Emojis/EyesIcon/EyesIcon"


type Props = {
    weather: OpenMeteoData | undefined;
    airQuality?: any;
    dayIndex: number;
    isWeeklyBasis: boolean;
}

const DetailsCardsGrid = ({weather, airQuality, dayIndex, isWeeklyBasis}: Props) => {

  const selectFaceIcon = (str: string | undefined) => {
    switch (str) {
      case 'good':
        return 0;
        break;
      case 'fair':
        return 1;
        break;
      case 'moderate':
        return 2;
        break;
      case 'poor':
        return 3;
        break;
      case 'very_poor':
        return 4;
        break;
      case 'extremely_poor':
        return 5;
        break;
      default:
        return 6;
    }
  }

  const faceIndex: number | null = selectFaceIcon(getAirQuality(airQuality?.current?.european_aqi));


  const faces = [
    <VeryHappyFaceIcon classNames="w-8 h-8" />,
    <HappyFaceIcon classNames="w-8 h-8" />,
    <NormalFaceIcon classNames="w-8 h-8" />,
    <ConfusedFaceIcon classNames="w-8 h-8" />,
    <DisappointedFaceIcon classNames="w-8 h-8" />,
    <AngryFaceIcon classNames="w-8 h-8" />,
    <EyesIcon classNames="w-8 h-8" />
  ];

  const wind = {
    title: 'forecastsCard.details_weather.cards.wind.title',
    value: weather?.current?.windspeed_10m,
    direction: `forecastsCard.details_weather.cards.wind.direction.${getWindDirection(weather?.daily?.winddirection_10m_dominant[dayIndex])}`,
    angle: weather?.daily?.winddirection_10m_dominant[dayIndex]
  };

  const uv = {
    title: 'forecastsCard.details_weather.cards.uv.title',
    value: Math.floor(weather!.daily!.uv_index_max[0]),
    desc: `forecastsCard.details_weather.cards.uv.desc.${setRiskLevel(weather?.daily?.uv_index_max[dayIndex])}`
  };

  const air = {
    title: 'forecastsCard.details_weather.cards.air.title',
    img: faces[faceIndex],
    desc: `forecastsCard.details_weather.cards.air.desc.${getAirQuality(airQuality?.current.european_aqi)}`,
  };

  const humidity = {
    title: 'forecastsCard.details_weather.cards.humidity.title',
    value: weather?.current?.relativehumidity_2m
  };

  const components = [
    <CardWind title={wind.title} value={wind.value} direction={wind.direction} angle={wind.angle} />,
    <CardUV title={uv.title} value={uv.value} desc={uv.desc} />,
    <CardAir title={air.title} img={air.img} desc={air.desc} />,
    <CardHumidity title={humidity.title} value={humidity.value} />
  ];

  const [cards, setCards] = useState(components);
  
  useEffect(() => {
    if (isWeeklyBasis) {
      const twoCards = components.slice(0, 2);
      setCards(twoCards);
    } else {
      setCards(components);
    }
  }, [isWeeklyBasis])

  return (
    <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-4 mb-4">
      {cards.map((card, index) => (
        <div key={`${index}-c795d36d-3bbf-42e0-8f72-df75f7c3538f`} className="w-full max-w-lg flex flex-col items-center justify-between rounded-lg p-4 text-blue-700 dark:text-white bg-white dark:bg-blue-950">
          {card}
        </div>
      ))}
    </div>
  )
}

export default DetailsCardsGrid;