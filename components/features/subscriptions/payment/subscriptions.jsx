import * as Sentry from '@sentry/browser'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { env } from '../../../utilities/arc/env'
import { PROD } from '../../../utilities/constants/environment'
import { LogIntoAccountEventTag } from '../_children/fb-account-linking'
import { AuthContext, AuthProvider } from '../_context/auth'
import addScriptAsync from '../_dependencies/Async'
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
    deployment,
    globalContent: { fromFia, freeAccess, event },
  } = useAppContext() || {}

  const {
    userLoaded,
    userStep,
    userProfile,
    userLoading,
    updateLoading,
  } = React.useContext(AuthContext)
  const { links, urls: urlCommon, texts } = PropertiesCommon
  const { urls } = PropertiesSite[arcSite]

  const Confirmation = React.lazy(() =>
    import(/* webpackChunkName: 'Confirmation' */ './_children/Confirmation')
  )

  useRoute(event)

  React.useEffect(() => {
    window.localStorage.removeItem('ArcId.USER_STEP') // borrar step en local storage global

    Sentry.init({
      dsn: urlCommon.dsnSentry,
      debug: env !== PROD,
      release: `arc-deployment@${deployment}`,
      environment: env,
      ignoreErrors: [
        'Unexpected end of JSON input',
        'JSON.parse: unexpected end of data at line 1 column 1 of the JSON data',
        'JSON Parse error: Unexpected EOF',
      ],
      // allowUrls: [
      //   // API + origin
      //   /https:\/\/.+(elcomercio|gestion).pe/,
      //   // Sandbox CDN
      //   /https:\/\/elcomercio-(elcomercio|gestion)-sandbox\.cdn\.arcpublishing.com/,
      //   // Identity & Sales SDKs
      //   /https:\/\/arc-subs-sdk\.s3\.amazonaws\.com/,
      //   // PayU
      //   /https?:\/\/.+payulatam\.com/,
      // ],
      denyUrls: [/delivery\.adrecover\.com/, /analytics/, /facebook/],
    })

    Sentry.configureScope((scope) => {
      scope.setTag('brand', arcSite)
    })

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
        <HeaderSubs {...{ userProfile, arcSite, arcType }} />
        <Container>
          {userLoading === false &&
            userLoaded &&
            userProfile &&
            userStep === 2 && (
              <LogIntoAccountEventTag subscriptionId={userProfile.uuid} />
            )}
          <Wrapper
            style={{
              minHeight: '530px',
            }}>
            {!userLoading && (
              <PanelLeft>
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
            <PanelRight>
              {userStep !== 4 && !freeAccess && <Summary />}
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

export default PaymentSubscriptions
