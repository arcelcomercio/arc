import React from 'react'

import * as S from './styled'
import Icon from '../../../_children/icon'
import { useStrings } from '../../../_children/contexts'
import Taggeo from '../../../_dependencies/taggeo'

function Card({ item, onSubscribe = i => i }) {
  const msgs = useStrings()
  const {
    title,
    subtitle,
    url,
    recommended = false,
    features,
    sku,
    price: { amount, currency },
    detail: { frequency, duration, aditional },
  } = item
  const showFree = amount === 0
  return (
    <S.Card>
      <S.CardHead recommended={recommended}>
        {recommended && (
          <>
            <S.CardHeadPromotion>
              <span>{msgs.recommended}</span>
            </S.CardHeadPromotion>
          </>
        )}
        <S.HeadContent>
          <div>{title}</div>
          <div>{subtitle}</div>
        </S.HeadContent>
      </S.CardHead>
      {recommended && <S.CardHeadTail />}
      <S.CardContent>
        <S.ContentPrice>
          <S.Price>
            {showFree ? (
              <S.AmountFree>Gratis</S.AmountFree>
            ) : (
              <>
                <S.Currency>{currency}</S.Currency>
                <S.Amount>{amount}</S.Amount>
              </>
            )}
          </S.Price>
          <S.Detail>
            {!showFree && <span>{frequency}</span>}
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
        <S.LinkSubscribe
          href={url}
          onClick={() => {
            Taggeo('Web_Paywall_Home', `web_paywall_home_button_${sku}`)
            onSubscribe(item)
          }}>
          {msgs.subscribe}
        </S.LinkSubscribe>
      </S.CardFooter>
    </S.Card>
  )
}

export default Card
