import React from 'react'
import Panel from '../../../_children/panel'
import Summary from '../summary'
import * as S from './styled'
import FormPay from './_children/form-pay'

function WizardPayment({ summary }) {
  return (
    <S.WizardPayment>
      <Panel type="content" valing="jc-center">
        <FormPay />
      </Panel>
      <Summary summary={summary} />
    </S.WizardPayment>
  )
}

export default WizardPayment
