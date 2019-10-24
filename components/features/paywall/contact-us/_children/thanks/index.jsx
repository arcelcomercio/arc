import React from 'react'
import * as S from './styled'
import { useStrings } from '../../../_children/contexts'

export default props => {
  const msgs = useStrings()
  const { siteUrl = '' } = props
  return (
    <S.Thanks>
      <S.ThanksImg />
      <S.ThanksTitle>{msgs.thanks}</S.ThanksTitle>
      <S.ThanksContent>{msgs.messageSendNotification}</S.ThanksContent>
      <S.ThanksBtn href={siteUrl}>{msgs.returnTo}</S.ThanksBtn>
    </S.Thanks>
  )
}
