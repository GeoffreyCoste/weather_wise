'use client'

import { useState, ChangeEventHandler, ChangeEvent } from "react"
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

type Props = {
    legend: string;
    inputs: string[];
    order: string | string[] | undefined;
}

export const RadioGroups = ({legend, inputs, order}: Props) => {

    const [isChecked, setIsChecked] = useState<string | string[] | undefined>(order);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>): void => {
        const value = event.currentTarget.value;
        setIsChecked(value);
        const url = new URLSearchParams(Array.from(searchParams.entries()));
        
        let query: string;

        // Check if url includes search params
        if  (url.size > 0) {
          let search: string;

          // Check if sort search params is already included inside url searchparams
          const hasSort = url.has('sort');
          
          // If url search params includes sort change sort value
          // or add sort to the query string
          if (hasSort) {
            url.set('sort', value);
            search = url.toString();
            query = `?${search}`
          } else {
            search = url.toString();
            query = `?${search}&sort=${value}`
          }
        } else {
          query = `?sort=${value}`
        }
        router.replace(`${pathname}${query}`);
    }

    return (
        <fieldset className="grid grid-cols-2 gap-4">
            <legend className="sr-only">{legend}</legend>

            {inputs?.map((input, index) => (
                <div key={`${index}-8ad699be-05dd-428f-8773-0a4eaf63744a`}>
                    <input
                      type="radio"
                      name="input-sort"
                      value={input}
                      id={`radio-${input}`}
                      className="peer hidden [&:checked_+_label_svg]:block"
                      checked={isChecked === input ? true : false}
                      aria-checked={isChecked === input ? true : false}
                      onChange={(e) => handleChange(e)}
                    />

                    <label
                      htmlFor={`radio-${input}`}
                      className="block cursor-pointer rounded-full bg-white dark:bg-[#0F1A3E] border border-gray-100 hover:border-gray-200 dark:border-[#0F1A3E] dark:hover:border-blue-900 px-4 py-2 text-sm font-medium shadow-sm  peer-checked:ring-1 peer-checked:border-blue-700 peer-checked:ring-blue-700 peer-checked:border-sky-400 peer-checked:dark:ring-sky-400"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-blue-700 dark:text-white">{input === 'asc' ? 'A - Z' : 'Z - A'}</p>

                        <svg
                          className="hidden h-5 w-5 text-blue-700 dark:text-sky-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>

                    </label>
                </div>
            ))}
        </fieldset>
    )
}
