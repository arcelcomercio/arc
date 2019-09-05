import React, { useEffect } from 'react'
import * as S from './styled'
import Button from '../../../_children/button'
import { devices } from '../../../_dependencies/devices'
import { PixelActions, sendAction } from '../../../_dependencies/analitycs'
import PWA from '../../_dependencies/seed-pwa'

const HOME = '/'
const NAME_REDIRECT = 'paywall_last_url'
const PIXEL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="

const Item = ({ label, children }) => {
  return (
    <S.Item>
      {label} <strong>{children}</strong>
    </S.Item>
  )
}

const WizardConfirmation = props => {
  const {
    assets,
    memo: {
      order: { orderNumber },
      profile: { firstName, lastName, secondLastName, email },
      plan: { title: plan, sku, priceCode, amount, billingFrequency, printed },
      referer: ref,
      payment: { total: paidTotal, subscriptionIDs },
    },
  } = props

  useEffect(() => {
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
      suscriptorImpreso: printed ? 'si' : 'no',
      medioCompra: ref,
    })
  }, [])

  const handlePWA = () => {
    PWA.finalize()
    return PWA.isPWA()
  }

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
    if (handlePWA()) return
    const { sessionStorage, location } = window
    // eslint-disable-next-line no-prototype-builtins
    location.href =
      sessionStorage.hasOwnProperty(NAME_REDIRECT) &&
      sessionStorage.getItem(NAME_REDIRECT) !== ''
        ? sessionStorage.getItem(NAME_REDIRECT)
        : HOME
  }

  console.log(props)
  console.log(paidTotal)
  console.log(billingFrequency)

  const Frecuency = {
    "Month" : "Mensual",
    "Year" : "Anual"
  }
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <S.Panel maxWidth="1060px" direction="row">
        <S.Picture>
          <source media={`(${devices.mobile})`} srcSet={PIXEL} />
          <source media={`${devices.tablet}`} srcSet={PIXEL} />
          <source srcSet={assets('confirmation_webp')} type="image/webp" />
          <S.Image src={assets('confirmation')} alt="confirmación" />
        </S.Picture>

        <S.Content>
          <S.Title>¡Bienvenido(a) {firstName}!</S.Title>

          {/* <S.Subtitle>
            <strong>POR SER UN SUSCRIPTOR PREMIUM</strong>
            <br />
            tienes acceso ilimitado a las noticias más relevantes del Perú y el
            mundo totalmente gratis.
          </S.Subtitle> */}

          <S.Subtitle large>Tu suscripción ha sido exitosa.</S.Subtitle>
          
          <S.CardSummary>
            <S.DetailTitle>DETALLE DE COMPRA</S.DetailTitle>
            <Item label="PAQUETE: ">
              {(plan || '').toUpperCase()} - { Frecuency[billingFrequency].toUpperCase() }
            </Item>
            <Item label="NOMBRE: ">
              <S.Names>
                {firstName} {lastName} {secondLastName}
              </S.Names>
            </Item>
            <Item label="PRECIO: ">
              S/ {paidTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            </Item>
            <S.Small>
              El precio de la suscripción se cargará automáticamente en tu
              tarjeta cada mes o año, según el período elegido.
            </S.Small>
          </S.CardSummary>
          <S.Span>
            Enviaremos la boleta de compra de la
            <br /> suscripción al correo:
            <strong> {email}</strong>
          </S.Span>
          <S.WrapButton>
            <Button onClick={handleClick}>SIGUE NAVEGANDO</Button>
            {/* <S.Progress time="17s" onFinish={handleClick} /> */}
          </S.WrapButton>
        </S.Content>
      </S.Panel>
    </div>
  )
}

export default WizardConfirmation
