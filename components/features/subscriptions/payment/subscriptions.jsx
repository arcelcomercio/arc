/* eslint-disable jsx-a11y/label-has-for */
import React, { useEffect, useContext } from 'react'
import ENV from 'fusion:environment'
import { useFusionContext } from 'fusion:context'
import { AuthContext, AuthProvider } from '../_context/auth'
import HeaderSubs from '../_layouts/header'
import { FooterSubs, FooterLand } from '../_layouts/footer'
import Singwall from '../_children/Singwall'
import Resume from '../_children/Resume'
import Profile from '../_children/Profile'
import Pay from '../_children/Pay'
import Confirmation from '../_children/Confirmation'
import { NavigateProvider } from '../_context/navigate'
import addScriptAsync from '../_dependencies/Async'
import stylesPayment from '../_dependencies/styles-payment'
import PropertiesSite from '../_dependencies/Properties'
// import { createExternalScript } from '../_dependencies/Utils'
import scriptsPayment from '../_dependencies/script-payment'
import {
  Container,
  Wrapper,
  PanelLeft,
  PanelRight,
} from '../_layouts/containers'

const WrapperPaymentSubs = () => {
  const {
    arcSite,
    // globalContent: {
    //   fromFia,
    //   summary = [],
    //   description,
    //   plans = [],
    //   name,
    //   printedSubscriber,
    //   msgs: srvMsgs,
    //   freeAccess,
    //   error,
    // },
  } = useFusionContext() || {}

  const arcEnv = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'
  const { userLoaded, userStep, userProfile } = useContext(AuthContext)
  const { links } = PropertiesSite.common
  const { urls } = PropertiesSite[arcSite]

  useEffect(() => {
    addScriptAsync({
      name: 'IdentitySDK',
      url: links.identity[arcEnv],
      includeNoScript: false,
    }).then(() => {
      if (typeof window !== 'undefined') {
        window.Identity.options({ apiOrigin: urls.arcOrigin[arcEnv] })
      }
    })
    // createExternalScript(scriptsPayment, true)
  }, [])

  return (
    <>
      <style
        dangerouslySetInnerHTML={{ __html: stylesPayment[arcSite] }}></style>

      <HeaderSubs {...{ userProfile, arcSite, arcEnv }} />
      <Container>
        <NavigateProvider>
          <Wrapper>
            <PanelLeft>
              {(() => {
                // prettier-ignore
                switch (userStep) {
                  case 2:
                    return userLoaded ? <Profile {...{arcEnv}} /> : <Singwall {...{arcSite, arcEnv}} />
                  case 3:
                    return userLoaded ? <Pay {...{arcSite, arcEnv}}/> : <Singwall {...{arcSite, arcEnv}} />
                  case 4:
                    return userLoaded ? <Confirmation {...{arcSite, arcEnv}} /> : <Singwall {...{arcSite, arcEnv}}/>
                  default:
                    return <Singwall {...{arcSite, arcEnv}} />
                }
              })()}
            </PanelLeft>
            <PanelRight>{userStep !== 4 && <Resume />}</PanelRight>
          </Wrapper>
        </NavigateProvider>
      </Container>
      <FooterSubs {...{ arcEnv }} />
      <FooterLand {...{ arcSite, arcEnv }} />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: scriptsPayment,
        }}
      />
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
