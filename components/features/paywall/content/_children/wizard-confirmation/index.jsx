/* eslint-disable no-extra-boolean-cast */
import React, { useEffect } from 'react'
import { withTheme } from 'styled-components'
import * as S from './styled'
import Button from '../../../_children/button'
import { PixelActions, sendAction } from '../../../_dependencies/analitycs'
import { useStrings } from '../../../_children/contexts'
import PWA from '../../_dependencies/seed-pwa'

const HOME = '/'
const NAME_REDIRECT = 'paywall_last_url'

const Item = ({ label, children }) => {
  return (
    <S.Item>
      {label} <strong>{children}</strong>
    </S.Item>
  )
}

const WizardConfirmation = props => {
  const msgs = useStrings()
  const {
    theme,
    memo: {
      order: { orderNumber },
      profile: { firstName, lastName, secondLastName, email },
      plan: {
        title: plan,
        sku,
        priceCode,
        amount,
        billingFrequency,
        description,
      },
      origin,
      referer,
      payment: { total: paidTotal, subscriptionIDs },
      printedSubscriber,
    },
  } = props

  useEffect(() => {
    PWA.finalize()
    sendAction(PixelActions.PAYMENT_CONFIRMATION, {
      transactionId: orderNumber,
      transactionAffiliation: 'Suscripciones Gestión',
      transactionTotal: paidTotal,
      transactionTax: 0,
      transactionShipping: 0,
      transactionProducts: [
        {
          sku,
          name: plan,
          category: 'Planes',
          price: amount,
          quantity: 1,
        },
      ],
      confirmacionID: subscriptionIDs[0], // Por ahora solo un producto
      periodo: billingFrequency,
      priceCode,
      suscriptorImpreso: !!printedSubscriber ? 'si' : 'no',
      medioCompra: origin,
      referer,
      pwa: PWA.isPWA() ? 'si' : 'no',
    })
    document.getElementById('footer').style.position = 'relative'
  }, [])

  // const handleClick = () => {
  //   return
  //   if (handlePWA()) return
  //   const { sessionStorage, location } = window
  //   // eslint-disable-next-line no-prototype-builtins
  //   location.href = sessionStorage.hasOwnProperty(NAME_REDIRECT) && sessionStorage.getItem(NAME_REDIRECT) !== ''
  //     ? sessionStorage.getItem(NAME_REDIRECT)
  //     : HOME
  // }

  const handleClick = () => {
    if (PWA.isPWA()) {
      PWA.pwaCloseWebView()
      return
    }
    const { sessionStorage, location } = window
    // eslint-disable-next-line no-prototype-builtins
    location.href =
      sessionStorage.hasOwnProperty(NAME_REDIRECT) &&
      sessionStorage.getItem(NAME_REDIRECT) !== ''
        ? sessionStorage.getItem(NAME_REDIRECT)
        : HOME
  }

  const Frecuency = {
    Month: 'Mensual',
    Year: 'Anual',
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <S.Panel maxWidth="1060px" direction="row">
        <S.Picture>
          <source
            media={theme.breakpoints.down('sm', false)}
            srcSet={theme.images.pixel}
          />
          <source srcSet={theme.images.confirmation_jpg} type="image/jpg" />
          <source srcSet={theme.images.confirmation_webp} type="image/webp" />
          <S.Image src={theme.images.confirmation_webp} alt="confirmación" />
        </S.Picture>

        <S.Content>
          <S.Title>
            {msgs.interpolate(msgs.welcomeNewSubscriptor, { firstName })}
          </S.Title>

          {/* <S.Subtitle>
            <strong>POR SER UN SUSCRIPTOR PREMIUM</strong>
            <br />
            tienes acceso ilimitado a las noticias más relevantes del Perú y el
            mundo totalmente gratis.
          </S.Subtitle> */}

          <S.Subtitle large>{msgs.successfulSubscription}</S.Subtitle>

          <S.CardSummary>
            <S.DetailTitle>{msgs.purchaseDetails.toUpperCase()}</S.DetailTitle>
            <Item label={`${msgs.planLabel.toUpperCase()}: `}>
              {(plan || '').toUpperCase()} -{' '}
              {Frecuency[billingFrequency].toUpperCase()}
            </Item>
            <Item label={`${msgs.nameLabel.toUpperCase()}: `}>
              <S.Names>
                {firstName} {lastName} {secondLastName}
              </S.Names>
            </Item>
            <Item label={`${msgs.priceLabel.toUpperCase()}: `}>
              {/* { paidTotal !== 0 ?  `S/ ${paidTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}` : 'GRATIS' } */}
              {paidTotal !== 0
                ? `${msgs.currencySymbol.toUpperCase()} ${paidTotal}`
                : `${msgs.freeAmount.toUpperCase()} ${description.title} ${
                    description.description
                  }`}
            </Item>
            <S.Small>{msgs.paymentNotice}</S.Small>
          </S.CardSummary>
          <S.Notice
            source={msgs.interpolate(msgs.subscriptionNotice, { email })}
          />
          <S.WrapButton>
            <Button onClick={handleClick}>{msgs.nextButton}</Button>
            {/* <S.Progress time="17s" onFinish={handleClick} /> */}
          </S.WrapButton>
        </S.Content>
      </S.Panel>
    </div>
  )
}

const ThemedWizardConfirmation = withTheme(WizardConfirmation)

export default ThemedWizardConfirmation
