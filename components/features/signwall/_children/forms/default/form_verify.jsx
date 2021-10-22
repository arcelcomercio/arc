import Identity from '@arc-publishing/sdk-identity'
import { isAPIErrorResponse } from '@arc-publishing/sdk-identity/lib/serviceHelpers/APIErrorResponse'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { useModalContext } from '../../../../subscriptions/_context/modal'
import getCodeError from '../../../../subscriptions/_dependencies/Errors'
import { Taggeo } from '../../../../subscriptions/_dependencies/Taggeo'
import { MsgResetPass } from '../../icons'
import Loading from '../../loading'

const FormVerify = ({ onClose, tokenVerify, tokenOTA, typeDialog }) => {
  const {
    // arcSite,
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

  React.useEffect(() => {
    Identity.verifyEmail(tokenVerify)
      .then((verifyResponse) => {
        if (isAPIErrorResponse(verifyResponse)) {
          const error = `Error al verificar email: ${verifyResponse.message} - ${verifyResponse.code}`
          setShowError(error)
          Taggeo(
            `Web_Sign_Wall_${typeDialog}`,
            `web_sw${typeDialog[0]}_aceptar_error`
          )
          throw new Error(error)
        }

        setShowConfirm(true)
        Taggeo(
          `Web_Sign_Wall_${typeDialog}`,
          `web_sw${typeDialog[0]}_aceptar_sucess`
        )

        if (tokenOTA) {
          Identity.redeemOTALink(tokenOTA).then((OTAResponse) => {
            if (isAPIErrorResponse(OTAResponse)) {
              const error = `Error al iniciar sesión: ${OTAResponse.message} - ${OTAResponse.code}`
              setShowError(error)
              Taggeo(
                `Web_Sign_Wall_${typeDialog}`,
                `web_sw${typeDialog[0]}_aceptar_error`
              )
              throw new Error(error)
            }
            Identity.getUserProfile()
          })
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
  }, [])

  return (
    <form className="signwall-inside_forms-form">
      {showLoading ? (
        <Loading typeBg="block" />
      ) : (
        <>
          <br />
          <div className="center block mb-20">
            <MsgResetPass bgcolor={mainColorBr} />
          </div>
          {showError && (
            <div
              style={{ width: '100%' }}
              className="signwall-inside_forms-error mb-10">
              {showError}
            </div>
          )}
          <h4
            style={{ fontSize: '20px', fontFamily: primaryFont }}
            className="signwall-inside_forms-title center ">
            Bienvenido
          </h4>

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
