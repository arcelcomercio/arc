import React from 'react'

import * as S from './styled'
import * as T from '../../styled'
import Icon from '../../../_children/icon'
import { useStrings } from '../../../_children/contexts'
import Taggeo from '../../../_dependencies/taggeo'

function Card({ item }) {
  const msgs = useStrings()
  const {
    title,
    url,
    recommended = false,
    onSubscribe = i => i,
    features,
    sku,
    price: { amount, currency },
    detail: { frequency, duration, aditional },
  } = item
  return (
    <S.Card>
      <S.CardHead recommended>
        {recommended && (
          <S.CardHeadPromotion>
            <span>{msgs.recommended}</span>
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
            Taggeo('Web_Paywall_Home', `web_paywall_home_button_${sku}`)
            onSubscribe(item)
          }}>
          {msgs.subscribe}
        </T.LinkSubscribe>
      </S.CardFooter>
    </S.Card>
  )
}

export default Card
