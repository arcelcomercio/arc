import React from 'react'
import Icon from '../icon'
import Portal from '../portal'
import * as S from './styled'

function Loading({ children, spinning, fullscreen }) {
  return (
    <Portal id="loading">
      <S.Loading spinning={spinning} fullscreen={fullscreen}>
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
