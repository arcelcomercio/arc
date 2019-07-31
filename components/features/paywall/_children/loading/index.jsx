import React, { memo, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Icon from '../icon'
import * as S from './styled'

const PortalFunction = ({ id, children }) => {
  const el = useRef(
    document.getElementById(id) || document.createElement('div')
  )
  const [dynamic] = useState(!el.current.parentElement)
  useEffect(() => {
    if (dynamic) {
      el.current.id = id
      document.body.appendChild(el.current)
    }
    return () => {
      if (dynamic && el.current.parentElement) {
        el.current.parentElement.removeChild(el.current)
      }
    }
  }, [id])
  return createPortal(children, el.current)
}

const Portal = memo(PortalFunction)

function Loading({ children, spinning, fullscreen }) {
  if (!spinning) return <>{children}</>
  return (
    <Portal id="loading">
      <S.Loading fullscreen={fullscreen}>
        <S.Background>
          <S.WrapIcon>
            <Icon type="gloading" />
            <Icon type="gloading" />
            <Icon type="gloading" />
          </S.WrapIcon>
        </S.Background>
        {fullscreen ? false : children}
      </S.Loading>
    </Portal>
  )
}

export default Loading
