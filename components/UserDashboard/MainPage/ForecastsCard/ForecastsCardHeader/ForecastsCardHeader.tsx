import CardTitle from './CardTitle/CardTitle'
import CardLocation from './CardLocation/CardLocation'
import Badge from '@/components/Badge/Badge'
import HomeIcon from '@/public/icons/home.svg'
import { CityData } from '@/@types/api-datas'
import LinkNavigateForward from '@/components/LinkNavigateForward/LinkNavigateForward'

type Props = {
  city: CityData;
}

const ForecastsCardHeader = ({city}: Props) => {
  return (
    <div className="flex flex-wrap">
      <div className="basis-full flex justify-between items-center">
        <CardTitle />
        <LinkNavigateForward href="/user/dashboard/forecasts" />
      </div>
      <div className="basis-full flex flex-col md:flex-row mb-6">
        <CardLocation {...city} />
        <Badge 
          badgeStyle="inline-flex items-center justify-center rounded-full bg-yellow-100 md:ml-4 mr-auto md:mr-0 px-2.5 py-0.5 gap-x-2"
          textStyle="whitespace-nowrap text-xs font-semibold md:text-sm md:font-medium text-amber-700"
          translation={{namespace: "DashboardMainPage", value: "forecastsCard.badge_residence"}}
          iconPath={HomeIcon}
          iconAlt="Home Icon"
        />
      </div>
    </div>
  )
}

export default ForecastsCardHeader;