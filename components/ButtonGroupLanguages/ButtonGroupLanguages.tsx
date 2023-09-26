'use client';

import { useTransition, MouseEventHandler } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { usePathname } from 'next-intl/client';

const ButtonGroupLanguages = () => {

  const [isPending, startTransition] = useTransition();
  const {locale} = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (locale === 'fr') {
      startTransition(() => {
        router.replace(`/en${pathname}`);
      });
    } else {
      startTransition(() => {
        router.replace(`/fr${pathname}`);
      });
    }
  };

  return (
    <div 
      id="button-group-languages" 
      className="relative mt-2 px-1.5 py-1.5 lg:px-2 lg:py-0 inline-flex justify-between w-full rounded-full border-2 border-zinc-50 bg-white dark:border-blue-900 dark:bg-transparent shadow"
    >
        <span
          id="background-selected-language"
          className={`absolute top-1/2 z-20 inline-block h-7 w-[45%] lg:w-[42%] translate-y-[-50%] bg-blue-700 dark:bg-sky-400 dark:bg-sky-400 rounded-full transition-transform ${locale === "en" && "translate-x-[110%] lg:translate-x-[120%]"}`}
        ></span>
        <button
          className={`w-[45%] flex justify-center items-center z-[21] mr-[5%] py-1 lg:py-2 text-sm ${isPending && 'transition-opacity [&:disabled]:opacity:30'} ${locale === "fr" ? "font-semibold text-white dark:text-[#0F1A3E]" : "font-medium text-blue-700 lg:hover:text-blue-600/75 dark:font-medium dark:text-white/75 dark:hover:text-white"}`}
          type="button"
          tabIndex={0}
          role="button"
          aria-label="select-french"
          disabled={isPending}
          onClick={handleClick}
        >
          FR
        </button>
        <button
          className={`w-[45%] flex justify-center items-center z-[21] ml-[5%] py-1 lg:py-2 text-sm ${isPending && 'transition-opacity [&:disabled]:opacity:30'} ${locale === "en" ? "font-semibold text-white dark:text-[#0F1A3E]" : "font-medium text-blue-700 lg:hover:text-blue-600/75 dark:font-medium dark:text-white/75 dark:hover:text-white"}`}
          type="button"
          tabIndex={0}
          role="button"
          aria-label="select-english"
          disabled={isPending}
          onClick={handleClick}
        >
          EN
        </button>
    </div>
  );
};

export default ButtonGroupLanguages;