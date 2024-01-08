'use client'

import {useContext} from 'react'
import { ModalContext, ModalContextInterface } from '@/context/modalContext'

export const useModal = () => {
  const {isOpen, open, close} = useContext(ModalContext) as ModalContextInterface;
  return {isOpen, open, close};
};