import React from 'react'
import styled from 'styled-components'
import Panel from '../../../_children/panel'
import Summary from '../summary'
import * as S from './styled'
import FormPay from './_children/form-pay'
import { devices } from '../../../_dependencies/devices'

const PanelPayment = styled(Panel)`
  @media (${devices.mobile}) {
    margin-top: 30px;
    padding: 18px 30px;
  }
`

function WizardPayment({ summary, nextStep }) {
  return (
    <S.WizardPayment>
      <PanelPayment type="content" valing="jc-center">
        <FormPay nextStep={nextStep} />
      </PanelPayment>
      <Summary summary={summary} />
    </S.WizardPayment>
  )
}

export default WizardPayment
