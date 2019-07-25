import React, { useState } from 'react'
import { useFusionContext } from 'fusion:context'

import UserProfile from './_children/user-profile'
import Panel from '../../../_children/panel'
import Summary from '../summary'
import * as S from './styled'
import { devices } from '../../../_dependencies/devices'
import { addSales } from '../../../_dependencies/sales'

const { styled } = S

const ERROR = {
  E300012: 'No se ha encontrado ningún carrito para el usuario.',
  UNKNOWN: code =>
    `ups, vamos a verificar que paso, error desconocido, Ex${code}`,
}

const PanelUserProfile = styled(Panel)`
  @media (${devices.mobile}) {
    margin-top: 30px;
  }
  @media ${devices.tablet} {
    margin-top: 30px;
    padding: 30px;
  }
`

function WizardUserProfile(props) {
  const {
    memo,
    profile,
    summary,
    onBeforeNextStep = (res, goNextStep) => goNextStep(),
  } = props

  const {
    plan: { amount, description, billingFrequency },
  } = memo

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
          const mergeResValues = Object.assign({}, memo, {
            order: res,
            profile: values,
          })
          onBeforeNextStep(mergeResValues, props)
        })
        .catch(e => {
          switch (e.code) {
            case '300012':
              setError(ERROR.E300012)
              break
            default:
              setError(ERROR.UNKNOWN(e.code))
              break
          }
          setLoading(false)
          setSubmitting(false)
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
      <Summary
        amount={amount}
        billingFrequency={billingFrequency}
        description={description}
        summary={summary}
      />
    </S.WizardUserProfile>
  )
}

export default WizardUserProfile
