import { useAppContext } from 'fusion:context'
import * as React from 'react'
import { ArcSite } from 'types/fusion'
import { DialogType, PaywallCampaign } from 'types/subscriptions'

import Forgot from '../../../_children/forgot'
import Login from '../../../_children/login'
import Register from '../../../_children/register'
import {
  NavigateProvider,
  NavigateTemplates,
  useNavigateContext,
} from '../../../_context/navigate'
import PWA from '../../../_dependencies/Pwa'
import {
  PixelActions,
  sendAction,
  TagsAdsMurai,
} from '../../../_dependencies/Taggeo'
import { getSessionStorage, isFbBrowser } from '../../../_dependencies/Utils'

type NavigateTemplatesProps = {
  typeDialog: DialogType
  arcSite: ArcSite
  handleCallToAction?: (e: boolean) => void
  isFia?: boolean
}

const renderTemplate = (
  template: NavigateTemplates,
  contTempl: string,
  attributes: NavigateTemplatesProps
) => {
  const { typeDialog, arcSite, handleCallToAction, isFia } = attributes
  const templates: Record<NavigateTemplates, JSX.Element> = {
    login: (
      <Login
        contTempl={contTempl}
        arcSite={arcSite}
        handleCallToAction={handleCallToAction}
        isFia={isFia}
        typeDialog={typeDialog}
      />
    ),
    register: (
      <Register
        arcSite={arcSite}
        handleCallToAction={handleCallToAction}
        isFia={isFia}
        typeDialog={typeDialog}
      />
    ),
    forgot: <Forgot typeDialog={typeDialog} arcSite={arcSite} />,
  }
  return templates[template] || templates.login
}

const WrapperSingwall = ({
  typeDialog,
}: Pick<NavigateTemplatesProps, 'typeDialog'>): JSX.Element => {
  const {
    arcSite,
    globalContent: { plans = [], printedSubscriber, fromFia } = {},
  } = useAppContext<PaywallCampaign>()

  const { selectedTemplate, valueTemplate } = useNavigateContext()

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

    if (fromFia || isFbBrowser) {
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

  return renderTemplate(selectedTemplate, valueTemplate, {
    arcSite,
    typeDialog,
  })
}

const Singwall = (): JSX.Element => (
  <NavigateProvider>
    <WrapperSingwall typeDialog="landing" />
  </NavigateProvider>
)

export default Singwall
