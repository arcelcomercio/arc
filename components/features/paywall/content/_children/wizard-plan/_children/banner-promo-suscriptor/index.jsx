import React from 'react'
import * as S from './styled'
import { devices } from '../../../../../_dependencies/devices'
import Icon from '../../../../../_children/icon'

export default function BannerPromoSuscriptor(props) {
  const { assets, onClick, type } = props
  return (
    <>
      {type === 'left' ? (
        <S.Subscribed left onClick={onClick} as="a">
          {/* <div>
            <S.Picture>
              <source srcSet={assets('lector')} />
              <source
                media={`(${devices.mobile})`}
                srcSet="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              />
              <S.Img src={assets('lector')} alt="lector" />
            </S.Picture>
          </div> */}
          <S.SubscribedContent red>
            <S.SubscribedText>
              <span>¿ERES SUSCRIPTOR DEL DIARIO IMPRESO GESTIÓN?</span>
              <S.Small>ADQUIERE EL PLAN DIGITAL GRATIS POR 3 MESES.</S.Small>
            </S.SubscribedText>
            <div>
              <Icon type="arrowRight" />
            </div>
          </S.SubscribedContent>
          <S.Shadow />
        </S.Subscribed>
      ) : (
        <S.Subscribed right onClick={onClick} as="a">
          <S.SubscribedContent gray>
            <S.SubscribedText>
              <S.Small>¿ERES EMPRESA? CONSULTA NUESTRAS</S.Small>
              <span>SUSCRIPCIONES CORPORATIVAS</span>
            </S.SubscribedText>
            <div>
              <Icon type="arrowRight" />
            </div>
          </S.SubscribedContent>
          <S.Shadow />
        </S.Subscribed>
      )}
    </>
  )
}
