import * as Sentry from '@sentry/browser'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import useSentry from '../../../hooks/useSentry'
import addScriptAsync from '../../../utilities/script-async'
import { LogIntoAccountEventTag } from '../_children/fb-account-linking'
import { AuthContext, AuthProvider } from '../_context/auth'
import { PropertiesCommon, PropertiesSite } from '../_dependencies/Properties'
import PWA from '../_dependencies/Pwa'
import { clearUrlAPI } from '../_dependencies/Utils'
import useRoute from '../_hooks/useRoute'
import {
  Container,
  PanelLeft,
  PanelRight,
  Wrapper,
} from '../_layouts/containers'
import { FooterLand, FooterSubs } from '../_layouts/footer'
import HeaderSubs from '../_layouts/header'
import Loading from '../_layouts/loading'
import scriptsPayment from '../_scripts/Payment'
import PaymentSteps from './_children/Steps'
import Summary from './_children/Summary'

const arcType = 'payment'
const WrapperPaymentSubs = () => {
  const {
    arcSite,
    globalContent: { fromFia, freeAccess, event },
  } = useAppContext() || {}

  const {
    userLoaded,
    userStep,
    userProfile,
    userLoading,
    updateLoading,
    updateStep,
  } = React.useContext(AuthContext)
  const { links, urls: urlCommon, texts } = PropertiesCommon
  const { urls } = PropertiesSite[arcSite]

  const Confirmation = React.lazy(() =>
    import(/* webpackChunkName: 'Confirmation' */ './_children/Confirmation')
  )

  React.useEffect(() => {
    if (!userLoaded) {
      updateStep(1)
    }
  })

  useRoute(event)
  useSentry(urlCommon.sentrySubs)

  React.useEffect(() => {
    addScriptAsync({
      name: 'IdentitySDK',
      url: links.identity,
      includeNoScript: false,
    })
      .then(() => {
        window.Identity.options({ apiOrigin: urls.arcOrigin })
        PWA.mount(() => {
          window.Identity.getUserProfile().then(() => {
            window.location.reload()
          })
        })
      })
      .catch((errIdentitySDK) => {
        Sentry.captureEvent({
          message: 'SDK Identity no ha cargado correctamente',
          level: 'error',
          extra: errIdentitySDK || {},
        })
      })
      .finally(() => {
        updateLoading(false)
      })

    if (fromFia) window.sessionStorage.setItem('paywall_type_modal', 'fia')
    if (event === 'winback')
      window.sessionStorage.setItem('paywall_type_modal', 'mailing')

    clearUrlAPI(urls.landingUrl)
  }, [])

  return (
    <>
      <>
        {userLoading && <Loading arcSite={arcSite} />}
        <HeaderSubs
          userProfile={userProfile}
          arcSite={arcSite}
          arcType={arcType}
        />
        <Container>
          {userLoading === false &&
            userLoaded &&
            userProfile &&
            userStep === 2 && (
              <LogIntoAccountEventTag subscriptionId={userProfile.uuid} />
            )}
          <Wrapper
            step={userStep}
            style={{
              minHeight: '530px',
            }}>
            {!userLoading && (
              <PanelLeft step={userStep}>
                {event && userStep !== 4 && (
                  <h2 className="step__left-title-campaign">
                    {texts.textWinback}
                  </h2>
                )}
                {freeAccess ? (
                  typeof window !== 'undefined' && (
                    <React.Suspense fallback={<div>Cargando...</div>}>
                      <Confirmation />
                    </React.Suspense>
                  )
                ) : (
                  <PaymentSteps step={userStep} userLoaded={userLoaded} />
                )}
              </PanelLeft>
            )}

            <PanelRight
              hidePanel={freeAccess || userStep === 4 || userStep === 5}>
              <Summary />
            </PanelRight>
          </Wrapper>
        </Container>
        {!freeAccess && <FooterSubs />}
        <FooterLand arcType={arcType} />
      </>
      <script
        dangerouslySetInnerHTML={{
          __html: scriptsPayment,
        }}
      />
    </>
  )
}

const PaymentSubscriptions = () => (
  <AuthProvider>
    <WrapperPaymentSubs />
  </AuthProvider>
)

PaymentSubscriptions.label = 'Subscriptions - Landing de Compra'

export default PaymentSubscriptions
