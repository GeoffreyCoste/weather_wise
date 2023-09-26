import { ReactNode } from 'react'

type Props = {
    label: string;
    children: ReactNode;
}

export const ButtonSocial = ({label, children}: Props) => {
  return (
    <button
        id={`button-${label}`}
        type="button"
        className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 sm:border-[3px] border-blue-700 dark:border-sky-400 relative"
        tabIndex={0}
        role="button"
        aria-label={label}
    >
        {children}
    </button>
  )
}
