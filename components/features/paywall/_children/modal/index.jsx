import React, { useEffect } from 'react'

import Portal from '../portal'
import * as S from './styled'

function Modal({ children, close = () => {}, ...props }) {
  useEffect(() => {
    const onClose = ({ key }) => {
      if (key === 'Escape') {
        close()
      }
    }
    window.addEventListener('keydown', onClose)
    return () => {
      window.removeEventListener('keydown', onClose)
    }
  })
  return (
    <Portal id="modal">
      <S.Modal {...props}>
        <S.Background onClick={close} />
        <S.Content>{children}</S.Content>
      </S.Modal>
    </Portal>
  )
}

export default Modal
