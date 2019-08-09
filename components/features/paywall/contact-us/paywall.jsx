import React from 'react'
import { useFusionContext } from 'fusion:context'
import Wizard from 'react-step-wizard'
import {
  FormContactUsContainter,
  FormPicture,
  FormImg,
} from './_dependencies/styled'
import FormData from './_children/form'
import Thanks from './_children/thanks'

const PaywallContactUs = props => {
  const {
    siteProperties: { assets = {} },
    deployment,
    contextPath,
  } = useFusionContext()

  return (
    <FormContactUsContainter>
      <FormPicture>
        <FormImg
          src={deployment(
            `${contextPath}${assets.pwAssets('contactFormLeft')}`
          )}
          alt=""
        />
      </FormPicture>
      <Wizard
        transitions={{
          enterRight: 'enterRight',
          exitLeft: 'exitLeft',
        }}>
        <FormData />
        <Thanks />
      </Wizard>
    </FormContactUsContainter>
  )
}

export default PaywallContactUs
