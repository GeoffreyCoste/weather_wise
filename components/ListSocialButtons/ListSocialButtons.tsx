import React from 'react'
import { ButtonSocial } from '../ButtonSocial/ButtonSocial'
import { SvgFacebook } from './SvgFacebook/SvgFacebook';
import { SvgInstagram } from './SvgInstagram/SvgInstagram';
import { SvgTwitter } from './SvgTwitter/SvgTwitter';
import { SvgYoutube } from './SvgYoutube/SvgYoutube';

export const ListSocialButtons = () => {

    const icons = [
        { label: 'facebook', svg: <SvgFacebook />},
        { label: 'instagram', svg: <SvgInstagram />},
        { label: 'twitter', svg: <SvgTwitter />},
        { label: 'youtube', svg: <SvgYoutube />}
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
