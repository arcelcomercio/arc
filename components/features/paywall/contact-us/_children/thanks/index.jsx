import React from 'react'
import * as S from './styled'
import { useFusionContext } from 'fusion:context'

export default props => {
  const { siteUrl = '' } = props
  const {
    siteProperties: { assets = {} },
    deployment,
    contextPath,
  } = useFusionContext()
  const sideImage = assets.fullAssets(contextPath, deployment)('check')
  return (
    <S.Thanks>
      <S.ThanksImg src={sideImage} alt="check" />
      <S.ThanksTitle>Gracias</S.ThanksTitle>
      <S.ThanksContent>
        Tu mensaje ha sido enviado, nos pondremos en contacto con usted.
      </S.ThanksContent>
      <S.ThanksBtn href={siteUrl}>Volver a gestión</S.ThanksBtn>
    </S.Thanks>
  )
}
