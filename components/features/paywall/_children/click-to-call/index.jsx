import React from 'react'
import Icon from '../icon'
import * as S from './styled'
import Taggeo from '../../_dependencies/taggeo'

function ClickToCall({ href }) {
  return (
    <S.Button
      as="a"
      href={href}
      onClick={() => Taggeo('Web_Paywall_Home', 'web_paywall_home_call')}
      target="_blank"
      rel="noopener noreferrer">
      <span>
        <span>¿AYUDA?</span>
        <Icon type="phone" />
      </span>
    </S.Button>
  )
}

export default ClickToCall
