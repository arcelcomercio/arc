import React from 'react'
import Icon from '../icon'
import * as S from './styled'

function Loading({ children, spinning }) {
  if (!spinning) return <>{children}</>
  return (
    <S.Loading>
      <S.Background>
        <S.WrapIcon>
          <Icon width="46" height='46' fill="#FFF" type="loading" />
        </S.WrapIcon>
      </S.Background>
      {children}
    </S.Loading>
  )
}

export default Loading
