import React, { useState } from 'react'
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

  const [showThanks, setShowThanks] = useState(false);

  const {
    siteProperties: { assets = {}, siteUrl = '' },
    deployment,
    contextPath,
  } = useFusionContext()

  const fullAssets = assets.fullAssets.call(assets, contextPath, deployment)

  const html = !showThanks ? <FormData showThanks={setShowThanks} /> : <Thanks siteUrl={siteUrl} />

  return (
    <div className="paywall-contact-us">
      <picture className="paywall-contact-us__picture">
        <source srcSet={fullAssets('contact_form_left')} type="image/webp" />
        <img src={fullAssets('contact_form_left')} alt="" />
      </picture>
      {html}
    </div>
  )
}

export default PaywallContactUs
