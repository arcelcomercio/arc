import * as React from 'react'
import * as Sentry from '@sentry/browser'
import { useAppContext } from 'fusion:context'

import { AuthContext, AuthProvider } from '../_context/auth'
import useRoute from '../_hooks/useRoute'
import {
  PropertiesSite,
  PropertiesCommon,
  ArcEnv,
} from '../_dependencies/Properties'
import { FooterSubs, FooterLand } from '../_layouts/footer'
import { clearUrlAPI } from '../_dependencies/Utils'
import { LogIntoAccountEventTag } from '../_children/fb-account-linking'
import HeaderSubs from '../_layouts/header'
import Singwall from './_children/Singwall'
import Summary from './_children/Summary'
import Profile from './_children/Profile'
import Pay from './_children/Pay'
import Confirmation from './_children/Confirmation'
import addScriptAsync from '../_dependencies/Async'
import stylesPayment from '../_styles/Payment'
import scriptsPayment from '../_scripts/Payment'
import PWA from '../_dependencies/Pwa'
import Loading from '../_layouts/loading'
import {
  Container,
  Wrapper,
  PanelLeft,
  PanelRight,
} from '../_layouts/containers'

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

  useRoute()

  React.useEffect(() => {
    window.localStorage.removeItem('ArcId.USER_STEP') // borrar step en local storage global

    Sentry.init({
      dsn: urlCommon.dsnSentry,
      debug: ArcEnv === 'sandbox',
      release: `arc-deployment@${deployment}`,
      environment: ArcEnv,
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
      .finally(() => {
        updateLoading(false)
      })

    if (fromFia) window.sessionStorage.setItem('paywall_type_modal', 'fia')
    if (event === 'winback')
      window.sessionStorage.setItem('paywall_type_modal', 'mailing')

    clearUrlAPI(urls.landingUrl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: stylesPayment[arcSite] }} />
      <>
        {userLoading && <Loading arcSite={arcSite} />}
        <HeaderSubs userProfile={userProfile} arcSite={arcSite} />
        <Container>
          {userLoading === false &&
            userLoaded &&
            userProfile &&
            userStep === 2 && (
              <LogIntoAccountEventTag subscriptionId={userProfile.uuid} />
            )}
          <Wrapper>
            {!userLoading && (
              <PanelLeft>
                {event && userStep !== 4 && (
                  <h2 className="step__left-title-campaign">
                    {texts.textWinback}
                  </h2>
                )}
                {freeAccess
                  ? () => <Confirmation />
                  : (() => {
                      switch (userStep) {
                        case 2:
                          return userLoaded ? <Profile /> : <Singwall />
                        case 3:
                          return userLoaded ? <Pay /> : <Singwall />
                        case 4:
                          return userLoaded ? <Confirmation /> : <Singwall />
                        default:
                          return <Singwall />
                      }
                    })()}
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
