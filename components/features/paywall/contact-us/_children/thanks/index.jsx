import React from 'react'
import * as S from './styled'

export default props => {
  const { siteUrl = '' } = props
  return (
    <S.Thanks>
      <S.ThanksImg />
      <S.ThanksTitle>Gracias</S.ThanksTitle>
      <S.ThanksContent>
        Tu mensaje ha sido enviado, nos pondremos en contacto con usted.
      </S.ThanksContent>
      <S.ThanksBtn href={siteUrl}>Volver a gestión</S.ThanksBtn>
    </S.Thanks>
  )
}
