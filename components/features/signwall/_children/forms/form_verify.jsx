import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { ModalConsumer } from '../../../subscriptions/_context/modal'
import getCodeError from '../../../subscriptions/_dependencies/Errors'
import { Taggeo } from '../../../subscriptions/_dependencies/Taggeo'
import { getOriginAPI } from '../../_dependencies/domains'
import { MsgResetPass } from '../icons'
import Loading from '../loading'

const FormVerify = ({ onClose, tokenVerify, typeDialog }) => {
  const {
    arcSite,
    siteProperties: {
      signwall: { mainColorBr, mainColorBtn, primaryFont, mainColorLink },
      activePaywall,
    },
  } = useAppContext() || {}

  const { changeTemplate } = React.useContext(ModalConsumer)
  const [showLoading, setShowLoading] = React.useState(true)
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [showError, setShowError] = React.useState(false)
  const [showBtnContinue, setShowBtnContinue] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.Identity.options({ apiOrigin: getOriginAPI(arcSite) })
      window.Identity.verifyEmail(tokenVerify)
        .then(() => {
          setShowConfirm(true)
          Taggeo(
            `Web_Sign_Wall_${typeDialog}`,
            `web_sw${typeDialog[0]}_aceptar_sucess`
          )
          if (
            window.Identity.userProfile ||
            window.Identity.userIdentity.uuid
          ) {
            window.Identity.getUserProfile()
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

      if (window.Identity.userProfile || window.Identity.userIdentity.uuid) {
        setShowBtnContinue(true)
      }
    }
  }, [])

  return (
    <form
      className={`signwall-inside_forms-form ${
        arcSite === 'trome' ? 'form-trome' : ''
      }`}>
      {showLoading ? (
        <Loading typeBg="block" />
      ) : (
        <>
          <br />
          <div className="center block mb-20">
            <MsgResetPass bgcolor={mainColorBr} />
          </div>

          <h4
            style={{ fontSize: '20px', fontFamily: primaryFont }}
            className="signwall-inside_forms-title center mb-10">
            {showConfirm
              ? '¡Bienvenido(a) Usuario!'
              : '¡Bienvenido(a) Nuevamente!'}
          </h4>

          {showError && (
            <div className="signwall-inside_forms-error">{showError}</div>
          )}

          <p
            style={{
              fontSize: '14px',
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
              className="signwall-inside_forms-btn"
              style={{ color: mainColorBtn, background: mainColorLink }}
              onClick={() => {
                Taggeo(
                  `Web_Sign_Wall_${typeDialog}`,
                  `web_sw${typeDialog[0]}_continuar_boton`
                )
                onClose()
              }}>
              CONTINUAR NAVEGANDO
            </button>
          ) : (
            <button
              type="button"
              className="signwall-inside_forms-btn"
              style={{ color: mainColorBtn, background: mainColorLink }}
              onClick={() => {
                Taggeo(
                  `Web_Sign_Wall_${typeDialog}`,
                  `web_sw${typeDialog[0]}_continuar_boton`
                )
                changeTemplate('login')
              }}>
              CONTINUAR
            </button>
          )}
        </>
      )}
    </form>
  )
}

export default FormVerify
