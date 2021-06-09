import { useAppContext } from 'fusion:context'
import * as React from 'react'

import Forgot from '../../../_children/forgot'
import Login from '../../../_children/login'
import Register from '../../../_children/register'
import { NavigateConsumer, NavigateProvider } from '../../../_context/navigate'
import PWA from '../../../_dependencies/Pwa'
import {
  PixelActions,
  sendAction,
  TagsAdsMurai,
} from '../../../_dependencies/Taggeo'
import { getSessionStorage, isFbBrowser } from '../../../_dependencies/Utils'

const renderTemplate = (template, contTempl, attributes) => {
  const templates = {
    login: <Login {...{ contTempl, ...attributes }} />,
    register: <Register {...{ ...attributes }} />,
    forgot: <Forgot {...{ ...attributes }} />,
  }
  return templates[template] || templates.login
}

const WrapperSingwall = () => {
  const {
    arcSite,
    globalContent: { plans = [], printedSubscriber, fromFia },
  } = useAppContext() || {}

  const { selectedTemplate, valueTemplate } = React.useContext(NavigateConsumer)

  React.useEffect(() => {
    window.dataLayer = window.dataLayer || []
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

    TagsAdsMurai(
      {
        event: 'adsmurai_pageview',
        em: '',
        fn: '',
        ln: '',
        ct: '',
        ph: '',
      },
      window.location.pathname
    )

    if (fromFia || isFbBrowser()) {
      // TODO: cambiar surface de 'fia' a 'IA' segun documentacion
      // https://developers.facebook.com/docs/instant-articles/subscriptions/pixel-measurement/
      window.fbq('track', 'ViewPaywall', {
        surface: fromFia ? 'fia' : 'mWeb',
      })
    }

    window.fbq('track', 'ViewContent', {
      content_category: plans[0].productName,
      content_ids: [plans[0].sku],
      contents: [{ id: plans[0].sku, quantity: 1 }],
      currency: 'PEN',
      num_items: 1,
    })

    window.fbq('track', 'Lead')
  }, [])

  return <>{renderTemplate(selectedTemplate, valueTemplate, { arcSite })}</>
}

const Singwall = () => (
  <NavigateProvider>
    <WrapperSingwall />
  </NavigateProvider>
)

export default Singwall
