import React, { useEffect } from 'react'
import styled from 'styled-components'

import Icon from '../icon'
import Portal from '../portal'
import * as S from './styled'

const CloseIcon = styled(Icon)`
  position: absolute;
  top: 30px;
  right: 30px;
`
CloseIcon.defaultProps = {
  type: 'close',
}

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
          {showClose && <CloseIcon onClick={onClose} />}
          {children}
        </S.Content>
      </S.Modal>
    </Portal>
  )
}

export default Modal
