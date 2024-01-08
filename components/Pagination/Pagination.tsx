'use client'

import { MouseEvent } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

type Props = {
    page?: string;
    totalPages: number;
    hasNextPage: boolean;
    order: string | string[] | undefined;
}

export const Pagination = (props: Props) => {
    
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      console.log('href: ', event.currentTarget.href);
      if (searchParams.size) {
        const sort = searchParams.has('sort');
        const filters = searchParams.has('filters');
        let query: string;

        if (sort && !filters) {
          const sortValue = searchParams.get('sort');
          query = `${event.currentTarget.href}&sort=${sortValue}`;
          router.push(query);
        } else if (!sort && filters) {
          const filtersValues = searchParams.get('filters');
          query = `${event.currentTarget.href}&filters=${filtersValues}`;
          router.push(query);
        } else if (sort && filters) {
          const sortValue = searchParams.get('sort');
          const filtersValues = searchParams.get('filters');
          query = `${event.currentTarget.href}&sort=${sortValue}&filters=${filtersValues}`;
          router.push(query);
        } else {
          router.push(event.currentTarget.href);
        }

      } else {
        router.push(event.currentTarget.href);
      }
    }

    const { page = 1, totalPages, hasNextPage} = props;

    const currentPage = Math.min(Math.max(Number(page), 1), totalPages);

    const getRange = (start: number, end: number) => {
      return Array.from(
        { length: end - start + 1 },
        (_, i) => i + start,
      )
    };

    const getPagesRange = () => {
      const siblingCount = 2; // Min number of page buttons to be shown on each side of the current page button
      const totalPageNumbers = siblingCount + 5; // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS

      // If totalPages is less than the total page numbers wanted to be shown
      // return range from 1 to totalPages
      if (totalPageNumbers >= totalPages) {
        return getRange(1, totalPages);
      }

      // Calculate left and right sibling index and make sure they are within range 1 to totalPages
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPages
      );

      // Not showing dots when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPages
      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

      const firstPageIndex = 1;
      const lastPageIndex = totalPages;

      // No left dots to show, but right dots to be shown
      if (!shouldShowLeftDots && shouldShowRightDots) {
        let leftItemCount = 3 + 2 * siblingCount;
        let leftRange = getRange(1, leftItemCount);

        return [...leftRange, 'DOTS', totalPages];
      }

      // No right dots, but left dots to be shown
      if (shouldShowLeftDots && !shouldShowRightDots) {
        let rightItemCount = 3 + 2 * siblingCount;
        let rightRange = getRange(rightItemCount, totalPages);

        return [firstPageIndex, 'DOTS', ...rightRange];
      }

      // Both left and right dots to be shown
      if (shouldShowLeftDots && shouldShowRightDots) {
        let middleRange = getRange(leftSiblingIndex, rightSiblingIndex);

        return [firstPageIndex, 'DOTS', ...middleRange, 'DOTS', lastPageIndex];
      }
    }

    const pages = getPagesRange();

    return (
      <div>
        <ol className="flex justify-center gap-1 text-xs font-medium">
          <li key="110e0735-7b51-4e85-8f41-d93a1e5ba90f">
            <Link
              className={`inline-flex h-8 w-8 items-center justify-center rounded-full rtl:rotate-180 ${currentPage === 1 ? 'pointer-events-none text-gray-400' : 'text-blue-700 hover:text-white hover:bg-blue-700 dark:text-white dark:hover:text-[#0F1A3E] dark:hover:bg-sky-400'}`}
		  	    	href={`?page=${currentPage - 1}`}
              onClick={handleClick}
		  	    >
		  	    	<span className="sr-only">Previous Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
		  	    </Link>
          </li>

          {pages?.map((p, i) => {
            // If page item is 'DOTS', render dots unicode character
            if (p === 'DOTS') {
              return <li>&#8230;</li>
            };

            // Render page Link
            return (
              <li key={`${i}-5e41ae6d-9be4-4859-aad4-5e5853b896aa`}>
                <Link
                  className={`h-8 w-8 flex justify-center items-center rounded-full leading-8 ${p === currentPage ? 'pointer-events-none font-bold text-white bg-blue-700 dark:text-[#0F1A3E] dark:bg-sky-400' : 'text-blue-700 hover:font-bold hover:text-white hover:bg-blue-700 dark:text-white dark:hover:text-[#0F1A3E] dark:hover:bg-sky-400'}`}
		  			    	href={`?page=${p}`}
                  onClick={handleClick}
		  			    >
		  			    	{p}
		  			    </Link>
              </li>
            )
          })}

          <li key="9c7269da-0fa4-44e8-bebb-14ae1b9add99">
            <Link
              className={`inline-flex h-8 w-8 items-center rounded-full justify-center rtl:rotate-180 ${!hasNextPage ? 'pointer-events-none text-gray-400' : 'text-blue-700 hover:text-white hover:bg-blue-700 dark:text-white dark:hover:text-[#0F1A3E] dark:hover:bg-sky-400'}`}
		  	    	href={`?page=${currentPage + 1}`}
              onClick={handleClick}
		  	    >
		  	    	<span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
		  	    </Link>
          </li>
        </ol>
		  </div>
    )
}