import {LazyMotion, m, domAnimation} from 'framer-motion'
import NavItem from './NavItem'
import { ItemProps } from './NavItem'


type NavListProps = {
    idPrefix: string;
    itemsList: ItemProps[];
    onClick: () => void;
}

const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: {stiffness: 1000, velocity: -100}
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: {stiffness: 1000}
      }
    }
};

const NavList = ({idPrefix, itemsList, onClick}: NavListProps) => {

    return (
        <LazyMotion features={domAnimation}>
            <m.ul 
                id={`${idPrefix}-navlist`}
                className="z-40"
                variants={variants}
            >
                {itemsList.map((item, index) => (
                    <NavItem
                        key={`${index}-${Math.random().toString(36).slice(-6)}-0db7c343-a816-425c-b7fd-5e76a9da7912`}
                        item={item}
                        onClick={onClick}
                    />
                ))}
            </m.ul>
        </LazyMotion>
    )
}

export default NavList;