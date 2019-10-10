import React, { useState, useCallback } from 'react'
import { withTheme } from 'styled-components'
import { useFusionContext } from 'fusion:context'

import FormData from './_children/contact-form'
import Thanks from './_children/thanks'
import ClientOnly from '../_children/client-only'
import Loading from '../_children/loading'
import Icon from '../_children/icon'
import * as S from './styled'
import { useStrings } from '../_children/contexts'
import { interpolateUrl } from '../_dependencies/domains'

const PaywallContactUs = props => {
  const msgs = useStrings()
  const { theme } = props
  const [showThanks, setShowThanks] = useState(false)
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const {
    arcSite,
    siteProperties: {
      siteUrl = '',
      paywall: { urls },
    },
  } = useFusionContext()

  window.document.getElementById('footer').style.position = 'relative'

  const initialValuesForm = {
    correo: '',
    nombre: '',
    apellido: '',
    organizacion: '',
    tipo_consulta: 0,
    telefono: '',
    descripcion: '',
  }

  const url = interpolateUrl(urls.originSubscriptionCorpApi)

  const onSubmitHandler = useCallback((values, { setSubmitting }) => {
    setLoading(true)
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: new Headers({
        'Content-Type': 'application/json',
        'user-token': window.Identity.userIdentity.accessToken,
        site: arcSite,
      }),
    })
      .then((res = {}) => {
        if (res.status === 200) {
          setSubmitting(false)
          setLoading(false)
          setShowThanks(true)
          window.scrollTo(0, 0)
        }
        if (res.status >= 400 && res.status < 500) {
          // eslint-disable-next-line no-throw-literal
          setError('Entrada invalida')
          setSubmitting(false)
          setLoading(false)
        } else if (res.status >= 500) {
          setError(msgs.tryLater)
          setSubmitting(false)
          setLoading(false)
        }
      })
      .catch(err => {
        console.error(err)
        setError(msgs.tryLater)
        setSubmitting(false)
        setLoading(false)
      })
  })
  return (
    <ClientOnly>
      <Loading
        loadingIcon={<Icon type={theme.icon.loading} />}
        fullscreen
        spinning={loading}
      />
      <S.WrapContent>
        <S.Picture>
          <source
            media={theme.breakpoints.down('sm', false)}
            srcSet={theme.images.pixel}
          />
          <source type="image/webp" srcSet={theme.images.corporativo_webp} />
          <source type="image/png" srcSet={theme.images.corporativo_png} />
          <img src={theme.images.corporativo_webp} alt="contact_us" />
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

const ThemedPaywallContactUs = withTheme(PaywallContactUs)

export default ThemedPaywallContactUs
