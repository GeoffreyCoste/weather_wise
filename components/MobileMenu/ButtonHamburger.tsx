import {LazyMotion, m, domAnimation} from 'framer-motion'
import {useTheme} from '@/hooks/useTheme'

type Props = {
  toggled: boolean;
  toggle: () => void;
};

const Path = (props: any) => (
  <m.path
    fill="transparent"
    strokeWidth="3"
    strokeLinecap="round"
    {...props}
  />
);

const ButtonHamburger = ({toggled, toggle}: Props) => {
  const {themeState} = useTheme();

  return (
    <LazyMotion features={domAnimation}>
      <button
        id="button-toggle-menu"
        type="button"
        className={`absolute top-10 right-7 bg-transparent outline-none z-40 rounded-full flex justify-center items-center ${
          toggled ? 'before:absolute before:-z-1 before:-top-[10px] before:-right-[6px] before:w-[40px] before:h-[40px] before:border before:border-2 before:border-white dark:before:border-blue-900 before:rounded-full before:backdrop-blur-sm before:shadow' : ''
        }`}
        onClick={toggle}
        tabIndex={0}
        role="button"
        aria-label="menu-toggle"
      >
        <svg className="z-40" width="23" height="23" viewBox="0 0 23 23">
          <Path
            stroke={themeState.theme === 'light' ? '#1d4ed8' : '#38bdf8'}
            variants={{
              closed: {d: 'M 2 2.5 L 20 2.5'},
              open: {d: 'M 3 16.5 L 17 2.5'}
            }}
          />
          <Path
            d="M 2 9.423 L 20 9.423"
            stroke={themeState.theme === 'light' ? '#1d4ed8' : '#38bdf8'}
            variants={{
              closed: {opacity: 1},
              open: {opacity: 0}
            }}
            transition={{duration: 0.1}}
          />
          <Path
            stroke={themeState.theme === 'light' ? '#1d4ed8' : '#38bdf8'}
            variants={{
              closed: {d: 'M 2 16.346 L 20 16.346'},
              open: {d: 'M 3 2.5 L 17 16.346'}
            }}
          />
        </svg>
      </button>
    </LazyMotion>
  );
};

export default ButtonHamburger;