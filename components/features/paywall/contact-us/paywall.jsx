import React, { useState, useCallback } from 'react'
import { useFusionContext } from 'fusion:context'
import FormData from './_children/contact-form'
import Thanks from './_children/thanks'
import ClientOnly from '../_children/client-only'
import { devices } from '../_dependencies/devices'
import getService from '../_dependencies/services'
import * as S from './styled'

const url = getService('ORIGIN_SUBSCRIPTION_CORP_API')

const PaywallContactUs = props => {
  const [showThanks, setShowThanks] = useState(false)
  const [error, setError] = React.useState('')

  const {
    siteProperties: { assets = {}, siteUrl = '' },
    deployment,
    contextPath,
  } = useFusionContext()

  const initialValuesForm = {
    correo: 'hendrul@gmail.com',
    nombre: 'Raul',
    apellido: 'Contreras',
    organizacion: 'Comercio',
    tipo_consulta: 1,
    asunto: 'Cosmetico Fucsia',
    descripcion: 'Neseser',
  }

  const onSubmitHandler = useCallback((values, { setSubmitting }) => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res = {}) => {
        if (res.status === 200) {
          setSubmitting(false)
          setShowThanks(true)
        }
        if (res.status >= 400 && res.status < 500) {
          // eslint-disable-next-line no-throw-literal
          setError('Entrada invalida')
        } else if (res.status >= 500) {
          setError('Disculpe ha ocurrido un error de nuestro lado.')
        }
      })
      .catch(err => {
        console.error(err)
        setError('Disculpe ha ocurrido un error de nuestro lado.')
      })
  })

  const ContactUsImage = React.useMemo(
    () =>
      assets.fullAssets.call(assets, contextPath, deployment)('corporativo'),
    []
  )

  return (
    <ClientOnly>
      <S.WrapContent>
        <picture>
          <source
            media={`(${devices.mobile})`}
            srcSet="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
          <img src={ContactUsImage} alt="contact_us" />
        </picture>
        {showThanks ? (
          <Thanks siteUrl={siteUrl} />
        ) : (
          <FormData
            initialValues={initialValuesForm}
            onSubmit={onSubmitHandler}
            error={error}
          />
        )}
      </S.WrapContent>
    </ClientOnly>
  )
}

export default PaywallContactUs
