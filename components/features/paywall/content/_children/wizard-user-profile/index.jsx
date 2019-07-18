import React, { useState } from 'react'
import { useFusionContext } from 'fusion:context'

import UserProfile from '../../../_children/user-profile'
import Panel from '../../../_children/panel'
import Summary from '../summary'
import * as S from './styled'
import { devices } from '../../../_dependencies/devices'
import { addSales } from '../../../_dependencies/sales'

const { styled } = S

const PanelUserProfile = styled(Panel)`
  @media (${devices.mobile}) {
    margin-top: 30px;
  }
`

function WizardUserProfile({ profile, summary }) {
  const fusionContext = useFusionContext()
  const [loading, setLoading] = useState()
  const [errors, setErrors] = useState([])

  const siteProperties = fusionContext.siteProperties
  const Sales = addSales(siteProperties)

  function onSubmitHandler(
    { email, phone, billingAddress },
    { setSubmitting }
  ) {
    setLoading(true)
    Sales.then(sales =>
      sales
        .createOrder(email, phone, billingAddress)
        .then(res => {
          setLoading(false)
          setSubmitting(loading)
          nextStep()
        })
        .catch(e => {
          setLoading(false)
          setSubmitting(loading)
          setErrors([...errors, e])
        })
    )
  }

  return (
    <S.WizardUserProfile>
      <PanelUserProfile type="content" valing="jc-center">
        {profile && (
          <UserProfile
            profile={profile}
            onSubmit={onSubmitHandler}
            title="Ingrese sus datos"
          />
        )}
      </PanelUserProfile>
      <Summary summary={summary} />
    </S.WizardUserProfile>
  )
}

export default WizardUserProfile
