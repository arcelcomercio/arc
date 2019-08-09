import React, { useEffect } from 'react'

import Portal from '../portal'
import * as S from './styled'

function Modal({ children, showClose, onClose = () => {}, ...props }) {
  function close() {
    onClose()
  }
  useEffect(() => {
    const _onClose = ({ key }) => {
      if (key === 'Escape') {
        close()
      }
    }
    window.addEventListener('keydown', _onClose)
    return () => {
      window.removeEventListener('keydown', _onClose)
    }
  }, [])

  const childrens = React.Children.map(children, child =>
    React.cloneElement(child, { close })
  )
  return (
    <Portal id="modal">
      <S.Modal {...props}>
        <S.Background onClick={close} />
        <S.Content>
          {showClose && <S.CloseButton onClick={close} />}
          {childrens}
        </S.Content>
      </S.Modal>
    </Portal>
  )
}

export default Modal
