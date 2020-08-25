import React, { useEffect } from 'react'
import { useFusionContext } from 'fusion:context'
import Login from './_children/login'
import Register from './_children/register'
import Forgot from './_children/forgot'
import { NavigateConsumer } from '../../../_context/navigate'
import { PixelActions, sendAction } from '../../../_dependencies/Taggeo'
import PWA from '../../../_dependencies/Pwa'

const renderTemplate = (template, site, env) => {
  const templates = {
    login: <Login arcSite={site} arcEnv={env} />,
    register: <Register arcSite={site} arcEnv={env} />,
    forgot: <Forgot />,
  }
  return templates[template] || templates.login
}

const Singwall = ({ arcEnv }) => {
  const {
    arcSite,
    globalContent: { plans = [], printedSubscriber, fromFia },
  } = useFusionContext() || {}

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isFbBrowser =
        window.navigator.userAgent.indexOf('FBAN') > -1 ||
        window.navigator.userAgent.indexOf('FBAV') > -1

      window.dataLayer.push({
        event: 'checkoutOption',
        ecommerce: {
          checkout_option: {
            actionField: { step: 1 },
          },
        },
      })

      const origin =
        window.sessionStorage.getItem('paywall_type_modal') || 'organico'
      const referer = window.sessionStorage.getItem('paywall_last_url') || ''

      sendAction(PixelActions.PAYMENT_PLAN, {
        referer,
        medioCompra: origin,
        suscriptorImpreso: printedSubscriber ? 'si' : 'no',
        pwa: PWA.isPWA() ? 'si' : 'no',
      })
      window.fbq('track', 'ViewPaywall', {
        // eslint-disable-next-line no-nested-ternary
        surface: fromFia ? 'fia' : isFbBrowser ? 'mWeb' : 'nonApp',
      })
      window.fbq('track', 'ViewContent', {
        content_category: plans[0].productName,
        content_ids: [plans[0].sku],
        contents: [{ id: plans[0].sku, quantity: 1 }],
        currency: 'PEN',
        num_items: 1,
      })
      window.fbq('track', 'Lead')
    }
  }, [])

  return (
    <NavigateConsumer>
      {({ selectedTemplate }) => (
        <>{renderTemplate(selectedTemplate, arcSite, arcEnv)}</>
      )}
    </NavigateConsumer>
  )
}

export default Singwall
