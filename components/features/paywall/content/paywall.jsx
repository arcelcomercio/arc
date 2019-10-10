/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import { withTheme } from 'styled-components'
import { useFusionContext } from 'fusion:context'
import Wizard from 'react-step-wizard'
import { createBrowserHistory } from 'history'

import WizardUserProfile from './_children/wizard-user-profile'
import Nav from './_children/wizard-nav'
import WizardPlan from './_children/wizard-plan'
import * as S from './styled'
import { addIdentity, userProfile, isLogged } from '../_dependencies/Identity'
import WizardConfirmation from './_children/wizard-confirmation'
import WizardPayment from './_children/wizard-payment'
import Loading from '../_children/loading'
import Icon from '../_children/icon'
import ClickToCall from '../_children/click-to-call'
import FillHeight from '../_children/fill-height'
import ErrorBoundary from '../_children/error-boundary'
import PWA from './_dependencies/seed-pwa'
import { interpolateUrl } from '../_dependencies/domains'
import '../_dependencies/sentry'

const stepNames = ['PLANES', 'DATOS', 'PAGO', 'CONFIRMACIÓN']
const stepSlugs = ['planes', 'datos', 'pago', 'confirmacion']
const PROFILE_FORM_NAME = 'paywall-profile-form'
const PAYMENT_FORM_NAME = 'paywall-payment-form'

let history
let finalized = false

const Paywall = ({ theme, dispatchEvent, addEventListener }) => {
  const {
    arcSite,
    customFields: { substractFeaturesHeights = '' },
    siteProperties: {
      paywall: { urls },
    },
    globalContent: {
      summary = [],
      plans = [],
      printedSubscriber,
      accessFree,
      error,
    },
  } = useFusionContext()

  const clearPaywallStorage = useRef(() => {
    sessionStorage.removeItem(PROFILE_FORM_NAME)
    sessionStorage.removeItem(PAYMENT_FORM_NAME)
  }).current

  addEventListener('logout', clearPaywallStorage)
  addEventListener('profile-update', clearPaywallStorage)

  const wizardRef = useRef(null)
  const basePath = interpolateUrl(urls.digitalSubscriptions)
  const clickToCallUrl = interpolateUrl(urls.clickToCall)

  const [profile, setProfile] = useState('')
  useEffect(() => {
    addIdentity(arcSite).then(() => {
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
  const memo = useRef({ plans, summary, printedSubscriber, accessFree, error })
  const currMemo = memo.current
  useEffect(() => {
    history = createBrowserHistory({
      basename: '',
      // getUserConfirmation: (message, callback) => callback(window.confirm(message))
    })

    const search = history.location.search
    // Si tiene acceso gratis mostrar directo paso de confirmacion
    const unlisten = history.listen((location, action) => {
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
    const stepSlug = accessFree ? stepSlugs[3] : stepSlugs[0]
    const path = `${basePath}/${stepSlug}/${search}`
    if (accessFree) {
      Object.assign(currMemo, { plan: plans[0] })
      history.push(path, currMemo)
    } else {
      history.replace(path, currMemo)
    }
    return unlisten
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

  const [loading, setLoading] = useState(false)
  const substractFeaturesIds = substractFeaturesHeights
    .split(',')
    .map(id => id.trim())
  return (
    <ErrorBoundary>
      {/* <FillHeight substractElements={substractFeaturesIds}> */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <S.Content>
          <Loading
            loadingIcon={<Icon type={theme.icon.loading} />}
            fullscreen
            spinning={loading}
          />
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
                excludeSteps={accessFree && [2, 3]}
                stepsNames={stepNames}
                right={<ClickToCall href={clickToCallUrl} />}
              />
            }>
            <WizardPlan
              memo={currMemo}
              onBeforeNextStep={onBeforeNextStepHandler}
              setLoading={setLoading}
            />
            <WizardUserProfile
              memo={currMemo}
              profile={profile}
              formName={PROFILE_FORM_NAME}
              onBeforeNextStep={onBeforeNextStepHandler}
              setLoading={setLoading}
            />
            <WizardPayment
              memo={currMemo}
              formName={PAYMENT_FORM_NAME}
              onBeforeNextStep={onBeforeNextStepHandler}
              setLoading={setLoading}
            />
            <WizardConfirmation
              memo={currMemo}
              onBeforeNextStep={onBeforeNextStepHandler}
            />
          </Wizard>
        </S.Content>
      </div>
      {/* </FillHeight> */}
    </ErrorBoundary>
  )
}

@Consumer
class PaywallWrapper extends React.Component {
  render() {
    return (
      <Paywall
        {...this.props}
        dispatchEvent={this.dispatchEvent.bind(this)}
        addEventListener={this.addEventListener.bind(this)}
      />
    )
  }
}

const ThemedPaywallWrapper = withTheme(PaywallWrapper)

ThemedPaywallWrapper.propTypes = {
  customFields: PropTypes.shape({
    id: PropTypes.string,
    substractFeaturesHeights: PropTypes.string,
  }),
}

export default ThemedPaywallWrapper
