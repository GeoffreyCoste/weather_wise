import { ReactNode } from 'react'

type Props = {
    children: ReactNode;
    background: boolean;
};

export const CardLayout = ({children, background}: Props) => {
  return (
    <div
        className={`w-full max-w-lg mb-4 rounded-lg px-4 pb-8 pt-6 ${background ? "bg-sky-100 text-blue-700 dark:border-2 dark:border-[#0F1A3E] dark:bg-[#0F1A3E] dark:text-sky-400" : "border-2 border-blue-700 text-blue-700 dark:border-sky-400 dark:text-sky-400"}`}
    >
        {children}
    </div>
  )
}
