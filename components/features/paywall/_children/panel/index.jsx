import React from 'react'
import * as S from './styled'

const Panel = ({ children, type = 'content', ...props }) => {
  return (
    <S.Panel type={type} {...props}>
      {children}
    </S.Panel>
  )
}

export default Panel
