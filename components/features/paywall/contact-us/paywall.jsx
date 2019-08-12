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
import './paywall.css'

const PaywallContactUs = props => {
  const {
    siteProperties: { assets = {} },
    deployment,
    contextPath,
  } = useFusionContext()

  const fullAssets = assets.fullAssets.call(assets, contextPath, deployment)

  return (
    <div className="paywall-contact-us">
      <picture className="paywall-contact-us__picture">
        <source srcSet={fullAssets('contact_form_left')} type="image/webp" />
        <img src={fullAssets('contact_form_left')} alt="" />
      </picture>
      <Wizard
        transitions={{
          enterRight: 'enterRight',
          exitLeft: 'exitLeft',
        }}>
        <FormData />
        <Thanks />
      </Wizard>
    </div>
  )
}

export default PaywallContactUs
