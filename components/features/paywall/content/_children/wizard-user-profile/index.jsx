import React, { useState } from 'react'
import { useFusionContext } from 'fusion:context'

import UserProfile from './_children/user-profile'
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

function WizardUserProfile(props) {
  const {
    memo,
    profile,
    summary,
    onBeforeNextStep = (res, goNextStep) => goNextStep(),
    nextStep,
  } = props

  const fusionContext = useFusionContext()
  const [loading, setLoading] = useState()
  const [error, setError] = useState()

  const { siteProperties } = fusionContext
  const Sales = addSales(siteProperties)

  function onSubmitHandler(values, { setSubmitting }) {
    const { email, phone, billingAddress } = values
    setError(false)
    setLoading(true)
    Sales.then(sales =>
      sales
        .createOrder(email, phone, billingAddress)
        .then(res => {
          // TODO: validar respuesta y mostrar errores de API
          setLoading(false)
          setSubmitting(false)
          // Mezclamos valores del formulario con los valores de la respuesta
          const mergeResValues = Object.assign({}, values, res)
          onBeforeNextStep(mergeResValues, props)
        })
        .catch(e => {
          setLoading(false)
          setSubmitting(false)
          setError('Disculpe ha ocurrido un error al procesar el pago')
        })
    )
  }

  function onResetHandler(values, formikBag) {
    // TODO: Limpiar errores una vez se vuelva a reenviar el formuario
    //       hay que llamar a formikBag.handleReset()
    setError()
  }

  return (
    <S.WizardUserProfile>
      <PanelUserProfile type="content" valing="jc-center">
        {profile && (
          <UserProfile
            profile={profile}
            onSubmit={onSubmitHandler}
            title="Ingrese sus datos"
            error={error}
          />
        )}
      </PanelUserProfile>
      <Summary summary={summary} />
    </S.WizardUserProfile>
  )
}

export default WizardUserProfile
