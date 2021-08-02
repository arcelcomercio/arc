import Identity from '@arc-publishing/sdk-identity'
import * as Sentry from '@sentry/browser'
import { useAppContext } from 'fusion:context'
import * as React from 'react'
import { FC } from 'types/features'
import { PaywallCampaign, SubsArcSite } from 'types/subscriptions'

import { SdksProvider } from '../../../contexts/subscriptions-sdks'
import useSentry from '../../../hooks/useSentry'
import Loading from '../../signwall/_children/loading'
import { LogIntoAccountEventTag } from '../_children/fb-account-linking'
import { AuthProvider, useAuthContext } from '../_context/auth'
import { PropertiesCommon, PropertiesSite } from '../_dependencies/Properties'
import PWA from '../_dependencies/Pwa'
import { clearUrlAPI, setSessionStorage } from '../_dependencies/Utils'
import useRoute from '../_hooks/useRoute'
import {
  Container,
  PanelLeft,
  PanelRight,
  Wrapper,
} from '../_layouts/containers'
import { FooterLand, FooterSubs } from '../_layouts/footer'
import HeaderSubs from '../_layouts/header'
import scriptsPayment from '../_scripts/Payment'
import PaymentSteps from './_children/Steps'
import Summary from './_children/Summary'
import customFields from './_dependencies/custom-fields'

const Confirmation = React.lazy(
  () =>
    import(/* webpackChunkName: 'Confirmation' */ './_children/Confirmation')
)

const arcType = 'payment'

const Component = () => {
  const {
    arcSite,
    globalContent: { fromFia = false, freeAccess = false, event = '' } = {},
  } = useAppContext<PaywallCampaign>()

  const {
    userLoaded,
    userStep,
    userProfile,
    userLoading,
    updateLoading,
    updateStep,
  } = useAuthContext()
  const { urls: urlCommon, texts } = PropertiesCommon
  const { urls } = PropertiesSite[arcSite as SubsArcSite]

  React.useEffect(() => {
    if (!userLoaded) {
      updateStep(1)
    }
  }, [userLoaded])

  useRoute(event)
  useSentry(urlCommon.sentrySubs)

  React.useEffect(() => {
    PWA.mount(() => {
      Identity.getUserProfile()
        .then(() => {
          window.location.reload()
        })
        .catch((error) => {
          Sentry.captureEvent({
            message:
              'Error al obtener el perfil de usuario - Identity.getUserProfile()',
            level: Sentry.Severity.Error,
            extra: error || {},
          })
        })
    })
    updateLoading(false)
  }, [])

  React.useEffect(() => {
    if (fromFia) setSessionStorage('paywall_type_modal', 'fia')
    if (event === 'winback') setSessionStorage('paywall_type_modal', 'mailing')

    clearUrlAPI(urls.landingUrl)
  }, [])

  return (
    <>
      {userLoading && <Loading typeBg="full" />}
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
        <Wrapper step={userStep}>
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
      <script
        dangerouslySetInnerHTML={{
          __html: scriptsPayment,
        }}
      />
    </>
  )
}

const PaymentSubscriptions: FC = () => (
  <SdksProvider>
    <AuthProvider>
      <Component />
    </AuthProvider>
  </SdksProvider>
)

PaymentSubscriptions.label = 'Subscriptions - Landing de Compra'
PaymentSubscriptions.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  customFields,
}

export default PaymentSubscriptions