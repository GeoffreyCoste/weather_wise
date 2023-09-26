import {LazyMotion, m, domAnimation} from 'framer-motion';
import {useTheme} from '@/hooks/useTheme';

type Props = {
  isMenuOpen: boolean;
  toggle: () => void;
};

const Path = (props: any) => (
  <m.path
    fill="transparent"
    strokeWidth="3"
    /* stroke="#ffffff" */
    strokeLinecap="round"
    {...props}
  />
);

const ButtonToggleMenu = ({isMenuOpen, toggle}: Props) => {
  const {themeState} = useTheme();

  return (
    <LazyMotion features={domAnimation}>
      <button
        id="button-toggle-menu"
        type="button"
        className={`absolute w-10 h-10 top-7 right-5 bg-transparent outline-none z-40 rounded-full flex justify-center items-center pt-1 border-white dark:border-blue-900 ${
          isMenuOpen && 'border border-2 shadow'
        }`}
        onClick={toggle}
        tabIndex={0}
        role="button"
        aria-label="menu-toggle"
      >
        <svg width="23" height="23" viewBox="0 0 23 23">
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

export default ButtonToggleMenu;