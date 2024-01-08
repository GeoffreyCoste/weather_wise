import { ButtonSocial } from '../ButtonSocial/ButtonSocial'
import { FacebookIcon } from '../SvgIcons/FacebookIcon/FacebookIcon'
import { InstagramIcon } from '../SvgIcons/InstagramIcon/InstagramIcon'
import { TwitterIcon } from '../SvgIcons/TwitterIcon/TwitterIcon'
import { YoutubeIcon } from '../SvgIcons/YoutubeIcon/YoutubeIcon'

export const ListSocialButtons = () => {

    const icons = [
        { label: 'facebook', svg: <FacebookIcon />},
        { label: 'instagram', svg: <InstagramIcon />},
        { label: 'twitter', svg: <TwitterIcon />},
        { label: 'youtube', svg: <YoutubeIcon />}
    ];

  return (
    <ul id="list-social-buttons" className="my-8 flex basis-full items-center justify-center pl-2 sm:basis-1/2 sm:pl-0 md:my-0">
        {icons.map((icon, index) => (
            <li key={`${index}-ffde4133-cd3b-47e6-801e-66bd742bf0b4`} className={`${index !== icons.length - 1 ? "mr-2" : ""}`}>
                <ButtonSocial label={icon.label}>
                    {icon.svg}
                </ButtonSocial>
            </li>
        ))}
    </ul>
  )
}
