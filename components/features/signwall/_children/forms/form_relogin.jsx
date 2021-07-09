/* eslint-disable jsx-a11y/anchor-is-valid */
import sha256 from 'crypto-js/sha256'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { ModalConsumer } from '../../../subscriptions/_context/modal'
import { setCookie } from '../../../subscriptions/_dependencies/Cookies'
import getCodeError, {
  formatEmail,
  formatPass,
} from '../../../subscriptions/_dependencies/Errors'
import { Taggeo } from '../../../subscriptions/_dependencies/Taggeo'
import useForm from '../../../subscriptions/_hooks/useForm'
import {
  dataTreatment,
  getOriginAPI,
  PolicyPrivacy,
} from '../../_dependencies/domains'
import { CheckBox } from './control_checkbox'
import { Input } from './control_input_select'
import { AuthURL, ButtonSocial } from './control_social'

const FormRelogin = ({ onClose, typeDialog }) => {
  const {
    arcSite,
    siteProperties: {
      signwall: { mainColorLink, mainColorBtn, authProviders },
      activeNewsletter,
      activeVerifyEmail,
      activeDataTreatment,
    },
  } = useAppContext() || {}

  const { changeTemplate } = React.useContext(ModalConsumer)
  const [showError, setShowError] = React.useState(false)
  const [showLoading, setShowLoading] = React.useState(false)
  const [showVerify, setShowVerify] = React.useState()
  const [showSendEmail, setShowSendEmail] = React.useState(false)
  const [checkedPolits, setCheckedPolits] = React.useState(true)

  const stateSchema = {
    remail: { value: '', error: '' },
    rpass: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    remail: {
      required: true,
      validator: formatEmail(),
    },
    rpass: {
      required: true,
      validator: formatPass(),
      nospaces: true,
    },
  }

  const taggeoError = () => {
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_email_login_error`
    )
  }

  const onSubmitForm = ({ remail, rpass }) => {
    setShowLoading(true)
    window.Identity.options({ apiOrigin: getOriginAPI(arcSite) })
    window.Identity.login(remail, rpass, {
      rememberMe: true,
      cookie: true,
    })
      .then(() => {
        window.Identity.options({ apiOrigin: getOriginAPI(arcSite) })
        window.Identity.getUserProfile().then((profile) => {
          if (
            activeVerifyEmail &&
            !profile.emailVerified &&
            profile.displayName === profile.email
          ) {
            setShowLoading(false)
            setShowError(getCodeError('130051'))
            setShowVerify(true)
            Taggeo(
              `Web_Sign_Wall_${typeDialog}`,
              `web_sw${typeDialog[0]}_email_login_show_reenviar_correo`
            )
            window.localStorage.removeItem('ArcId.USER_INFO')
            window.localStorage.removeItem('ArcId.USER_PROFILE')
            window.Identity.userProfile = null
            window.Identity.userIdentity = {}
          } else {
            setCookie('arc_e_id', sha256(profile.email).toString(), 365)
            Taggeo(
              `Web_Sign_Wall_${typeDialog}`,
              `web_sw${typeDialog[0]}_email_login_success_ingresar`
            )
            onClose()
          }
        })
      })
      .catch((errLogin) => {
        setShowError(getCodeError(errLogin.code))
        setShowVerify(errLogin.code === '130051')
        if (errLogin.code === '130051') {
          Taggeo(
            `Web_Sign_Wall_${typeDialog}`,
            `web_sw${typeDialog[0]}_email_login_show_reenviar_correo`
          )
        } else {
          taggeoError()
        }
      })
      .finally(() => {
        setShowLoading(false)
      })
  }

  const {
    values: { remail, rpass },
    errors: { remail: remailError, rpass: rpassError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm)

  const sendVerifyEmail = () => {
    setShowSendEmail(true)
    window.Identity.requestVerifyEmail(remail)
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_email_login_reenviar_correo`
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

  const triggerShowVerify = () => {
    setShowError(getCodeError('verifySocial'))
    setShowVerify(false)
  }

  const sizeBtnSocial = authProviders.length === 1 ? 'full' : 'middle'

  return (
    <form
      className={`signwall-inside_forms-form ${
        arcSite === 'trome' ? 'form-trome' : ''
      }`}
      onSubmit={handleOnSubmit}>
      <p
        style={{
          color: '#000000',
          fontSize: '18px',
        }}
        className="signwall-inside_forms-text center">
        Ingresa con
      </p>

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
        </div>
      )}

      <Input
        type="email"
        inputMode="email"
        autoComplete="email"
        name="remail"
        placeholder="Correo electrónico"
        required
        value={remail}
        onChange={(e) => {
          handleOnChange(e)
          setShowError(false)
        }}
        error={remailError}
      />

      <Input
        type="password"
        autoComplete="current-password"
        name="rpass"
        placeholder="Contraseña"
        required
        value={rpass}
        onChange={(e) => {
          handleOnChange(e)
          setShowError(false)
        }}
        error={rpassError}
      />

      <a
        href="#"
        style={{ color: 'gray' }}
        className="signwall-inside_forms-link mt-10 mb-20 inline f-right text-sm"
        onClick={(e) => {
          e.preventDefault()
          Taggeo(
            `Web_Sign_Wall_${typeDialog}`,
            `web_sw${typeDialog[0]}_contrasena_link_olvide`
          )
          changeTemplate('forgot')
        }}>
        Olvidé mi contraseña
      </a>

      <button
        type="submit"
        className="signwall-inside_forms-btn"
        style={{ color: mainColorBtn }}
        disabled={disable || showLoading}
        onClick={() =>
          Taggeo(
            `Web_Sign_Wall_${typeDialog}`,
            `web_sw${typeDialog[0]}_email_login_boton`
          )
        }>
        {showLoading ? 'CARGANDO...' : 'INICIA SESIÓN'}
      </button>

      <p className="signwall-inside_forms-text mt-20 mb-10 center">
        ó ingresa con tu cuenta de:
      </p>

      {authProviders.map((item) => (
        <ButtonSocial
          key={item}
          brand={item}
          size={sizeBtnSocial}
          onClose={onClose}
          typeDialog={typeDialog}
          arcSite={arcSite}
          typeForm="relogin"
          activeNewsletter={activeNewsletter}
          showMsgVerify={() => triggerShowVerify()}
          dataTreatment={checkedPolits ? '1' : '0'}
        />
      ))}

      <AuthURL
        arcSite={arcSite}
        onClose={onClose}
        typeDialog={typeDialog}
        activeNewsletter={activeNewsletter}
        typeForm="relogin"
      />

      <p
        style={{
          color: '#000000',
          fontSize: '12px',
          textAlign: 'center',
        }}
        className="signwall-inside_forms-text mt-20 mb-20">
        ¿Aún no tienes una cuenta?
        <a
          href="#"
          style={{ color: mainColorLink, fontWeight: 'bold' }}
          className="signwall-inside_forms-link ml-10"
          onClick={(e) => {
            e.preventDefault()
            Taggeo(
              `Web_Sign_Wall_${typeDialog}`,
              `web_sw${typeDialog[0]}_login_boton_registrate`
            )
            changeTemplate('register')
          }}>
          Regístrate
        </a>
      </p>

      {activeDataTreatment ? (
        <>
          <CheckBox
            checked={checkedPolits}
            value={checkedPolits ? '1' : '0'}
            name="rpolit"
            arcSite={arcSite}
            onChange={() => {
              setCheckedPolits(!checkedPolits)
            }}>
            <p
              style={{
                fontSize: '12px',
              }}
              className="signwall-inside_forms-text mt-10">
              Al ingresar por redes sociales autorizo el uso de mis datos para
              <a
                href={dataTreatment}
                target="_blank"
                rel="noreferrer"
                style={{ color: mainColorLink, fontWeight: 'bold' }}
                className="signwall-inside_forms-link ml-5 inline">
                fines adicionales
              </a>
            </p>
          </CheckBox>

          <p
            style={{
              textAlign: 'justify',
              color: '#818181',
              fontSize: '11px',
            }}
            className="signwall-inside_forms-text mt-10 mb-10">
            En caso hayas autorizado los fines de uso adicionales anteriormente,
            no es necesario que lo vuelvas a marcar. Si deseas retirar dicho
            consentimiento, revisa el procedimiento en nuestras
            <a
              href={PolicyPrivacy(arcSite)}
              target="_blank"
              rel="noreferrer"
              style={{ color: mainColorLink, fontWeight: 'bold' }}
              className="signwall-inside_forms-link ml-5 inline">
              Políticas de Privacidad.
            </a>
          </p>
        </>
      ) : (
        <p
          style={{
            color: '#818181',
            fontSize: '10px',
          }}
          className="signwall-inside_forms-text mt-10 center">
          CON TUS DATOS, MEJORAREMOS TU EXPERIENCIA DE <br /> NAVEGACIÓN Y NUNCA
          PUBLICAREMOS SIN TU PERMISO
        </p>
      )}
    </form>
  )
}

export default FormRelogin
