import React from 'react'

import Portal from '../portal'
import * as S from './styled'

function Loading({ children, loadingIcon, spinning, fullscreen }) {
  return (
    <Portal id="loading">
      <S.Loading spinning={spinning} fullscreen={fullscreen}>
        <S.Background>
          <S.WrapIcon>
            {[
              React.cloneElement(loadingIcon, {
                key: 'loadingIcon_1',
                ...loadingIcon.props,
              }),
              React.cloneElement(loadingIcon, {
                key: 'loadingIcon_2',
                ...loadingIcon.props,
              }),
              React.cloneElement(loadingIcon, {
                key: 'loadingIcon_3',
                ...loadingIcon.props,
              }),
            ]}
          </S.WrapIcon>
        </S.Background>
        {fullscreen ? false : children}
      </S.Loading>
    </Portal>
  )
}

export default Loading
