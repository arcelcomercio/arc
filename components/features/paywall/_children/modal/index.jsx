import React, { useEffect } from 'react'

import Portal from '../portal'
import * as S from './styled'

const MODAL = 'fix-modal'

function Modal({
  children,
  showClose,
  onClose = () => {},
  open = false,
  ...props
}) {
  function close() {
    onClose()
  }
  useEffect(() => {
    if (open) {
      window.document.body.classList.add(MODAL)
    } else {
      window.document.body.classList.remove(MODAL)
    }

    return () => {
      window.document.body.classList.remove(MODAL)
    }
  }, [open])

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
      <S.Modal open={open} {...props}>
        <S.Background onClick={close} />
        <S.Content>
          {open && [showClose && <S.CloseButton onClick={close} />, childrens]}
        </S.Content>
      </S.Modal>
    </Portal>
  )
}

export default Modal
