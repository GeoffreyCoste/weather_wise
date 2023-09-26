'use client'

import { PropsWithChildren } from "react"

export const ModalBackdrop = ({children}: PropsWithChildren) => {
  return (
    <div 
      id="modal-backdrop"
      className="fixed left-0 top-0 z-[90] h-screen w-full bg-blue-800/25 dark:bg-sky-400/25 backdrop-blur-sm"
    >{children}</div>
  )
}
