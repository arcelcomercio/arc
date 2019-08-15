import React, { useState, useEffect } from 'react'
import { useFusionContext } from 'fusion:context'
import UserProfile from './_children/user-profile'
import Summary from '../summary'
import * as S from './styled'
import { PixelActions, sendAction } from '../../../_dependencies/analitycs'
import { addSales } from '../../../_dependencies/sales'
import Beforeunload from '../before-unload'
import Loading from '../../../_children/loading'

const ERROR = {
  E300012: 'No se ha encontrado ningún carrito para el usuario.',
  UNKNOWN: code =>
    `ups, vamos a verificar que paso, error desconocido, Ex${code}`,
}

function WizardUserProfile(props) {
  const {
    memo,
    profile,
    summary,
    onBeforeNextStep = (res, goNextStep) => goNextStep(),
    setLoading,
  } = props

  useEffect(() => {
    sendAction(PixelActions.PAYMENT_PROFILE)
  }, [])

  const {
    plan: { amount, description, billingFrequency },
  } = memo

  const [error, setError] = useState()
  const Sales = addSales()

  function onSubmitHandler(values, { setSubmitting }) {
    const {
      email,
      phone,
      billingAddress,
      firstName,
      lastName,
      secondLastName,
    } = values
    setError(false)
    setLoading(true)
    Sales.then(sales =>
      sales
        .createOrder(
          email,
          phone,
          billingAddress,
          firstName,
          lastName,
          secondLastName
        )
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
    <Beforeunload onBeforeunload={() => 'message'}>
      <S.WizardUserProfile>
        <S.PanelUserProfile type="content" valing="jc-center">
          {profile && (
            <UserProfile
              initialValues={profile}
              onSubmit={onSubmitHandler}
              title="Ingrese sus datos"
              error={error}
            />
          )}
        </S.PanelUserProfile>
        <Summary
          amount={amount}
          billingFrequency={billingFrequency}
          description={description}
          summary={summary}
        />
      </S.WizardUserProfile>
    </Beforeunload>
  )
}

export default WizardUserProfile
