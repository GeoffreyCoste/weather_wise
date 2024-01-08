import { FooterButtonLogo } from "./FooterButtonLogo/FooterButtonLogo"
import { ListSocialButtons } from "../ListSocialButtons/ListSocialButtons"
import { TextCopyright } from "./TextCopyright/TextCopyright"
import { FooterTopBackground } from "./FooterTopBackground/FooterTopBackground"

export const Footer = () => {

  return (
    <footer className="mt-20 w-full pb-10 overflow-hidden">
        <div className="relative flex w-full h-72 max-h-fit">
          <FooterTopBackground />
        </div>
        <div className="flex w-full flex-wrap items-center justify-center sm:justify-between mt-20">
            <FooterButtonLogo />
            <ListSocialButtons />
        </div>
        <TextCopyright />
    </footer>
  )
}
