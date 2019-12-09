import React from 'react'

import Icon from '../icon'
import * as S from './styled'
import Taggeo from '../../_dependencies/taggeo'

function ClickToCall({ href, text, ...restProps }) {
  return (
    <S.Button
      as="a"
      href={href}
      onClick={() => Taggeo('Web_Paywall_Home', 'web_paywall_home_call')}
      target="_blank"
      rel="noopener noreferrer"
      {...restProps}>
      <span>
        {text && <span>{text}</span>}
        <Icon type="phone" />
      </span>
    </S.Button>
  )
}

export default ClickToCall
