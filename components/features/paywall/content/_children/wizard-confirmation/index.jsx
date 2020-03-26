/* eslint-disable no-extra-boolean-cast */
/* global Identity fbq dataLayer navigator */
import React, { useEffect } from 'react'
import { withTheme } from 'styled-components'
import { useFusionContext } from 'fusion:context'
import * as S from './styled'
import Button from '../../../_children/button'
import Picture from '../../../_children/picture'
import { PixelActions, sendAction } from '../../../_dependencies/analitycs'
import { useStrings } from '../../../_children/contexts'
import PWA from '../../_dependencies/seed-pwa'
import { pushCxense } from '../../../_dependencies/cxense'
import { SubscribeEventTag } from '../../../_children/fb-account-linking'

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
      arcSite,
      order = {},
      profile = {},
      plan = {},
      origin,
      referer,
      payment = {},
      printedSubscriber,
      fromFia,
      freeAccess,
      event,
    },
    getCodeCxense,
  } = props

  const {
    siteProperties: {
      paywall: { urls },
    },
  } = useFusionContext()

  const { orderNumber } = order
  const { uuid, firstName, lastName, secondLastName, email } = Object.assign(
    {},
    profile,
    freeAccess
  )
  const { total: paidTotal, subscriptionIDs = [] } = payment
  const {
    sku,
    name: planName,
    productName,
    priceCode,
    amount,
    billingFrequency,
    description,
  } = plan

  const Frecuency = {
    Month: 'Mensual',
    Year: 'Anual',
    OneTime: 'Mensual',
  }

  const Period = {
    Month: msgs.monthlyPeriod,
    Year: msgs.yearlyPeriod,
    OneTime: '',
  }

  useEffect(() => {
    PWA.finalize()

    const url = urls.originPaymentTraker
    const token = window.Identity.userIdentity.accessToken
    fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      mode: "no-cors",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-arc-site': arcSite,
      },
      body: JSON.stringify({
        url_referer: referer,
        // medium: "call_center",
        user_agent: navigator.userAgent,
        arc_order: res.orderNumber,
      }),
    })

    pushCxense(getCodeCxense) // dispara script de Cxense
    sendAction(PixelActions.PAYMENT_CONFIRMATION, {
      transactionId: orderNumber,
      transactionAffiliation: arcSite,
      transactionTotal: paidTotal,
      transactionTax: 0,
      transactionShipping: 0,
      transactionProducts: [
        {
          sku,
          name: planName,
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
      accesoGratis: !!freeAccess ? 'si' : 'no',
      referer,
      pwa: PWA.isPWA() ? 'si' : 'no',
    })

    dataLayer.push({
      event: 'checkoutOption',
      ecommerce: {
        checkout_option: {
          actionField: { step: 4 },
        },
      },
    })

    dataLayer.push({
      event: 'buy',
      ecommerce: {
        purchase: {
          actionField: {
            id: orderNumber,
            affiliation: 'Online Store',
            revenue: amount,
          },
          products: [
            {
              id: sku,
              name: productName,
              price: amount,
              brand: arcSite,
              category: planName,
              subCategory: Frecuency[billingFrequency],
            },
          ],
          dataUser: {
            id: Identity.userIdentity.uuid || uuid,
            name: `${firstName} ${lastName} ${secondLastName}`
              .replace(/\s*/, ' ')
              .trim(),
            email,
          },
        },
      },
    })
    fbq('track', 'Purchase', {
      content_name: productName,
      content_ids: [plan.sku],
      content_type: productName,
      contents: [{ id: plan.sku, quantity: 1 }],
      currency: 'PEN',
      num_items: 1,
      value: plan.amount,
    })

    if (document.getElementById('footer')) {
      document.getElementById('footer').style.position = 'relative'
    }
  }, [])

  const handleClick = () => {
    if (PWA.isPWA()) {
      PWA.pwaCloseWebView()
      return
    }
    const { sessionStorage, location } = window

    location.href =
      // eslint-disable-next-line no-nested-ternary
      sessionStorage.hasOwnProperty(NAME_REDIRECT) &&
      sessionStorage.getItem(NAME_REDIRECT) !== ''
        ? sessionStorage.getItem(NAME_REDIRECT) === '/suscripciones/'
          ? HOME
          : sessionStorage.getItem(NAME_REDIRECT)
        : HOME
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <S.Panel maxWidth="1060px" direction="row">
        <SubscribeEventTag
          subscriptionId={Identity.userIdentity.uuid}
          offerCode={priceCode}
          currency="PEN"
          value={amount}
        />
        <Picture
          width={{ xs: '0px', md: '360px' }}
          hideOnScreenSize="sm"
          src={theme.images.confirmation}
          types={['webp', 'png']}
        />
        <S.Content>
          <S.Title>
            {msgs.interpolate(msgs.welcomeNewSubscriptor, { firstName })}
          </S.Title>

          <S.Subtitle large={!freeAccess}>
            {freeAccess ? msgs.successfulSubscription : msgs.successfulPurchase}
          </S.Subtitle>

          <S.CardSummary>
            <S.DetailTitle>
              {freeAccess
                ? msgs.subscriptionDetails.toUpperCase()
                : msgs.purchaseDetails.toUpperCase()}
            </S.DetailTitle>
            <Item label={`${msgs.planLabel.toUpperCase()}: `}>
              {(planName || '').toUpperCase()} -{' '}
              {event ? 'ANUAL' : Frecuency[billingFrequency].toUpperCase()}
            </Item>
            <Item label={`${msgs.nameLabel.toUpperCase()}: `}>
              <S.Names>
                {firstName} {lastName} {secondLastName}
              </S.Names>
            </Item>
            {!freeAccess && (
              <>
                <S.Item>
                  {`${msgs.priceLabel.toUpperCase()}: `}
                  <strong>
                    {`${
                      paidTotal !== 0
                        ? msgs.currencySymbol.toUpperCase()
                        : msgs.freeAmount.toUpperCase()
                    } `}
                  </strong>
                  <strong>{`${paidTotal !== 0 ? paidTotal : ''} `}</strong>

                  {`${description.cart || ''} `}
                </S.Item>

                <S.Small>{msgs.paymentNotice}</S.Small>
              </>
            )}
          </S.CardSummary>
          {!freeAccess && (
            <S.Notice
              source={msgs.interpolate(msgs.subscriptionNotice, { email })}
            />
          )}
          {!fromFia && (
            <S.WrapButton>
              <Button onClick={handleClick}>{msgs.continueButton}</Button>
            </S.WrapButton>
          )}
        </S.Content>
      </S.Panel>
    </div>
  )
}

const ThemedWizardConfirmation = withTheme(WizardConfirmation)

export default ThemedWizardConfirmation
