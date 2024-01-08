import { ReactNode, forwardRef } from "react"
import {useTheme} from '@/hooks/useTheme'

type Props = {
    children: ReactNode;
    styles?: string;
}

const ToggleMenu = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const {themeState} = useTheme();

    const {children, styles} = props;

    return (
        <div
          ref={ref}
          className={styles ?? (
            `absolute -top-4 -right-2.5 z-20 w-[212px] md:w-[235px] flex flex-col rounded-lg p-1 ${
                themeState.theme === 'light'
                    ? 'bg-zinc-50 shadow-lg'
                    : 'border-2 border-blue-900 bg-blue-950'
            }`
        )}
      >
        {children}
      </div>
    )
})

export default ToggleMenu;