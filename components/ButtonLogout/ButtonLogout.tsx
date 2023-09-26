'use client'

import { signOut} from 'next-auth/react'

export const ButtonLogout = () => {
  return (
    <button 
        id="button-logout"
        className="font-semibold rounded-full px-4 py-2 text-white bg-gradient-to-tr from-blue-700 to-blue-400 lg:hover:bg-gradient-to-tl dark:text-[#172554] dark:bg-gradient-to-tr dark:from-sky-400 dark:to-cyan-300 lg:dark:hover:bg-gradient-to-tl"
        type="button" 
        tabIndex={0} 
        role="button" 
        aria-label="logout"
        onClick={() => signOut({ callbackUrl: "/" })}
    >
        Logout
    </button>
  )
}
