import React, { useState, useEffect, useRef } from 'react'
import { useFusionContext } from 'fusion:context'
import Wizard from 'react-step-wizard'

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
import '../_dependencies/sentry'

const _stepsNames = ['PLANES', 'DATOS', 'PAGO', 'CONFIRMACIÓN']

const Paywall = () => {
  const {
    contextPath,
    deployment,
    siteProperties: {
      assets,
      paywall: { clickToCall },
    },
    globalContent: { summary = [], plans = [], printed, error: message },
  } = useFusionContext()

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

  const memo = useRef({}).current
  const onBeforeNextStepHandler = useRef((response, { nextStep }) => {
    Object.assign(memo, response)
    nextStep()
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
          isLazyMount
          nav={
            <Nav
              stepsNames={_stepsNames}
              right={<ClickToCall href={clickToCall} />}
            />
          }>
          <WizardPlan
            message={message}
            printed={!!printed}
            memo={memo}
            plans={plans}
            summary={summary}
            onBeforeNextStep={onBeforeNextStepHandler}
            assets={fullAssets}
            setLoading={setLoading}
          />
          <WizardUserProfile
            memo={memo}
            profile={profile}
            summary={summary}
            onBeforeNextStep={onBeforeNextStepHandler}
            setLoading={setLoading}
          />
          <WizardPayment
            memo={memo}
            printed={printed}
            summary={summary}
            onBeforeNextStep={onBeforeNextStepHandler}
            setLoading={setLoading}
          />
          <WizardConfirmation
            memo={memo}
            assets={fullAssets}
            onBeforeNextStep={onBeforeNextStepHandler}
          />
        </Wizard>
      </S.Content>
    </div>
  )
}

export default Paywall
