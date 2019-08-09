import React from 'react'
import * as S from './styled'
import { devices } from '../../../../../_dependencies/devices'
import Icon from '../../../../../_children/icon'

export default function BannerPromoSuscriptor(props) {
  const { assets, onClick } = props
  return (
    <S.Subscribed onClick={onClick} as="a">
      <div>
        <S.Picture>
          <source srcSet={assets('lector')} />
          <source
            media={`(${devices.mobile})`}
            srcSet="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
          <S.Img src={assets('lector')} alt="lector" />
        </S.Picture>
      </div>
      <S.SubscribedContent>
        <S.SubscribedText>
          <span>¿ERES SUSCRIPTOR DEL DIARIO IMPRESO?</span>
          <S.Small>ACCEDE A UN DESCUENTO PARA TU PLAN DIGITAL.</S.Small>
        </S.SubscribedText>
        <div>
          <Icon type="arrowRight" />
        </div>
      </S.SubscribedContent>
      <S.Shadow />
    </S.Subscribed>
  )
}
