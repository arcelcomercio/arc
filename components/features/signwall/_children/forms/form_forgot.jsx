/* eslint-disable jsx-a11y/anchor-is-valid */
import Identity from '@arc-publishing/sdk-identity'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { SITE_TROME } from '../../../../utilities/constants/sitenames'
import { useModalContext } from '../../../subscriptions/_context/modal'
import getCodeError, {
  formatEmail,
} from '../../../subscriptions/_dependencies/Errors'
import { Taggeo } from '../../../subscriptions/_dependencies/Taggeo'
import useForm from '../../../subscriptions/_hooks/useForm'
import { ForgotPass, MsgForgotPass } from '../icons'
import { Input } from './control_input_select'

const FormForgot = ({ typeDialog }) => {
  const {
    arcSite,
    siteProperties: {
      activeMagicLink,
      signwall: { mainColorBr, mainColorBtn, mainColorLink, primaryFont },
    },
  } = useAppContext() || {}

  const textBtnSend = arcSite === SITE_TROME ? 'CAMBIAR CONTRASEÑA' : 'ENVIAR'
  const isTromeOrganic =
    arcSite === SITE_TROME &&
    (typeDialog === 'organico' ||
      typeDialog === 'verify' ||
      typeDialog === 'magiclink')

  const { changeTemplate } = useModalContext()
  const [showError, setShowError] = React.useState(false)
  const [showLoading, setShowLoading] = React.useState(false)
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [registerLink, setRegisterLink] = React.useState()
  const [showVerify, setShowVerify] = React.useState()
  const [showSendEmail, setShowSendEmail] = React.useState(false)

  const stateSchema = {
    femail: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    femail: {
      required: true,
      validator: formatEmail(),
    },
  }

  const taggeoError = () => {
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_contrasena_error_boton`,
      arcSite
    )
  }

  const taggeoSuccess = () => {
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_contrasena_success_boton`,
      arcSite
    )
  }

  const onSubmitForm = ({ femail }) => {
    setShowLoading(true)
    Identity.requestResetPassword(femail)
      .then(() => {
        setShowConfirm(!showConfirm)
        taggeoSuccess()
      })
      .catch((errForgot) => {
        setRegisterLink(errForgot.code === '300030')
        setShowVerify(errForgot.code === '130051')
        if (errForgot.code === '130051') {
          setShowError(getCodeError('verifyReset'))
          Taggeo(
            `Web_Sign_Wall_${typeDialog}`,
            `web_sw${typeDialog[0]}_contrasena_show_reenviar_correo`,
            arcSite
          )
        } else {
          setShowError(getCodeError(errForgot.code))
          taggeoError()
        }
      })
      .finally(() => {
        setShowLoading(false)
      })
  }

  const {
    values: { femail },
    errors: { femail: femailError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm)

  const sendVerifyEmail = () => {
    setShowSendEmail(true)
    if (activeMagicLink) {
      Identity.requestOTALink(femail)
    } else {
      Identity.requestVerifyEmail(femail)
    }
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_contrasena_reenviar_correo`,
      arcSite
    )
    let timeleft = 9
    const downloadTimer = setInterval(() => {
      if (timeleft <= 0) {
        clearInterval(downloadTimer)
        setShowSendEmail(false)
      } else {
        const divCount = document.getElementById('countdown')
        if (divCount) divCount.innerHTML = ` ${timeleft} `
      }
      timeleft -= 1
    }, 1000)
  }

  return (
    <form
      className={`signwall-inside_forms-form ${
        arcSite === SITE_TROME ? 'form-trome' : ''
      } ${typeDialog}`}
      onSubmit={(e) => {
        handleOnSubmit(e)
      }}>
      {isTromeOrganic && (
        <>
          <div className={isTromeOrganic ? 'group-float-trome' : ''}>
            <br />
            <h1 className="group-float-trome__title">
              ¡Hola! <br />
              ¿Olvidaste tu contraseña?
            </h1>
            <p className="group-float-trome__subtitle">
              No te preocupes, cámbiala fácilmente.
            </p>
          </div>
        </>
      )}

      {!showConfirm ? (
        <>
          {isTromeOrganic ? (
            <>
              <br />
              <div className="spacing-trome" />
            </>
          ) : (
            <>
              <br />
              <div className="center block mb-10">
                <ForgotPass bgcolor={mainColorBr} />
              </div>
              <h4
                className="signwall-inside_forms-title center mb-10"
                style={{ fontSize: '22px', fontFamily: primaryFont }}>
                Olvidé mi contraseña
              </h4>
              <p
                style={{
                  lineHeight: '26px',
                  textAlign: 'center',
                }}
                className="signwall-inside_forms-text">
                Ingresa tu correo electrónico para <br /> cambiar tu contraseña
              </p>
            </>
          )}

          {showError && (
            <div
              className={`signwall-inside_forms-error ${
                showVerify ? 'warning' : ''
              }`}>
              {` ${showError} `}
              {showVerify && (
                <>
                  {!showSendEmail ? (
                    <button
                      type="button"
                      className="link"
                      onClick={sendVerifyEmail}>
                      Reenviar correo de activación
                    </button>
                  ) : (
                    <span>
                      Podrás reenviar nuevamente dentro de
                      <strong id="countdown"> 10 </strong> segundos
                    </span>
                  )}
                </>
              )}

              {registerLink && (
                <a
                  className="signwall-inside_forms-link"
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    changeTemplate('register')
                  }}>
                  Registrar
                </a>
              )}
            </div>
          )}

          <Input
            type="email"
            inputMode="email"
            autoComplete="email"
            name="femail"
            placeholder="Correo electrónico"
            required
            value={femail}
            onChange={(e) => {
              handleOnChange(e)
              setShowError(false)
            }}
            error={femailError}
          />

          <button
            type="submit"
            style={{ color: mainColorBtn, background: mainColorLink }}
            className="signwall-inside_forms-btn mt-20 mb-10"
            disabled={disable || showLoading}
            onClick={() =>
              Taggeo(
                `Web_Sign_Wall_${typeDialog}`,
                `web_sw${typeDialog[0]}_contrasena_boton_recuperar`,
                arcSite
              )
            }>
            {showLoading ? 'ENVIANDO...' : textBtnSend}
          </button>
        </>
      ) : (
        <>
          <br />
          <div className="center block mb-20">
            <MsgForgotPass bgcolor={mainColorBr} />
          </div>

          <h4
            style={{ fontSize: '20px' }}
            className="signwall-inside_forms-title center mb-10">
            Correo enviado
          </h4>

          <p
            style={{
              lineHeight: '28px',
              textAlign: 'center',
            }}
            className="signwall-inside_forms-text mt-10 mb-10 center">
            Revisa tu bandeja de correo para
            <br /> cambiar tu contraseña
          </p>

          <button
            type="button"
            style={{ color: mainColorBtn, background: mainColorLink }}
            className="signwall-inside_forms-btn"
            onClick={() => {
              Taggeo(
                `Web_Sign_Wall_${typeDialog}`,
                `web_sw${typeDialog[0]}_contrasena_boton_aceptar`,
                arcSite
              )
              switch (typeDialog) {
                case 'relogemail':
                case 'reloghash':
                  changeTemplate('relogin')
                  break
                default:
                  changeTemplate('login', '', femail)
              }
            }}>
            ACEPTAR
          </button>
        </>
      )}

      <p
        style={{
          fontSize: '12px',
          color: '#000000',
          textAlign: 'center',
        }}
        className="signwall-inside_forms-text mt-20 mb-10">
        Volver a
        <a
          href="#"
          style={{ color: mainColorLink, fontWeight: 'bold' }}
          className="signwall-inside_forms-link ml-5"
          onClick={(e) => {
            e.preventDefault()
            Taggeo(
              `Web_Sign_Wall_${typeDialog}`,
              `web_sw${typeDialog[0]}_contrasena_link_volver`,
              arcSite
            )
            switch (typeDialog) {
              case 'relogemail':
              case 'reloghash':
                changeTemplate('relogin')

                break
              default:
                changeTemplate('login')
            }
          }}>
          Iniciar Sesión
        </a>
      </p>

      {isTromeOrganic && (
        <p className="signwall-inside_forms-text-note">
          Al hacer click estarás aceptando los Términos y <br /> condiciones y
          la Política de privacidad.
        </p>
      )}
    </form>
  )
}

export default FormForgot
