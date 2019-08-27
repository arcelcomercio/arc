import React from 'react'
import Icon from '../icon'
import * as S from './styled'

function ClickToCall({href}) {
  return (
    <S.Button as="a" href={href} target="_blank" rel="noopener noreferrer">
      <span>
        ¿Necesitas ayuda?
        <Icon type="support" />
      </span>
    </S.Button>
  )
}

export default ClickToCall
