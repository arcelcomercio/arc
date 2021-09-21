import Identity from '@arc-publishing/sdk-identity'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { useModalContext } from '../../../../subscriptions/_context/modal'
import getCodeError from '../../../../subscriptions/_dependencies/Errors'
import { Taggeo } from '../../../../subscriptions/_dependencies/Taggeo'
import { MsgResetPass } from '../../icons'
import Loading from '../../loading'

const FormVerify = ({ onClose, tokenVerify, typeDialog }) => {
  const {
    arcSite,
    siteProperties: {
      signwall: { mainColorBr, mainColorBtn, primaryFont, mainColorLink },
      activePaywall,
    },
  } = useAppContext() || {}

  const { changeTemplate } = useModalContext()
  const [showLoading, setShowLoading] = React.useState(true)
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [showError, setShowError] = React.useState(false)
  const [showBtnContinue, setShowBtnContinue] = React.useState(false)
  const [welcomeMessage, setWelcomeMessage] = React.useState('')

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      Identity.verifyEmail(tokenVerify)
        .then(() => {
          setShowConfirm(true)
          Taggeo(
            `Web_Sign_Wall_${typeDialog}`,
            `web_sw${typeDialog[0]}_aceptar_sucess`
          )
          if (Identity.userProfile || Identity.userIdentity.uuid) {
            Identity.getUserProfile()
          }
        })
        .catch((errLogin) => {
          setShowError(getCodeError(errLogin.code))
          Taggeo(
            `Web_Sign_Wall_${typeDialog}`,
            `web_sw${typeDialog[0]}_aceptar_error`
          )
        })
        .finally(() => {
          setShowLoading(false)
        })

      if (Identity.userProfile || Identity.userIdentity.uuid) {
        setShowBtnContinue(true)
      }
    }

    if (arcSite) {
      switch (arcSite) {
        case 'diariocorreo':
          setWelcomeMessage('Diario Correo')
          break
        case 'peru21':
          setWelcomeMessage('Diario Peru21')
          break
        case 'elbocon':
          setWelcomeMessage('Diario El Bocon')
          break
        case 'ojo':
          setWelcomeMessage('Diario Ojo')
          break
        case 'depor':
          setWelcomeMessage('Diario Depor')
          break
        default:
          setWelcomeMessage('Diario')
          break
      }
    }
  }, [])

  return (
    <form className="signwall-inside_forms-form">
      {showLoading ? (
        <Loading typeBg="block" />
      ) : (
        <>
          <br />
          <h4
            style={{ fontSize: '20px', fontFamily: primaryFont }}
            className="signwall-inside_forms-title  mb-10">
            {showConfirm ? `Bienvenido usuario! ` : `Bienvenido nuevamente!`}
          </h4>
          <h4
            style={{ fontSize: '20px', fontFamily: primaryFont }}
            className="signwall-inside_forms-title  mb-10">
            {showConfirm
              ? ` Gracias por unirte al ${welcomeMessage}`
              : ` Gracias por unirte al ${welcomeMessage}`}
          </h4>

          {showError && (
            <div className="signwall-inside_forms-error">{showError}</div>
          )}

          <p
            style={{
              lineHeight: '28px',
              textAlign: 'center',
            }}
            className="signwall-inside_forms-text mt-10 mb-20 center">
            {showConfirm
              ? 'Tu correo electrónico ha sido validado correctamente.'
              : 'Tu correo electrónico podría ya estar validado.'}
            <br />

            {!activePaywall && 'disfruta nuestro contenido sin límites'}
          </p>

          {showBtnContinue ? (
            <button
              type="button"
              className="signwall-inside_forms-btn signwall-inside_forms-btn-codp"
              style={{ color: mainColorBtn, background: mainColorLink }}
              onClick={() => {
                Taggeo(
                  `Web_Sign_Wall_${typeDialog}`,
                  `web_sw${typeDialog[0]}_continuar_boton`
                )
                onClose()
              }}>
              Continuar Navegando
            </button>
          ) : (
            <button
              type="button"
              className="signwall-inside_forms-btn signwall-inside_forms-btn-codp"
              style={{ color: mainColorBtn, background: mainColorLink }}
              onClick={() => {
                Taggeo(
                  `Web_Sign_Wall_${typeDialog}`,
                  `web_sw${typeDialog[0]}_continuar_boton`
                )
                changeTemplate('login')
              }}>
              Continuar
            </button>
          )}
        </>
      )}
    </form>
  )
}

export default FormVerify
