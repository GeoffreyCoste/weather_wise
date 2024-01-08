'use client'

import {PropsWithChildren} from 'react'
import { createPortal } from 'react-dom'

export const ModalPortal = ({children}: PropsWithChildren) => {

  return createPortal (
    <div id="modal-root">
        {children}
    </div>,
    document.body
  )
}
