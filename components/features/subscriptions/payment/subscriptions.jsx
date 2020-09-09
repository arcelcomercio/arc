import React, { useEffect, useContext } from 'react'
import * as Sentry from '@sentry/browser'
import { useFusionContext } from 'fusion:context'
import { AuthContext, AuthProvider } from '../_context/auth'
// import { NavigateProvider } from '../_context/navigate'
import {
  PropertiesSite,
  PropertiesCommon,
  ArcEnv,
} from '../_dependencies/Properties'
import { FooterSubs, FooterLand } from '../_layouts/footer'
import { clearUrlAPI, createExternalScript } from '../_dependencies/Utils'
import { LogIntoAccountEventTag } from './_children/Singwall/_children/fb-account-linking'
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
import Loading from './_children/Loading'
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
    globalContent: { fromFia, freeAccess },
  } = useFusionContext() || {}

  const {
    userLoaded,
    userStep,
    userProfile,
    userLoading,
    updateLoading,
  } = useContext(AuthContext)
  const { links, urls: urlCommon } = PropertiesCommon
  const { urls } = PropertiesSite[arcSite]

  useEffect(() => {
    if (typeof window !== 'undefined') {
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

      clearUrlAPI(urls.landingUrl)
      createExternalScript(scriptsPayment, true)
    }
  }, [])

  return (
    <>
      <style
        dangerouslySetInnerHTML={{ __html: stylesPayment[arcSite] }}></style>

      {userLoading && <Loading arcSite={arcSite} />}
      <HeaderSubs {...{ userProfile, arcSite }} />
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
              {freeAccess ? (
                <Confirmation />
              ) : (
                <>
                  {(() => {
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
                </>
              )}
            </PanelLeft>
          )}
          <PanelRight>
            {userStep !== 4 && !freeAccess && <Summary />}
          </PanelRight>
        </Wrapper>
      </Container>
      {!freeAccess && <FooterSubs />}
      <FooterLand {...{ arcType }} />
    </>
  )
}

const PaymentSubscriptions = () => {
  return (
    <AuthProvider>
      <WrapperPaymentSubs />
    </AuthProvider>
  )
}

export default PaymentSubscriptions
