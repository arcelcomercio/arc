import React from 'react'
import { useFusionContext } from 'fusion:context'
import {
  Thanks,
  ThanksImg,
  ThanksTitle,
  ThanksContent,
  ThanksBtn,
} from '../_dependencies/styled'

export default props => {
  const { siteUrl } = props
  const {
    siteProperties: { assets = {} },
    deployment,
    contextPath,
  } = useFusionContext()

  const img = assets.fullAssets(contextPath, deployment)
  return (
    <Thanks>
      <ThanksImg src={img('check')} alt="" />
      <ThanksTitle>Gracias</ThanksTitle>
      <ThanksContent>
        tu mensaje ha sido enviado, nos pondremos en contacto con usted.
      </ThanksContent>
      <ThanksBtn href={siteUrl}>Volver a gestión</ThanksBtn>
    </Thanks>
  )
}
