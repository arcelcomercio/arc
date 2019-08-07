import React, { useEffect } from 'react'

import Portal from '../portal'
import * as S from './styled'

function Modal({ children, showClose, onClose = () => {}, ...props }) {
  useEffect(() => {
    const _onClose = ({ key }) => {
      if (key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', _onClose)
    return () => {
      window.removeEventListener('keydown', _onClose)
    }
  })
  return (
    <Portal id="modal">
      <S.Modal {...props}>
        <S.Background onClick={onClose} />
        <S.Content>
          {showClose && <S.CloseButton onClick={onClose} />}
          {children}
        </S.Content>
      </S.Modal>
    </Portal>
  )
}

export default Modal
