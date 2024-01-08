'use client'

import { useRouter } from "next/navigation"
import { ArrowCircleLeftIcon } from "../SvgIcons/ArrowCircleLeftIcon/ArrowCircleLeftIcon"


const ButtonNavigateBackward = () => {

  const router = useRouter();

  return (
    <button 
      type="button" 
      className="flex lg:hidden" 
      onClick={() => router.back()}
      tabIndex={0} 
      role="button"
      aria-label="navigate-backward"
    >
      <ArrowCircleLeftIcon />
    </button>
  )
}

export default ButtonNavigateBackward;