import { getServerSession } from "next-auth"
import Navbar from "./Navbar/Navbar"
import ButtonToggleTheme from "../ButtonToggleTheme/ButtonToggleTheme"
import { HeaderButtonLogo } from "./HeaderButtonLogo/HeaderButtonLogo"
import ButtonLogin from "../ButtonLogin/ButtonLogin"
import { ButtonLogout } from "../ButtonLogout/ButtonLogout"
import { ButtonOpenModal } from "../ButtonOpenModal/ButtonOpenModal"
import SettingsCollapsibleMenu from "../SettingsCollapsibleMenu/SettingsCollapsibleMenu"
import UserCollapsibleMenu from "../UserCollapsibleMenu/UserCollapsibleMenu"
import { MobileMenu } from "../MobileMenu/MobileMenu"

type Props = {
  themeCookie: string;
  temperatureCookie: string;
}

export const Header = async ({themeCookie, temperatureCookie}: Props) => {
  
  const {user} = await getServerSession() || {};

  return (
    <header className="flex w-full flex-wrap items-center justify-between py-4">
      <div className="flex w-full flex-wrap items-center px-4 md:flex-nowrap md:justify-between md:px-6">
        <HeaderButtonLogo />
        <MobileMenu themeCookie={themeCookie} temperatureCookie={temperatureCookie} />
        <ButtonOpenModal />
        <ButtonToggleTheme checkboxId="checkbox-theme-toggle" themeCookie={themeCookie} styleVariations="hidden lg:flex my-8 lg:my-0 lg:mr-6 " />
        {user ? (
          <UserCollapsibleMenu {...user} />
        ) : (
          <SettingsCollapsibleMenu temperatureCookie={temperatureCookie} />
        )}
        {user ? (
          <ButtonLogout styleVariations="hidden lg:block w-36"
        />
        ) : (
          <ButtonLogin styleVariations="hidden lg:block w-36" />
        )}
      </div>
      <Navbar />
    </header>
  )
}
