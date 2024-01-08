'use client'

import { PropsWithChildren, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"
import { useModal } from "@/hooks/useModal"
import { useClickOutside } from "@/hooks/useClickOutside"
import { ButtonCloseModal } from "@/components/ButtonCloseModal/ButtonCloseModal"

export const ModalDialog = ({children}: PropsWithChildren) => {

  const modalRef = useRef<HTMLDivElement>(null);
  const {isOpen, close} = useModal();

  const t = useTranslations('LocaleLayout');

  const handleClickInside = () => {
    return
  }

  const handleClickOutside = () => {
    if(isOpen) {
      close();
    }
  }

  useClickOutside(modalRef, handleClickOutside);

  return (
    <AnimatePresence>
      {isOpen && (
          <motion.div
              key="modal"
              ref={modalRef}
              onClick={handleClickInside}
              id="modal-dialog"
              className="flex h-3/4 w-11/12 sm:w-full flex-col items-center rounded-lg p-4 sm:h-4/5 sm:max-w-lg sm:p-6 md:h-[28rem] bg-white dark:bg-blue-950 z-[100]"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="dialog_label"
              aria-describedby="dialog_desc"
              initial={{x: 'calc(50vw - 50%)', y: -1000, opacity: 0}}
              animate={{x: 'calc(50vw - 50%)', y: 100, opacity: 1, transition: { delay: 0.5 }}}
          >
              <ButtonCloseModal />
              <h3
                className="my-4 w-full text-center font-bold text-blue-700 dark:text-white"
              >
                {t('modal.title')}
              </h3>
              {children}
          </motion.div>
      )
      }
    </AnimatePresence>
  )
}
