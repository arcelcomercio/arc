import React from 'react'
import * as S from './styled'

function BulletPoint({ icon, children }) {
  return (
    <S.Feature>
      <S.WrapIcon>{icon}</S.WrapIcon>
      <div>{children}</div>
    </S.Feature>
  )
}

export default BulletPoint
