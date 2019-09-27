import React from 'react'

import * as S from './styled'
import * as T from '../../styled'
import Icon from '../../../_children/icon'

function Card({ item }) {
  const {
    title,
    url,
    recommended = false,
    features,
    price: { amount, currency },
    detail: { frequency, duration, aditional },
  } = item
  return (
    <S.Card>
      <S.CardHead recommended>
        {recommended && (
          <S.CardHeadPromotion>
            <span>¡RECOMENDADO!</span>
          </S.CardHeadPromotion>
        )}
        <S.Head>{title}</S.Head>
      </S.CardHead>
      <S.CardContent>
        <S.ContentPrice>
          <S.Price>
            <S.Currency>{currency}</S.Currency>
            <S.Amount>{amount}</S.Amount>
          </S.Price>
          <S.Detail>
            <span>{frequency}</span>
            <S.Duration>{duration}</S.Duration>
            <span>{aditional}</span>
          </S.Detail>
        </S.ContentPrice>
        <S.Feature>
          {features.map(text => (
            <S.Bullet key={text}>
              <S.BulletIcon>
                <Icon type="check" />
              </S.BulletIcon>
              <S.BulletText>{text}</S.BulletText>
            </S.Bullet>
          ))}
        </S.Feature>
      </S.CardContent>
      <S.CardFooter>
        <T.LinkSubscribe
          href={url}
          onClick={() => {
            window.sessionStorage.setItem('paywall_last_url', '/suscripciones/')
            window.sessionStorage.setItem('paywall_type_modal', 'landing')
          }}>
          SUSCRIBIRME
        </T.LinkSubscribe>
      </S.CardFooter>
    </S.Card>
  )
}

export default Card
