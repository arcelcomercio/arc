import React, { useEffect } from 'react'
import { useFusionContext } from 'fusion:context'
import Login from './_children/login'
import Register from './_children/register'
import Forgot from './_children/forgot'
import { NavigateProvider, NavigateConsumer } from '../../../_context/navigate'
import { PixelActions, sendAction } from '../../../_dependencies/Taggeo'
import PWA from '../../../_dependencies/Pwa'
import { isFbBrowser, getSessionStorage } from '../../../_dependencies/Utils'

const renderTemplate = (template, contTempl, site) => {
  const templates = {
    login: <Login contTempl={contTempl} arcSite={site} />,
    register: <Register arcSite={site} />,
    forgot: <Forgot />,
  }
  return templates[template] || templates.login
}

const WrapperSingwall = () => {
  const {
    arcSite,
    globalContent: { plans = [], printedSubscriber, fromFia },
  } = useFusionContext() || {}

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dataLayer.push({
        event: 'checkoutOption',
        ecommerce: {
          checkout_option: {
            actionField: { step: 1 },
          },
        },
      })

      const origin = getSessionStorage('paywall_type_modal') || 'organico'
      const referer = getSessionStorage('paywall_last_url') || ''

      sendAction(PixelActions.PAYMENT_PLAN, {
        referer,
        medioCompra: origin,
        suscriptorImpreso: printedSubscriber ? 'si' : 'no',
        pwa: PWA.isPWA() ? 'si' : 'no',
      })

      window.fbq('track', 'ViewPaywall', {
        // eslint-disable-next-line no-nested-ternary
        surface: fromFia ? 'fia' : isFbBrowser() ? 'mWeb' : 'nonApp',
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
      {({ selectedTemplate, valueTemplate }) => (
        <>{renderTemplate(selectedTemplate, valueTemplate, arcSite)}</>
      )}
    </NavigateConsumer>
  )
}

const Singwall = () => {
  return (
    <NavigateProvider>
      <WrapperSingwall />
    </NavigateProvider>
  )
}

export default Singwall
