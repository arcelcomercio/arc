/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
import React, { useState, useEffect, useRef } from 'react'
import Consumer from 'fusion:consumer'
import { useFusionContext } from 'fusion:context'
import Wizard from 'react-step-wizard'
import { createBrowserHistory } from 'history'

import WizardUserProfile from './_children/wizard-user-profile'
import Nav from './_children/wizard-nav'
import WizardPlan from './_children/wizard-plan'
import * as S from './styled'
import { AddIdentity, userProfile, isLogged } from '../_dependencies/Identity'
import WizardConfirmation from './_children/wizard-confirmation'
import WizardPayment from './_children/wizard-payment'
import Loading from '../_children/loading'
import ClickToCall from '../_children/click-to-call'
import PWA from './_dependencies/seed-pwa'
import getDomain from '../_dependencies/domains'
import '../_dependencies/sentry'

const stepNames = ['PLANES', 'DATOS', 'PAGO', 'CONFIRMACIÓN']
const stepSlugs = ['planes', 'datos', 'pago', 'confirmacion']
const PROFILE_FORM_NAME = 'paywall-profile-form'
const PAYMENT_FORM_NAME = 'paywall-payment-form'

let history
let finalized = false

const Paywall = ({ dispatchEvent, addEventListener }) => {
  const {
    contextPath,
    deployment,
    siteProperties: {
      assets,
      paywall: { clickToCall },
    },
    globalContent: {
      summary = [],
      plans = [],
      printedSubscriber,
      error: message,
    },
  } = useFusionContext()

  const clearPaywallStorage = useRef(() => {
    sessionStorage.removeItem(PROFILE_FORM_NAME)
    sessionStorage.removeItem(PAYMENT_FORM_NAME)
  }).current

  addEventListener('logout', clearPaywallStorage)

  const wizardRef = useRef(null)
  const basePath = getDomain('URL_DIGITAL')

  const [profile, setProfile] = useState('')
  useEffect(() => {
    AddIdentity().then(() => {
      if (isLogged()) {
        userProfile(['documentNumber', 'phone', 'documentType']).then(
          setProfile
        )
      }
    })
    document.querySelector('html').classList.add('ios')
    PWA.mount(() => window.location.reload())
  }, [])

  // const [memo, setMemo] = useState({})
  const memo = useRef({ printedSubscriber })
  const currMemo = memo.current
  useEffect(() => {
    history = createBrowserHistory({
      basename: '',
      // getUserConfirmation: (message, callback) => callback(window.confirm(message))
    })

    const search = history.location.search
    history.push(`${basePath}/${stepSlugs[0]}/${search}`, currMemo)
    return history.listen((location, action) => {
      const { goToStep } = wizardRef.current
      const doStep = step => {
        // Retornar a planes si retrocede luego de finalizar la compra
        if (finalized) {
          window.location.href = `${basePath}/${stepSlugs[0]}/${
            location.search
          }`
          return
        }
        if (action !== 'REPLACE') {
          goToStep(step)
          dispatchEvent('currentStep', step)
        }
      }
      // prettier-ignore
      switch(location.pathname) {
        default: 
        case `${basePath}/${stepSlugs[0]}/`: 
          doStep(1)
          break;
        case `${basePath}/${stepSlugs[1]}/`: 
          doStep(2)
          break;
        case `${basePath}/${stepSlugs[2]}/`: 
          doStep(3)
          break;
        case `${basePath}/${stepSlugs[3]}/`: 
          doStep(4)
          finalized = true
          clearPaywallStorage()
          break;
      }
    })
  }, [])

  const onBeforeNextStepHandler = useRef(result => {
    Object.assign(currMemo, result)
    const { search, pathname } = history.location
    const currentStep = wizardRef.current.state.activeStep + 1
    const stepSlug = stepSlugs[currentStep]
    const currpath = `${pathname}${search}`
    history.replace(currpath, currMemo)
    history.push(`${basePath}/${stepSlug}/${search}`, currMemo)
    window.scrollTo(0, 0)
  }).current

  const fullAssets = assets.fullAssets.call(assets, contextPath, deployment)
  const [loading, setLoading] = useState(false)
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <S.Content>
        <Loading fullscreen spinning={loading} />
        <Wizard
          transitions={{
            enterRight: 'enterRight',
            enterLeft: 'enterLeft',
            exitRight: 'exitRight',
            exitLeft: 'exitLeft',
          }}
          ref={wizardRef}
          isLazyMount
          nav={
            <Nav
              stepsNames={stepNames}
              right={<ClickToCall href={clickToCall} />}
            />
          }>
          <WizardPlan
            message={message}
            printedSubscriber={printedSubscriber}
            memo={currMemo}
            plans={plans}
            summary={summary}
            onBeforeNextStep={onBeforeNextStepHandler}
            assets={fullAssets}
            setLoading={setLoading}
          />
          <WizardUserProfile
            memo={currMemo}
            profile={profile}
            formName={PROFILE_FORM_NAME}
            summary={summary}
            onBeforeNextStep={onBeforeNextStepHandler}
            setLoading={setLoading}
          />
          <WizardPayment
            memo={currMemo}
            summary={summary}
            formName={PAYMENT_FORM_NAME}
            onBeforeNextStep={onBeforeNextStepHandler}
            setLoading={setLoading}
          />
          <WizardConfirmation
            memo={currMemo}
            assets={fullAssets}
            onBeforeNextStep={onBeforeNextStepHandler}
          />
        </Wizard>
      </S.Content>
    </div>
  )
}

@Consumer
class PaywallWrapper extends React.Component {
  render() {
    return (
      <Paywall
        dispatchEvent={this.dispatchEvent.bind(this)}
        addEventListener={this.addEventListener.bind(this)}
      />
    )
  }
}

export default PaywallWrapper
