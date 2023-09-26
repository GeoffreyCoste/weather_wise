import Navbar from "./Navbar/Navbar";
import ButtonToggleTheme from "../ButtonToggleTheme/ButtonToggleTheme";
import { HeaderButtonLogo } from "./HeaderButtonLogo/HeaderButtonLogo";
import ButtonLogin from "../ButtonLogin/ButtonLogin";
import { ButtonOpenModal } from "../ButtonOpenModal/ButtonOpenModal";
import CollapsibleMenu from "../CollapsibleMenu/CollapsibleMenu";

type Props = {
  themeCookie: string;
  temperatureCookie: string;
}

export const Header = ({themeCookie, temperatureCookie}: Props) => {
  return (
    <header className="flex w-full flex-wrap items-center justify-between py-4">
      <div className="flex w-full flex-wrap items-center px-4 sm:flex-nowrap sm:justify-between md:px-6">
        <HeaderButtonLogo />
        <ButtonOpenModal />
        <ButtonToggleTheme checkboxId="checkbox-theme-toggle" themeCookie={themeCookie} styleVariations="hidden lg:flex" />
        <CollapsibleMenu temperatureCookie={temperatureCookie} />
        <ButtonLogin styleVariations="hidden lg:block w-36" />
      </div>
      <Navbar />
    </header>
  )
}
