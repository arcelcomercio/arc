/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import { withTheme } from 'styled-components'
import { useFusionContext } from 'fusion:context'
import Wizard from 'react-step-wizard'
import { createBrowserHistory } from 'history'
import URL from 'url-parse'

import WizardUserProfile from './_children/wizard-user-profile'
import Nav from './_children/wizard-nav'
import WizardPlan from './_children/wizard-plan'
import * as S from './styled'
import WizardConfirmation from './_children/wizard-confirmation'
import WizardPayment from './_children/wizard-payment'
import Loading from '../_children/loading'
import Icon from '../_children/icon'
import ClickToCall from '../_children/click-to-call'
import ErrorBoundary from '../_children/error-boundary'
import PWA from './_dependencies/seed-pwa'
import { interpolateUrl } from '../_dependencies/domains'
import '../_dependencies/sentry'
import { useStrings } from '../_children/contexts'

const stepNames = ['PLANES', 'DATOS', 'PAGO', 'CONFIRMACIÓN']
const stepSlugs = ['planes', 'datos', 'pago', 'confirmacion']
const PROFILE_FORM_NAME = 'paywall-profile-form'
const PAYMENT_FORM_NAME = 'paywall-payment-form'

let history
let finalized = false

const Paywall = ({
  theme,
  dispatchEvent,
  addEventListener,
  removeEventListener,
}) => {
  const msgs = useStrings()
  const {
    arcSite,
    customFields: { substractFeaturesHeights = '' },
    siteProperties: {
      paywall: { urls },
    },
    globalContent: {
      fromFia,
      summary = [],
      description,
      plans = [],
      printedSubscriber,
      freeAccess,
      error,
    },
  } = useFusionContext()

  // En sandbox por alguna razon hacen una redireccion y evita
  // que se mantenga el valor de la bandera fromFia que viene
  // como resultado de la plantilla, por lo que persisto esta
  // bandera en sessionStorage
  if (fromFia && typeof window !== 'undefined')
    window.sessionStorage.setItem('paywall_type_modal', 'fia')

  const wizardRef = useRef(null)
  const clickToCallUrl = interpolateUrl(urls.clickToCall)
  const getCodeCxense = interpolateUrl(urls.codeCxense)

  useEffect(() => {
    PWA.mount(() => window.location.reload())
    addEventListener('logout', logoutHandler)
    return () => {
      removeEventListener('logout', logoutHandler)
    }
  }, [])

  const clearPaywallStorage = useRef(() => {
    sessionStorage.removeItem(PROFILE_FORM_NAME)
    sessionStorage.removeItem(PAYMENT_FORM_NAME)
  }).current

  const logoutHandler = useRef(() => {
    clearPaywallStorage()
    if (fromFia && typeof window !== 'undefined')
      window.location.reload()
  }).current

  const match = typeof window !== 'undefined' && window.location.href.match(RegExp(urls.eventsRegexp))
  const event = match ? { isEvent: true, event: match[1] } : {}
  const { pathname: basePath, query } = React.useRef(
    (() => {
      const url = interpolateUrl(urls.digitalSubscriptions, {
        ...event,
      })
      return new URL(url)
    })()
  ).current

  // const [memo, setMemo] = useState({})
  const memo = useRef({
    event: event.event,
    arcSite,
    plans,
    plan: plans[0], // Por defecto asumir seleccionado el primer plan
    description,
    summary,
    printedSubscriber,
    freeAccess,
    error,
  })
  const currMemo = memo.current

  useEffect(() => {
    const sessionFia = window.sessionStorage.getItem('paywall_type_modal')
    currMemo.fromFia = sessionFia === 'fia'
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
          // prettier-ignore
          window.location.href = 
          `${basePath}${stepSlugs[0]}/${query}`
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
        case `${basePath}${stepSlugs[0]}/`: 
          doStep(1)
          break;
        case `${basePath}${stepSlugs[1]}/`: 
          doStep(2)
          break;
        case `${basePath}${stepSlugs[2]}/`: 
          doStep(3)
          break;
        case `${basePath}${stepSlugs[3]}/`: 
          doStep(4)
          finalized = true
          clearPaywallStorage()
          break;
      }
    })
    const stepSlug = freeAccess ? stepSlugs[3] : stepSlugs[0]
    const path = `${basePath}${stepSlug}/${search}`
    history.replace(path, currMemo)
    return unlisten
  }, [])

  const onBeforeNextStepHandler = useRef(result => {
    Object.assign(currMemo, result)
    const { search, pathname } = history.location
    const currentStep = wizardRef.current.state.activeStep + 1
    const stepSlug = stepSlugs[currentStep]
    const currpath = `${pathname}${search}`
    history.replace(currpath, currMemo)
    history.push(`${basePath}${stepSlug}/${search}`, currMemo)
    if(typeof window !== 'undefined') window.scrollTo(0, 0)
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
            initialStep={freeAccess ? 4 : 1}
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
                excludeSteps={freeAccess && [2, 3]}
                stepsNames={stepNames}
                /* right={<ClickToCall href={clickToCallUrl} text={msgs.help} />} */
              />
            }>
            <WizardPlan
              memo={currMemo}
              onBeforeNextStep={onBeforeNextStepHandler}
              setLoading={setLoading}
              dispatchEvent={dispatchEvent}
              addEventListener={addEventListener}
              removeEventListener={removeEventListener}
            />
            <WizardUserProfile
              memo={currMemo}
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
              getCodeCxense={getCodeCxense}
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
        removeEventListener={this.removeEventListener.bind(this)}
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
