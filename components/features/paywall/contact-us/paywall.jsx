import React, { useState, useCallback } from 'react'
import { useFusionContext } from 'fusion:context'
import FormData from './_children/contact-form'
import Thanks from './_children/thanks'
import ClientOnly from '../_children/client-only'
import Loading from '../_children/loading'
import { devices } from '../_dependencies/devices'
import getDomain from '../_dependencies/domains'
import * as S from './styled'
import { MESSAGE } from './_children/contact-form/schema'

const url = getDomain('ORIGIN_SUBSCRIPTION_CORP_API')

const PaywallContactUs = props => {
  const [showThanks, setShowThanks] = useState(false)
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const {
    siteProperties: { assets = {}, siteUrl = '' },
    deployment,
    contextPath,
  } = useFusionContext()

  const initialValuesForm = {
    correo: '',
    nombre: '',
    apellido: '',
    organizacion: '',
    tipo_consulta: 0,
    asunto: '',
    descripcion: '',
  }

  const onSubmitHandler = useCallback((values, { setSubmitting }) => {
    setLoading(true)
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
          setError(MESSAGE.API_ERROR)
        }
      })
      .catch(err => {
        console.error(err)
        setError(MESSAGE.API_ERROR)
      })
      .finally(() => {
        setSubmitting(false)
        setLoading(false)
      })
  })

  const ContactUsImage = React.useMemo(
    () =>
      assets.fullAssets.call(assets, contextPath, deployment)('corporativo'),
    []
  )

  return (
    <ClientOnly>
      <Loading fullscreen spinning={loading} />
      <S.WrapContent>
        <S.Picture>
          <source
            media="(max-width: 1024px)"
            srcSet="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
          <img src={ContactUsImage} alt="contact_us" />
        </S.Picture>
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
