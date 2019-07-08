import React from 'react'
import * as S from './styled'

const Panel = ({ children, type = 'content', valing = null }) => {
  return (
    <S.Panel type={type} valing={valing}>
      {children}
    </S.Panel>
  )
}

export default Panel
