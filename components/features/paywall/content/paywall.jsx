import React, { useState, useEffect, useRef } from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import Wizard from 'react-step-wizard'

import WizardUserProfile from './_children/wizard-user-profile'
import Nav from './_children/wizard-nav'
import WizardPlan from './_children/wizard-plan'
import * as S from './styled'
import { AddIdentity, userProfile } from '../_dependencies/Identity'
import WizardConfirmation from './_children/wizard-confirmation'
import WizardPayment from './_children/wizard-payment'

const _stepsNames = ['PLANES', 'DATOS', 'PAGO', 'CONFIRMACIÓN']

const Right = () => {
  return <div>Ayuda</div>
}

const Paywall = () => {
  const fusionContext = useFusionContext()
  const { contextPath, deployment, siteProperties } = fusionContext

  const { summary = {}, plans } = useContent({
    source: 'paywall-campaing',
    query: { campaing: 'paywall-gestion-sandbox' },
  })

  const [profile, setProfile] = useState('')
  useEffect(() => {
    AddIdentity(siteProperties).then(() =>
      userProfile(['documentNumber', 'mobilePhone', 'documentType']).then(
        setProfile
      )
    )
  })

  const memo = useRef({})
  function onBeforeNextStepHandler(response, { nextStep }) {
    Object.assign(memo, response)
    nextStep()
  }

  const { assets } = siteProperties
  const fullAssets = assets.fullAssets.call(assets, contextPath, deployment)

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <S.Content>
        <Wizard
          isLazyMount
          isHashEnabled
          nav={<Nav stepsNames={_stepsNames} right={<Right />} />}>
          <WizardPlan
            memo={memo}
            plans={plans}
            summary={summary}
            onBeforeNextStep={onBeforeNextStepHandler}
          />
          <WizardUserProfile
            memo={memo}
            profile={profile}
            summary={summary}
            onBeforeNextStep={onBeforeNextStepHandler}
          />
          <WizardPayment
            memo={memo}
            summary={summary}
            onBeforeNextStep={onBeforeNextStepHandler}
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
