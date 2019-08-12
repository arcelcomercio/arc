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
  const [showThanks, setShowThanks] = useState(false)

  const {
    siteProperties: { assets = {}, siteUrl = '' },
    deployment,
    contextPath,
  } = useFusionContext()

  const initialValuesForm = {
    email: '',
    name: '',
    lastname: '',
    company_name: '',
    type_subscription: 0,
    subject: '',
    description: '',
  }

  const submitForm = (values, { setSubmitting }) => {
    console.log('values', values)
    const fetchApi = () => {
      //code
      return true
    }
    if (fetchApi()) {
      setShowThanks(true)
    } else {
      error = MESSAGE.API_ERROR
    }
    setSubmitting(false)
  }

  const fullAssets = assets.fullAssets.call(assets, contextPath, deployment)

  const html = !showThanks ? (
    <FormData
      initialValues={initialValuesForm}
      submitForm={submitForm}
    />
  ) : (
    <Thanks siteUrl={siteUrl} />
  )

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
